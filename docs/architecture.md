# dsh-token-usage 架构文档

## 仓库分层

| 层 | 内容 | 说明 |
| --- | --- | --- |
| 文档层 | `docs/` | 设计、架构、需求迭代记录与参考资料 |
| 插件代码层 | 仓库根（`lib/` + `cordis.patch.yml` + `package.json`） | 单插件包，host 半 + client 半一体分发 |

## 模块架构：dsh-token-usage

### 数据流

```
~/.dsh/sessions/**/session.jsonl.zstd
        │ sessionQuery.listSessions / readSession
        ▼
collect() 单次扫描聚合（8 worker 并发，fork seed 去重）
  ├─ token：assistant/message.data.usage
  ├─ 工具：tool/call + tool/result（callId 配对耗时与错误）
  ├─ 步数/耗时：step/start / assistant/message / step/end
  ├─ 会话：header.createdAt/cwd/origin/delegationDepth、session/title、subagent/descriptor
  ├─ 主/子拆分：按 origin/depth 分别累计 main / sub 每日桶
  ├─ 子 Agent 类型：team/member、tool-workflow/agent-start
        │ 60s TTL 缓存（?refresh=1 强刷）
        ▼
GET /token-usage/stats（webServer.register，JSON-safe 扁平桶）
        │ fetch
        ▼
client.js 四页签渲染（总览 / 工具 / 会话 / 模型，前端只做范围切片）
```

### host 半（lib/index.js）

- `collect(sessionQuery)`：扫全部会话（读取失败只计 `failed`），一次折叠全部视图
  - token / 请求 / 完成轮次：`assistant/message` 的 `data.usage`，按总量/按天/按模型/按天×模型折叠；`turns` 保持“带 usage 的 assistant/message 去重 turn”口径
  - 工具：`tool/call` 按名计 calls；`skill` 用 `arguments.name` 生成 `skill:<name>` 维度；MCP 保留 `mcp__server__tool`；`tool/result` 按 `message.toolCallId` / `message.source.callId` / `data.callId` 配对，错误取 `message.isError` 或 `data.error`，耗时取 call→result 墙钟并归属 call 当天；未配对 result 不归属工具、不计错误/耗时
  - 工具分类：`mcp / skill / cli / file / web / agent / session / other`，未知工具归 `other`
  - 会话时间：`step/start`→`assistant/message` 累加 `llmMs`；`step/end` 计步数；`turn/end.reason.kind` 计 completed/error/aborted/interrupted；`user/message` 计用户消息
  - 会话元数据：header 的 `createdAt/cwd/origin/delegationDepth` 计开始日、主/子会话、工作区；`session/title` 取最新标题，缺失时回退 `subagent/descriptor.label`；每日活跃会话按会话 id 去重
  - 主/子判定：`origin === "subagent"` 或 `delegationDepth > 0` 为子，否则为主；seeded fork（有 parentSession 但无 origin/depth）归主会话，修正 v0.4.0 的误分类
  - 子 Agent 类型：`team/member.member.id` 命中为 team；`tool-workflow/agent-start.childId` 命中为 workflow；其余为 generic
  - 主/子每日拆分：每类维护独立的 `sessions/tokens/req/turns/steps/toolCalls/toolErrs/llmMs/toolMs/toolMeasured/ok/err/abort/interrupt` 桶；每日 `main + sub` 必须等于全量 `byDay`
  - fork 去重：`header.seedLength` 或 `readSession.inheritedEventCount` 作为 seed 边界，父会话在语料内时跳过 seed 事件；所有指标共用同一判定。父会话缺失时继承历史仍会重复计入（已知边界）
  - 会话明细：每会话 token/req/turns/steps/toolCalls/toolErrs/消息/主模型/标题/cwd/lastAt/kind/subagentType；按 `lastAt` 降序，最多 1000 行，超出置 `rowsTruncated`
- 响应 schema
  - `totals` / `byDay`：TokenBucket + `steps/llmMs/toolMs/toolMeasured/userMsgs/asstMsgs/toolCalls/toolErrs/turnOk/turnErr/turnAbort/turnInterrupt`；`byDay` 另带 `sessionsStarted/mainStarted/subStarted/activeSessions`
  - `byModel`：TokenBucket（仅 model id）；`byDayModel`：`{d,m,in,cr,cw,out,req}`
  - `agentComparison.byDay`：`{d, main: SplitBucket, sub: SplitBucket}`；`SplitBucket = {sessions,tokens,req,turns,steps,toolCalls,toolErrs,llmMs,toolMs,toolMeasured,ok,err,abort,interrupt}`
  - `toolStats.byTool` / `byDayTool`：`{n,c,calls,errs,ms,measured}`（每日行另带 `d`）
  - `sessionStats`：`{total,main,sub,workspaces,activeDays,rowsTruncated,rows[]}`；行内 `kind: "main" | "subagent"`，子会话带 `subagentType: "subagent" | "team" | "workflow"`
- `apply(ctx)`：激活即后台预热一次全量扫描；闭包缓存为 stale-while-revalidate（非强制请求直接回缓存，过期则后台重建；`?refresh=1` 强制 await 重建，5s 冷却；pending single-flight 保证至多一次扫描）；路由注册包在 `ctx.effect` 内，卸载即注销
- 响应头 `cache-control: no-store`，错误路径也返回 JSON

### client 半（lib/client.js）

- `window.__ModuleLoader__.load` 手写包装（无打包器），`require('react')` 取 shell 静态模块
- `ctx.slots.inject("settings.section", ...)` 注册槽位条目，槽位未声明时自动等待
- 样式经 `ctx.effect` 注入 `<style>`，只用 `--dsw-*` token；locale 经 `ctx.get('locale')` 订阅切换
- 组件状态机：loading/error/ready + 各页签空数据态；四页签（总览 / 工具 / 会话 / 模型）共享全局时间范围
- 会话页：主/子对比卡（指标 + 横向对比条）、每日主/子 Tokens/工具趋势、会话明细 全部/主/子 筛选与类型徽标
- 图表零依赖：div 堆叠柱、SVG polyline 折线、circle stroke-dasharray 环图、CSS grid 热力图、横向堆叠条与排名条；工具与会话明细用原生 `<table>`

### 部署拓扑（官方组合包通道）

```
profile  ~/.dsh/profiles/<profile>/
  ├── node_modules/dsh-token-usage    # pnpm 装入（本地路径通道为 link: 活链接）
  ├── package.json                    # dependencies 写入 + dsh.profile.bundles 登记
  ├── pnpm-lock.yaml                  # 安装时生成
  └── pnpm-workspace.yaml             # 官方初始化：nodeLinker hoisted + autoInstallPeers false
挂载    包内 cordis.patch.yml（dsh.bundle.patch 声明，insert token-usage → dsh-token-usage）
```

- 模块解析双锚点（dsh-app-boot ResolutionRouter）：bundle 名先解析自 dsh 安装树，再解析自 profile 目录，profile `node_modules` 内的 pnpm 条目优先——host 半 `import('dsh-token-usage')` 与 client 半 `require.resolve('<name>/package.json')` 都命中 profile `node_modules`，无需任何符号链接
- 安装/卸载由官方 plugin-manager（dsh CLI / 桌面版插件页 / agent 工具共用引擎）编排：inspect 预检（读包 `dsh.bundle` 声明，非组合包拒绝）→ pnpm add → `dsh.profile.bundles` 登记；失败/取消自动恢复 `package.json` 与 lockfile 快照
- 本地路径通道落 `link:` 依赖：仓库改码即 profile 内生效，重装仅需重启；Git/npm 通道为快照安装，更新需卸载重装
- desktop profile 无 `patchReload: live`：装/卸/升级后重启 DSH 生效；web profile 有 live 重载

### 依赖契约

- `sessionQuery.listSessions/readSession`、`webServer.register`、`settings.section` 槽位、`--dsw-*` token、ModuleLoader 包装格式
- 验证版本：DSH 0.1.7-rc.2（桌面版，runtime node 24.18.1 / pnpm 11.7.0）；0.1.6-alpha.2（web）

> 前身 dsh-panel 时期的 time-awareness 模块架构、第三方 bundle 接入通道（dspm + bun + prunePeers）已随 2026-09-27 裁剪移除，设计记录保留在 `docs/requirements.md` 历史条目
