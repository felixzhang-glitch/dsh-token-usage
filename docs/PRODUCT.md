# 产品文档

## 产品定位

dsh-token-usage 是 DeepSeek Harness (DSH) 的 token 用量统计插件（自用，仅 macOS）：单包承载 host 聚合接口与设置页面板 UI，经官方组合包通道安装进桌面版/web

> 前身 dsh-panel 插件集合仓库已于 2026-09-27 裁剪为单插件（只保留 token 统计能力，接入桌面版「添加插件」）；dspm 平台管理命令与 time-awareness 模块移除

## 功能项清单

> 新增需求先更新本表再开发（需求细节同步进 `docs/requirements.md`），保证多轮开发不偏离。状态取值：规划中 / 开发中 / 已完成 / 已废弃

| 功能 | 状态 | 描述 |
|---|---|---|
| 用量统计面板 | 已完成 v0.3.0 | 模型用量统计：指标卡、活跃热力图、按天趋势（top5 模型堆叠柱 + 缓存命中率折线）、模型占比环图；挂载设置 → 用量统计 |
| 官方组合包分发 | 已完成 v0.3.0 | `dsh.bundle.patch` + `files` 白名单 + `peerDependencies` 声明；桌面版/web 插件页或 `dsh plugin add` 安装（本地目录 / GitHub 地址通道） |

## 非目标

> 明确不做什么，防止范围蔓延

- 不做金额 / 成本统计：用量面板只统计 token 与轮次（2026-08-23 审查时明确决策）；第三方同名 npm 包 Tastelessor/dsh-usage-stats 走峰谷计价路线，与本插件无关
- 不发布 npm：包名已被第三方占用，分发只走 GitHub 仓库地址与本地目录通道
- 不做动态插件：静态插件形态，随 DSH 启动持久加载，无跨重启保留能力
- 不自建侧边栏 / 编辑器 / 文件预览：官方 0.1.6-alpha 起内置右侧栏（文件树 / 终端 / 内嵌浏览器 / 文件预览）
- 不做增量聚合：session header 无更新时间戳、`readSession` 只能全量读，维持全量扫 + 60s 缓存
- 不支持 Windows / Linux：安装通道与验证环境仅适配 macOS

## 用户反馈与待验证问题

- `TODO: 待补充`（自用项目，问题与决策直接记入 `docs/requirements.md`）
