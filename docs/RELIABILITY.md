# 可靠性与运维

## 可靠性目标

- 可用性目标：自用单机工具，无 SLA；底线是安装/卸载/升级可回滚、不破坏 profile 运行树（官方通道失败自动恢复 `package.json` 与 lockfile 快照）
- 数据持久性要求：模块不产生业务数据；会话日志归 DSH 所有，模块只读

## 监控与告警

- 日志：安装诊断在 `~/.dsh/profiles/<profile>/.plugin-manager/logs`；模块异常走 `ctx.logger.warn`
- 健康检查：插件页列表状态（异常 / 等待依赖 / 运行中）；DSH 启动失败看宿主日志
- 告警渠道与阈值：无（自用，靠插件页主动巡检）

## 故障处理

- 常见故障与处置：
  - 插件页安装失败 → 展开报错详情（pnpm 诊断摘要）；本地路径通道确认输入的是绝对路径且目录含 `package.json` 与 `cordis.patch.yml`
  - 启动失败（duplicate prefix route）→ 检查 profile `cordis.patch.yml` 是否残留手写 token-usage 挂载行（与 bundle 双挂载），删除手写行
  - 设置页无「用量统计」→ 插件页确认该包已启用；浏览器硬刷新（client 半）；重启 DSH（host 半 / 新装）
  - 条目一直加载 → `/token-usage/stats` 返回 500，看响应 `error` 字段
  - 页面出现但数据为空 → 确认有带 usage 的模型请求；检查 fork 去重是否误杀
- 回滚方式：插件页「卸载」一键（bundles 摘除 + pnpm remove）；紧急下线可插件页关闭该包（保留依赖不卸载）

## 运维清单

- 部署方式：桌面版/web 插件页「添加插件」粘贴本地目录或 GitHub 地址；或 `dsh plugin --profile <p> add <spec>`
- 定时任务：无
- 升级流程：本地通道（`link:` 活链接）改码后重启即新版本；GitHub 通道 push 后插件页卸载重装；DSH 本体升级后核对依赖契约（sessionQuery / webServer / settings.section）并实机验证
