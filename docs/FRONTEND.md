# 前端约定

> 适用范围：插件 client 半（浏览器侧，`lib/client.js`）

## 技术栈

- 框架：React，经 shell 静态模块获取（`require('react')`），禁止引第二份 React
- 构建工具：无打包器，手写 `window.__ModuleLoader__.load` 包装（bundle 必须手写该包装）
- 样式方案：`<style>` 经 `ctx.effect` 注入，只用 `--dsw-*` 主题 token，不自造色值；卸载随 disposer 移除

## 目录约定

```
dsh-token-usage/
├── lib/
│   ├── index.js          # host 半：Cordis 插件（apply/inject/name），注册 HTTP 路由供数
│   └── client.js         # client 半：ModuleLoader 包装的浏览器 bundle，只做展示
├── cordis.patch.yml      # 组合包挂载行（dsh.bundle.patch 声明）
└── package.json          # 单包声明：exports + dsh.bundle + dsh.client（inject 包名，platform: web）+ peerDependencies + files 白名单
```

## 组件与页面规范

- 写法：无 JSX，只用 `react.createElement`
- 槽位：经 `ctx.slots.inject(...)` 注册（如 `settings.section`），槽位未声明时自动等待；官方 0.1.6-alpha 起右侧栏提供 `ctx.sidebarRightTabs` 页签注册位，需要独立面板时优先查该扩展位而非自建容器
- 状态管理：组件内状态机（loading / error / ready + 各页签空数据态）；卸载竞态防护——fetch 挂 `AbortController`，卸载/重复加载时 abort，AbortError 静默
- 请求层：静态插件没有 `host.call`，client 取 host 数据一律 fetch host 注册的 HTTP 路由；前端不重复聚合，只做时间范围切片与渲染
- 多视图：页签（总览 / 工具 / 会话 / 模型）在 `Dashboard` 内用局部 state 切换；时间范围选择全局共享，四个视图都按同一 `from/to` 切片
- 结构化组件：`Seg`（分段控件，`data-nav` 标记便于定位）、`Card`、`MetricRail`、`StackBar` + `Legend`、`BarChart`、`Heatmap`、`DataTable`、`Delta`、`ShareCell`；新页面优先复用，不另起一套
- 环比：`prevAgg` 取区间前一等长窗口；无基期时 `deltaOf` 返回 `{dir:"new"}`，文案走字典，不显示 `NaN`/`Infinity`
- 会话页对比：`agentComparison.byDay` 拆 main / sub 两桶，对比卡为「指标 | 主 | 子 | 子占比」四列网格；每日折线用右轴，计数轴由 `line.scale` + `line.format` 表达
- 表格：`DataTable` 列定义驱动（`render` 返回节点），表头 `position:sticky`、合计行吸底、可排序，空态走字典文案；横向溢出由外层 `overflow:auto` 承接
- 数值：一律走 `compact()`（亿 / 万，英 B / M / K，一位小数且进位提升），精确值放 `title`；坐标轴用 `axisOf(max)` 统一量纲
- 文案：中英双语，经 `ctx.get('locale')` 订阅切换，禁止硬编码文案；字典缺键会在界面上直接暴露，新增文案两栏同时补齐

## 交互与视觉基线

- 设计规范：跟随宿主主题，零图表库——能用 DOM/SVG/CSS 表达的可视化不引依赖（div 堆叠柱、SVG polyline 折线、circle stroke-dasharray 环图、CSS grid 热力图、横向堆叠条与占比条）
- 深浅色：颜色一律取 `--dsw-*` token（卡片 `bg-layer-1`、发丝线 `border-l1`、正文 `label-*`、强调 `state-business-primary`）；需要透明度时用 `color-mix` 现算，不写死 hex
- 序列色 6 档：deepseek-500 / amber-500 / green-500 / violet-400 / red-400 + 中性灰（尾桶），保证同图内可区分且深浅色下都可见
- 分类色固定映射 8 类（cli / file / mcp / skill / web / agent / session / other），只用 `--dsw-static-*` token
- 主/子对比固定双色：主 Agent 用 deepseek-500，子 Agent 用 amber-500；团队 green-500，Workflow violet-400，避免主/子同色
- 兼容性：DSH 桌面版与 web 部署（浏览器内核以宿主为准，桌面版即 web 面包内嵌）

## 性能要求

- 数据接口服务端缓存（如 token-usage 60s TTL + single-flight），client 不触发重复聚合；`?refresh=1` 类强刷必须有冷却
- `TODO: 待补充`（首屏/包体积等量化指标，自用项目暂不设硬性基线）
