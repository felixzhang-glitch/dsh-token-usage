# dsh-token-usage

DeepSeek Harness (DSH) token 用量统计插件：指标卡、活跃热力图、按天趋势（top5 模型堆叠柱 + 缓存命中率折线）、模型占比环图，挂载 设置 → 用量统计

> 前身 dsh-panel 插件集合仓库已于 2026-09-27 裁剪为本单插件包（只保留 token 统计能力）；原 dspm 管理命令与 dsh-time-awareness 模块已移除，历史沿革见 `docs/requirements.md`

## 安装

DSH 0.1.0-rc 系列（桌面版或 web），侧边栏「插件」→「添加插件」，「包名或地址」输入：

- GitHub 仓库地址：`https://github.com/felixzhang-glitch/dsh-panel`
- 本地插件目录：仓库克隆的绝对路径（如 `/Users/name/dsh-panel`，本机开发用）

或 CLI 等价通道：

```
dsh plugin --profile <profile> add https://github.com/felixzhang-glitch/dsh-panel
dsh plugin --profile <profile> add /Users/name/dsh-panel
```

- 官方组合包通道：pnpm 装进 profile + 登记 `dsh.profile.bundles`，包内 `cordis.patch.yml` 自动挂载，无需手改任何 profile 文件；安装失败自动恢复 manifest 与 lockfile
- 装完重启 DSH 生效（desktop profile 无 live 重载）
- 本地目录通道落 `link:` 活链接：仓库内改代码即 profile 内生效，重装仅需重启；GitHub 通道装的是远端快照，更新需卸载重装
- ⚠️ 本插件不发布 npm：npm 上 `dsh-token-usage` 是第三方同名包（Tastelessor/dsh-usage-stats，带计价），对话框输入裸包名装到的不是本插件

## 结构

```
lib/               # 插件本体
  index.js         # host 半：聚合 session 日志，注册 GET /token-usage/stats（60s 缓存 + 单飞）
  client.js        # client 半：ModuleLoader 包装的浏览器 bundle，注入 settings.section 槽位
cordis.patch.yml   # 组合包挂载行（dsh.bundle.patch 声明）
package.json       # exports + dsh.bundle + dsh.client + peerDependencies + files 白名单
```

## 验证与排障

```
node --check lib/index.js && node --check lib/client.js
```

- 安装失败 → 插件页报错详情；诊断日志在 `~/.dsh/profiles/<profile>/.plugin-manager/logs`
- 设置页无「用量统计」→ 插件页确认该包已启用，再浏览器硬刷新（client 半）/ 重启 DSH（host 半）
- 条目出现但一直加载 → `/token-usage/stats` 返回 500 时看响应 `error` 字段
- 数据为空 → 确认有带 usage 的模型请求

## 维护

- 依赖契约：`sessionQuery.listSessions/readSession`、`webServer.register`、`settings.section` 槽位、`--dsw-*` token、ModuleLoader 包装格式
- 验证版本：DSH 0.1.7-rc.2（桌面版）/ 0.1.6-alpha.2（web）；跨版本升级后先跑本地验证三层再实机确认（见 `docs/plugin-guide.md`）

## 文档

| 路径 | 内容 |
| --- | --- |
| `AGENTS.md` | 代码地图与核心指令 |
| `docs/design.md` / `docs/architecture.md` | 设计与架构 |
| `docs/requirements.md` | 需求迭代记录（含 dsh-panel 时期历史） |
| `docs/plugin-guide.md` | 插件开发·维护·部署指南 |
| `docs/reference/` | DSH 插件规范、plugin-manager 通道等参考资料 |

插件市场见 [github.com/topics/dsh-plugin](https://github.com/topics/dsh-plugin)
