## DSH 插件开发·维护·部署指南

以 `dsh-token-usage`（用量统计）为实例，覆盖静态 Cordis 插件从开发到分发的完整链路

> 适用对象：DeepSeek Harness 0.1.0-rc 系列桌面版与 web（0.1.7-rc.2 实读核对；桌面版即 web 面内嵌）
> 实例插件：设置页用量统计，host 聚合 `/token-usage/stats` 路由 + client 单页多视图 UI（时间范围筛选、指标卡、活跃热力图、按天趋势、模型用量）
> 分发通道：官方组合包（bundle）——桌面版/web 插件页「添加插件」或 `dsh plugin --profile <p> add <spec>`

## 插件的两种形态

- 动态插件：会话内 `cordis_define/cordis_run` 热挂载，进程重启即消失，适合临时扩展与实验
- 静态插件：一个 npm 风格包 + 组合（composition）里的一行，随 DSH 启动加载，持久存在，适合长期功能

> 本指南只讲静态插件；动态插件受会话审批与模型工具通道限制，且不能跨重启保留

## 插件解剖

### 目录结构

```
dsh-token-usage/
├── package.json      # 单包声明：exports + dsh.bundle + dsh.client + peerDependencies + files
├── cordis.patch.yml  # 组合包挂载行（dsh.bundle.patch 指向）
└── lib/
    ├── index.js      # host 半：ESM，export { apply, inject, name }
    └── client.js     # client 半：window.__ModuleLoader__.load 包装的浏览器 bundle
```

一个包同时承载 host 与 client 两面，`dsh.bundle.patch` 声明让它成为官方通道可安装的组合包

### package.json 契约

```json
{
  "name": "dsh-token-usage",
  "type": "module",
  "main": "lib/index.js",
  "exports": {
    ".":            { "default": "./lib/index.js" },
    "./client":     { "default": "./lib/client.js" },
    "./package.json": "./package.json"
  },
  "files": ["lib", "cordis.patch.yml", "README.md"],
  "dsh": {
    "bundle": { "patch": "./cordis.patch.yml" },
    "client": {
      "inject": ["@deepseek-ai/dsh-client-ui-settings"],
      "platform": "web"
    }
  },
  "peerDependencies": {
    "@deepseek-ai/cordis": "*",
    "@deepseek-ai/dsh-session-query": "*",
    "@deepseek-ai/dsh-host-webserver": "*",
    "react": "^18.0.0"
  }
}
```

要点

- `dsh.bundle.patch`：组合包声明，指向包内挂载 patch 文件（字符串或有序列表）；官方插件页 / `dsh plugin add` 只装组合包，无此声明 inspect 直接判 not-a-bundle
- `files`：分发白名单，npm pack 与 pnpm 本地路径 / Git 安装共用该语义；`cordis.patch.yml` 必须在列，否则装完即 not-a-bundle
- `exports["./client"]`：client-modules 用它定位浏览器 bundle，支持字符串或 `{ default }` 条件形式
- `exports["./package.json"]`：必须显式导出，`require.resolve('<name>/package.json')` 才能穿透 exports 映射
- `dsh.client.inject`：client 条目依赖的包名列表，控制实例化顺序；写实际会用到的运行时/槽位包（注意 `@deepseek-ai/dsh-client-runtime` 在 0.1.7-rc.2 已不存在，官方包 inject 均为包名列表）
- `dsh.client.platform`：必须与部署面匹配（web；桌面版即 web 面）
- `peerDependencies`：`@deepseek-ai/dsh` / `@deepseek-ai/dsh-*` 范围会被官方安装门 semver 校验（`*` 永通过，DSH 升级不断加载）；profile 层 `autoInstallPeers: false`，声明 peer 不会被自动安装，无宿主双实例

### host 半（lib/index.js）

```js
const name = "token-usage";
const inject = ["webServer", "sessionQuery"];   // 硬依赖服务，缺一个就等待不激活

function apply(ctx) {
  ctx.effect(
    () => ctx.webServer.register({ kind: "exact", path: "/token-usage/stats", handler }),
    "token-usage stats route"
  );
}

export { apply, inject, name };
```

规则

- 顶层导出 `apply / inject / name`，纯 ESM（包声明 `"type": "module"`）
- `inject` 里的服务经 `ctx.<服务名>` 直接访问；可选服务用 `ctx.get(name)` 并处理 undefined
- 一切副作用必须可逆：`ctx.effect(fn, label)` 的返回值是 disposer，卸载时自动调用；`webServer.register` 本身返回注销函数，可直接作为 effect 体
- 不允许持有跨 effect 的未清理资源（定时器、监听器等同理）

### client 半（lib/client.js）

浏览器 bundle 不经打包器转换，必须手写 CJS 风格的 ModuleLoader 包装

```js
window.__ModuleLoader__.load({
  id: "dsh-token-usage",          // 与包名一致
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    let react = require("react"); // shell 提供的静态模块，可直接 require

    function apply(ctx) {
      ctx.effect(() => {          // 样式随插件生命周期进出
        const tag = document.createElement("style");
        tag.textContent = CSS;
        document.head.appendChild(tag);
        return () => tag.remove();
      }, "styles");

      ctx.slots.inject("settings.section", () => ctx.slots.register({
        name: "settings.section",
        id: "token-usage",
        order: 90,
        label: () => "用量统计"  // 支持函数形式，运行时取 locale 文案
      }, () => react.createElement(Dashboard)));
    }

    exports.apply = apply;
    exports.inject = ["slots"];
    exports.name = "token-usage-ui";
    return module.exports;
  }
});
```

规则

- 执行 bundle 只注册 factory；真实副作用全部发生在 materialize（首次被 import）时的 factory 闭包内
- `require` 只能取已注册的模块（react、shell 静态模块、其他已加载插件）；跨插件取值导入是构建期错误，不要写
- React 组件用 `react.createElement`，无 JSX
- 槽位注册走 `ctx.slots.inject(key, () => ctx.slots.register(options, Component))`：槽位未声明时自动等待，不依赖加载顺序
- 样式只使用 `--dsw-*` 主题 token（`--dsw-alias-*` 语义别名、`--dsw-static-*` 固定色、`--dsw-font-*` 字号变量），自动适配深浅色
- locale：`ctx.get('locale').getSnapshot().active` 读当前语言，`.subscribe(fn)` 订阅切换；返回的 disposer 交给 `react.useEffect`
- 静态插件没有 `host.call`；client 取 host 数据要走 host 半注册的 HTTP 路由（本例 `fetch('/token-usage/stats')`）

### 挂载：组合包 patch（cordis.patch.yml）

包根的 `cordis.patch.yml` 是组合包挂载行，安装登记进 `dsh.profile.bundles` 后自动应用

```yaml
- insert:
    - id: token-usage
      name: dsh-token-usage
```

语义

- bundle patch 按 `dsh.profile.bundles` 列表顺序应用到空 entry 列表，之后才是 profile 自身 `cordis.patch.yml`（用户层）与启动器 `--patch` 层
- `insert` 不带 `id` → 追加到组合根列表末尾；带 `id` → 追加进某个 group 条目
- 不带 `insert` 的 patch 是覆盖：`{ id, name?, ...overrides }` 按 id 定位已有行改字段
- 匹配不到的 patch 只警告跳过，不致命；但行加载失败会导致启动失败（fail loud）
- 用户层 `~/.dsh/profiles/<profile>/cordis.patch.yml` 仍可对 bundle 行做覆盖（改 config / disabled），优先级高于 bundle patch
- desktop profile 无 live 重载（web profile 声明 `patchReload: "live"` 才即时生效），装/卸/改覆盖项后需重启

> 绝不改随发行包安装的 shipped preset（`agent-presets` 目录），升级会覆盖；也绝不对组合包手写 profile 挂载行——与 bundle 双挂载（duplicate prefix route）会导致启动失败

### 模块解析：双锚点（0.1.6-alpha 起）

官方 app-boot 的 ResolutionRouter 接管 Node 的 ESM/CJS 解析：bundle 名先解析自 dsh 安装树（运行时自带官方包），再解析自 profile 目录，profile `node_modules` 内 pnpm 管理的条目优先

1. host 侧：Loader 对裸名执行 `await import(name)`，命中 profile `node_modules/<name>`
2. client 侧：client-modules 以 profile 目录为 baseUrl `require.resolve('<name>/package.json')`，同样命中 profile `node_modules`

```
安装      pnpm add <spec>（profile 目录内）
实体      ~/.dsh/profiles/<profile>/node_modules/dsh-token-usage
声明      ~/.dsh/profiles/<profile>/package.json dependencies + dsh.profile.bundles
挂载      包内 cordis.patch.yml（dsh.bundle.patch 声明）
```

> 本地路径通道 pnpm 落 `link:` 活链接：仓库改码即 profile 内生效，更新只需重启；Git / npm 通道为快照安装，更新需插件页卸载重装
> 历史：0.1.6-alpha 前需要双符号链接（链接 A 落 profile node_modules + 链接 B 落运行树）+ `link:` 依赖声明手动挂 patch 行；该通道已随官方 bundle 分发废弃

## 开发

### 找契约的方法

不要猜 API，按此顺序取证

1. 包类型声明：`<运行树>/node_modules/@deepseek-ai/<包>/lib/types/*.d.ts`
2. 编译产物：同包 `lib/*.js` 里的真实行为（类型只说形状，产物说语义）
3. 运行时 inspect（动态插件可用）：`cordis_inspect_list/query`，本会话模型通道对 oneOf 参数有序列化缺陷，静态开发以 1、2 为准

本插件用到的关键契约

- `sessionQuery.listSessions(): Promise<SessionRecord[]>`，record 含 `header`（id/createdAt/parentSession?/seedLength?）
- `sessionQuery.readSession(id): Promise<SessionLogSnapshot>`，`{ session, events }` 全量原始日志
- 事件：`assistant/message` 的 `data.usage`（TokenUsage：`inputTokens/outputTokens` 必有，`cacheReadTokens/cacheWriteTokens/reasoningTokens` 可选，reasoning 已含在 output 内）+ `data.message.source.{provider,model}` + 事件级 `time`（epoch ms）与 `seq`
- fork 去重：子会话日志物理包含 seed 事件，`seedLength > 0` 且父会话在语料内时跳过 `seq < seedLength`
- `webServer.register(route: WebRoute): () => void`，route 为 `{ kind: 'exact'|'prefix', path, handler(req,res) }`，handler 全权负责响应

### host 开发要点

- 聚合类服务做成「缓存 + 强制刷新」：本例 60 秒 TTL，`?refresh=1` 绕过；并发扫描用固定 worker 池（8），单会话失败计数不中断整体
- 输出保持 JSON-safe 扁平结构（`{in,cr,cw,out,reason,req}` 桶），不泄漏 Cordis 活对象
- 路由响应头带 `cache-control: no-store`，错误路径也返回 JSON

### client 开发要点

- 组件状态机三态（loading/error/ready）+ 空数据态，错误信息直接展示并给重试
- 图表零图表库：柱状用纯 div 堆叠（flex-grow 按 token 数加权），折线用 SVG polyline 覆盖层（viewBox 0-100 + non-scaling-stroke），环图用 circle stroke-dasharray，热力图用 CSS grid
- 卡片/按钮/图例走 `--dsw-alias-*` 边框背景 token，系列色走 `--dsw-static-*` 固定色 token，视觉与宿主一致且适配深浅色
- 数据视图按时间范围筛选，聚合结果一次取全，前端只切片

### 本地验证（三层，不启动 DSH）

1. host 逻辑：写 mock `ctx`（effect/webServer.register 打桩）+ mock `sessionQuery`（直接 `zstd -dc` 解析磁盘 `session.jsonl.zstd` 构造），调用 `apply` 后触发 handler，断言聚合结果
2. client 渲染：mock `window.__ModuleLoader__` 捕获注册项，fake `require('react')`，调用 `apply` 验证 slots 注册与 label；再用 `react-dom/server.renderToStaticMarkup` 分别 SSR 加载态与带数据态（fixture 替换初始 state）
3. patch 接入：用启动同款代码路径验证——`dsh-app-boot` 的 `loadOptionalPatches` + `composeEntries`，确认无警告且行正确生成

```
node --check lib/client.js && node --check lib/index.js   # 语法
```

> 会话日志在 `~/.dsh/sessions/<工作区目录>/session-<uuid>/session.jsonl.zstd`，是构造 mock 数据的最佳来源

## 维护

### 排障速查

| 症状 | 定位 |
| --- | --- |
| 插件页安装失败 | 展开报错详情看 pnpm 诊断摘要；完整日志 `~/.dsh/profiles/<profile>/.plugin-manager/logs`；本地路径通道确认输入绝对路径且含 package.json / cordis.patch.yml |
| 启动报 `token-usage` 行未激活 | 插件页确认该包已启用；`inject` 的服务是否在当前组合挂载；`files` 白名单是否漏了挂载 patch |
| host 正常但设置页无条目 | client 解析（exports["./client"] 与 dsh.client 声明）；浏览器硬刷新 |
| 条目出现但一直加载 | `/token-usage/stats` 返回 500，看 `error` 字段；多为 sessionQuery 读取失败 |
| 数据为空 | 确认有带 usage 的模型请求；检查 fork 去重是否误杀（seedLength 逻辑） |
| 启动失败 duplicate prefix route | profile `cordis.patch.yml` 残留手写 token-usage 挂载行（与 bundle 双挂载），删手写行 |

### 升级

1. 本地目录通道（`link:` 活链接）：仓库改码即 profile 内生效，重启 DSH 即新版本
2. GitHub 通道：push 后在插件页「卸载 → 安装」重装
3. CLI：`dsh plugin --profile <profile> remove dsh-token-usage` 后重新 add

> client bundle 带 `?rev=<内容哈希>` 缓存戳，改 client.js 后浏览器自动取新，无需手动清缓存

### 回滚

- 临时下线：插件页关闭该包开关（依赖保留）或 profile `cordis.patch.yml` 对该行加 `disabled: true` 覆盖，重启
- 完全卸载：插件页「卸载」一键（`dsh.profile.bundles` 摘除 + pnpm remove）；安装失败时官方自动恢复 manifest / lockfile

### 约定

- 对 profile 的变更只走插件页或 `dsh plugin` CLI，不手改 `dsh.profile.bundles` 与 dependencies
- 用户层覆盖项（config / disabled）写 profile `cordis.patch.yml`，一个插件一个覆盖段并注释用途

## 部署

### 分发面

`files` 白名单即分发面：`lib`、`cordis.patch.yml`、`README.md`（package.json / LICENSE 自动包含）。验证：

```
pnpm pack --dry-run
```

### 安装（官方组合包通道）

桌面版/web 插件页「添加插件」，「包名或地址」输入：

- GitHub 仓库地址：`https://github.com/felixzhang-glitch/dsh-token-usage`
- 本地插件目录：仓库克隆的绝对路径（开发机）

或 CLI：

```
dsh plugin --profile <profile> add https://github.com/felixzhang-glitch/dsh-token-usage
dsh plugin --profile <profile> add /Users/name/dsh-token-usage
```

流程：inspect 预检（读 `dsh.bundle` 声明）→ pnpm add 装入 profile → `dsh.profile.bundles` 登记 → 包内挂载行自动生效；失败自动恢复 `package.json` 与 `pnpm-lock.yaml`

### 目标机要求

- DSH 0.1.0-rc 系列桌面版或 web，profile 已初始化（存在 `~/.dsh/profiles/<profile>/`）
- GitHub 通道需网络可达（GitHub 直连或先 `git ls-remote` 通过）；本地路径通道离线可用
- 安装后重启 DSH（desktop profile 无 live 重载）

### 已知限制

- npm 通道不可用：`dsh-token-usage` 包名已被第三方同名包（Tastelessor/dsh-usage-stats）占用，对话框输裸包名装到的是别人的插件
- `peerDependencies` 用 `*` 永过安装门：DSH 大版本破坏性升级不会拦截安装，靠启动失败 / 运行异常暴露，升级后须实机验证
- 本地路径通道落 `link:`：目标机移动仓库目录会断链，插件页重装即可

### 兼容性声明

- 依赖契约：`sessionQuery.listSessions/readSession`、`webServer.register`、`settings.section` 槽位、`--dsw-*` token、ModuleLoader 包装格式
- 验证版本：DSH 0.1.7-rc.2（桌面版）/ 0.1.6-alpha.2（web）；跨版本升级后先跑本地验证三层再发布

## 附录：文件清单

| 路径 | 作用 |
| --- | --- |
| `~/.dsh/profiles/<profile>/node_modules/dsh-token-usage` | 插件实体（本地路径通道为 `link:` 活链接） |
| `~/.dsh/profiles/<profile>/package.json` | profile 清单：dependencies 依赖 + `dsh.profile.bundles` 登记 |
| `~/.dsh/profiles/<profile>/pnpm-workspace.yaml` | 官方初始化的 pnpm 约束（autoInstallPeers: false / nodeLinker: hoisted） |
| `~/.dsh/profiles/<profile>/.plugin-manager/logs` | 安装诊断日志 |
| 包内 `cordis.patch.yml` | 组合包挂载行（`dsh.bundle.patch` 声明） |
| `~/.dsh/sessions/**/session.jsonl.zstd` | 数据源（只读） |
