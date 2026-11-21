window.__ModuleLoader__.load({
	id: "dsh-token-usage",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		//#region styles
		/*
		 * One flat stylesheet, no framework. Colours come from --dsw-* theme
		 * tokens only, so light/dark follows the host. Scale: hairline =
		 * border-l1, rule = border-l2, ink = label primary/secondary/caption,
		 * accent = state-business.
		 */
		const CSS = [
			".tu{--tu-r:14px;--tu-surface:var(--dsw-alias-bg-layer-1);--tu-hair:var(--dsw-alias-border-l1);--tu-rule:var(--dsw-alias-border-l2);--tu-ink:var(--dsw-alias-label-primary);--tu-ink2:var(--dsw-alias-label-secondary);--tu-ink3:var(--dsw-alias-label-caption);--tu-accent:var(--dsw-alias-state-business-primary);--tu-good:var(--dsw-alias-state-success-primary);--tu-bad:var(--dsw-alias-state-error-primary);--tu-warn:var(--dsw-alias-state-warn-primary);--tu-alt:var(--dsw-alias-state-done-primary);box-sizing:border-box;display:flex;flex-direction:column;gap:12px;font:var(--dsw-font-xs-13);color:var(--tu-ink);padding:2px 0 16px;min-width:0}",
			".tu *{box-sizing:border-box}",
			".tu-num{font-variant-numeric:tabular-nums;font-feature-settings:'tnum' 1}",
			".tu-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap}",
			".tu-h1{font-size:15px;line-height:22px;font-weight:600;letter-spacing:.01em}",
			".tu-meta{display:flex;flex-wrap:wrap;align-items:center;color:var(--tu-ink3);font:var(--dsw-font-xxs-12);margin-top:3px;row-gap:2px}",
			".tu-meta>i{width:1px;height:9px;background:var(--tu-rule);margin:0 8px;flex:none}",
			".tu-meta b{font-weight:500;color:var(--tu-ink2)}",
			".tu-actions{display:flex;align-items:center;gap:8px;flex:none}",
			".tu-btn{display:inline-flex;align-items:center;gap:6px;cursor:pointer;border:1px solid var(--tu-rule);background:var(--tu-surface);color:var(--tu-ink);border-radius:9px;padding:5px 11px;font:var(--dsw-font-xxs-12);line-height:16px;transition:background .12s}",
			".tu-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}",
			".tu-btn:disabled{opacity:.55;cursor:default}",
			".tu-btn:focus-visible{outline:2px solid var(--tu-accent);outline-offset:1px}",
			".tu-spin{display:inline-block;width:11px;height:11px;border:1.5px solid currentColor;border-right-color:transparent;border-radius:50%;animation:tu-spin .7s linear infinite}",
			"@keyframes tu-spin{to{transform:rotate(360deg)}}",
			".tu-seg{display:inline-flex;align-items:center;gap:2px;padding:2px;border-radius:10px;background:color-mix(in srgb,var(--tu-ink) 5%,transparent);border:1px solid var(--tu-hair);flex-wrap:wrap}",
			".tu-segBtn{cursor:pointer;border:none;background:transparent;color:var(--tu-ink2);border-radius:8px;padding:4px 10px;font:var(--dsw-font-xxs-12);line-height:16px;white-space:nowrap;transition:color .12s,background .12s}",
			".tu-segBtn:hover{color:var(--tu-ink)}",
			".tu-segBtn:focus-visible{outline:2px solid var(--tu-accent);outline-offset:0}",
			".tu-segBtn[data-on='1']{background:var(--dsw-alias-bg-layer-3);color:var(--tu-ink);font-weight:600;box-shadow:0 1px 2px rgba(0,0,0,.09),0 0 0 .5px var(--tu-rule)}",
			".tu-segBtn[data-on='0']:hover{background:color-mix(in srgb,var(--tu-ink) 4%,transparent)}",
			".tu-controls{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}",
			".tu-controlRight{display:flex;align-items:center;gap:6px;color:var(--tu-ink3);font:var(--dsw-font-xxs-12);flex-wrap:wrap}",
			".tu-dateIn{-webkit-appearance:none;appearance:none;border:1px solid var(--tu-rule);background:var(--tu-surface);color:var(--tu-ink);border-radius:8px;padding:3px 7px;font:var(--dsw-font-xxs-12);color-scheme:light dark}",
			".tu-dateIn:focus-visible{outline:2px solid var(--tu-accent);outline-offset:1px}",
			".tu-card{display:flex;flex-direction:column;min-width:0;border:1px solid var(--tu-hair);border-radius:var(--tu-r);background:var(--tu-surface);overflow:hidden}",
			".tu-cardHead{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;padding:10px 14px;border-bottom:1px solid var(--tu-hair);min-height:40px}",
			".tu-cardTitle{display:flex;align-items:center;gap:8px;font-size:13px;line-height:18px;font-weight:600;letter-spacing:.01em;min-width:0}",
			".tu-cardTitle:before{content:'';width:3px;height:11px;border-radius:2px;background:var(--tu-accent);opacity:.85;flex:none}",
			".tu-cardHint{color:var(--tu-ink3);font:var(--dsw-font-xxs-12);font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:420px}",
			".tu-cardBody{padding:12px 14px;display:flex;flex-direction:column;gap:12px;min-width:0}",
			".tu-cardBodyFlush{padding:0}",
			".tu-grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:12px;align-items:start}",
			".tu-rail{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--tu-hair);border:1px solid var(--tu-hair);border-radius:var(--tu-r);overflow:hidden}",
			".tu-car{background:var(--tu-surface);padding:10px 13px 11px;display:flex;flex-direction:column;gap:2px;min-width:0}",
			".tu-carLabel{font:var(--dsw-font-xxxs-11);letter-spacing:.07em;color:var(--tu-ink3);text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
			".tu-carValue{display:flex;align-items:baseline;gap:5px;min-width:0}",
			".tu-carNum{font-size:19px;line-height:26px;font-weight:600;letter-spacing:-.015em;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
			".tu-carUnit{font-size:11px;line-height:16px;color:var(--tu-ink3);font-weight:400;flex:none}",
			".tu-carFoot{display:flex;align-items:center;gap:6px;font:var(--dsw-font-xxxs-11);color:var(--tu-ink3);min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-height:14px}",
			".tu-delta{display:inline-flex;align-items:center;gap:2px;font-variant-numeric:tabular-nums;flex:none}",
			".tu-deltaUp{color:var(--tu-good)}",
			".tu-deltaDown{color:var(--tu-bad)}",
			".tu-stack{display:flex;height:10px;border-radius:5px;overflow:hidden;background:var(--tu-hair);gap:1px}",
			".tu-stackTall{height:14px;border-radius:7px}",
			".tu-stackSeg{flex-shrink:1;flex-basis:0;min-width:0;height:100%}",
			".tu-legend{display:flex;flex-wrap:wrap;gap:6px 16px;color:var(--tu-ink2);font:var(--dsw-font-xxs-12)}",
			".tu-legendItem{display:inline-flex;align-items:center;gap:6px;white-space:nowrap;min-width:0}",
			".tu-legendItem i{width:8px;height:8px;border-radius:2px;flex:none}",
			".tu-legendVal{color:var(--tu-ink2);font-variant-numeric:tabular-nums}",
			".tu-legendShare{color:var(--tu-ink3);font-variant-numeric:tabular-nums}",
			".tu-chart{position:relative;display:flex;gap:6px;min-width:0}",
			".tu-axisY{display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;width:58px;white-space:nowrap;flex:none;color:var(--tu-ink3);font:var(--dsw-font-xxxs-11);font-variant-numeric:tabular-nums;padding-bottom:18px;text-align:right}",
			".tu-axisY2{display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;width:36px;flex:none;color:var(--tu-ink3);font:var(--dsw-font-xxxs-11);font-variant-numeric:tabular-nums;padding-bottom:18px}",
			".tu-plot{position:relative;flex:1;min-width:0}",
			".tu-plotArea{position:relative;overflow:visible}",
			".tu-grid{position:absolute;left:0;right:0;height:1px;background:var(--tu-hair)}",
			".tu-gridBase{background:var(--tu-rule)}",
			".tu-cols{position:absolute;inset:0;display:flex;align-items:flex-end;gap:3px}",
			".tu-col{flex:1 1 0;min-width:2px;height:100%;display:flex;flex-direction:column;justify-content:flex-end;position:relative}",
			".tu-colStack{display:flex;flex-direction:column;border-radius:3px 3px 0 0;overflow:hidden;transition:filter .12s}",
			".tu-colSeg{flex-shrink:1;flex-basis:0;min-height:0}",
			".tu-col:hover .tu-colStack{filter:brightness(1.06) saturate(1.04)}",
			".tu-colActive .tu-colStack{filter:brightness(1.12) saturate(1.06)}",
			".tu-line{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible}",
			".tu-xAxis{display:flex;gap:3px;margin-top:5px;height:13px}",
			".tu-xCell{flex:1 1 0;min-width:2px;font:var(--dsw-font-xxxs-11);color:var(--tu-ink3);white-space:nowrap;font-variant-numeric:tabular-nums}",
			".tu-tip{position:absolute;z-index:6;pointer-events:none;min-width:140px;max-width:260px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--tu-rule);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.14);padding:8px 10px;font:var(--dsw-font-xxs-12);color:var(--tu-ink)}",
			".tu-tipHead{font-size:11px;line-height:15px;color:var(--tu-ink3);margin-bottom:5px;font-variant-numeric:tabular-nums}",
			".tu-tipRow{display:flex;align-items:center;gap:6px;line-height:17px;white-space:nowrap}",
			".tu-tipRow i{width:7px;height:7px;border-radius:2px;flex:none}",
			".tu-tipRow span{flex:1;color:var(--tu-ink2);overflow:hidden;text-overflow:ellipsis;max-width:170px}",
			".tu-tipRow b{font-weight:600;font-variant-numeric:tabular-nums}",
			".tu-heatScroll{overflow-x:auto;overflow-y:hidden;padding-bottom:2px;scrollbar-width:thin}",
			".tu-heat{display:flex;gap:3px}",
			".tu-heatDays{display:grid;grid-template-rows:repeat(7,var(--tu-cell,12px));gap:3px;flex:none}",
			".tu-heatDayLabel{font:var(--dsw-font-xxxs-11);line-height:var(--tu-cell,12px);color:var(--tu-ink3)}",
			".tu-heatCols{display:flex;gap:3px}",
			".tu-heatCol{display:grid;grid-template-rows:repeat(7,var(--tu-cell,12px));gap:3px}",
			".tu-heatCell{width:var(--tu-cell,12px);height:var(--tu-cell,12px);border-radius:2.5px;background:var(--tu-hair);outline:1px solid transparent;transition:outline-color .12s}",
			".tu-heatCell:hover{outline-color:var(--tu-ink3)}",
			".tu-heatToday{outline-color:var(--tu-ink3);outline-offset:-1px}",
			".tu-heatMonths{display:flex;gap:3px;margin-bottom:3px;height:13px}",
			".tu-heatMonth{font:var(--dsw-font-xxxs-11);color:var(--tu-ink3);white-space:nowrap}",
			".tu-heatWrap{display:flex;gap:14px;align-items:flex-start}",
".tu-heatMain{flex:1;min-width:0}",
".tu-heatStats{flex:none;display:flex;flex-direction:column;gap:9px;padding-left:14px;border-left:1px solid var(--tu-hair);min-width:120px}",
".tu-tdFoot{position:sticky;bottom:0;border-top:1px solid var(--tu-rule);border-bottom:none;background:var(--tu-surface);font-weight:600;box-shadow:0 -1px 0 var(--tu-hair)}",
".tu-heatFoot{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;color:var(--tu-ink3);font:var(--dsw-font-xxxs-11)}",
			".tu-heatLegend{display:flex;align-items:center;gap:3px}",
			".tu-heatLegend .tu-heatCell{width:10px;height:10px;border-radius:2px}",
			".tu-scroll{overflow:auto;max-height:430px;scrollbar-width:thin}",
			".tu-table{width:100%;border-collapse:separate;border-spacing:0;font:var(--dsw-font-xxs-12)}",
			".tu-th{position:sticky;top:0;z-index:1;background:var(--tu-surface);text-align:left;color:var(--tu-ink3);font-weight:400;padding:6px 10px;border-bottom:1px solid var(--tu-rule);white-space:nowrap}",
			".tu-thNum{text-align:right}",
			".tu-sort{display:inline-flex;align-items:center;gap:3px;cursor:pointer;border:none;background:transparent;color:inherit;font:inherit;padding:0}",
			".tu-sort:hover{color:var(--tu-ink)}",
			".tu-sort[data-on='1']{color:var(--tu-ink);font-weight:600}",
			".tu-td{padding:6px 10px;border-bottom:1px solid var(--tu-hair);vertical-align:middle;white-space:nowrap;font-variant-numeric:tabular-nums}",
			".tu-tdNum{text-align:right}",
			".tu-tr:hover .tu-td{background:color-mix(in srgb,var(--tu-ink) 3%,transparent)}",
			".tu-tr:last-child .tu-td{border-bottom:none}",
			".tu-cellStack{display:flex;flex-direction:column;gap:1px;min-width:0;max-width:340px}",
			".tu-cellName{overflow:hidden;text-overflow:ellipsis;color:var(--tu-ink)}",
			".tu-cellSub{color:var(--tu-ink3);font:var(--dsw-font-xxxs-11);overflow:hidden;text-overflow:ellipsis}",
			".tu-share{display:flex;flex-direction:column;align-items:flex-end;gap:3px}",
			".tu-shareBar{width:52px;height:3px;border-radius:2px;background:var(--tu-hair);overflow:hidden}",
			".tu-shareFill{height:100%;border-radius:2px;background:var(--tu-accent)}",
			".tu-chip{display:inline-flex;align-items:center;gap:4px;padding:0 6px;border-radius:5px;font:var(--dsw-font-xxxs-11);line-height:16px;background:color-mix(in srgb,var(--tu-ink) 6%,transparent);color:var(--tu-ink2);white-space:nowrap}",
			".tu-chip i{width:6px;height:6px;border-radius:1.5px;flex:none}",
			".tu-bad{color:var(--tu-bad)}",
			".tu-good{color:var(--tu-good)}",
			".tu-muted{color:var(--tu-ink3)}",
			".tu-cmp{display:grid;grid-template-columns:minmax(112px,168px) minmax(0,1fr) minmax(0,1fr) 56px;gap:7px 14px;align-items:center}",
			".tu-cmpHead{font:var(--dsw-font-xxxs-11);letter-spacing:.06em;text-transform:uppercase;color:var(--tu-ink3);display:flex;align-items:center;gap:5px}",
			".tu-cmpLabel{color:var(--tu-ink2);font:var(--dsw-font-xxs-12);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
			".tu-cmpCell{display:flex;flex-direction:column;gap:3px;min-width:0}",
			".tu-cmpVal{font-variant-numeric:tabular-nums;text-align:right;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
			".tu-cmpBar{height:4px;border-radius:2px;background:var(--tu-hair);overflow:hidden}",
			".tu-cmpFill{height:100%;border-radius:2px}",
			".tu-cmpShare{text-align:right;color:var(--tu-ink3);font-variant-numeric:tabular-nums;font:var(--dsw-font-xxxs-11)}",
			".tu-input{-webkit-appearance:none;appearance:none;border:1px solid var(--tu-rule);background:var(--tu-surface);color:var(--tu-ink);border-radius:8px;padding:4px 8px;font:var(--dsw-font-xxs-12);min-width:138px;color-scheme:light dark}",
			".tu-input:focus-visible{outline:2px solid var(--tu-accent);outline-offset:1px}",
			".tu-input::placeholder{color:var(--tu-ink3)}",
			".tu-toolRow{display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:flex-end}",
			".tu-empty{padding:22px 0;color:var(--tu-ink3);text-align:center;font:var(--dsw-font-xxs-12)}",
			".tu-state{color:var(--tu-ink2);padding:40px 0;text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;font:var(--dsw-font-xxs-12)}",
			".tu-skel{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--tu-hair);border:1px solid var(--tu-hair);border-radius:var(--tu-r);overflow:hidden}",
			".tu-skelCell{height:66px;background:var(--tu-surface);position:relative;overflow:hidden}",
			".tu-skelCell:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,var(--dsw-alias-bg-skeleton),transparent);animation:tu-shimmer 1.4s linear infinite}",
			"@keyframes tu-shimmer{from{transform:translateX(-100%)}to{transform:translateX(100%)}}",
			".tu-kv{display:flex;flex-direction:column;gap:1px;min-width:0}",
			".tu-kvKey{font:var(--dsw-font-xxxs-11);color:var(--tu-ink3);letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
			".tu-kvVal{font-variant-numeric:tabular-nums;font-weight:500}",
			".tu-none{color:var(--tu-ink3)}",
			"@media (max-width:860px){.tu-rail,.tu-skel{grid-template-columns:repeat(2,minmax(0,1fr))}.tu-cmp{grid-template-columns:minmax(78px,1fr) minmax(0,1.3fr) minmax(0,1.3fr) 44px}}",
			"@media (prefers-reduced-motion:reduce){.tu-spin,.tu-skelCell:after{animation:none}}"
		].join("\n");
		//#endregion
		const DICT = {
			zh: {
				nav: "用量统计", title: "用量统计",
				loading: "正在聚合全部会话的模型与工具用量…", error: "统计失败", retry: "重试",
				refresh: "刷新", refreshing: "刷新中", empty: "所选范围内没有数据",
				sessionsUnit: "会话", failedUnit: "读取失败", scanLabel: "扫描", updatedLabel: "更新于",
				range7: "7 天", range14: "14 天", range30: "30 天", range90: "90 天", rangeAll: "全部", rangeCustom: "自定义",
				rangeSpan: "所选区间", daysWithData: "天有数据", daysUnit: "天", deltaNew: "新增", perReq: "每次",
				tabOverview: "总览", tabTools: "工具", tabSessions: "会话", tabModels: "模型",
				vsPrev: "较前一期", vsPrevDays: "较前 N 天", noBaseline: "上一周期无数据",
				mTokens: "Tokens 总量", mRequests: "请求数", mTurns: "完成轮次", mSessions: "会话数",
				mActiveDays: "活跃天数", mTools: "工具调用", mToolErr: "工具错误率", mCache: "缓存命中率",
				mTopModel: "最常用模型", mAvgTokReq: "平均 Tokens / 请求", mAvgTokSession: "平均 Tokens / 会话",
				mSteps: "步数", mToolLatency: "平均工具耗时", mToolKinds: "工具种类", mSkillCalls: "技能调用",
				mMcpCalls: "MCP 调用", mMainSub: "主 / 子会话", mAvgTurns: "平均轮次 / 会话",
				mAvgTools: "平均工具调用 / 会话", mUserMsgs: "用户消息", mAsstMsgs: "助手消息",
				mTurnOk: "轮次成功率", mModels: "模型数", mTopShare: "头部模型占比", mMainShare: "主会话 Tokens",
				mSubShare: "子会话 Tokens", mPeakDay: "峰值日", mStreak: "连续活跃", mReqPerDay: "日均请求",
				cardTokenMix: "Token 构成", cardTokenMixHint: "provider 上报口径",
				mixIn: "输入", mixCacheRead: "缓存读", mixCacheWrite: "缓存写", mixOutput: "输出", mixReason: "推理",
				weekMon: "周一", weekWed: "周三", weekFri: "周五",
				cardRuntime: "运行指标", mAvgLlm: "平均模型耗时 / 轮", colLastActive: "最近活动", heatHint: "全量历史",
				cardHeat: "活跃热力图", heatTokens: "Tokens", heatTools: "工具", heatSessions: "会话",
				heatLess: "少", heatMore: "多", heatSpan180: "180 天", heatSpan365: "1 年",
				heatStreak: "连续活跃", heatStreakUnit: "天", heatPeak: "峰值",
				cardTrend: "Tokens 日趋势", legendCache: "缓存命中率", legendOther: "其他", groupByModel: "按模型分层",
				cardDayTable: "每日明细", colDate: "日期", colTokens: "Tokens", colIn: "输入", colCacheRead: "缓存读",
				colCacheWrite: "缓存写", colOut: "输出", colReq: "请求", colTurns: "轮次", colTools: "工具",
				colSessions: "会话", colModel: "模型", colCategory: "分类", colCalls: "调用", colErrRate: "错误率",
				colSkill: "技能", colServer: "MCP 服务", colToolKinds: "工具数", colWorkspace: "工作区", colSession: "会话",
				mInputTotal: "输入合计",
				colAvg: "平均耗时", colShare: "占比", colRequests: "请求", colInput: "输入", colOutput: "输出",
				colAvgReq: "每请求", colCache: "缓存命中", colDepth: "深度", colErrors: "错误",
				cardTools: "工具构成", cardToolTrend: "工具调用趋势", cardTopTools: "调用最多的工具",
				cardSkills: "技能调用", cardMcp: "MCP 服务", toolSearch: "搜索工具名", toolNoData: "所选范围内没有工具调用",
				toolsUnit: "种", callsUnit: "次",
				compareTitle: "主 Agent 对比子 Agent", compareMain: "主", compareSub: "子",
				compareSessions: "新建会话", compareTokens: "Tokens", compareToolCalls: "工具调用",
				compareTurns: "完成轮次", compareAvgTokens: "平均 Tokens / 会话", compareAvgTools: "平均工具调用 / 会话",
				compareAvgActive: "平均活跃耗时 / 会话", compareSuccess: "成功率", compareSubSources: "子 Agent 来源",
				compareSubCalls: "调用方式", compareNoSub: "所选范围内没有子 Agent", compareShare: "子占比",
				cardSessionTrend: "每日会话", sessionStarted: "新建", sessionActive: "活跃",
				cardSplitTrend: "每日主 / 子 Tokens", cardOutcome: "轮次结果", turnOk: "完成", turnErr: "失败",
				turnAbort: "中止", turnInterrupt: "中断", noOutcome: "没有轮次结果", cardWorkspace: "工作区分布",
				sessionTable: "会话明细", sessionNoData: "所选范围内没有会话", sessionSearch: "搜索标题 / 工作区 / 模型",
				depthUnit: "层", sessionsUnitShort: "个",
				subagent: "子会话", sortRecent: "最近", sortTokens: "Tokens", sortTools: "工具", sortTurns: "轮次",
				truncatedRows: "明细仅保留最近 1000 个会话", filterAll: "全部", filterMain: "主", filterSub: "子",
				kindMain: "主", kindSub: "子", kindTeam: "子·团队", kindWorkflow: "子·Workflow",
				catMcp: "MCP", catSkill: "技能", catCli: "CLI", catFile: "文件", catWeb: "网络", catAgent: "Agent",
				catSession: "会话", catOther: "其他",
				errorsShort: "错误", toolsShort: "工具", modelsUnit: "个模型", reqUnit: "次",
				cardModelMix: "模型用量", cardModelMixHint: "按 Tokens 占比", cardModelTable: "模型 Token 构成",
				cardModelTrend: "模型 Tokens 趋势", modelNoData: "所选范围内没有模型用量",
				totalLabel: "合计", shareOfTotal: "占总量"
			},
			en: {
				nav: "Usage Stats", title: "Usage Stats",
				loading: "Aggregating model and tool usage across all sessions…", error: "Aggregation failed", retry: "Retry",
				refresh: "Refresh", refreshing: "Refreshing", empty: "No data in the selected range",
				sessionsUnit: "sessions", failedUnit: "failed", scanLabel: "scan", updatedLabel: "updated",
				range7: "7d", range14: "14d", range30: "30d", range90: "90d", rangeAll: "All", rangeCustom: "Custom",
				rangeSpan: "Range", daysWithData: "days with data", daysUnit: "days", deltaNew: "new", perReq: "each",
				tabOverview: "Overview", tabTools: "Tools", tabSessions: "Sessions", tabModels: "Models",
				vsPrev: "vs prev", vsPrevDays: "vs prev N days", noBaseline: "no prior period",
				mTokens: "Tokens used", mRequests: "Requests", mTurns: "Completed turns", mSessions: "Sessions",
				mActiveDays: "Active days", mTools: "Tool calls", mToolErr: "Tool error rate", mCache: "Cache hit rate",
				mTopModel: "Top model", mAvgTokReq: "Tokens / request", mAvgTokSession: "Tokens / session",
				mSteps: "Steps", mToolLatency: "Tool latency", mToolKinds: "Tool kinds", mSkillCalls: "Skill calls",
				mMcpCalls: "MCP calls", mMainSub: "Main / sub", mAvgTurns: "Turns / session",
				mAvgTools: "Tool calls / session", mUserMsgs: "User msgs", mAsstMsgs: "Assistant msgs",
				mTurnOk: "Turn success", mModels: "Models", mTopShare: "Top model share", mMainShare: "Main tokens",
				mSubShare: "Sub tokens", mPeakDay: "Peak day", mStreak: "Streak", mReqPerDay: "Requests / day",
				cardTokenMix: "Token mix", cardTokenMixHint: "provider-reported",
				mixIn: "Input", mixCacheRead: "Cache read", mixCacheWrite: "Cache write", mixOutput: "Output", mixReason: "Reasoning",
				weekMon: "Mon", weekWed: "Wed", weekFri: "Fri",
				cardRuntime: "Runtime", mAvgLlm: "Model ms / turn", colLastActive: "Last active", heatHint: "full history",
				cardHeat: "Activity heatmap", heatTokens: "Tokens", heatTools: "Tools", heatSessions: "Sessions",
				heatLess: "Less", heatMore: "More", heatSpan180: "180d", heatSpan365: "1y",
				heatStreak: "Active streak", heatStreakUnit: "d", heatPeak: "Peak",
				cardTrend: "Daily token trend", legendCache: "Cache hit rate", legendOther: "Other", groupByModel: "Stack by model",
				cardDayTable: "Daily detail", colDate: "Date", colTokens: "Tokens", colIn: "In", colCacheRead: "Cache R",
				colCacheWrite: "Cache W", colOut: "Out", colReq: "Req", colTurns: "Turns", colTools: "Tools",
				colSessions: "Sessions", colModel: "Model", colCategory: "Category", colCalls: "Calls", colErrRate: "Error rate",
				colSkill: "Skill", colServer: "MCP server", colToolKinds: "Tools", colWorkspace: "Workspace", colSession: "Session",
				mInputTotal: "Input total",
				colAvg: "Avg latency", colShare: "Share", colRequests: "Req", colInput: "In", colOutput: "Out",
				colAvgReq: "Per req", colCache: "Cache", colDepth: "Depth", colErrors: "Err",
				cardTools: "Tool mix", cardToolTrend: "Tool call trend", cardTopTools: "Busiest tools",
				cardSkills: "Skill calls", cardMcp: "MCP servers", toolSearch: "Search tools", toolNoData: "No tool calls in the selected range",
				toolsUnit: "kinds", callsUnit: "calls",
				compareTitle: "Main agent vs sub agents", compareMain: "Main", compareSub: "Sub",
				compareSessions: "New sessions", compareTokens: "Tokens", compareToolCalls: "Tool calls",
				compareTurns: "Completed turns", compareAvgTokens: "Tokens / session", compareAvgTools: "Tool calls / session",
				compareAvgActive: "Active time / session", compareSuccess: "Success rate", compareSubSources: "Sub sources",
				compareSubCalls: "Invocations", compareNoSub: "No sub agents in the selected range", compareShare: "Sub share",
				cardSessionTrend: "Daily sessions", sessionStarted: "Started", sessionActive: "Active",
				cardSplitTrend: "Daily main vs sub tokens", cardOutcome: "Turn outcomes", turnOk: "Done", turnErr: "Failed",
				turnAbort: "Aborted", turnInterrupt: "Interrupted", noOutcome: "No turn outcomes", cardWorkspace: "Workspaces",
				sessionTable: "Session detail", sessionNoData: "No sessions in the selected range", sessionSearch: "Search title / workspace / model",
				depthUnit: "lvl", sessionsUnitShort: "sessions",
				subagent: "Subagent", sortRecent: "Recent", sortTokens: "Tokens", sortTools: "Tools", sortTurns: "Turns",
				truncatedRows: "Detail capped at the newest 1000 sessions", filterAll: "All", filterMain: "Main", filterSub: "Sub",
				kindMain: "Main", kindSub: "Sub", kindTeam: "Sub·team", kindWorkflow: "Sub·workflow",
				catMcp: "MCP", catSkill: "Skill", catCli: "CLI", catFile: "File", catWeb: "Web", catAgent: "Agent",
				catSession: "Session", catOther: "Other",
				errorsShort: "errors", toolsShort: "tools", modelsUnit: "models", reqUnit: "req",
				cardModelMix: "Model usage", cardModelMixHint: "share of tokens", cardModelTable: "Model token mix",
				cardModelTrend: "Model token trend", modelNoData: "No model usage in the selected range",
				totalLabel: "Total", shareOfTotal: "of total"
			}
		};
		const C = {
			accent: "var(--dsw-static-deepseek-500)",
			alt: "var(--dsw-static-violet-400)",
			warn: "var(--dsw-static-amber-500)",
			good: "var(--dsw-static-green-500)",
			bad: "var(--dsw-static-red-400)",
			idle: "var(--dsw-static-neutral-300)"
		};
		/*
		 * Series palette: six distinguishable hues that stay apart in both
		 * themes. Order matters — the first three carry most of the volume.
		 */
		const SERIES = [C.accent, C.warn, C.good, C.alt, C.bad];
		const OTHER_COLOR = "var(--dsw-static-neutral-300)";
		const CATEGORY_COLORS = {
			cli: C.accent, file: C.good, mcp: C.alt, skill: C.warn,
			web: "var(--dsw-static-deepseek-300)", agent: C.bad,
			session: "var(--dsw-static-neutral-bluish-400)", other: C.idle
		};
		const MAIN_COLOR = C.accent;
		const SUB_COLOR = C.warn;
		const TEAM_COLOR = C.good;
		const WORKFLOW_COLOR = C.alt;
		//#endregion
		//#region plugin
		const name = "token-usage-ui";
		const inject = ["slots"];
		function apply(ctx) {
			const h = react.createElement;
			ctx.effect(() => {
				const tag = document.createElement("style");
				tag.textContent = "\n" + CSS;
				document.head.appendChild(tag);
				return () => tag.remove();
			}, "token-usage dashboard styles");
			const isZh = () => {
				try {
					const locale = ctx.get("locale");
					if (locale !== undefined && typeof locale.getSnapshot === "function") {
						return String(locale.getSnapshot().active).toLowerCase().indexOf("zh") === 0;
					}
				} catch (error) { /* fall back to zh */ }
				return true;
			};
			const pick = () => isZh() ? DICT.zh : DICT.en;
			//#region formatting
			const pad2 = (v) => String(v).padStart(2, "0");
			const dateStr = (d) => d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
			const parseStr = (s) => { const p = s.split("-"); return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])); };
			const shiftDays = (s, n) => { const d = parseStr(s); d.setDate(d.getDate() + n); return dateStr(d); };
			const seqDays = (from, to) => {
				const out = [];
				let cur = from;
				while (cur <= to && out.length < 1200) { out.push(cur); cur = shiftDays(cur, 1); }
				return out;
			};
			const int = (v) => Number(v || 0).toLocaleString("en-US");
			/*
			 * Magnitude formatter. Chinese: 万 at 1e4, 亿 at 1e8, always with one
			 * decimal (the user reads 4.5亿 at a glance). English: K / M / B.
			 * Tier promotion keeps 9,999.9万 from appearing — it rolls to 1.0亿.
			 */
			const scaled = (v, base) => (v / base).toFixed(1);
			const compact = (value) => {
				const v = Number(value);
				if (!Number.isFinite(v)) return "—";
				const sign = v < 0 ? "-" : "";
				const n = Math.abs(v);
				if (n < 1e4) return sign + int(n);
				if (isZh()) {
					if (n >= 1e8) {
						if (Number(scaled(n, 1e8)) >= 10000) return sign + "1.0万亿";
						return sign + scaled(n, 1e8) + "亿";
					}
					if (Number(scaled(n, 1e4)) >= 10000) return sign + scaled(n, 1e8) + "亿";
					return sign + scaled(n, 1e4) + "万";
				}
				if (n >= 1e9) {
					if (Number(scaled(n, 1e9)) >= 1000) return sign + scaled(n, 1e12) + "T";
					return sign + scaled(n, 1e9) + "B";
				}
				if (n >= 1e6) {
					if (Number(scaled(n, 1e6)) >= 1000) return sign + scaled(n, 1e9) + "B";
					return sign + scaled(n, 1e6) + "M";
				}
				if (Number(scaled(n, 1e3)) >= 1000) return sign + scaled(n, 1e6) + "M";
				return sign + scaled(n, 1e3) + "K";
			};
			/*
			 * Axis ticks share one unit across the whole scale (0, 0.5亿, 1.0亿…)
			 * instead of switching tier per tick, which makes a ramp unreadable.
			 */
			const axisOf = (max) => {
				if (!Number.isFinite(max) || max <= 0) return (value) => int(value);
				const scaledTick = (divisor, suffix, digits) => (value) => value === 0
					? "0"
					: (value / divisor).toFixed(digits) + suffix;
				if (isZh()) {
					if (max >= 1e8) return scaledTick(1e8, "亿", 1);
					if (max >= 1e4) return (value) => value === 0 ? "0" : Math.round(value / 1e4) + "万";
					return (value) => int(value);
				}
				if (max >= 1e9) return scaledTick(1e9, "B", 1);
				if (max >= 1e6) return scaledTick(1e6, "M", 1);
				if (max >= 1e4) return (value) => value === 0 ? "0" : Math.round(value / 1e3) + "K";
				return (value) => int(value);
			};
			const pct = (value, digits) => Number.isFinite(value) ? (value * 100).toFixed(digits === undefined ? 1 : digits) + "%" : "—";
			const fixed1 = (value) => Number.isFinite(value) ? Number(value).toFixed(1) : "—";
			const duration = (ms) => {
				if (!Number.isFinite(ms) || ms <= 0) return "—";
				if (ms < 1000) return Math.round(ms) + " ms";
				if (ms < 60000) return (ms / 1000).toFixed(1) + " s";
				if (ms < 3600000) return (ms / 60000).toFixed(1) + " min";
				return (ms / 3600000).toFixed(1) + " h";
			};
			const clockOf = (ts) => {
				if (!ts) return "—";
				const d = new Date(ts);
				return pad2(d.getHours()) + ":" + pad2(d.getMinutes());
			};
			const dayLabel = (d) => d.length >= 10 ? d.slice(5).replace("-", "/") : d;
			const shortCwd = (p) => {
				if (!p) return "—";
				const parts = String(p).replace(/\/+$/, "").split("/");
				return parts[parts.length - 1] || p;
			};
			const totalOf = (row) => (row.in || 0) + (row.cr || 0) + (row.cw || 0) + (row.out || 0);
			const cacheRate = (row) => { const d = (row.in || 0) + (row.cr || 0); return d > 0 ? (row.cr || 0) / d : 0; };
			const ratio = (a, b) => b > 0 ? a / b : 0;
			const deltaOf = (cur, prev) => {
				if (!Number.isFinite(cur) || !Number.isFinite(prev)) return null;
				if (prev <= 0) return cur > 0 ? { dir: "new", text: "new" } : null;
				const change = (cur - prev) / prev;
				if (Math.abs(change) < 0.0005) return { dir: "flat", text: "0.0%" };
				return { dir: change > 0 ? "up" : "down", text: (change > 0 ? "+" : "") + (change * 100).toFixed(1) + "%" };
			};
			const categoryColor = (c) => CATEGORY_COLORS[c] || C.idle;
			const categoryLabel = (c) => {
				const t = pick();
				const map = { mcp: t.catMcp, skill: t.catSkill, cli: t.catCli, file: t.catFile, web: t.catWeb, agent: t.catAgent, session: t.catSession, other: t.catOther };
				return map[c] || c;
			};
			const mcpServerOf = (n) => { const p = String(n).split("__"); return p.length > 1 && p[1] ? p[1] : "unknown"; };
			const mcpToolOf = (n) => { const p = String(n).split("__"); return p.length > 2 ? p.slice(2).join("__") : String(n); };
			const toolLabel = (row) => {
				if (row.c === "skill") return row.n.indexOf("skill:") === 0 ? row.n.slice(6) : row.n;
				if (row.c === "mcp") return mcpToolOf(row.n);
				return row.n;
			};
			const toolSub = (row) => row.c === "mcp" ? mcpServerOf(row.n) : row.c === "skill" ? "skill" : "";
			//#endregion
			//#region primitives
			function useLocaleTick() {
				const [tick, setTick] = react.useState(0);
				react.useEffect(() => {
					let locale;
					try { locale = ctx.get("locale"); } catch (error) { locale = undefined; }
					if (locale === undefined || typeof locale.subscribe !== "function") return undefined;
					return locale.subscribe(() => setTick((value) => value + 1));
				}, []);
				return tick;
			}
			function Seg({ value, options, onChange, nav }) {
				const nodes = options.map((entry) => h("button", {
					key: String(entry[0]),
					type: "button",
					role: "tab",
					"aria-selected": value === entry[0],
					"data-on": value === entry[0] ? "1" : "0",
					className: "tu-segBtn",
					onClick: () => onChange(entry[0])
				}, entry[1]));
				return h("div", { className: "tu-seg", role: "tablist", "data-nav": nav || "" }, nodes);
			}
			function Delta({ delta, prevLabel }) {
				if (delta === null || delta === undefined) return h("span", { className: "tu-none" }, "—");
				const cls = delta.dir === "up" ? " tu-deltaUp" : delta.dir === "down" ? " tu-deltaDown" : "";
				const mark = delta.dir === "up" ? "▲ " : delta.dir === "down" ? "▼ " : delta.dir === "flat" ? "• " : "";
				const text = delta.dir === "new" ? pick().deltaNew : delta.text;
				return h("span", { className: "tu-delta" + cls, title: prevLabel || "" }, mark + text);
			}
			function MetricRail({ cells }) {
				const carNodes = cells.map((cell, index) => {
					const unit = cell.unit !== undefined ? h("span", { className: "tu-carUnit" }, cell.unit) : null;
					const delta = cell.delta ? h(Delta, { delta: cell.delta, prevLabel: cell.prevLabel }) : null;
					const foot = cell.foot !== undefined ? h("span", { title: cell.footTitle || "" }, cell.foot) : null;
					return h("div", { className: "tu-car", key: index, title: cell.title || "" },
						h("div", { className: "tu-carLabel" }, cell.label),
						h("div", { className: "tu-carValue" }, h("span", { className: "tu-carNum" }, cell.value), unit),
						h("div", { className: "tu-carFoot" }, delta, foot));
				});
				return h("div", { className: "tu-rail" }, carNodes);
			}
			function Card({ title, hint, tools, children, flush }) {
				const headLeft = h("div", { className: "tu-cardTitle" },
					title,
					hint !== undefined ? h("span", { className: "tu-cardHint" }, hint) : null);
				const head = h("div", { className: "tu-cardHead" },
					headLeft,
					tools !== undefined ? h("div", { className: "tu-toolRow" }, tools) : null);
				const body = h("div", { className: "tu-cardBody" + (flush ? " tu-cardBodyFlush" : "") }, children);
				return h("section", { className: "tu-card" }, head, body);
			}
			function StackBar({ items, tall }) {
				const total = items.reduce((acc, item) => acc + Math.max(0, item.value), 0);
				if (total <= 0) return h("div", { className: "tu-empty" }, "—");
				const segs = items.map((item) => h("div", {
					key: item.key,
					className: "tu-stackSeg",
					style: { flexGrow: Math.max(0, item.value), background: item.color },
					title: item.label + " " + int(item.value) + " · " + pct(ratio(item.value, total))
				}));
				return h("div", { className: "tu-stack" + (tall ? " tu-stackTall" : "") }, segs);
			}
			function Legend({ items }) {
				const nodes = items.map((item) => h("span", { className: "tu-legendItem", key: item.key, title: item.title || "" },
					h("i", { style: { background: item.color } }),
					h("span", null, item.label),
					item.value !== undefined ? h("span", { className: "tu-legendVal" }, item.value) : null,
					item.share !== undefined ? h("span", { className: "tu-legendShare" }, item.share) : null));
				return h("div", { className: "tu-legend" }, nodes);
			}
			function ShareCell({ value, max, color, text }) {
				const fill = h("div", { className: "tu-shareFill", style: { width: Math.max(2, Math.round(ratio(value, max) * 100)) + "%", background: color || "var(--tu-accent)" } });
				return h("div", { className: "tu-share" }, h("span", null, text), h("div", { className: "tu-shareBar" }, fill));
			}
			function Skeleton() {
				const nodes = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => h("div", { className: "tu-skelCell", key: i }));
				return h("div", { className: "tu-skel" }, nodes);
			}
			function DataTable({ columns, rows, sort, onSort, rowKey, empty, limit, ariaLabel, footer }) {
				const view = sort === null ? (limit === undefined ? rows : rows.slice(0, limit)) : [...rows].sort((a, b) => {
					const left = a[sort.key];
					const right = b[sort.key];
					if (typeof left === "string" || typeof right === "string") return sort.dir * String(left).localeCompare(String(right));
					return sort.dir * ((left || 0) - (right || 0));
				}).slice(0, limit === undefined ? undefined : limit);
				if (rows.length === 0) return h("div", { className: "tu-empty" }, empty || "—");
				const headCells = columns.map((column) => {
					const active = sort !== null && sort.key === column.key;
					const content = column.sortable === false || sort === null
						? column.label
						: h("button", {
							type: "button",
							className: "tu-sort",
							"data-on": active ? "1" : "0",
							onClick: () => onSort(column.key)
						}, column.label, active ? h("span", { style: { fontSize: "9px" } }, sort.dir < 0 ? "▼" : "▲") : null);
					return h("th", { className: "tu-th" + (column.num ? " tu-thNum" : ""), key: column.key }, content);
				});
				const bodyRows = view.map((row, index) => {
					const cells = columns.map((column) => h("td", { className: "tu-td" + (column.num ? " tu-tdNum" : ""), key: column.key }, column.render(row)));
					return h("tr", { className: "tu-tr", key: rowKey ? rowKey(row) : index }, cells);
				});
				const footRow = footer === undefined ? null : h("tfoot", null, h("tr", null,
					footer.map((cell, index) => h("td", {
						className: "tu-td tu-tdFoot" + (index > 0 ? " tu-tdNum" : ""),
						key: index
					}, cell))));
				const table = h("table", { className: "tu-table", "aria-label": ariaLabel || "" },
					h("thead", null, h("tr", null, headCells)),
					h("tbody", null, bodyRows),
					footRow);
				return h("div", { className: "tu-scroll" }, table);
			}
			/*
			 * Stacked column chart with an optional right-axis rate line. All
			 * geometry is percentage based, so it follows the container width
			 * without layout reads; the tooltip is one absolutely positioned card
			 * driven by the hovered column index.
			 */
			function BarChart({ seq, series, valueOf, height, line, tip }) {
				const [hover, setHover] = react.useState(-1);
				const plotRef = react.useRef(null);
				const [plotW, setPlotW] = react.useState(0);
				react.useEffect(() => {
					const el = plotRef.current;
					if (!el || typeof ResizeObserver === "undefined") return undefined;
					const ro = new ResizeObserver((entries) => {
						for (const entry of entries) setPlotW(entry.contentRect.width);
					});
					ro.observe(el);
					return () => ro.disconnect();
				}, []);
				const keys = series.map((s) => s.key);
				const totals = seq.map((d) => {
					const bucket = valueOf(d) || {};
					let sum = 0;
					for (const key of keys) sum += bucket[key] || 0;
					return sum;
				});
				let max = 1;
				for (const value of totals) max = Math.max(max, value);
				const plotHeight = height || 172;
				const n = seq.length || 1;
				/* label budget follows the measured plot width, so ticks never collide */
				const labelCap = plotW > 0 ? Math.max(2, Math.floor(plotW / 56)) : 8;
				const step = Math.max(1, Math.ceil(n / labelCap));
				const ticks = [1, 0.75, 0.5, 0.25, 0];
				const tickFormat = axisOf(max);
				const labeled = new Set();
				for (let index = 0; index < n; index += step) labeled.add(index);
				let lastLabeled = 0;
				for (const index of labeled) lastLabeled = Math.max(lastLabeled, index);
				if (n - 1 - lastLabeled >= 2) labeled.add(n - 1);
				const gridNodes = ticks.map((f) => h("div", {
					key: f,
					className: "tu-grid" + (f === 0 ? " tu-gridBase" : ""),
					style: { top: (100 - f * 100) + "%" }
				}));
				const colNodes = seq.map((d, index) => {
					const bucket = valueOf(d) || {};
					const segs = [];
					for (let i = series.length - 1; i >= 0; i--) {
						const s = series[i];
						const value = bucket[s.key] || 0;
						if (value <= 0) continue;
						segs.push(h("div", { className: "tu-colSeg", key: s.key, style: { flexGrow: value, background: s.color } }));
					}
					const stackHeight = totals[index] > 0 ? Math.max(1.5, (totals[index] / max) * 100) + "%" : "0";
					return h("div", {
						key: d,
						className: "tu-col" + (hover === index ? " tu-colActive" : ""),
						onMouseEnter: () => setHover(index),
						onMouseLeave: () => setHover(-1)
					}, h("div", { className: "tu-colStack", style: { height: stackHeight } }, segs));
				});
				const lineScale = line !== undefined && line.scale ? line.scale : 1;
				const lineTickFormat = line !== undefined && line.format ? line.format : (value) => Math.round(value * 100) + "%";
				const lineNode = line === undefined ? null : h("svg", {
					className: "tu-line",
					viewBox: "0 0 100 100",
					preserveAspectRatio: "none",
					"aria-hidden": "true"
				}, h("polyline", {
					fill: "none",
					stroke: line.color || "var(--dsw-alias-label-secondary)",
					strokeWidth: 1.5,
					strokeLinejoin: "round",
					strokeLinecap: "round",
					vectorEffect: "non-scaling-stroke",
					opacity: 0.9,
					points: seq.map((d, index) => {
						const raw = line.get(d);
						if (raw === null || raw === undefined || !Number.isFinite(raw)) return "";
						const value = Math.max(0, Math.min(1, raw / lineScale));
						return ((index + 0.5) / n * 100).toFixed(2) + "," + (100 - value * 100).toFixed(2);
					}).filter((point) => point.length > 0).join(" ")
				}));
				const hoverDay = hover >= 0 ? seq[hover] : null;
				const tipData = hoverDay !== null && tip ? tip(hoverDay) : null;
				const tipLeft = hover >= 0 ? ((hover + 0.5) / n) * 100 : 0;
				const tipAnchor = tipLeft < 18 ? "translateX(0)" : tipLeft > 82 ? "translateX(-100%)" : "translateX(-50%)";
				const tipNode = tipData === null ? null : h("div", {
					className: "tu-tip",
					style: { left: tipLeft + "%", transform: tipAnchor, top: "6px" }
				},
					h("div", { className: "tu-tipHead" }, tipData.title),
					tipData.rows.map((row) => h("div", { className: "tu-tipRow", key: row.label },
						h("i", { style: { background: row.color || "transparent" } }),
						h("span", null, row.label),
						h("b", null, row.value))));
				const plotArea = h("div", { className: "tu-plotArea", style: { height: plotHeight + "px" } },
					gridNodes,
					h("div", { className: "tu-cols" }, colNodes),
					lineNode,
					tipNode);
				const xCells = seq.map((d, index) => h("div", {
					className: "tu-xCell",
					key: d,
					style: index === lastLabeled ? { textAlign: "right" } : undefined
				}, labeled.has(index) ? dayLabel(d) : ""));
				const yLabels = ticks.map((f) => tickFormat(Math.round(max * f)));
				const yAxis = h("div", { className: "tu-axisY" }, yLabels.map((label, index) => h("div", { key: ticks[index] }, label === yLabels[index - 1] ? "" : label)));
				const yAxis2 = line === undefined ? null : h("div", { className: "tu-axisY2" }, ticks.map((f) => h("div", { key: f }, lineTickFormat(lineScale * f))));
				const chart = h("div", { className: "tu-chart" },
					yAxis,
					h("div", { className: "tu-plot", ref: plotRef }, plotArea, h("div", { className: "tu-xAxis" }, xCells)),
					yAxis2);
				const legendItems = series.map((s) => ({ key: s.key, label: s.label, color: s.color }));
				if (line !== undefined) legendItems.push({ key: "__line", label: line.label, color: line.color || "var(--dsw-alias-label-secondary)" });
				return h("div", null, chart, h("div", { style: { marginTop: "8px" } }, h(Legend, { items: legendItems })));
			}
			//#endregion
			//#region aggregation
			const BUCKET_KEYS = ["in", "cr", "cw", "out", "reason", "req", "turns", "steps", "llmMs", "toolMs", "toolMeasured", "userMsgs", "asstMsgs", "toolCalls", "toolErrs", "turnOk", "turnErr", "turnAbort", "turnInterrupt", "sessionsStarted", "mainStarted", "subStarted"];
			const sumDays = (rows) => {
				const agg = {};
				for (const key of BUCKET_KEYS) agg[key] = 0;
				for (const row of rows) for (const key of BUCKET_KEYS) agg[key] += row[key] || 0;
				return agg;
			};
			const aggregateTools = (rows) => {
				const map = new Map();
				for (const row of rows) {
					const found = map.get(row.n);
					if (found === undefined) map.set(row.n, { n: row.n, c: row.c, calls: row.calls, errs: row.errs, ms: row.ms, measured: row.measured });
					else { found.calls += row.calls; found.errs += row.errs; found.ms += row.ms; found.measured += row.measured; }
				}
				const tools = [...map.values()];
				tools.sort((a, b) => b.calls - a.calls || (a.n < b.n ? -1 : a.n > b.n ? 1 : 0));
				const cats = new Map();
				for (const row of tools) {
					const found = cats.get(row.c);
					if (found === undefined) cats.set(row.c, { c: row.c, calls: row.calls, errs: row.errs, ms: row.ms, measured: row.measured });
					else { found.calls += row.calls; found.errs += row.errs; found.ms += row.ms; found.measured += row.measured; }
				}
				const categories = [...cats.values()];
				categories.sort((a, b) => b.calls - a.calls);
				return { tools, categories };
			};
			const groupSkills = (tools, t) => tools.filter((row) => row.c === "skill").map((row) => ({
				key: row.n, name: toolLabel(row), value: row.calls, calls: row.calls, errs: row.errs,
				ms: row.ms, measured: row.measured, color: CATEGORY_COLORS.skill,
				sub: row.errs > 0 ? row.errs + " " + t.errorsShort : ""
			})).sort((a, b) => b.value - a.value);
			const groupMcpServers = (tools, t) => {
				const map = new Map();
				for (const row of tools) {
					if (row.c !== "mcp") continue;
					const server = mcpServerOf(row.n);
					const found = map.get(server);
					if (found === undefined) map.set(server, { key: server, name: server, value: row.calls, calls: row.calls, errs: row.errs, tools: 1, color: CATEGORY_COLORS.mcp });
					else { found.calls += row.calls; found.value += row.calls; found.errs += row.errs; found.tools += 1; }
				}
				return [...map.values()].sort((a, b) => b.value - a.value);
			};
			const aggregateWorkspaces = (rows) => {
				const map = new Map();
				for (const row of rows) {
					const key = row.cwd || "—";
					const found = map.get(key);
					if (found === undefined) map.set(key, { key, name: shortCwd(key), value: 1, sessions: 1, tokens: row.tokens, toolCalls: row.toolCalls });
					else { found.value += 1; found.sessions += 1; found.tokens += row.tokens; found.toolCalls += row.toolCalls; }
				}
				return [...map.values()].sort((a, b) => b.tokens - a.tokens || b.sessions - a.sessions).slice(0, 6);
			};
			const buildDayCatMap = (seq, rows, keys) => {
				const map = new Map();
				for (const d of seq) map.set(d, {});
				for (const row of rows) {
					const per = map.get(row.d);
					if (per === undefined) continue;
					const key = keys.has(row.c) ? row.c : "__other";
					per[key] = (per[key] || 0) + row.calls;
				}
				return map;
			};
			const turnOutcomeRows = (agg, t) => [
				{ key: "ok", label: t.turnOk, value: agg.turnOk, color: C.good },
				{ key: "err", label: t.turnErr, value: agg.turnErr, color: C.bad },
				{ key: "abort", label: t.turnAbort, value: agg.turnAbort, color: C.warn },
				{ key: "interrupt", label: t.turnInterrupt, value: agg.turnInterrupt, color: C.idle }
			];
			const SPLIT_KEYS = ["sessions", "tokens", "req", "turns", "steps", "toolCalls", "toolErrs", "llmMs", "toolMs", "toolMeasured", "ok", "err", "abort", "interrupt"];
			const sumComparison = (rows, side) => {
				const agg = {};
				for (const key of SPLIT_KEYS) agg[key] = 0;
				for (const row of rows) {
					const bucket = row[side];
					if (bucket === undefined || bucket === null) continue;
					for (const key of SPLIT_KEYS) agg[key] += bucket[key] || 0;
				}
				return agg;
			};
			const splitSuccess = (bucket) => {
				const total = (bucket.ok || 0) + (bucket.err || 0) + (bucket.abort || 0) + (bucket.interrupt || 0);
				return total > 0 ? bucket.ok / total : null;
			};
			const kindOf = (row) => row.kind === "subagent" ? "subagent" : "main";
			const kindLabelOf = (row) => {
				const t = pick();
				if (kindOf(row) === "main") return t.kindMain;
				if (row.subagentType === "team") return t.kindTeam;
				if (row.subagentType === "workflow") return t.kindWorkflow;
				return t.kindSub;
			};
			const kindColorOf = (row) => {
				if (kindOf(row) === "main") return MAIN_COLOR;
				if (row.subagentType === "team") return TEAM_COLOR;
				if (row.subagentType === "workflow") return WORKFLOW_COLOR;
				return SUB_COLOR;
			};
			const SPAWN_TOOLS = new Set(["subagent", "subagent_fork", "spawn_teammate", "workflow", "ralph"]);
			const streakOf = (byDayMap, today) => {
				let streak = 0;
				let cursor = today;
				while (streak < 400) {
					const value = byDayMap.get(cursor);
					if (value === undefined || value <= 0) {
						if (streak === 0 && cursor === today) { cursor = shiftDays(cursor, -1); continue; }
						break;
					}
					streak += 1;
					cursor = shiftDays(cursor, -1);
				}
				return streak;
			};
			//#endregion
		//#region heatmap
		const HEAT_LEVELS = [0.02, 0.12, 0.26, 0.44, 0.62, 0.82];
		function Heatmap({ values, span, onSpan, metric, onMetric, today, t }) {
			const scrollRef = react.useRef(null);
			const [availW, setAvailW] = react.useState(0);
			react.useEffect(() => {
				const el = scrollRef.current;
				if (!el || typeof ResizeObserver === "undefined") return undefined;
				const ro = new ResizeObserver((entries) => {
					for (const entry of entries) setAvailW(entry.contentRect.width);
				});
				ro.observe(el);
				return () => ro.disconnect();
			}, []);
			const start = parseStr(shiftDays(today, -(span - 1)));
			start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
			const weeks = [];
			const cursor = new Date(start);
			while (dateStr(cursor) <= today) {
				const col = [];
				for (let i = 0; i < 7; i++) {
					const d = dateStr(cursor);
					col.push({ d, v: values.get(d) || 0, future: d > today });
					cursor.setDate(cursor.getDate() + 1);
				}
				weeks.push(col);
			}
			const GAP = 3, LEFT_W = 32, MIN_CELL = 10, MAX_CELL = 30;
			let cell = MIN_CELL;
			if (availW > 0 && weeks.length > 0) {
				cell = (availW - LEFT_W - (weeks.length - 1) * GAP) / weeks.length;
				cell = Math.max(MIN_CELL, Math.min(MAX_CELL, Math.round(cell * 100) / 100));
			}
			react.useEffect(() => {
				const el = scrollRef.current;
				if (el) el.scrollLeft = el.scrollWidth - el.clientWidth;
			}, [span, cell]);
			let max = 1;
			for (const col of weeks) for (const dayCell of col) max = Math.max(max, dayCell.v);
			const levelOf = (v) => {
				if (v <= 0) return -1;
				const share = v / max;
				for (let i = HEAT_LEVELS.length - 1; i >= 0; i--) if (share >= HEAT_LEVELS[i]) return i;
				return 0;
			};
			const bgOf = (level) => level < 0
				? "var(--tu-hair)"
				: "color-mix(in srgb, var(--tu-accent) " + Math.round(16 + level * 14) + "%, transparent)";
			const months = [];
			let lastMonth = -1;
			weeks.forEach((col, index) => {
				const first = parseStr(col[0].d);
				const month = first.getMonth();
				if (month === lastMonth) return;
				lastMonth = month;
				const label = isZh() ? (month + 1) + "月" : first.toLocaleString("en", { month: "short" });
				if (months.length === 0 || index - months[months.length - 1].index >= 2) months.push({ index, label });
			});
			const monthRow = h("div", { className: "tu-heatMonths", style: { marginLeft: LEFT_W + "px" } },
				weeks.map((col, index) => h("div", { key: "m" + index, style: { position: "relative", width: cell + "px", flex: "none" } },
					months.filter((m) => m.index === index).map((m) => h("span", {
						key: m.label + index,
						className: "tu-heatMonth",
						style: { position: "absolute", left: "0", top: "0" }
					}, m.label)))));
			const colNodes = weeks.map((col, wi) => h("div", { className: "tu-heatCol", key: wi },
				col.map((dayCell) => h("div", {
					key: dayCell.d,
					className: "tu-heatCell" + (dayCell.d === today ? " tu-heatToday" : ""),
					style: dayCell.future ? { opacity: .35 } : { background: bgOf(levelOf(dayCell.v)) },
					title: dayCell.d + " · " + int(dayCell.v)
				}))));
			const grid = h("div", { className: "tu-heat" },
				h("div", { className: "tu-heatDays", style: { width: LEFT_W - 8 + "px" } },
					[t.weekMon, "", t.weekWed, "", t.weekFri, "", ""].map((label, i) => h("div", { className: "tu-heatDayLabel", key: i }, label))),
				h("div", { className: "tu-heatCols" }, colNodes));
			const legend = h("div", { className: "tu-heatLegend" }, t.heatLess,
				[-1, 0, 1, 2, 3, 4, 5].map((level) => h("i", { key: level, className: "tu-heatCell", style: { background: bgOf(level) } })),
				t.heatMore);
			let activeCells = 0;
			for (const col of weeks) for (const dayCell of col) if (dayCell.v > 0) activeCells += 1;
			const statNodes = [
				{ key: "streak", label: t.heatStreak, value: String(streakOf(values, today)), unit: t.heatStreakUnit },
				{ key: "peak", label: t.heatPeak, value: compact(max), unit: "" },
				{ key: "active", label: t.mActiveDays, value: String(activeCells), unit: t.daysUnit }
			].map((row) => h("div", { className: "tu-kv", key: row.key },
				h("span", { className: "tu-kvKey" }, row.label),
				h("span", { className: "tu-kvVal" }, row.value + (row.unit.length > 0 ? " " + row.unit : ""))));
			return h("section", { className: "tu-card" },
				h("div", { className: "tu-cardHead" },
					h("div", { className: "tu-cardTitle" }, t.cardHeat, h("span", { className: "tu-cardHint" }, t.heatHint)),
					h("div", { className: "tu-toolRow" },
						h(Seg, { value: metric, nav: "heatMetric", options: [["tokens", t.heatTokens], ["tools", t.heatTools], ["sessions", t.heatSessions]], onChange: onMetric }),
						h(Seg, { value: span, nav: "heatSpan", options: [[180, t.heatSpan180], [365, t.heatSpan365]], onChange: onSpan }))),
				h("div", { className: "tu-cardBody" },
					h("div", { className: "tu-heatWrap" },
						h("div", { className: "tu-heatMain" },
							h("div", { className: "tu-heatScroll", ref: scrollRef },
								h("div", { style: { "--tu-cell": cell + "px", width: "max-content" } }, monthRow, grid)),
							h("div", { className: "tu-heatFoot" }, legend)),
						h("div", { className: "tu-heatStats" }, statNodes))));
		}
						//#region overview
			const deltaPts = (cur, prev, hasBase) => {
				if (!hasBase) return null;
				const diff = (cur - prev) * 100;
				if (Math.abs(diff) < 0.05) return { dir: "flat", text: "0.0pt" };
				return { dir: diff > 0 ? "up" : "down", text: (diff > 0 ? "+" : "") + diff.toFixed(1) + "pt" };
			};
			function OverviewView({ agg, prevAgg, days, daysMap, seq, series, dayModelMap, models, heat, today, span, t }) {
				const total = totalOf(agg);
				const prevTotal = totalOf(prevAgg);
				const hasBase = prevTotal > 0 || prevAgg.req > 0;
				const activeDays = days.filter((row) => (row.req || 0) > 0 || (row.toolCalls || 0) > 0 || (row.userMsgs || 0) > 0).length;
				const top = models.length > 0 ? models[0] : null;
				const topShare = top !== null ? ratio(totalOf(top), total) : 0;
				const cacheNow = cacheRate(agg);
				const cells = [
					{ label: t.mTokens, value: compact(total), delta: deltaOf(total, prevTotal), title: int(total) },
					{ label: t.mRequests, value: int(agg.req), delta: deltaOf(agg.req, prevAgg.req) },
					{ label: t.mTurns, value: int(agg.turns), delta: deltaOf(agg.turns, prevAgg.turns) },
					{ label: t.mSessions, value: int(agg.sessionsStarted), delta: deltaOf(agg.sessionsStarted, prevAgg.sessionsStarted), foot: t.kindMain + " " + int(agg.mainStarted) + " · " + t.kindSub + " " + int(agg.subStarted) },
					{ label: t.mCache, value: agg.req > 0 ? pct(cacheNow) : "—", delta: deltaPts(cacheNow, cacheRate(prevAgg), hasBase && agg.req > 0) },
					{ label: t.mAvgTokReq, value: agg.req > 0 ? compact(ratio(total, agg.req)) : "—", delta: deltaOf(ratio(total, agg.req), ratio(prevTotal, prevAgg.req)) },
					{ label: t.mTools, value: int(agg.toolCalls), delta: deltaOf(agg.toolCalls, prevAgg.toolCalls), foot: pct(ratio(agg.toolErrs, agg.toolCalls)) + " " + t.errorsShort },
					{ label: t.mActiveDays, value: int(activeDays), foot: span + " " + t.daysUnit, footTitle: t.mActiveDays }
				].map((row) => Object.assign({ prevLabel: t.vsPrev }, row));
				const mixItems = [
					{ key: "cr", label: t.mixCacheRead, value: agg.cr, color: SERIES[0] },
					{ key: "in", label: t.mixIn, value: agg.in, color: SERIES[3] },
					{ key: "out", label: t.mixOutput, value: agg.out, color: SERIES[2] },
					{ key: "cw", label: t.mixCacheWrite, value: agg.cw, color: SERIES[1] },
					{ key: "reason", label: t.mixReason, value: agg.reason, color: C.idle }
				].filter((item) => item.value > 0);
				const mixLegend = mixItems.map((item) => ({
					key: item.key, label: item.label, color: item.color,
					value: compact(item.value), share: pct(ratio(item.value, total))
				}));
				const mixFoot = h("div", { className: "tu-meta" },
					h("span", null, t.totalLabel + " ", h("b", null, compact(total))),
					h("i"),
					h("span", null, t.mCache + " ", h("b", null, pct(cacheNow))),
					h("i"),
					h("span", null, t.mReqPerDay + " ", h("b", null, compact(ratio(agg.req, Math.max(1, activeDays))))));
				const mixBody = total > 0
					? h(react.Fragment, null, h(StackBar, { items: mixItems, tall: true }), h(Legend, { items: mixLegend }), mixFoot)
					: h("div", { className: "tu-empty" }, t.empty);
				const mixCard = h(Card, { title: t.cardTokenMix, hint: t.cardTokenMixHint }, mixBody);
				const runtime = [
					{ label: t.mSteps, value: int(agg.steps) },
					{ label: t.mUserMsgs, value: int(agg.userMsgs) },
					{ label: t.mAsstMsgs, value: int(agg.asstMsgs) },
					{ label: t.mAvgLlm, value: duration(ratio(agg.llmMs, agg.turns)) },
					{ label: t.mToolLatency, value: duration(ratio(agg.toolMs, agg.toolMeasured)) },
					{ label: t.mTurnOk, value: pct(ratio(agg.turnOk, agg.turnOk + agg.turnErr + agg.turnAbort + agg.turnInterrupt)) }
				];
				const runtimeGrid = h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(96px,1fr))", gap: "12px 10px" } },
					runtime.map((row) => h("div", { className: "tu-kv", key: row.label },
						h("span", { className: "tu-kvKey" }, row.label),
						h("span", { className: "tu-kvVal" }, row.value))));
				const runtimeCard = h(Card, { title: t.cardRuntime }, runtimeGrid);
				const dayColumns = [
					{ key: "d", label: t.colDate, render: (row) => row.d },
					{ key: "tokens", label: t.colTokens, num: true, render: (row) => compact(totalOf(row)) },
					{ key: "in", label: t.colIn, num: true, render: (row) => compact(row.in) },
					{ key: "cr", label: t.colCacheRead, num: true, render: (row) => compact(row.cr) },
					{ key: "out", label: t.colOut, num: true, render: (row) => compact(row.out) },
					{ key: "req", label: t.colReq, num: true, render: (row) => int(row.req) },
					{ key: "turns", label: t.colTurns, num: true, render: (row) => int(row.turns) },
					{ key: "toolCalls", label: t.colTools, num: true, render: (row) => int(row.toolCalls) },
					{ key: "sessionsStarted", label: t.colSessions, num: true, render: (row) => int(row.sessionsStarted) },
					{ key: "cache", label: t.colCache, num: true, render: (row) => pct(cacheRate(row)) }
				];
				const [daySort, setDaySort] = react.useState({ key: "d", dir: -1 });
				const onDaySort = (key) => setDaySort((prev) => prev.key === key ? { key, dir: -prev.dir } : { key, dir: -1 });
				const sortedDays = [...days].sort((a, b) => {
					const left = daySort.key === "tokens" ? totalOf(a) : daySort.key === "cache" ? cacheRate(a) : a[daySort.key];
					const right = daySort.key === "tokens" ? totalOf(b) : daySort.key === "cache" ? cacheRate(b) : b[daySort.key];
					if (typeof left === "string") return daySort.dir * left.localeCompare(right);
					return daySort.dir * ((left || 0) - (right || 0));
				});
				const dayTotals = [t.totalLabel, compact(total), compact(agg.in), compact(agg.cr), compact(agg.out), int(agg.req), int(agg.turns), int(agg.toolCalls), int(agg.sessionsStarted), pct(cacheNow)];
				const dayCard = h(Card, { title: t.cardDayTable, hint: days.length + " " + t.daysWithData },
					h(DataTable, { columns: dayColumns, rows: sortedDays, sort: daySort, onSort: onDaySort, rowKey: (row) => row.d, footer: dayTotals, empty: t.empty }));
				const heatNode = h(Heatmap, {
					values: heat.values, span: heat.span, onSpan: heat.onSpan,
					metric: heat.metric, onMetric: heat.onMetric, today, t
				});
				const trendHint = top === null ? t.groupByModel : t.mTopModel + " " + (top.m.length > 28 ? top.m.slice(0, 27) + "…" : top.m) + " " + pct(topShare, 0);
				const trendCard = h(Card, { title: t.cardTrend, hint: trendHint },
					h(BarChart, {
						seq, series, valueOf: (d) => dayModelMap.get(d) || {}, height: 184,
						line: {
							label: t.legendCache, color: "var(--dsw-alias-label-caption)",
							get: (d) => {
								const row = daysMap.get(d);
								if (row === undefined || (row.req || 0) === 0) return null;
								return cacheRate(row);
							}
						},
						tip: (d) => {
							const row = daysMap.get(d) || {};
							const per = dayModelMap.get(d) || {};
							const rows = series.map((s) => ({ label: s.label, color: s.color, value: compact(per[s.key] || 0) }));
							rows.push({ label: t.legendCache, color: "var(--dsw-alias-label-caption)", value: pct(cacheRate(row)) });
							return { title: d + " · " + compact(totalOf(row)), rows };
						}
					}));
				return h(react.Fragment, null,
					h(MetricRail, { cells }),
					h("div", { className: "tu-grid2" }, mixCard, runtimeCard),
					heatNode,
					trendCard,
					dayCard);
			}
			//#endregion
			//#region tools
			function ToolsView({ agg, prevAgg, tools, categories, seq, dayCatMap, catSeries, t }) {
				const hasBase = prevAgg.toolCalls > 0;
				const avgMs = ratio(agg.toolMs, agg.toolMeasured);
				const skillCalls = categories.filter((row) => row.c === "skill").reduce((acc, row) => acc + row.calls, 0);
				const mcpCalls = categories.filter((row) => row.c === "mcp").reduce((acc, row) => acc + row.calls, 0);
				const cells = [
					{ label: t.mTools, value: int(agg.toolCalls), delta: deltaOf(agg.toolCalls, prevAgg.toolCalls) },
					{ label: t.mToolErr, value: agg.toolCalls > 0 ? pct(ratio(agg.toolErrs, agg.toolCalls)) : "—", delta: deltaPts(ratio(agg.toolErrs, agg.toolCalls), ratio(prevAgg.toolErrs, prevAgg.toolCalls), hasBase && agg.toolCalls > 0) },
					{ label: t.colErrors, value: int(agg.toolErrs) },
					{ label: t.mToolLatency, value: duration(avgMs) },
					{ label: t.mToolKinds, value: int(tools.length) },
					{ label: t.mSkillCalls, value: int(skillCalls), foot: pct(ratio(skillCalls, agg.toolCalls)) },
					{ label: t.mMcpCalls, value: int(mcpCalls), foot: pct(ratio(mcpCalls, agg.toolCalls)) },
					{ label: t.mAvgTools, value: fixed1(ratio(agg.toolCalls, agg.sessionsStarted)), foot: int(agg.sessionsStarted) + " " + t.sessionsUnit }
				];
				const [query, setQuery] = react.useState("");
				const [sort, setSort] = react.useState({ key: "calls", dir: -1 });
				const onSort = (key) => setSort((prev) => prev.key === key ? { key, dir: -prev.dir } : { key, dir: -1 });
				const maxCalls = tools.length > 0 ? tools[0].calls : 1;
				const filtered = tools.filter((row) => {
					if (query.length === 0) return true;
					const needle = query.toLowerCase();
					return row.n.toLowerCase().indexOf(needle) >= 0 || categoryLabel(row.c).toLowerCase().indexOf(needle) >= 0;
				});
				const toolColumns = [
					{
						key: "n", label: t.colTool, sortable: false,
						render: (row) => h("div", { className: "tu-cellStack" },
							h("span", { className: "tu-cellName", title: row.n }, toolLabel(row)),
							toolSub(row).length > 0 ? h("span", { className: "tu-cellSub" }, toolSub(row)) : null)
					},
					{ key: "c", label: t.colCategory, sortable: false, render: (row) => h("span", { className: "tu-chip" }, h("i", { style: { background: categoryColor(row.c) } }), categoryLabel(row.c)) },
					{ key: "calls", label: t.colCalls, num: true, render: (row) => int(row.calls) },
					{ key: "share", label: t.colShare, num: true, sortable: false, render: (row) => h(ShareCell, { value: row.calls, max: maxCalls, text: pct(ratio(row.calls, agg.toolCalls)) }) },
					{ key: "errs", label: t.colErrRate, num: true, render: (row) => {
						const rate = ratio(row.errs, row.calls);
						if (row.errs === 0) return h("span", { className: "tu-muted" }, "—");
						return h("span", { className: rate >= 0.05 ? "tu-bad" : "tu-muted" }, pct(rate));
					} },
					{ key: "ms", label: t.colAvg, num: true, render: (row) => row.measured > 0 ? duration(ratio(row.ms, row.measured)) : h("span", { className: "tu-muted" }, "—") }
				];
				const skills = groupSkills(tools, t);
				const servers = groupMcpServers(tools, t);
				const skillColumns = [
					{ key: "name", label: t.colSkill, sortable: false, render: (row) => h("span", { className: "tu-cellName", title: row.name }, row.name) },
					{ key: "calls", label: t.colCalls, num: true, render: (row) => int(row.calls) },
					{ key: "errs", label: t.colErrors, num: true, render: (row) => row.errs > 0 ? h("span", { className: "tu-bad" }, String(row.errs)) : h("span", { className: "tu-muted" }, "—") }
				];
				const serverColumns = [
					{ key: "name", label: t.colServer, sortable: false, render: (row) => h("span", { className: "tu-cellName" }, row.name) },
					{ key: "calls", label: t.colCalls, num: true, render: (row) => int(row.calls) },
					{ key: "tools", label: t.colToolKinds, num: true, render: (row) => int(row.tools) },
					{ key: "errs", label: t.colErrors, num: true, render: (row) => row.errs > 0 ? h("span", { className: "tu-bad" }, String(row.errs)) : h("span", { className: "tu-muted" }, "—") }
				];
				return h(react.Fragment, null,
					h(MetricRail, { cells }),
					h(Card, { title: t.cardTools, hint: int(agg.toolCalls) + " " + t.callsUnit },
						h(StackBar, { items: categories.map((row) => ({ key: row.c, label: categoryLabel(row.c), value: row.calls, color: categoryColor(row.c) })), tall: true }),
						h(Legend, { items: categories.map((row) => ({
							key: row.c, label: categoryLabel(row.c), color: categoryColor(row.c),
							value: int(row.calls), share: pct(ratio(row.calls, agg.toolCalls))
						})) })),
					h(Card, { title: t.cardToolTrend },
						h(BarChart, {
							seq, series: catSeries, valueOf: (d) => dayCatMap.get(d) || {}, height: 168,
							tip: (d) => {
								const per = dayCatMap.get(d) || {};
								let sum = 0;
								for (const key of Object.keys(per)) sum += per[key];
								return {
									title: d + " · " + int(sum) + " " + t.callsUnit,
									rows: catSeries.map((s) => ({ label: s.label, color: s.color, value: int(per[s.key] || 0) }))
								};
							}
						})),
					h(Card, {
						title: t.cardTopTools, hint: tools.length + " " + t.toolsUnit,
						tools: h("input", {
							className: "tu-input", type: "search", placeholder: t.toolSearch,
							value: query, onChange: (event) => setQuery(event.target.value)
						})
					},
						h(DataTable, { columns: toolColumns, rows: filtered, sort, onSort, rowKey: (row) => row.n, empty: t.toolNoData })),
					h("div", { className: "tu-grid2" },
						h(Card, { title: t.cardSkills }, h(DataTable, { columns: skillColumns, rows: skills, sort: null, onSort: () => {}, rowKey: (row) => row.key, empty: t.toolNoData, limit: 10 })),
						h(Card, { title: t.cardMcp }, h(DataTable, { columns: serverColumns, rows: servers, sort: null, onSort: () => {}, rowKey: (row) => row.key, empty: t.toolNoData, limit: 10 }))));
			}
			//#endregion
			//#region sessions
			function CompareCard({ main, sub, subRows, toolRows, t }) {
				if ((sub.sessions || 0) === 0 && (sub.tokens || 0) === 0) return h(Card, { title: t.compareTitle }, h("div", { className: "tu-empty" }, t.compareNoSub));
				const avg = (bucket, key) => bucket.sessions > 0 ? bucket[key] / bucket.sessions : 0;
				const rows = [
					{ label: t.compareSessions, main: main.sessions, sub: sub.sessions, format: int },
					{ label: t.compareTokens, main: main.tokens, sub: sub.tokens, format: compact },
					{ label: t.compareToolCalls, main: main.toolCalls, sub: sub.toolCalls, format: int },
					{ label: t.compareTurns, main: main.turns, sub: sub.turns, format: int },
					{ label: t.compareAvgTokens, main: avg(main, "tokens"), sub: avg(sub, "tokens"), format: compact },
					{ label: t.compareAvgTools, main: avg(main, "toolCalls"), sub: avg(sub, "toolCalls"), format: (v) => fixed1(v) },
					{ label: t.compareAvgActive, main: main.sessions > 0 ? (main.llmMs + main.toolMs) / main.sessions : 0, sub: sub.sessions > 0 ? (sub.llmMs + sub.toolMs) / sub.sessions : 0, format: duration },
					{ label: t.compareSuccess, main: splitSuccess(main) || 0, sub: splitSuccess(sub) || 0, format: (v) => pct(v) }
				];
				const sources = { subagent: 0, team: 0, workflow: 0 };
				for (const row of subRows) {
					const key = row.subagentType || "subagent";
					sources[key] = (sources[key] || 0) + 1;
				}
				const spawn = new Map();
				for (const row of toolRows) {
					if (!SPAWN_TOOLS.has(row.n)) continue;
					spawn.set(row.n, (spawn.get(row.n) || 0) + row.calls);
				}
				const spawnItems = [...spawn.entries()].sort((a, b) => b[1] - a[1]);
				return h(Card, {
					title: t.compareTitle,
					tools: h("div", { style: { display: "flex", gap: "12px", color: "var(--tu-ink3)", font: "var(--dsw-font-xxxs-11)" } },
						h("span", { className: "tu-legendItem" }, h("i", { style: { background: MAIN_COLOR } }), t.compareMain),
						h("span", { className: "tu-legendItem" }, h("i", { style: { background: SUB_COLOR } }), t.compareSub))
				},
					h("div", { className: "tu-cmp" },
						h("div", { className: "tu-cmpHead" }),
						h("div", { className: "tu-cmpHead", style: { justifyContent: "flex-end" } }, t.compareMain),
						h("div", { className: "tu-cmpHead", style: { justifyContent: "flex-end" } }, t.compareSub),
						h("div", { className: "tu-cmpHead", style: { justifyContent: "flex-end" } }, t.compareShare),
						rows.map((row) => {
							const max = Math.max(row.main, row.sub) || 1;
							const cell = (value, color) => h("div", { className: "tu-cmpCell" },
								h("span", { className: "tu-cmpVal" }, row.format(value)),
								h("div", { className: "tu-cmpBar" }, h("div", { className: "tu-cmpFill", style: { width: Math.max(1, Math.round(ratio(value, max) * 100)) + "%", background: color } })));
							return h(react.Fragment, { key: row.label },
								h("div", { className: "tu-cmpLabel" }, row.label),
								cell(row.main, MAIN_COLOR),
								cell(row.sub, SUB_COLOR),
								h("div", { className: "tu-cmpShare" }, pct(ratio(row.sub, row.sub + row.main))));
						})),
					h("div", { className: "tu-meta" },
						h("span", null, t.compareSubSources + " ", h("b", null, sources.subagent), " · ", h("b", null, sources.team), " · ", h("b", null, sources.workflow)),
						h("i"),
						h("span", null, t.compareSubCalls + " ", h("b", null, spawnItems.length === 0 ? "—" : spawnItems.map((entry) => entry[0] + " " + int(entry[1])).join(" · ")))));
			}
			function SessionsView({ agg, prevAgg, daysMap, seq, sessionRows, truncated, comparisonDays, toolRows, t }) {
				const started = agg.sessionsStarted;
				const outcomes = turnOutcomeRows(agg, t);
				const outcomeTotal = outcomes.reduce((acc, row) => acc + row.value, 0);
				const comparisonMain = sumComparison(comparisonDays, "main");
				const comparisonSub = sumComparison(comparisonDays, "sub");
				const comparisonMap = new Map(comparisonDays.map((row) => [row.d, row]));
				const subRows = sessionRows.filter((row) => kindOf(row) === "subagent");
				const cells = [
					{ label: t.mSessions, value: int(started), delta: deltaOf(started, prevAgg.sessionsStarted) },
					{ label: t.mMainSub, value: int(agg.mainStarted) + " / " + int(agg.subStarted) },
					{ label: t.mAvgTurns, value: fixed1(ratio(agg.turns, started)) },
					{ label: t.mAvgTokSession, value: compact(ratio(totalOf(agg), started)) },
					{ label: t.mTurnOk, value: outcomeTotal > 0 ? pct(ratio(agg.turnOk, outcomeTotal)) : "—" },
					{ label: t.mSteps, value: int(agg.steps) },
					{ label: t.mUserMsgs, value: int(agg.userMsgs) },
					{ label: t.mAsstMsgs, value: int(agg.asstMsgs) }
				];
				let activePeak = 0;
				for (const d of seq) {
					const row = daysMap.get(d);
					if (row !== undefined) activePeak = Math.max(activePeak, row.activeSessions || 0);
				}
				const workspaces = aggregateWorkspaces(sessionRows);
				const workspaceMax = workspaces.length > 0 ? workspaces[0].tokens : 1;
				const workspaceColumns = [
					{ key: "name", label: t.colWorkspace, sortable: false, render: (row) => h("span", { className: "tu-cellName", title: row.key }, row.name) },
					{ key: "sessions", label: t.mSessions, num: true, render: (row) => int(row.sessions) },
					{ key: "tokens", label: t.colTokens, num: true, render: (row) => h(ShareCell, { value: row.tokens, max: workspaceMax, text: compact(row.tokens), color: MAIN_COLOR }) },
					{ key: "toolCalls", label: t.colTools, num: true, render: (row) => int(row.toolCalls) }
				];
				const [query, setQuery] = react.useState("");
				const [filter, setFilter] = react.useState("all");
				const [sort, setSort] = react.useState({ key: "lastAt", dir: -1 });
				const onSort = (key) => setSort((prev) => prev.key === key ? { key, dir: -prev.dir } : { key, dir: -1 });
				const visible = sessionRows.filter((row) => {
					if (filter === "main" && kindOf(row) !== "main") return false;
					if (filter === "sub" && kindOf(row) !== "subagent") return false;
					if (query.length === 0) return true;
					const needle = query.toLowerCase();
					return String(row.title || "").toLowerCase().indexOf(needle) >= 0
						|| String(row.cwd || "").toLowerCase().indexOf(needle) >= 0
						|| String(row.model || "").toLowerCase().indexOf(needle) >= 0;
				});
				const maxTokens = sessionRows.reduce((acc, row) => Math.max(acc, row.tokens || 0), 1);
				const when = (ts) => {
					if (!ts) return "—";
					const d = new Date(ts);
					return dayLabel(dateStr(d)) + " " + pad2(d.getHours()) + ":" + pad2(d.getMinutes());
				};
				const columns = [
					{
						key: "title", label: t.colSession, sortable: false,
						render: (row) => h("div", { className: "tu-cellStack" },
							h("span", { className: "tu-cellName", title: row.title || row.id }, row.title || row.id),
							h("span", { className: "tu-cellSub" },
								kindLabelOf(row) + " · " + shortCwd(row.cwd) + (row.model ? " · " + row.model : "")))
					},
					{ key: "depth", label: t.colDepth, num: true, render: (row) => kindOf(row) === "main" ? h("span", { className: "tu-muted" }, "—") : h("span", { className: "tu-chip" }, h("i", { style: { background: kindColorOf(row) } }), String(row.depth || 0)) },
					{ key: "lastAt", label: t.colLastActive, num: true, render: (row) => when(row.lastAt) },
					{ key: "turns", label: t.colTurns, num: true, render: (row) => int(row.turns) },
					{ key: "toolCalls", label: t.colTools, num: true, render: (row) => int(row.toolCalls) },
					{ key: "tokens", label: t.colTokens, num: true, render: (row) => h(ShareCell, { value: row.tokens, max: maxTokens, text: compact(row.tokens), color: "var(--tu-accent)" }) },
					{ key: "toolErrs", label: t.colErrors, num: true, render: (row) => row.toolErrs > 0 ? h("span", { className: "tu-bad" }, String(row.toolErrs)) : h("span", { className: "tu-muted" }, "—") }
				];
				return h(react.Fragment, null,
					h(MetricRail, { cells }),
					h(CompareCard, { main: comparisonMain, sub: comparisonSub, subRows, toolRows, t }),
					h("div", { className: "tu-grid2" },
						h(Card, { title: t.cardSessionTrend },
							h(BarChart, {
								seq, height: 150,
								series: [{ key: "started", label: t.sessionStarted, color: SERIES[0] }],
								valueOf: (d) => {
									const row = daysMap.get(d) || {};
									return { started: row.sessionsStarted || 0 };
								},
								line: {
									label: t.sessionActive, color: "var(--dsw-alias-label-secondary)", scale: Math.max(1, activePeak), format: (value) => int(Math.round(value)),
									get: (d) => {
										const row = daysMap.get(d);
										return row === undefined ? null : row.activeSessions || 0;
									}
								},
								tip: (d) => {
									const row = daysMap.get(d) || {};
									return {
										title: d,
										rows: [
											{ label: t.sessionStarted, color: SERIES[0], value: int(row.sessionsStarted || 0) },
											{ label: t.sessionActive, color: "var(--dsw-alias-label-secondary)", value: int(row.activeSessions || 0) }
										]
									};
								}
							})),
						h(Card, { title: t.cardSplitTrend },
							h(BarChart, {
								seq, height: 150,
								series: [
									{ key: "main", label: t.compareMain, color: MAIN_COLOR },
									{ key: "sub", label: t.compareSub, color: SUB_COLOR }
								],
								valueOf: (d) => {
									const row = comparisonMap.get(d) || {};
									return { main: (row.main && row.main.tokens) || 0, sub: (row.sub && row.sub.tokens) || 0 };
								},
								tip: (d) => {
									const row = comparisonMap.get(d) || {};
									const mainTokens = (row.main && row.main.tokens) || 0;
									const subTokens = (row.sub && row.sub.tokens) || 0;
									return {
										title: d + " · " + compact(mainTokens + subTokens),
										rows: [
											{ label: t.compareMain, color: MAIN_COLOR, value: compact(mainTokens) },
											{ label: t.compareSub, color: SUB_COLOR, value: compact(subTokens) }
										]
									};
								}
							}))),
					h("div", { className: "tu-grid2" },
						h(Card, { title: t.cardOutcome },
							h(StackBar, { items: outcomes, tall: true }),
							h(Legend, { items: outcomes.map((row) => ({ key: row.key, label: row.label, color: row.color, value: int(row.value), share: pct(ratio(row.value, outcomeTotal)) })) })),
						h(Card, { title: t.cardWorkspace }, h(DataTable, { columns: workspaceColumns, rows: workspaces, sort: null, onSort: () => {}, rowKey: (row) => row.key, empty: t.sessionNoData }))),
					h(Card, {
						title: t.sessionTable,
						hint: truncated ? t.truncatedRows : visible.length + " / " + sessionRows.length + " " + t.sessionsUnitShort,
						tools: h(react.Fragment, null,
							h("input", {
								className: "tu-input", type: "search", placeholder: t.sessionSearch,
								style: { minWidth: "196px" },
								value: query, onChange: (event) => setQuery(event.target.value)
							}),
							h(Seg, { value: filter, nav: "sessionFilter", options: [["all", t.filterAll], ["main", t.filterMain], ["sub", t.filterSub]], onChange: setFilter }))
					},
						h(DataTable, { columns, rows: visible, sort, onSort, rowKey: (row) => row.id, empty: t.sessionNoData })));
			}
			//#endregion
			//#region models
			function ModelsView({ agg, models, total, seq, series, dayModelChart, t }) {
				const top = models.length > 0 ? models[0] : null;
				const topShare = top !== null ? ratio(totalOf(top), total) : 0;
				const cells = [
					{ label: t.mModels, value: int(models.length) },
					{ label: t.mTokens, value: compact(total) },
					{ label: t.mTopShare, value: pct(topShare), foot: top !== null ? top.m : "—", footTitle: t.mTopModel },
					{ label: t.mCache, value: agg.req > 0 ? pct(cacheRate(agg)) : "—" },
					{ label: t.mRequests, value: int(agg.req) },
					{ label: t.mAvgTokReq, value: compact(ratio(total, agg.req)) },
					{ label: t.mixOutput, value: pct(ratio(agg.out, total)), foot: compact(agg.out) },
					{ label: t.mInputTotal, value: pct(ratio(agg.in + agg.cr, total)), foot: compact(agg.in + agg.cr) }
				];
				const topModels = models.slice(0, 5);
				const rest = models.slice(5);
				const restTokens = rest.reduce((acc, row) => acc + totalOf(row), 0);
				const donutRows = topModels.map((row) => totalOf(row));
				if (restTokens > 0) donutRows.push(restTokens);
				const R = 54, CIRC = 2 * Math.PI * R, GAP = 1.6;
				let acc = 0;
				const donutSegs = donutRows.map((value, index) => {
					const frac = total > 0 ? value / total : 0;
					const length = Math.max(0, frac * CIRC - GAP);
					const seg = h("circle", {
						key: index,
						cx: 72, cy: 72, r: R,
						fill: "none",
						stroke: index < topModels.length ? SERIES[index % SERIES.length] : OTHER_COLOR,
						strokeWidth: 18,
						strokeDasharray: length.toFixed(2) + " " + CIRC.toFixed(2),
						strokeDashoffset: (-acc * CIRC + GAP / 2).toFixed(2),
						transform: "rotate(-90 72 72)"
					});
					acc += frac;
					return seg;
				});
				const listRows = topModels.concat(restTokens > 0 ? [{ m: t.legendOther, total: restTokens, isOther: true }] : []);
				const rowsForTable = models;
				const maxModelTokens = models.length > 0 ? totalOf(models[0]) : 1;
				const modelColumns = [
					{
						key: "m", label: t.colModel, sortable: false,
						render: (row) => h("div", { className: "tu-cellStack" },
							h("span", { className: "tu-cellName", title: row.m }, row.m),
							h("span", { className: "tu-cellSub" }, int(row.req) + " " + t.reqUnit + " · " + compact(ratio(totalOf(row), row.req)) + " " + t.perReq))
					},
					{ key: "tokens", label: t.colTokens, num: true, render: (row) => h(ShareCell, { value: totalOf(row), max: maxModelTokens, text: compact(totalOf(row)), color: "var(--tu-accent)" }) },
					{ key: "in", label: t.colInput, num: true, render: (row) => compact(row.in) },
					{ key: "cr", label: t.colCacheRead, num: true, render: (row) => compact(row.cr) },
					{ key: "out", label: t.colOutput, num: true, render: (row) => compact(row.out) },
					{ key: "avg", label: t.colAvgReq, num: true, sortable: false, render: (row) => compact(ratio(totalOf(row), row.req)) },
					{ key: "cache", label: t.colCache, num: true, sortable: false, render: (row) => pct(cacheRate(row)) }
				];
				const [sort, setSort] = react.useState({ key: "tokens", dir: -1 });
				const onSort = (key) => setSort((prev) => prev.key === key ? { key, dir: -prev.dir } : { key, dir: -1 });
				const sorted = [...rowsForTable].sort((a, b) => {
					const key = sort.key;
					const va = key === "tokens" ? totalOf(a) : a[key] || 0;
					const vb = key === "tokens" ? totalOf(b) : b[key] || 0;
					return sort.dir * (va - vb);
				});
				const donut = h("div", { style: { position: "relative", width: "144px", height: "144px", flex: "none" } },
					h("svg", { width: 144, height: 144, viewBox: "0 0 144 144", role: "img", "aria-label": t.cardModelMix }, donutSegs),
					h("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" } },
						h("div", { className: "tu-num", style: { fontSize: "17px", fontWeight: 600 } }, compact(total)),
						h("div", { style: { fontSize: "10px", color: "var(--tu-ink3)" } }, t.mTokens)));
				const modelList = h("div", {
					style: { flex: "1", minWidth: "280px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(232px,1fr))", columnGap: "20px" }
				}, listRows.map((row, index) => {
					const value = row.isOther ? row.total : totalOf(row);
					return h("div", {
						key: index,
						style: { display: "flex", alignItems: "center", gap: "8px", padding: "5px 0", borderBottom: "1px solid var(--tu-hair)" }
					},
						h("i", { style: { width: "8px", height: "8px", borderRadius: "2px", flex: "none", background: index < topModels.length ? SERIES[index % SERIES.length] : OTHER_COLOR } }),
						h("span", { style: { flex: "1", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "12px" }, title: row.m }, row.m),
						h("span", { className: "tu-num", style: { fontSize: "12px" } }, compact(value)),
						h("span", { className: "tu-num", style: { fontSize: "11px", color: "var(--tu-ink3)", width: "46px", textAlign: "right" } }, pct(ratio(value, total))));
				}));
				const donutCard = h(Card, { title: t.cardModelMix, hint: t.cardModelMixHint },
					h("div", { style: { display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" } }, donut, modelList));
				const tableCard = h(Card, { title: t.cardModelTable, hint: int(agg.req) + " " + t.reqUnit },
					h(DataTable, { columns: modelColumns, rows: sorted, sort, onSort, rowKey: (row) => row.m, empty: t.modelNoData }));
				const trendCard = h(Card, { title: t.cardModelTrend },
					h(BarChart, {
						seq, series, valueOf: (d) => dayModelChart.get(d) || {}, height: 190,
						tip: (d) => {
							const per = dayModelChart.get(d) || {};
							let sum = 0;
							for (const key of Object.keys(per)) sum += per[key];
							return {
								title: d + " · " + compact(sum),
								rows: series.map((s) => ({ label: s.label, color: s.color, value: compact(per[s.key] || 0) }))
							};
						}
					}));
				return h(react.Fragment, null,
					h(MetricRail, { cells }),
					donutCard,
					tableCard,
					trendCard);
			}
			//#endregion
			//#region dashboard
			const PRESETS = [7, 14, 30, 90, "all", "custom"];
			function Dashboard() {
				useLocaleTick();
				const t = pick();
				const [view, setView] = react.useState("overview");
				const today = dateStr(new Date());
				const [range, setRange] = react.useState({ preset: 30, from: shiftDays(today, -29), to: today });
				const [heat, setHeat] = react.useState({ span: 180, metric: "tokens" });
				const [state, setState] = react.useState({ status: "loading" });
				const abortRef = react.useRef(null);
				const load = react.useCallback((refresh) => {
					if (abortRef.current) abortRef.current.abort();
					const controller = new AbortController();
					abortRef.current = controller;
					setState((prev) => prev.status === "ready" ? { status: "ready", data: prev.data, refreshing: true } : { status: "loading" });
					fetch("/token-usage/stats" + (refresh ? "?refresh=1" : ""), { signal: controller.signal }).then((response) => {
						if (!response.ok) return response.json().catch(() => ({})).then((body) => Promise.reject(new Error(body.error || "HTTP " + response.status)));
						return response.json();
					}).then((data) => setState({ status: "ready", data, refreshing: false }))
						.catch((error) => {
							if (controller.signal.aborted) return;
							setState((prev) => prev.status === "ready" && prev.data
								? { status: "ready", data: prev.data, refreshing: false }
								: { status: "error", message: error && error.message ? String(error.message) : String(error) });
						});
				}, []);
				react.useEffect(() => {
					load(false);
					return () => { if (abortRef.current) abortRef.current.abort(); };
				}, [load]);
				react.useEffect(() => {
					const onVisible = () => { if (document.visibilityState === "visible") load(false); };
					document.addEventListener("visibilitychange", onVisible);
					return () => document.removeEventListener("visibilitychange", onVisible);
				}, [load]);
				const header = h("div", { className: "tu-head" },
					h("div", { style: { minWidth: 0 } },
						h("div", { className: "tu-h1" }, t.title),
						state.status === "ready" ? h("div", { className: "tu-meta" },
							h("span", null, h("b", null, int(state.data.sessions)), " " + t.sessionsUnit),
							state.data.durationMs ? h("i") : null,
							state.data.durationMs ? h("span", null, t.scanLabel + " ", h("b", null, int(state.data.durationMs)), " ms") : null,
							h("i"),
							h("span", null, t.updatedLabel + " ", h("b", null, clockOf(state.data.generatedAt))),
							state.data.failed > 0 ? h("i") : null,
							state.data.failed > 0 ? h("span", { style: { color: "var(--tu-bad)" } }, int(state.data.failed), " " + t.failedUnit) : null) : null),
					h("div", { className: "tu-actions" },
						h("button", {
							type: "button", className: "tu-btn", disabled: state.status === "loading" || state.refreshing === true,
							onClick: () => load(true)
						}, state.refreshing === true ? h("span", { className: "tu-spin" }) : null, state.refreshing === true ? t.refreshing : t.refresh)));
				if (state.status === "loading") {
					return h("div", { className: "tu" }, header, h(Skeleton), h("div", { className: "tu-state" }, t.loading));
				}
				if (state.status === "error") {
					return h("div", { className: "tu" }, header, h(Card, { title: t.error },
						h("div", { className: "tu-muted" }, state.message),
						h("div", null, h("button", { type: "button", className: "tu-btn", onClick: () => load(true) }, t.retry))));
				}
				const data = state.data;
				const allDays = data.byDay || [];
				const firstDay = allDays.length > 0 ? allDays[0].d : today;
				const rangeFrom = range.preset === "all" ? firstDay : range.preset === "custom" ? range.from : shiftDays(today, -(range.preset - 1));
				const rangeTo = range.preset === "custom" ? range.to : today;
				const effFrom = rangeFrom <= rangeTo ? rangeFrom : rangeTo;
				const effTo = rangeTo;
				const seq = seqDays(effFrom, effTo);
				const days = allDays.filter((row) => row.d >= effFrom && row.d <= effTo);
				const daysMap = new Map(days.map((row) => [row.d, row]));
				const agg = sumDays(days);
				const span = seq.length;
				const prevFrom = shiftDays(effFrom, -span);
				const prevDays = allDays.filter((row) => row.d >= prevFrom && row.d < effFrom);
				const prevAgg = sumDays(prevDays);
				/* models within range */
				const modelMap = new Map();
				const dayModelMap = new Map();
				for (const row of data.byDayModel || []) {
					if (row.d < effFrom || row.d > effTo) continue;
					const found = modelMap.get(row.m) || { m: row.m, in: 0, cr: 0, cw: 0, out: 0, reason: 0, req: 0, turns: 0 };
					found.in += row.in; found.cr += row.cr; found.cw += row.cw; found.out += row.out; found.req += row.req;
					modelMap.set(row.m, found);
					let per = dayModelMap.get(row.d);
					if (per === undefined) { per = new Map(); dayModelMap.set(row.d, per); }
					per.set(row.m, totalOf(row));
				}
				const models = [...modelMap.values()].sort((a, b) => totalOf(b) - totalOf(a));
				const grand = models.reduce((acc, row) => acc + totalOf(row), 0);
				const topModels = models.slice(0, 5);
				const trackedModels = new Set(topModels.map((row) => row.m));
				const series = topModels.map((row, index) => ({ key: row.m, label: row.m, color: SERIES[index % SERIES.length] }));
				const dayModelChart = new Map();
				const chartSeries = series.slice();
				let hasOther = false;
				for (const [d, per] of dayModelMap) {
					const bucket = {};
					let other = 0;
					for (const [model, value] of per) {
						if (trackedModels.has(model)) bucket[model] = (bucket[model] || 0) + value;
						else other += value;
					}
					if (other > 0) { bucket.__other = other; hasOther = true; }
					dayModelChart.set(d, bucket);
				}
				if (hasOther) chartSeries.push({ key: "__other", label: t.legendOther, color: OTHER_COLOR });
				/* tools within range */
				const toolRows = ((data.toolStats && data.toolStats.byDayTool) || []).filter((row) => row.d >= effFrom && row.d <= effTo);
				const toolAgg = aggregateTools(toolRows);
				const namedCats = toolAgg.categories.filter((row) => row.c !== "other");
				const topCats = namedCats.slice(0, 5);
				const trackedCats = new Set(topCats.map((row) => row.c));
				const catSeries = topCats.map((row) => ({ key: row.c, label: categoryLabel(row.c), color: categoryColor(row.c) }));
				const restCalls = toolAgg.categories.filter((row) => !trackedCats.has(row.c)).reduce((acc, row) => acc + row.calls, 0);
				if (restCalls > 0) catSeries.push({ key: "__other", label: t.catOther, color: OTHER_COLOR });
				const catKeys = new Set([...trackedCats, "__other"]);
				const dayCatMap = buildDayCatMap(seq, toolRows, catKeys);
				/* sessions within range */
				const sessionRows = ((data.sessionStats && data.sessionStats.rows) || []).filter((row) => {
					const created = row.createdAt ? dateStr(new Date(row.createdAt)) : "";
					return created >= effFrom && created <= effTo;
				});
				const truncated = data.sessionStats ? data.sessionStats.rowsTruncated === true : false;
				const comparisonDays = ((data.agentComparison && data.agentComparison.byDay) || []).filter((row) => row.d >= effFrom && row.d <= effTo);
				/* heatmaps always use the full history, not the selected range */
				const heatMaps = { tokens: new Map(), tools: new Map(), sessions: new Map() };
				for (const row of allDays) {
					heatMaps.tokens.set(row.d, totalOf(row));
					heatMaps.tools.set(row.d, row.toolCalls || 0);
					heatMaps.sessions.set(row.d, row.activeSessions || 0);
				}
				const presets = PRESETS.map((preset) => [preset, preset === "all" ? t.rangeAll : preset === "custom" ? t.rangeCustom : t["range" + preset]]);
				const controls = h("div", { className: "tu-controls" },
					h(Seg, { value: range.preset, nav: "range", options: presets, onChange: (preset) => setRange((prev) => Object.assign({}, prev, { preset })) }),
					range.preset === "custom" ? h("div", { style: { display: "flex", alignItems: "center", gap: "6px" } },
						h("input", { type: "date", className: "tu-dateIn", value: range.from, max: range.to, onChange: (event) => setRange((prev) => Object.assign({}, prev, { from: event.target.value })) }),
						h("span", { className: "tu-muted" }, "→"),
						h("input", { type: "date", className: "tu-dateIn", value: range.to, min: range.from, max: today, onChange: (event) => setRange((prev) => Object.assign({}, prev, { to: event.target.value })) })) : null,
					h("div", { className: "tu-controlRight" },
						h("span", { className: "tu-num" }, dayLabel(effFrom) + " → " + dayLabel(effTo)),
						h("span", { className: "tu-muted" }, "·"),
						h("span", null, days.filter((row) => (row.req || 0) > 0 || (row.toolCalls || 0) > 0).length + " " + t.daysWithData)));
				const tabs = h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" } },
					h(Seg, {
						value: view,
						nav: "views",
						options: [["overview", t.tabOverview], ["tools", t.tabTools], ["sessions", t.tabSessions], ["models", t.tabModels]],
						onChange: setView
					}),
					h("div", { className: "tu-muted", style: { fontSize: "11px" } },
						t.rangeSpan + " " + span + " " + t.daysUnit + " · " + compact(totalOf(agg)) + " Tokens · " + int(agg.req) + " " + t.colReq));
				let content;
				if (view === "tools") {
					content = h(ToolsView, { agg, prevAgg, tools: toolAgg.tools, categories: toolAgg.categories, seq, dayCatMap, catSeries, t });
				} else if (view === "sessions") {
					content = h(SessionsView, { agg, prevAgg, daysMap, seq, sessionRows, truncated, comparisonDays, toolRows, t });
				} else if (view === "models") {
					content = h(ModelsView, { agg, models, total: grand, seq, series: chartSeries, dayModelChart, t });
				} else {
					content = h(OverviewView, {
						agg, prevAgg, days, daysMap, seq, series: chartSeries, dayModelMap: dayModelChart,
						models, today, span,
						heat: {
							values: heatMaps[heat.metric],
							span: heat.span,
							onSpan: (value) => setHeat((prev) => Object.assign({}, prev, { span: value })),
							metric: heat.metric,
							onMetric: (value) => setHeat((prev) => Object.assign({}, prev, { metric: value }))
						},
						t
					});
				}
				return h("div", { className: "tu" }, header, controls, tabs, content);
			}
			//#endregion
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "token-usage",
				order: 90,
				label: () => pick().nav
			}, () => h(Dashboard)));
		}
		exports.apply = apply;
		exports.inject = inject;
		exports.name = name;
		return module.exports;
	}
});
