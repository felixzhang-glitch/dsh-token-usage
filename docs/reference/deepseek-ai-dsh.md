## @deepseek-ai/dsh 系列包

- 类型：第三方包（DSH 平台，npm scope `@deepseek-ai`）
- 用途：宿主平台本体与 client 侧运行时/槽位包；插件通过 `inject` 声明依赖，不直接 import
- 文档链接：插件契约见 `docs/reference/dsh-plugin-spec.md` 与 `docs/plugin-guide.md`；安装通道见 `docs/reference/dsh-plugin-manager.md`；插件市场 github.com/topics/dsh-plugin
- 版本：验证版本 DSH 0.1.7-rc.2（桌面版，runtime node 24.18.1 / pnpm 11.7.0）/ 0.1.6-alpha.2（web）

### 关键用法

- host 侧：桌面版 app 自带运行树（`app.asar/dsh`，Electron asar 内可直接按路径读）；web 侧 `bunx @deepseek-ai/dsh@alpha web`；插件包经官方通道装入 profile（`~/.dsh/profiles/<p>/node_modules`），双锚点解析命中
- client 侧 inject（`package.json` 的 `dsh.client.inject`）：包名列表，控制实例化顺序；本插件用 `@deepseek-ai/dsh-client-ui-settings`（settings.section 槽位）；注意 `@deepseek-ai/dsh-client-runtime` 在 0.1.7-rc.2 已不存在，0.1.7 官方包 inject 均为包名列表
- 版本敏感：`peerDependencies` 的 `@deepseek-ai/dsh*` 范围经安装门 semver 校验；DSH 升级后核对依赖契约（sessionQuery / webServer / settings.section / usage 字段名）

### 来源

DSH 0.1.7-rc.2 桌面版运行时实读 + 本仓库依赖契约，2026-09-27
