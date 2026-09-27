# 安全要求

## 安全基线

- 密钥、密码、token 一律不进代码库；本仓库为本地插件仓库，不产生也不存储凭据
- 安装面收敛：本插件只经本地目录 / GitHub 仓库地址通道安装；零运行时依赖（`peerDependencies` 声明不触发安装，profile 层 `autoInstallPeers: false`）
- 插件只读写 DSH 契约暴露的服务与会话数据，不越权访问 `~/.dsh` 之外的用户文件

## 认证与授权

- 无独立认证体系：模块 HTTP 路由（`GET /token-usage/stats`）挂载在 DSH host 内，随宿主监听本地端口，信任边界等同 DSH 本身
- `TODO: 待补充`（若未来路由暴露到本机以外，需补鉴权约定）

## 数据安全

- 敏感数据清单：会话日志 `~/.dsh/sessions/**`（含对话原文）——聚合只提取 `usage` 数值，不落盘原文、不外发
- 备份策略：依赖 git（仓库版本化）与官方安装失败自动恢复（manifest / lockfile 快照），无额外备份需求

## 沙盒与演练纪律

- 沙盒安装演练只用临时目录假 profile，不碰 `~/.dsh/profiles/<真实 profile>`；真实 profile 的变更只经桌面版插件页或 `dsh plugin` CLI
- 重启 DSH 会断开所有会话，确认无进行中任务再操作

## 已知风险与例外

| 风险 | 等级 | 处理状态 |
|---|---|---|
| npm 同名包冒淆（Tastelessor/dsh-usage-stats 峰谷计价插件） | 低 | 本插件不走 npm；README 与文档明示裸包名装到的是第三方包 |
| 模块 HTTP 路由无鉴权，同机进程可读 | 低 | 自用单机场景接受；仅在本地监听 |
