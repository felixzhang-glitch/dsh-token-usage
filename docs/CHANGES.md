# 变更记录

> 每次需求/文档体系变更追加一条，倒序排列（最新在上）。时间格式 `YYYY-MM-DD`
>
> 分工：需求迭代记录继续走 `docs/requirements.md`（仓库既有约定），本文件记录 Harness 文档体系与平台级结构变更，避免双记

### 2026-09-27 仓库裁剪：dsh-panel 插件集合 → 单插件 dsh-token-usage

- 变更内容：删除 dspm / third-party.json / modules/（dsh-time-awareness），仓库根收敛为 dsh-token-usage 单插件包并组合包化（dsh.bundle.patch / files 白名单 / peerDependencies / inject 收敛）；分发层移交 DSH 官方 plugin-manager（桌面版/web 插件页、dsh plugin CLI）；reference 删除过时 bun.md、新增 dsh-plugin-manager.md
- 原因：接入 DeepSeek Harness 桌面版内置「添加插件」，只保留 token 统计能力；不发布 npm（包名被第三方同名包占用）
- 影响范围：全仓库结构与文档口径；插件逻辑（lib/）零改动

### 2026-08-30 Harness 文档体系补齐（二开模式）

- 变更内容：按 harness-init 二开模式补齐缺失文档：`PRODUCT.md` / `CHANGES.md` / `FRONTEND.md` / `SECURITY.md` / `RELIABILITY.md` / `TEST.md` / `QUALITY_SCORE.md`，并在 `docs/reference/` 追加第三方依赖条目；既有文档（AGENTS.md、design、architecture、requirements、plugin-guide、reference/）一律跳过未动
- 原因：建立多轮开发的完整上下文锚点
- 影响范围：无代码变更

> 2026-08-30 之前的项目历史见 `docs/requirements.md` 与 git log
