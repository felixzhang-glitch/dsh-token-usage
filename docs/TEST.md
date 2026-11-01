# 测试要点

## 测试策略

- 测试层级：当前无自动化测试框架；验证分三层——语法静态检查（`node --check`）、沙盒安装演练（假 profile + runtime pnpm）、实机插件页人工验证
- 运行方式：
  - 语法：`node --check lib/*.js`；无独立 node 环境时用 DSH 桌面版自带 runtime node（`DSH_DESKTOP_NODE_EXECUTABLE="<app 主进程路径>" "<app>/Contents/Resources/runtime/bin/node"`）
  - 打包：`pnpm pack --dry-run` 核对 `files` 白名单（仅 lib / cordis.patch.yml / README.md + 自动项）
  - 沙盒：临时目录拼假 profile（`package.json` + `pnpm-workspace.yaml` 骨架：nodeLinker hoisted、autoInstallPeers false），runtime pnpm `add <仓库绝对路径>`，断言 node_modules 实体与 `link:` 依赖写入；不碰真实 profile
  - 实机：插件页「添加插件」粘贴本地目录或 GitHub 地址 → 重启 DSH → 设置页验证
- 覆盖率要求：不设量化指标；每次改动必须过语法检查，涉及包声明（bundle / files / peers / inject）的改动必须过 pack 与沙盒演练

## 测试要点

> 记录必须验证的关键点，尤其是易回归、易遗漏的场景

1. bundle 声明完整性：`dsh.bundle.patch` 指向的挂载文件必须进 `files` 白名单，否则插件页 inspect 判 not-a-bundle
2. peer 兼容门：`peerDependencies` 中 `@deepseek-ai/dsh*` 范围被官方安装门 semver 校验（`*` 永通过）；profile `autoInstallPeers: false`，无宿主双实例
3. inject 列表：只列实际存在且需先实例化的 client 包名（当前 `@deepseek-ai/dsh-client-ui-settings`）；`@deepseek-ai/dsh-client-runtime` 在 0.1.7-rc.2 已不存在，禁止引用
4. token-usage 缓存行为：60s TTL + single-flight；`?refresh=1` 连发第二次 `generatedAt` 不变（5s 冷却）
5. link 活链接：本地路径通道装的是 `link:`，仓库改码 profile 即生效，重装仅需重启；GitHub 通道是远端快照，更新需卸载重装
6. 沙盒纪律：演练只碰临时目录，真实 profile 变更只经插件页或 `dsh plugin` CLI
7. 工具统计闭合：`sum(byTool.calls) === sum(byDayTool.calls) === totals.toolCalls`，errs/ms/measured 同样闭合；技能维度键为 `skill:<name>`，MCP 为 `mcp__server__tool`
8. 工具耗时配对：按 callId 配对 `tool/call → tool/result`，未配对调用只计 calls；错误用 `message.isError`/`data.error`，不走文本启发式
9. fork 去重：`header.seedLength` 或 `readSession.inheritedEventCount` 跳过 seed 事件，token 与工具/会话指标都不能重复计入父会话历史
10. 会话统计：会话开始日、主/子会话、每日活跃会话、轮次结果、工作区、会话明细 tokens 之和（未截断时）与总量闭合；主/子判定用 `origin === "subagent"` 或 `delegationDepth > 0`，seeded fork 必须归主会话
11. 主/子拆分：每天 `main + sub` 的 sessions/tokens/req/turns/steps/toolCalls/toolErrs/llmMs/toolMs/toolMeasured/ok/err/abort/interrupt 均等于现有 `byDay` 对应字段
12. 子 Agent 类型：`team/member.member.id`、`tool-workflow/agent-start.childId` 命中后分别归 team / workflow，其余归 subagent
13. 旧/空数据兼容：响应缺 `toolStats`/`sessionStats`/`agentComparison` 或全零时 client 不崩，按页签显示空态

## 要点与用例映射

> 本项目暂无自动化测试用例，映射表留空；历史验证记录见 `docs/requirements.md` 各条目「验证」字段

| 测试要点 | 用例路径 | 类型 |
|---|---|---|
| - | - | - |

## 手工验证清单

- 桌面版插件页：inspect 通过 → 安装成功（bundles 登记）→ 重启后设置 → 用量统计出现
- token-usage UI：四页签渲染、时间范围切换（工具/会话/模型同步过滤）、中英 locale、主题适配、各页签空数据态、`?refresh=1` 强刷
- 工具页：分类占比、每日趋势、Top 工具表、技能/MCP 排名与 host JSON 一致
- 会话页：主/子对比卡、每日主/子 Tokens/工具切换、全部/主/子筛选、类型徽标、轮次结果、工作区、明细排序与 host JSON 一致
