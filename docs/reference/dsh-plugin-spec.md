# DSH 插件开发规范摘录

来源：本仓库 `docs/plugin-guide.md`（以 dsh-token-usage 为实例的完整指南），此处提炼规范要点供快速查阅；全文以 plugin-guide.md 为准

> 摘录更新日期：2026-09-27；适用 DSH 0.1.0-rc 系列桌面版与 web（0.1.7-rc.2 实读核对）

## package.json 契约

- `exports["."]` 指向 host 入口，`exports["./client"]` 指向浏览器 bundle（支持字符串或 `{ default }` 形式）
- `exports["./package.json"]` 必须显式导出，否则 `require.resolve` 无法穿透 exports 映射
- `dsh.bundle.patch`：组合包声明，指向包内挂载 patch 文件（字符串或有序列表）；官方插件页 / `dsh plugin add` 只安装组合包，patch 文件必须进 `files` 白名单
- `dsh.client.inject`：client 依赖的包名列表，控制实例化顺序，只写实际用到的运行时/槽位包
- `dsh.client.platform` 必须与部署面匹配（web；桌面版即 web 面内嵌）
- `peerDependencies` 中 `@deepseek-ai/dsh*` 走官方安装门 semver 校验（`*` 永通过）；profile `autoInstallPeers: false`，声明 peer 不会双实例
- `files` 白名单控制分发面（lib / 挂载 patch / README），npm pack 与 pnpm 本地/Git 安装共用该语义
- 包声明 `"type": "module"`

## host 半规则

- 顶层导出 `apply / inject / name`，纯 ESM
- `inject` 里的服务经 `ctx.<服务名>` 直接访问；可选服务用 `ctx.get(name)` 并处理 undefined
- 一切副作用必须可逆：`ctx.effect(fn, label)` 返回 disposer，卸载自动调用；不允许持有跨 effect 的未清理资源
- 聚合类服务做成「缓存 + 强制刷新」；输出 JSON-safe 扁平结构，不泄漏 Cordis 活对象

## client 半规则

- 浏览器 bundle 不经打包器，必须手写 `window.__ModuleLoader__.load({ id, factory })` 包装，id 与包名一致（roster 行 id 即包名，与 host 侧 patch 行 id 无关）
- `require` 只能取已注册模块（react、shell 静态模块、已加载插件）；跨插件取值导入是构建期错误
- React 组件用 `react.createElement`，无 JSX
- 槽位注册走 `ctx.slots.inject(key, () => ctx.slots.register(options, Component))`，不依赖加载顺序
- 样式只用 `--dsw-*` token（alias 语义别名 / static 固定色 / font 字号）
- 静态插件没有 `host.call`，client 取 host 数据走 host 半注册的 HTTP 路由

## 挂载与 patch 语义

- 组合包通道（正道）：包内 `cordis.patch.yml`（`dsh.bundle.patch` 声明）随 `dsh.profile.bundles` 登记自动挂载，安装/卸载/启停全托管，无需手改任何 profile 文件
- profile `cordis.patch.yml` 手挂载仅作兜底（顶层数组 insert 行）；与 bundle 通道互斥，双挂载（duplicate prefix route）导致启动失败
- `insert` 不带 id → 追加到组合根列表末尾；带 id → 追加进指定 group
- 不带 `insert` 的 patch 是覆盖型：按 id 定位已有行改字段
- 匹配不到的 patch 只警告跳过；行加载失败 fail loud
- desktop profile 无 live 重载，装/卸/改 config 后需重启；web profile 声明 `patchReload: "live"` 时配置变化即时生效

## 模块解析（双锚点）

- bundle 名先解析自 dsh 安装树（运行时自带官方包），再解析自 profile 目录；profile `node_modules` 内 pnpm 管理的条目优先
- host 半 `import(name)` 与 client 半 `require.resolve('<name>/package.json')` 均由 dsh-app-boot 的 ResolutionRouter 接管，命中 profile `node_modules`
- 旧符号链接双链路（链接 A/B + `link:` 依赖声明）为 0.1.6-alpha 前的历史通道，已废弃
