# DSH plugin-manager 组合包通道摘录

来源：DSH 0.1.7-rc.2 运行时内 `@deepseek-ai/dsh-plugin-manager` / `@deepseek-ai/dsh-app-boot` / `@deepseek-ai/dsh-client-modules` 实现与 README.zh.md 实读；摘录日期 2026-09-27

> DSH 官方插件管理引擎，dsh CLI、Web/桌面插件页与 agent 工具共用；本插件（dsh-token-usage）的分发完全依赖该通道

## 安装 spec（插件页「包名或地址」输入框）

- npm 包名：如 `@deepseek-ai/dsh-subagent-codex`，支持 `@version` 版本范围
- Git 地址：`https://github.com/author/repo`、`github:owner/repo`、`git://` / `git@` URL、其他 Git host（安装前对 GitHub 先做 `git ls-remote` 连通检查，默认 5s 超时，只拦网络不通）
- 本地绝对路径：相对路径拒绝（Host 工作目录对浏览器输入无意义）；pnpm 落 `link:` 活链接，仓库改码即 profile 内生效
- tarball：`.tgz` / `.tar.gz`，本地或 http(s)

## 组合包判定与安装流程

- 包 manifest 声明 `"dsh": { "bundle": { "patch": "./cordis.patch.yml" } }`（字符串或有序文件列表）才算组合包；插件页 inspect 预检读包元数据（名称 / 版本 / 是否组合包），无声明报 not-a-bundle
- installBundle：profile 目录内 `pnpm add <spec>` → 失败 / 取消 / 装入无 bundle patch 的包时自动恢复 `package.json` 与 `pnpm-lock.yaml` 快照 → 成功后写入 `dsh.profile.bundles` 登记（默认启用，追加列表末尾，依赖保留）
- 安装源：默认 pnpm 自身配置，fallback `https://registry.npmmirror.com/`（即插件页「中国大陆镜像源」选项）；私有源只问自己，不落到公共源
- 版本兼容门：`peerDependencies` 中 `@deepseek-ai/dsh` / `@deepseek-ai/dsh-*` 逐项 semver 校验运行时版本（includePrerelease；`workspace:^` / `workspace:~` / `workspace:*` 视为当前运行时版本）；本地路径与 npm spec 在 pnpm 运行前检查，git / tarball 装后判定并回滚重装；不满足报 incompatible-version，豁免走 profile `compatibility.json`（精确 包@版本 × 精确运行时版本，需 acceptRisk）
- 组合语义：`dsh.profile.bundles` 按序把各 bundle patch 应用到空 entry 列表，再叠加 profile 自身 `cordis.patch.yml` 与启动器 `--patch` 层；bundle 名双锚点解析（dsh 安装树优先，profile `node_modules` 内 pnpm 条目优先级更高）
- HMR：profile package.json 声明 `dsh.profile.patchReload: "live"` 才即时生效（web profile 有）；desktop profile 未启用，装/卸后需重启
- 卸载：`dsh.profile.bundles` 摘除 → 运行时贡献下线 → `pnpm remove`；任一步失败停在该步并报告，可重试
- profile 层 `pnpm-workspace.yaml`（DSH 官方初始化）：`nodeLinker: hoisted` + `autoInstallPeers: false`——插件声明 `@deepseek-ai` peer 不会被自动安装，无宿主双实例风险
- pnpm 11 构建脚本拦截：本插件零依赖无构建脚本，不涉及 `pendingBuilds` / `allowBuilds` 审批

## 桌面版差异

- 桌面包管理操作由 Desktop shell 负责（自带 runtime pnpm，路径 `<app>/Contents/Resources/runtime/pnpm`）
- 桌面版 profile：`~/.dsh/profiles/desktop`；runtime node 24.18.1 / pnpm 11.7.0
