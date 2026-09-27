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
collect() 聚合（8 worker 并发，fork seedLength 去重）
        │ 60s TTL 缓存（?refresh=1 强刷）
        ▼
GET /token-usage/stats（webServer.register，JSON-safe 扁平桶）
        │ fetch
        ▼
client.js 三视图渲染（时间范围切片，前端不重复聚合）
```

### host 半（lib/index.js）

- `collect(sessionQuery)`：扫全部会话，只取 `assistant/message` 事件的 `data.usage`，按总量/按天/按模型/按天×模型四个视图折叠成 `Bucket = {in,cr,cw,out,reason,req,turns}`
- fork 去重：`seedLength > 0` 且父会话在语料内时跳过 `seq < seedLength` 的 seed 事件
- turns 用每桶独立的 turn id Set 去重后计数；单会话读取失败只计数不中断
- `apply(ctx)`：闭包内实现缓存（TTL 60s + pending 合并并发请求）与 handler，路由注册包在 `ctx.effect` 内，卸载即注销
- 响应头 `cache-control: no-store`，错误路径也返回 JSON

### client 半（lib/client.js）

- `window.__ModuleLoader__.load` 手写包装（无打包器），`require('react')` 取 shell 静态模块
- `ctx.slots.inject("settings.section", ...)` 注册槽位条目，槽位未声明时自动等待
- 样式经 `ctx.effect` 注入 `<style>`，只用 `--dsw-*` token；locale 经 `ctx.get('locale')` 订阅切换
- 组件状态机：loading/error/ready + 空数据态；图表零依赖（div 堆叠柱、SVG polyline 折线、circle stroke-dasharray 环图、CSS grid 热力图）

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
