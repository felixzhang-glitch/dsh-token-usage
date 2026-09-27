# dsh-token-usage 设计文档

## 定位

DeepSeek Harness (DSH) 的 token 用量统计静态插件（自用，仅 macOS）：一个 npm 风格包同时承载 host 半与 client 半，经官方组合包通道安装，随 DSH 启动持久加载。设计基线与 `plugin-guide.md` 描述的 DSH 静态插件模型完全一致，本文只记录插件级决策，实现细节指回 `plugin-guide.md`

> 适用对象：DSH 0.1.0-rc 系列桌面版与 web（验证 0.1.7-rc.2 / 0.1.6-alpha.2）

## 模块清单

| 模块 | 功能 | 挂载位置 | 状态 |
| --- | --- | --- | --- |
| dsh-token-usage | 模型用量统计（指标卡、热力图、按天趋势、模型用量） | 设置 → 用量统计 | 已发布 v0.3.0 |

> 前身 dsh-panel 为插件集合仓库：dsh-time-awareness（时间感知）模块与 dspm 统一管理命令已于 2026-09-27 随「桌面版接入」裁剪移除；第三方 dsh-better-sidebar 已于 2026-09-19 因官方内置右侧栏移除。历史沿革见 `docs/requirements.md`

## 通用设计原则

- 静态插件形态：npm 风格包 + 组合包声明（`dsh.bundle.patch`），不做动态插件（无跨重启保留能力）
- Host/Client 双端分工：host 半提供数据（注册 HTTP 路由），client 半只做展示（fetch 取数）；静态插件没有 `host.call`，跨端通信一律走 HTTP
- 副作用可逆：host 一切注册/订阅必须包在 `ctx.effect` 内并返回 disposer；client 样式随插件生命周期进出
- 依赖显式声明：host 用 `inject` 列硬依赖服务，client 在 `package.json` 的 `dsh.client.inject` 列运行时/槽位包，`peerDependencies` 声明宿主契约
- 主题与 locale 随宿主：样式只用 `--dsw-*` token，文案随 locale 中英切换，不自造色值与硬编码文案
- 零重依赖倾向：能用 DOM/SVG/CSS 表达的可视化不引图表库；`files` 白名单把分发面收敛到 lib / 挂载 patch / README

## 分发：官方组合包通道

- 包形态：`dsh.bundle.patch` 声明指向包内 `cordis.patch.yml` 挂载行；`peerDependencies`（`@deepseek-ai/cordis`、`@deepseek-ai/dsh-session-query`、`@deepseek-ai/dsh-host-webserver` 用 `*`，`react ^18`）；`files: ["lib", "cordis.patch.yml", "README.md"]`
- 安装入口：DSH 桌面版/web 插件页「添加插件」（spec：本地绝对路径 / Git 仓库地址 / npm 包名），或 `dsh plugin --profile <p> add <spec>`；底层 pnpm 装入 profile 目录并登记 `dsh.profile.bundles`，包内挂载行自动生效，失败自动恢复 manifest 与 lockfile
- 通道地址：GitHub `https://github.com/felixzhang-glitch/dsh-panel`（远端快照，更新需卸载重装）；本地路径（落 `link:` 活链接，改码即 profile 内生效）；不发布 npm（包名被第三方同名包 Tastelessor/dsh-usage-stats 占用）
- 安装门与 peer：`peerDependencies` 中 `@deepseek-ai/dsh*` 范围被官方 semver 校验（`*` 永通过，桌面升级不断加载）；profile 层 `autoInstallPeers: false`（官方初始化），声明 peer 不会被自动安装，无宿主双实例
- 重启生效：desktop profile 未启用 `patchReload: live`，装/卸后需重启 DSH；web profile 有 live 重载
- 旧通道废弃：dspm 符号链接双链路（链接 A/B + `link:` 依赖声明）不再使用；手写挂载行与 bundle 双挂载会导致启动失败，禁止混用
