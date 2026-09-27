# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

## 核心指令

- 本仓库是 DSH 插件 dsh-token-usage 的单插件仓库（前身 dsh-panel 插件集合，2026-09-27 裁剪为单插件接入桌面版官方插件管理）；仓库根即插件包
- 每次需求迭代必须追加更新 `docs/requirements.md`（时间倒序）
- 设计/架构变更需同步更新 `docs/design.md` / `docs/architecture.md`
- 文档口径变更需同步本文件代码地图与 README

<img width="1601" height="2617" alt="image" src="https://github.com/user-attachments/assets/b0b01915-88e8-47f0-a6f4-a909f709353f" />


## 代码地图

| 路径 | 职责 |
| --- | --- |
| `docs/` | 设计、架构、需求迭代文档与参考资料 |
| `lib/index.js` | host 半：Cordis 插件（`apply/inject/name`），聚合会话日志，注册 `GET /token-usage/stats`（60s 缓存 + 单飞，`?refresh=1` 强刷带 5s 冷却） |
| `lib/client.js` | client 半：ModuleLoader 包装的浏览器 bundle，注入 `settings.section` 槽位，三视图 UI（零图表库） |
| `cordis.patch.yml` | 组合包挂载行（`dsh.bundle.patch` 声明：insert token-usage → dsh-token-usage） |
| `package.json` | 单包声明：exports + dsh.bundle + dsh.client + peerDependencies + files 白名单 |
| `docs/plugin-guide.md` | 插件开发·维护·部署指南（对外发布文档） |

## 关键约束

- host 一切副作用必须可逆：`ctx.effect(fn, label)` 返回 disposer，卸载自动调用
- client 无 JSX，只用 `react.createElement`；bundle 必须手写 `window.__ModuleLoader__.load` 包装
- 样式只用 `--dsw-*` 主题 token；locale 文案走 `ctx.get('locale')` 订阅
- 静态插件没有 `host.call`，client 取 host 数据走 HTTP 路由
- 分发走官方组合包通道（桌面版/web 插件页「添加插件」或 `dsh plugin --profile <p> add <spec>`，spec 支持本地路径 / Git 地址 / npm 包名）：pnpm 装入 profile + `dsh.profile.bundles` 登记 + 包内 `cordis.patch.yml` 自动挂载；禁止手写 profile patch 挂载行或自建符号链接（旧 dspm 通道已废弃，与 bundle 双挂载会导致启动失败）
- `peerDependencies` 中 `@deepseek-ai/dsh*` 会被官方安装门 semver 校验（`*` 永通过）；profile 层官方初始化 `autoInstallPeers: false` + `nodeLinker: hoisted`，声明 peer 不会双实例
- 语法验证：`node --check lib/*.js`（无 node 环境时可用 DSH 桌面版自带 runtime node）
- 不发布 npm：`dsh-token-usage` 包名已被第三方同名包（Tastelessor/dsh-usage-stats）占用
- DSH 契约与开发规范见 `docs/reference/dsh-plugin-spec.md`、`docs/reference/dsh-plugin-manager.md`
