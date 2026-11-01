window.__ModuleLoader__.load({
	id: "dsh-token-usage",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		//#region styles + copy
		const CSS = `
.tu-root{box-sizing:border-box;display:flex;flex-direction:column;gap:14px;font:var(--dsw-font-xs-13);color:var(--dsw-alias-label-primary);padding:4px 0 12px}
.tu-root *{box-sizing:border-box}
.tu-head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}
.tu-title{font-size:16px;font-weight:500;line-height:24px}
.tu-sub{color:var(--dsw-alias-label-caption);font:var(--dsw-font-xxs-12);margin-top:2px}
.tu-btn{cursor:pointer;border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-primary);border-radius:10px;padding:4px 12px;font:var(--dsw-font-xxs-12);flex:none}
.tu-btn:hover{background:var(--dsw-alias-interactive-bg-hover)}
.tu-btn:disabled{opacity:.5;cursor:default;background:transparent}
.tu-viewTabs{display:inline-flex;gap:2px;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;padding:3px;align-self:flex-start;flex-wrap:wrap}
.tu-viewTab{cursor:pointer;border:none;background:transparent;color:var(--dsw-alias-label-secondary);border-radius:9px;padding:5px 12px;font:var(--dsw-font-xs-13)}
.tu-viewTab:hover{background:var(--dsw-alias-interactive-bg-hover)}
.tu-viewTabActive{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);box-shadow:0 1px 2px rgba(0,0,0,.06)}
.tu-viewTabActive:hover{background:var(--dsw-alias-bg-layer-2)}
.tu-tabs{display:inline-flex;gap:2px;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;padding:3px;align-self:flex-start;flex-wrap:wrap}
.tu-tab{cursor:pointer;border:none;background:transparent;color:var(--dsw-alias-label-secondary);border-radius:9px;padding:5px 12px;font:var(--dsw-font-xs-13)}
.tu-tab:hover{background:var(--dsw-alias-interactive-bg-hover)}
.tu-tabActive{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);box-shadow:0 1px 2px rgba(0,0,0,.06)}
.tu-tabActive:hover{background:var(--dsw-alias-bg-layer-2)}
.tu-rangeRow{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.tu-dateIn{border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-primary);border-radius:9px;padding:4px 8px;font:var(--dsw-font-xxs-12)}
.tu-card{border:1px solid var(--dsw-alias-border-l2);border-radius:16px;padding:14px 16px;display:flex;flex-direction:column;gap:12px}
.tu-cardTitle{font-size:14px;font-weight:500;line-height:22px}
.tu-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
.tu-cell{border:1px solid var(--dsw-alias-border-l1);border-radius:12px;padding:10px 12px;display:flex;flex-direction:column;gap:2px;min-width:0}
.tu-cellValue{font-size:16px;font-weight:600;line-height:24px;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tu-cellValueSmall{font-size:13px;font-weight:600;line-height:20px;padding:2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tu-cellLabel{color:var(--dsw-alias-label-caption);font:var(--dsw-font-xxs-12);display:flex;align-items:center;gap:5px}
.tu-heatScroll{overflow-x:auto;padding-bottom:2px}
.tu-heat{display:flex;gap:3px}
.tu-heatDays{display:grid;grid-template-rows:repeat(7,var(--tu-cell,11px));gap:3px;width:28px;margin-right:6px;flex:none}
.tu-heatDayLabel{font-size:10px;line-height:var(--tu-cell,11px);color:var(--dsw-alias-label-caption)}
.tu-heatCols{display:flex;gap:3px}
.tu-heatCol{display:grid;grid-template-rows:repeat(7,var(--tu-cell,11px));gap:3px}
.tu-heatCell{width:var(--tu-cell,11px);height:var(--tu-cell,11px);border-radius:calc(var(--tu-cell,11px)/3.5);background:var(--dsw-alias-border-l1)}
.tu-heatL1{background:var(--dsw-static-deepseek-100)}
.tu-heatL2{background:var(--dsw-static-deepseek-300)}
.tu-heatL3{background:var(--dsw-static-deepseek-450)}
.tu-heatL4{background:var(--dsw-static-deepseek-600)}
.tu-heatL5{background:var(--dsw-static-deepseek-800)}
.tu-heatMonths{display:flex;gap:3px;margin-bottom:4px}
.tu-heatMonth{width:var(--tu-cell,11px);flex:none;font-size:10px;line-height:12px;color:var(--dsw-alias-label-caption);white-space:nowrap}
.tu-miniTabs{display:inline-flex;gap:2px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:2px;flex:none}
.tu-miniTab{cursor:pointer;border:none;background:transparent;color:var(--dsw-alias-label-secondary);border-radius:8px;padding:2px 8px;font:var(--dsw-font-xxs-12)}
.tu-miniTab:hover{background:var(--dsw-alias-interactive-bg-hover)}
.tu-miniTabActive{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2)}
.tu-miniTabActive:hover{background:var(--dsw-alias-bg-layer-2)}
.tu-heatHeadRight{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end}
.tu-heatLegend{display:flex;align-items:center;gap:4px;color:var(--dsw-alias-label-caption);font:var(--dsw-font-xxs-12)}
.tu-heatLegend .tu-heatCell{cursor:default}
.tu-heatHead{display:flex;align-items:center;justify-content:space-between;gap:8px}
.tu-trend{display:flex;gap:8px}
.tu-trendY{display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;width:44px;flex:none;color:var(--dsw-alias-label-caption);font-size:10px;line-height:14px;height:200px}
.tu-trendY2{display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;width:34px;flex:none;color:var(--dsw-alias-label-caption);font-size:10px;line-height:14px;height:200px}
.tu-trendMain{flex:1;min-width:0}
.tu-trendPlot{position:relative;height:200px}
.tu-trendGrid{position:absolute;left:0;right:0;border-top:1px solid var(--dsw-alias-border-l1)}
.tu-trendBars{position:absolute;inset:0;display:flex;align-items:flex-end;gap:2px}
.tu-trendCol{flex:1 1 0;min-width:3px;display:flex;flex-direction:column;justify-content:flex-end;height:100%}
.tu-trendStack{display:flex;flex-direction:column;border-radius:3px;overflow:hidden}
.tu-trendSeg{flex-shrink:1;flex-basis:0}
.tu-trendLine{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.tu-trendX{display:flex;gap:2px;margin-top:4px}
.tu-trendXCell{flex:1 1 0;min-width:3px;font-size:10px;line-height:14px;color:var(--dsw-alias-label-caption);white-space:nowrap}
.tu-legend{display:flex;flex-wrap:wrap;gap:12px;color:var(--dsw-alias-label-caption);font:var(--dsw-font-xxs-12)}
.tu-legend span{display:inline-flex;align-items:center;gap:5px}
.tu-dot{width:8px;height:8px;border-radius:2px;display:inline-block;flex:none}
.tu-lineDot{width:12px;height:2px;border-radius:1px;display:inline-block;flex:none;background:var(--dsw-static-deepseek-600)}
.tu-modelRow2{display:flex;gap:20px;align-items:center;flex-wrap:wrap}
.tu-donutWrap{position:relative;width:180px;height:180px;flex:none}
.tu-donutCenter{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;pointer-events:none}
.tu-donutTotal{font-size:20px;font-weight:600;font-variant-numeric:tabular-nums}
.tu-donutLabel{color:var(--dsw-alias-label-caption);font:var(--dsw-font-xxs-12)}
.tu-modelList{flex:1;min-width:240px;display:flex;flex-direction:column}
.tu-modelItem{display:flex;align-items:center;gap:10px;padding:7px 4px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.tu-modelItem:last-child{border-bottom:none}
.tu-modelMain{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:1px}
.tu-modelName{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tu-modelVal{flex:none;width:80px;text-align:right;font-variant-numeric:tabular-nums;font-weight:500}
.tu-modelPct{flex:none;width:50px;text-align:right;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.tu-stackBar{display:flex;height:12px;border-radius:6px;overflow:hidden;background:var(--dsw-alias-border-l1)}
.tu-stackSeg{flex-shrink:1;flex-basis:0;min-width:0;height:100%}
.tu-catLegend{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
.tu-catLegendItem{display:inline-flex;align-items:center;gap:5px;color:var(--dsw-alias-label-secondary);font:var(--dsw-font-xxs-12);white-space:nowrap}
.tu-badge{display:inline-flex;align-items:center;gap:4px;font:var(--dsw-font-xxs-12);color:var(--dsw-alias-label-secondary);white-space:nowrap}
.tu-badgeDot{width:7px;height:7px;border-radius:2px;display:inline-block;flex:none}
.tu-grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px}
.tu-rankList{display:flex;flex-direction:column}
.tu-rankRow{display:grid;grid-template-columns:minmax(0,1fr) 64px;gap:10px;align-items:center;padding:7px 0;border-bottom:1px solid var(--dsw-alias-border-l1)}
.tu-rankRow:last-child{border-bottom:none}
.tu-rankMain{min-width:0}
.tu-rankTop{display:flex;justify-content:space-between;gap:8px;min-width:0}
.tu-rankName{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tu-rankSub{color:var(--dsw-alias-label-caption);font:var(--dsw-font-xxs-12);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:none;max-width:50%}
.tu-rankBar{height:4px;border-radius:2px;background:var(--dsw-alias-border-l1);overflow:hidden;margin-top:4px}
.tu-rankFill{height:100%;border-radius:2px}
.tu-rankVal{text-align:right;font-variant-numeric:tabular-nums;font-weight:500}
.tu-toolHead{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
.tu-tableWrap{overflow-x:auto}
.tu-table{width:100%;border-collapse:collapse;font:var(--dsw-font-xxs-12)}
.tu-th{text-align:left;color:var(--dsw-alias-label-caption);font-weight:400;padding:6px 8px;border-bottom:1px solid var(--dsw-alias-border-l2);white-space:nowrap}
.tu-td{padding:7px 8px;border-bottom:1px solid var(--dsw-alias-border-l1);vertical-align:top;white-space:nowrap}
.tu-tr:hover{background:var(--dsw-alias-interactive-bg-hover)}
.tu-tableMain{display:flex;flex-direction:column;gap:2px;min-width:0;max-width:320px}
.tu-tableName{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tu-tableSub{color:var(--dsw-alias-label-caption);font:var(--dsw-font-xxs-12);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tu-tableTools{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:flex-end}
.tu-compare{display:grid;grid-template-columns:minmax(96px,1fr) minmax(0,1.2fr) minmax(0,1.2fr);gap:7px 14px;align-items:center}
.tu-compareHead{color:var(--dsw-alias-label-caption);font:var(--dsw-font-xxs-12);padding-bottom:2px}
.tu-compareMetric{color:var(--dsw-alias-label-secondary);font:var(--dsw-font-xxs-12)}
.tu-compareCell{display:flex;flex-direction:column;gap:3px;min-width:0}
.tu-compareVal{font-variant-numeric:tabular-nums;text-align:right;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tu-compareBar{height:5px;border-radius:3px;background:var(--dsw-alias-border-l1);overflow:hidden}
.tu-compareFill{height:100%;border-radius:3px}
.tu-compareFoot{display:flex;flex-direction:column;gap:3px;margin-top:4px}
.tu-empty{padding:18px 0;color:var(--dsw-alias-label-secondary);text-align:center}
.tu-state{color:var(--dsw-alias-label-secondary);padding:32px 0;text-align:center}
`;
		const DICT = {
			zh: {
				nav: "用量统计",
				title: "用量统计",
				loading: "正在统计所有会话的模型与工具用量…",
				error: "统计失败",
				retry: "重试",
				refresh: "刷新",
				refreshing: "刷新中…",
				empty: "所选范围内没有数据",
				updatedAt: "统计截至",
				sessionsUnit: "个会话",
				failedUnit: "个读取失败",
				range7: "最近 7 天",
				range14: "最近 14 天",
				range30: "最近 30 天",
				range90: "最近 90 天",
				rangeCustom: "自定义",
				tabOverview: "总览",
				tabTools: "工具",
				tabSessions: "会话",
				tabModels: "模型",
				statTokens: "Tokens 用量",
				statTurns: "完成轮次",
				statReqs: "请求数量",
				statDays: "活跃天数",
				statCache: "平均缓存命中率",
				statTop: "最常用模型",
				statToolCalls: "工具调用",
				statToolErrRate: "工具错误率",
				statSessions: "会话数",
				statMainSub: "主 / 子会话",
				statAvgTurns: "平均轮次/会话",
				statAvgTools: "平均工具调用/会话",
				statSteps: "步数",
				statAvgLlm: "平均模型耗时/轮",
				statUserMsgs: "用户消息",
				statAsstMsgs: "助手消息",
				statTurnOk: "轮次成功率",
				statAvgTokens: "平均 Tokens/会话",
				statAvgLatency: "平均工具耗时",
				statToolKinds: "工具种类",
				statSkillCalls: "技能调用",
				statMcpCalls: "MCP 调用",
				heatTitle: "活跃热力图",
				heatLess: "较少",
				heatMore: "较多",
				heat180: "近 180 天",
				heat365: "近 1 年",
				weekMon: "周一",
				weekWed: "周三",
				weekFri: "周五",
				trendTitle: "按天 Token 趋势",
				legendCache: "缓存命中率",
				legendOther: "其他",
				modelTitle: "模型用量",
				toolCategoryTitle: "工具分类",
				toolTrendTitle: "工具调用趋势",
				toolTopTitle: "Top 工具",
				toolSkillsTitle: "技能调用",
				toolMcpTitle: "MCP 服务",
				toolNoData: "所选范围内没有工具调用",
				colTool: "工具",
				colCategory: "分类",
				colCalls: "调用",
				colErrRate: "错误率",
				colAvgMs: "平均耗时",
				colShare: "占比",
				sessionTrendTitle: "每日会话",
				sessionStartedLegend: "新建",
				sessionActiveLegend: "活跃",
				turnOutcomeTitle: "轮次结果",
				turnOk: "完成",
				turnErr: "失败",
				turnAbort: "中止",
				turnInterrupt: "中断",
				noOutcome: "没有轮次结果",
				workspaceTitle: "工作区分布",
				sessionTable: "会话明细",
				sessionNoData: "所选范围内没有会话",
				subagent: "子会话",
				colSession: "会话",
				colCreated: "创建",
				colTurns: "轮次",
				colTools: "工具",
				colTokens: "Tokens",
				colErrors: "错误",
				sortRecent: "最近",
				sortTokens: "Tokens",
				sortTools: "工具",
				sortTurns: "轮次",
				truncatedRows: "明细仅显示最近 1000 个会话",
				compareTitle: "主 Agent vs 子 Agent",
				compareMetric: "指标",
				compareMain: "主 Agent",
				compareSub: "子 Agent",
				compareSessions: "新建会话",
				compareTokens: "Tokens 用量",
				compareToolCalls: "工具调用",
				compareTurns: "完成轮次",
				compareAvgTokens: "平均 Tokens/会话",
				compareAvgTools: "平均工具调用/会话",
				compareAvgActive: "平均活跃耗时/会话",
				compareSuccess: "成功率",
				compareSubSources: "子 Agent 来源",
				compareSubCalls: "调用方式",
				compareNoSub: "所选范围内没有子 Agent",
				splitTrendTitle: "每日主 / 子对比",
				splitTokens: "Tokens",
				splitTools: "工具调用",
				filterAll: "全部",
				filterMain: "主",
				filterSub: "子",
				kindMain: "主",
				kindSub: "子",
				kindTeam: "子·团队",
				kindWorkflow: "子·Workflow",
				catMcp: "MCP",
				catSkill: "技能",
				catCli: "CLI",
				catFile: "文件",
				catWeb: "网络",
				catAgent: "Agent",
				catSession: "会话",
				catOther: "其他",
				errorsShort: "错误",
				toolsShort: "工具"
			},
			en: {
				nav: "Usage Stats",
				title: "Usage Stats",
				loading: "Aggregating model and tool usage across all sessions…",
				error: "Aggregation failed",
				retry: "Retry",
				refresh: "Refresh",
				refreshing: "Refreshing…",
				empty: "No data in the selected range",
				updatedAt: "updated",
				sessionsUnit: "sessions",
				failedUnit: "failed to load",
				range7: "Last 7 days",
				range14: "Last 14 days",
				range30: "Last 30 days",
				range90: "Last 90 days",
				rangeCustom: "Custom",
				tabOverview: "Overview",
				tabTools: "Tools",
				tabSessions: "Sessions",
				tabModels: "Models",
				statTokens: "Tokens used",
				statTurns: "Completed turns",
				statReqs: "Requests",
				statDays: "Active days",
				statCache: "Avg cache hit rate",
				statTop: "Top model",
				statToolCalls: "Tool calls",
				statToolErrRate: "Tool error rate",
				statSessions: "Sessions",
				statMainSub: "Main / sub",
				statAvgTurns: "Turns / session",
				statAvgTools: "Tool calls / session",
				statSteps: "Steps",
				statAvgLlm: "Model time / turn",
				statUserMsgs: "User messages",
				statAsstMsgs: "Assistant messages",
				statTurnOk: "Turn success rate",
				statAvgTokens: "Tokens / session",
				statAvgLatency: "Avg tool latency",
				statToolKinds: "Tool kinds",
				statSkillCalls: "Skill calls",
				statMcpCalls: "MCP calls",
				heatTitle: "Activity heatmap",
				heatLess: "Less",
				heatMore: "More",
				heat180: "Last 180 days",
				heat365: "Last 1 year",
				weekMon: "Mon",
				weekWed: "Wed",
				weekFri: "Fri",
				trendTitle: "Daily token trend",
				legendCache: "Cache hit rate",
				legendOther: "Other",
				modelTitle: "Model usage",
				toolCategoryTitle: "Tool categories",
				toolTrendTitle: "Tool call trend",
				toolTopTitle: "Top tools",
				toolSkillsTitle: "Skills",
				toolMcpTitle: "MCP servers",
				toolNoData: "No tool calls in the selected range",
				colTool: "Tool",
				colCategory: "Category",
				colCalls: "Calls",
				colErrRate: "Error rate",
				colAvgMs: "Avg latency",
				colShare: "Share",
				sessionTrendTitle: "Daily sessions",
				sessionStartedLegend: "Started",
				sessionActiveLegend: "Active",
				turnOutcomeTitle: "Turn outcomes",
				turnOk: "Completed",
				turnErr: "Failed",
				turnAbort: "Aborted",
				turnInterrupt: "Interrupted",
				noOutcome: "No turn outcomes",
				workspaceTitle: "Workspaces",
				sessionTable: "Sessions",
				sessionNoData: "No sessions in the selected range",
				subagent: "Subagent",
				colSession: "Session",
				colCreated: "Created",
				colTurns: "Turns",
				colTools: "Tools",
				colTokens: "Tokens",
				colErrors: "Errors",
				sortRecent: "Recent",
				sortTokens: "Tokens",
				sortTools: "Tools",
				sortTurns: "Turns",
				truncatedRows: "Detail capped at the newest 1000 sessions",
				compareTitle: "Main vs sub agents",
				compareMetric: "Metric",
				compareMain: "Main",
				compareSub: "Sub",
				compareSessions: "New sessions",
				compareTokens: "Tokens",
				compareToolCalls: "Tool calls",
				compareTurns: "Completed turns",
				compareAvgTokens: "Tokens / session",
				compareAvgTools: "Tool calls / session",
				compareAvgActive: "Active time / session",
				compareSuccess: "Success rate",
				compareSubSources: "Sub sources",
				compareSubCalls: "Invocations",
				compareNoSub: "No sub agents in the selected range",
				splitTrendTitle: "Daily main vs sub",
				splitTokens: "Tokens",
				splitTools: "Tool calls",
				filterAll: "All",
				filterMain: "Main",
				filterSub: "Sub",
				kindMain: "Main",
				kindSub: "Sub",
				kindTeam: "Sub·team",
				kindWorkflow: "Sub·workflow",
				catMcp: "MCP",
				catSkill: "Skill",
				catCli: "CLI",
				catFile: "File",
				catWeb: "Web",
				catAgent: "Agent",
				catSession: "Session",
				catOther: "Other",
				errorsShort: "errors",
				toolsShort: "tools"
			}
		};
		const SERIES_COLORS = [
			"var(--dsw-static-blue-500)",
			"var(--dsw-static-deepseek-500)",
			"var(--dsw-static-amber-500)",
			"var(--dsw-static-green-500)",
			"var(--dsw-static-neutral-bluish-400)",
			"var(--dsw-static-red-400)"
		];
		const OTHER_COLOR = "var(--dsw-static-neutral-300)";
		const CATEGORY_COLORS = {
			mcp: "var(--dsw-static-blue-500)",
			skill: "var(--dsw-static-deepseek-500)",
			cli: "var(--dsw-static-amber-500)",
			file: "var(--dsw-static-green-500)",
			web: "var(--dsw-static-neutral-bluish-400)",
			agent: "var(--dsw-static-red-400)",
			session: "var(--dsw-static-deepseek-300)",
			other: "var(--dsw-static-neutral-300)"
		};
		const MAIN_COLOR = "var(--dsw-static-blue-500)";
		const SUB_COLOR = "var(--dsw-static-amber-500)";
		const TEAM_COLOR = "var(--dsw-static-green-500)";
		const WORKFLOW_COLOR = "var(--dsw-static-deepseek-500)";
		//#endregion
		//#region plugin
		const name = "token-usage-ui";
		const inject = ["slots"];
		function apply(ctx) {
			const h = react.createElement;
			ctx.effect(() => {
				const tag = document.createElement("style");
				tag.textContent = CSS;
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
			//#region helpers
			const pad2 = (v) => String(v).padStart(2, "0");
			const dateStr = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
			const parseStr = (s) => { const p = s.split("-"); return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])); };
			const shiftDays = (s, n) => { const d = parseStr(s); d.setDate(d.getDate() + n); return dateStr(d); };
			const seqDays = (from, to) => { const out = []; let cur = from; let guard = 0; while (cur <= to && guard < 400) { out.push(cur); cur = shiftDays(cur, 1); guard += 1; } return out; };
			const fmtInt = (v) => Number(v).toLocaleString("en-US");
			const compact = (v) => {
				if (v >= 1e9) return (v / 1e9).toFixed(2) + "B";
				if (v >= 1e6) return (v / 1e6).toFixed(1) + "M";
				if (v >= 1e3) return (v / 1e3).toFixed(1) + "K";
				return fmtInt(v);
			};
			const amount = (v) => isZh() ? (v / 1e4).toFixed(1) + " 万" : compact(v);
			const fmtPct = (v) => Number.isFinite(v) ? (v * 100).toFixed(1) + "%" : "—";
			const fmtDuration = (ms) => {
				if (!Number.isFinite(ms) || ms <= 0) return "—";
				if (ms < 1000) return Math.round(ms) + " ms";
				if (ms < 60000) return (ms / 1000).toFixed(1) + " s";
				if (ms < 3600000) return (ms / 60000).toFixed(1) + " min";
				return (ms / 3600000).toFixed(1) + " h";
			};
			const fmtTime = (ts) => {
				if (!ts) return "—";
				const d = new Date(ts);
				return `${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
			};
			const shortCwd = (p) => {
				if (!p) return "—";
				const parts = String(p).replace(/\/+$/, "").split("/");
				return parts[parts.length - 1] || p;
			};
			const totalOf = (row) => row.in + row.cr + row.cw + row.out;
			const cacheRate = (row) => { const denom = row.in + row.cr; return denom > 0 ? row.cr / denom : 0; };
			const monthLabel = (d) => isZh() ? (d.getMonth() + 1) + "月" : d.toLocaleString("en", { month: "short" });
			const categoryColor = (c) => CATEGORY_COLORS[c] || OTHER_COLOR;
			const categoryLabel = (c) => {
				const t = pick();
				const map = { mcp: t.catMcp, skill: t.catSkill, cli: t.catCli, file: t.catFile, web: t.catWeb, agent: t.catAgent, session: t.catSession, other: t.catOther };
				return map[c] || c;
			};
			const mcpServerOf = (n) => { const parts = String(n).split("__"); return parts.length > 1 && parts[1] ? parts[1] : "unknown"; };
			const mcpToolOf = (n) => { const parts = String(n).split("__"); return parts.length > 2 ? parts.slice(2).join("__") : String(n); };
			const toolLabel = (row) => {
				if (row.c === "skill") return row.n.indexOf("skill:") === 0 ? row.n.slice(6) : row.n;
				if (row.c === "mcp") return mcpToolOf(row.n);
				return row.n;
			};
			const toolSub = (row) => row.c === "mcp" ? mcpServerOf(row.n) : "";
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
					if (found === undefined) {
						map.set(row.n, { n: row.n, c: row.c, calls: row.calls, errs: row.errs, ms: row.ms, measured: row.measured });
					} else {
						found.calls += row.calls; found.errs += row.errs; found.ms += row.ms; found.measured += row.measured;
					}
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
				key: row.n,
				name: toolLabel(row),
				value: row.calls,
				calls: row.calls,
				errs: row.errs,
				ms: row.ms,
				measured: row.measured,
				color: CATEGORY_COLORS.skill,
				sub: row.errs > 0 ? `${row.errs} ${t.errorsShort}` : ""
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
				return [...map.values()].sort((a, b) => b.value - a.value).map((row) => Object.assign({}, row, {
					sub: `${row.tools} ${t.toolsShort} · ${row.errs} ${t.errorsShort}`
				}));
			};
			const aggregateWorkspaces = (rows, t) => {
				const map = new Map();
				for (const row of rows) {
					const key = row.cwd || "—";
					const found = map.get(key);
					if (found === undefined) map.set(key, { key, name: shortCwd(key), value: 1, sessions: 1, tokens: row.tokens, toolCalls: row.toolCalls, color: SERIES_COLORS[0] });
					else { found.value += 1; found.sessions += 1; found.tokens += row.tokens; found.toolCalls += row.toolCalls; }
				}
				return [...map.values()].sort((a, b) => b.sessions - a.sessions || b.tokens - a.tokens).slice(0, 8).map((row) => Object.assign({}, row, {
					sub: `${row.sessions} ${t.sessionsUnit} · ${compact(row.tokens)} tokens`
				}));
			};
			const buildDayCatMap = (seq, rows, seriesKeys) => {
				const map = new Map();
				for (const d of seq) map.set(d, new Map());
				for (const row of rows) {
					const per = map.get(row.d);
					if (per === undefined) continue;
					const key = seriesKeys.has(row.c) ? row.c : "other";
					per.set(key, (per.get(key) || 0) + row.calls);
				}
				return map;
			};
			const turnOutcomeRows = (agg, t) => [
				{ key: "ok", label: t.turnOk, value: agg.turnOk, color: "var(--dsw-static-green-500)" },
				{ key: "err", label: t.turnErr, value: agg.turnErr, color: "var(--dsw-static-red-400)" },
				{ key: "abort", label: t.turnAbort, value: agg.turnAbort, color: "var(--dsw-static-amber-500)" },
				{ key: "interrupt", label: t.turnInterrupt, value: agg.turnInterrupt, color: "var(--dsw-static-neutral-bluish-400)" }
			];
			const SPLIT_KEYS = ["sessions", "tokens", "req", "turns", "steps", "toolCalls", "toolErrs", "llmMs", "toolMs", "toolMeasured", "ok", "err", "abort", "interrupt"];
			const newSplitAgg = () => {
				const agg = {};
				for (const key of SPLIT_KEYS) agg[key] = 0;
				return agg;
			};
			const sumComparison = (rows, side) => {
				const agg = newSplitAgg();
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
			//#endregion
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
			//#region components
			function StatCards({ cells }) {
				return h("div", { className: "tu-cards" }, cells.map((cell, index) => h("div", { className: "tu-cell", key: index },
					h("div", { className: cell.small ? "tu-cellValueSmall" : "tu-cellValue", title: String(cell.value) }, cell.value),
					h("div", { className: "tu-cellLabel" }, cell.label))));
			}
			function Heatmap({ byDayMap }) {
				const t = pick();
				const [span, setSpan] = react.useState(180);
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
				const todayStr = dateStr(new Date());
				const start = parseStr(shiftDays(todayStr, -(span - 1)));
				start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
				const weeks = [];
				const cursor = new Date(start);
				while (dateStr(cursor) <= todayStr) {
					const col = [];
					for (let i = 0; i < 7; i++) {
						const d = dateStr(cursor);
						col.push({ d: d, v: byDayMap.get(d) || 0 });
						cursor.setDate(cursor.getDate() + 1);
					}
					weeks.push(col);
				}
				const GAP = 3, LEFT_W = 37, MIN_CELL = 11, MAX_CELL = 40;
				let cellSize = MIN_CELL;
				if (availW > 0 && weeks.length > 0) {
					cellSize = (availW - LEFT_W - (weeks.length - 1) * GAP) / weeks.length;
					cellSize = Math.round(cellSize * 100) / 100;
					cellSize = Math.max(MIN_CELL, Math.min(MAX_CELL, cellSize));
				}
				react.useEffect(() => {
					const el = scrollRef.current;
					if (el) el.scrollLeft = el.scrollWidth - el.clientWidth;
				}, [span, cellSize]);
				let max = 1;
				for (const col of weeks) for (const dayCell of col) max = Math.max(max, dayCell.v);
				const levelClass = (v) => v <= 0 ? "" : v < max * 0.2 ? " tu-heatL1" : v < max * 0.4 ? " tu-heatL2" : v < max * 0.6 ? " tu-heatL3" : v < max * 0.8 ? " tu-heatL4" : " tu-heatL5";
				const months = weeks.map((col, index) => {
					const first = parseStr(col[0].d);
					if (index === 0 || first.getMonth() !== parseStr(weeks[index - 1][0].d).getMonth()) return monthLabel(first);
					return "";
				});
				const dayLabels = [t.weekMon, "", t.weekWed, "", t.weekFri, "", ""];
				return h("div", { className: "tu-card" },
					h("div", { className: "tu-heatHead" },
						h("div", { className: "tu-cardTitle" }, t.heatTitle),
						h("div", { className: "tu-heatHeadRight" },
							h("div", { className: "tu-miniTabs" }, [[180, t.heat180], [365, t.heat365]].map((entry) => h("button", {
								key: String(entry[0]),
								className: "tu-miniTab" + (span === entry[0] ? " tu-miniTabActive" : ""),
								onClick: () => setSpan(entry[0])
							}, entry[1]))),
							h("div", { className: "tu-heatLegend" }, t.heatLess,
								["", " tu-heatL1", " tu-heatL2", " tu-heatL3", " tu-heatL4", " tu-heatL5"].map((c) => h("i", { key: c || "e", className: "tu-heatCell" + c })),
								t.heatMore))),
					h("div", { className: "tu-heatScroll", ref: scrollRef }, h("div", { style: { "--tu-cell": cellSize + "px" } },
						h("div", { className: "tu-heatMonths", style: { marginLeft: LEFT_W + "px" } }, months.map((m, i) => h("div", { className: "tu-heatMonth", key: i }, m))),
						h("div", { className: "tu-heat" },
							h("div", { className: "tu-heatDays" }, dayLabels.map((label, i) => h("div", { className: "tu-heatDayLabel", key: i }, label))),
							h("div", { className: "tu-heatCols" }, weeks.map((col, wi) => {
								const cells = col.map((dayCell) => h("div", {
									className: "tu-heatCell" + levelClass(dayCell.v),
									key: dayCell.d,
									title: `${dayCell.d} · ${fmtInt(dayCell.v)} tokens`
								}));
								return h("div", { className: "tu-heatCol", key: wi }, cells);
							}))))));
			}
			function TrendChart({ seq, dayModelMap, series, daysMap }) {
				const t = pick();
				const n = seq.length;
				let max = 1;
				for (const d of seq) max = Math.max(max, totalOf(daysMap.get(d) || { in: 0, cr: 0, cw: 0, out: 0 }));
				const points = [];
				let carry = 0;
				for (let i = 0; i < n; i++) {
					const row = daysMap.get(seq[i]);
					if (row && row.req > 0) carry = cacheRate(row);
					points.push([(i + 0.5) / n * 100, 100 - carry * 100]);
				}
				const step = Math.max(1, Math.ceil(n / 8));
				return h("div", null,
					h("div", { className: "tu-trend" },
						h("div", { className: "tu-trendY" }, [1, 0.75, 0.5, 0.25, 0].map((f) => h("div", { key: f }, compact(max * f)))),
						h("div", { className: "tu-trendMain" },
							h("div", { className: "tu-trendPlot" },
								[0, 25, 50, 75, 100].map((p) => h("div", { className: "tu-trendGrid", key: p, style: { top: p + "%" } })),
								h("div", { className: "tu-trendBars" }, seq.map((d) => {
									const row = daysMap.get(d) || { in: 0, cr: 0, cw: 0, out: 0 };
									const total = totalOf(row);
									const per = dayModelMap.get(d) || new Map();
									let other = total;
									const segs = series.map((s) => {
										const v = per.get(s.key) || 0;
										other -= v;
										return h("div", { className: "tu-trendSeg", key: s.key, style: { flexGrow: v, background: s.color } });
									});
									segs.push(h("div", { className: "tu-trendSeg", key: "other", style: { flexGrow: Math.max(0, other), background: OTHER_COLOR } }));
									return h("div", { className: "tu-trendCol", key: d }, h("div", {
										className: "tu-trendStack",
										style: { height: total > 0 ? Math.max(2, Math.round(total / max * 100)) + "%" : "0%" },
										title: `${d} · ${fmtInt(total)} tokens · ${t.legendCache} ${(cacheRate(row) * 100).toFixed(0)}%`
									}, segs));
								})),
								h("svg", { className: "tu-trendLine", viewBox: "0 0 100 100", preserveAspectRatio: "none" },
									h("polyline", {
										fill: "none",
										stroke: "var(--dsw-static-deepseek-600)",
										strokeWidth: 2,
										vectorEffect: "non-scaling-stroke",
										points: points.map((p) => p[0].toFixed(2) + "," + p[1].toFixed(2)).join(" ")
									}))),
							h("div", { className: "tu-trendX" }, seq.map((d, i) => h("div", { className: "tu-trendXCell", key: d }, i % step === 0 ? d.slice(5) : "")))),
						h("div", { className: "tu-trendY2" }, [100, 75, 50, 25, 0].map((p) => h("div", { key: p }, p + "%")))),
					h("div", { className: "tu-legend", style: { marginTop: "10px" } },
						series.map((s) => h("span", { key: s.key }, h("i", { className: "tu-dot", style: { background: s.color } }), s.label)),
						h("span", { key: "other" }, h("i", { className: "tu-dot", style: { background: OTHER_COLOR } }), t.legendOther),
						h("span", { key: "cache" }, h("i", { className: "tu-lineDot" }), t.legendCache)));
			}
			function ModelUsage({ models, grand }) {
				const t = pick();
				const top = models.slice(0, 5);
				const restTotal = models.slice(5).reduce((acc, row) => acc + totalOf(row), 0);
				const donutRows = top.map((row) => totalOf(row));
				if (restTotal > 0) donutRows.push(restTotal);
				const R = 62, C = 2 * Math.PI * R;
				let acc = 0;
				const segs = donutRows.map((v, i) => {
					const frac = grand > 0 ? v / grand : 0;
					const el = h("circle", {
						key: i,
						cx: 90, cy: 90, r: R,
						fill: "none",
						stroke: i < top.length ? SERIES_COLORS[i] : OTHER_COLOR,
						strokeWidth: 26,
						strokeDasharray: `${(frac * C).toFixed(2)} ${C.toFixed(2)}`,
						strokeDashoffset: (-acc * C).toFixed(2),
						transform: "rotate(-90 90 90)"
					});
					acc += frac;
					return el;
				});
				const listRows = top.concat(restTotal > 0 ? [{ m: t.legendOther, total: restTotal, isOther: true }] : []);
				return h("div", { className: "tu-card" },
					h("div", { className: "tu-cardTitle" }, t.modelTitle),
					h("div", { className: "tu-modelRow2" },
						h("div", { className: "tu-donutWrap" },
							h("svg", { width: 180, height: 180, viewBox: "0 0 180 180" }, segs),
							h("div", { className: "tu-donutCenter" },
								h("div", { className: "tu-donutTotal" }, compact(grand)),
								h("div", { className: "tu-donutLabel" }, t.statTokens))),
						h("div", { className: "tu-modelList" }, listRows.map((row, i) => {
							const v = row.isOther ? row.total : totalOf(row);
							const pct = grand > 0 ? v / grand * 100 : 0;
							return h("div", { className: "tu-modelItem", key: i },
								h("i", { className: "tu-dot", style: { background: i < top.length ? SERIES_COLORS[i] : OTHER_COLOR } }),
								h("div", { className: "tu-modelMain" },
									h("div", { className: "tu-modelName", title: row.m }, row.m)),
								h("div", { className: "tu-modelVal", title: fmtInt(v) }, amount(v)),
								h("div", { className: "tu-modelPct" }, pct.toFixed(1) + "%"));
						}))));
			}
			function CategoryBar({ rows, total }) {
				const t = pick();
				if (rows.length === 0) return h("div", { className: "tu-empty" }, t.toolNoData);
				return h("div", null,
					h("div", { className: "tu-stackBar" }, rows.map((row) => h("div", {
						className: "tu-stackSeg",
						key: row.c,
						style: { flexGrow: row.calls, background: categoryColor(row.c) }
					}))),
					h("div", { className: "tu-catLegend" }, rows.map((row) => h("span", { className: "tu-catLegendItem", key: row.c },
						h("i", { className: "tu-badgeDot", style: { background: categoryColor(row.c) } }),
						categoryLabel(row.c),
						` ${fmtInt(row.calls)} (${fmtPct(total > 0 ? row.calls / total : 0)})`))));
			}
			function ToolTrend({ seq, dayCatMap, series }) {
				const t = pick();
				const n = seq.length;
				let max = 1;
				for (const d of seq) {
					const per = dayCatMap.get(d);
					let total = 0;
					if (per !== undefined) for (const value of per.values()) total += value;
					max = Math.max(max, total);
				}
				const step = Math.max(1, Math.ceil(n / 8));
				return h("div", null,
					h("div", { className: "tu-trend" },
						h("div", { className: "tu-trendY" }, [1, 0.75, 0.5, 0.25, 0].map((f) => h("div", { key: f }, fmtInt(Math.round(max * f))))),
						h("div", { className: "tu-trendMain" },
							h("div", { className: "tu-trendPlot" },
								[0, 25, 50, 75, 100].map((p) => h("div", { className: "tu-trendGrid", key: p, style: { top: p + "%" } })),
								h("div", { className: "tu-trendBars" }, seq.map((d) => {
									const per = dayCatMap.get(d) || new Map();
									let total = 0;
									for (const value of per.values()) total += value;
									const segs = series.map((s) => h("div", {
										className: "tu-trendSeg",
										key: s.key,
										style: { flexGrow: per.get(s.key) || 0, background: s.color }
									}));
									return h("div", { className: "tu-trendCol", key: d }, h("div", {
										className: "tu-trendStack",
										style: { height: total > 0 ? Math.max(2, Math.round(total / max * 100)) + "%" : "0%" },
										title: `${d} · ${fmtInt(total)} ${t.statToolCalls}`
									}, segs));
								}))),
							h("div", { className: "tu-trendX" }, seq.map((d, i) => h("div", { className: "tu-trendXCell", key: d }, i % step === 0 ? d.slice(5) : "")))),
						h("div", { className: "tu-trendY2" })),
					h("div", { className: "tu-legend", style: { marginTop: "10px" } },
						series.map((s) => h("span", { key: s.key }, h("i", { className: "tu-dot", style: { background: s.color } }), s.label))));
			}
			function RankList({ rows, empty }) {
				if (rows.length === 0) return h("div", { className: "tu-empty" }, empty);
				const max = rows[0].value > 0 ? rows[0].value : 1;
				return h("div", { className: "tu-rankList" }, rows.slice(0, 10).map((row) => h("div", { className: "tu-rankRow", key: row.key },
					h("div", { className: "tu-rankMain" },
						h("div", { className: "tu-rankTop" },
							h("span", { className: "tu-rankName", title: row.name }, row.name),
							h("span", { className: "tu-rankSub" }, row.sub || "")),
						h("div", { className: "tu-rankBar" }, h("div", { className: "tu-rankFill", style: { width: Math.max(2, Math.round(row.value / max * 100)) + "%", background: row.color } }))),
					h("div", { className: "tu-rankVal" }, fmtInt(row.value)))));
			}
			function ToolTable({ tools, totalCalls }) {
				const t = pick();
				if (tools.length === 0) return h("div", { className: "tu-empty" }, t.toolNoData);
				const rows = tools.slice(0, 20);
				return h("div", { className: "tu-tableWrap" }, h("table", { className: "tu-table" },
					h("thead", null, h("tr", null, [t.colTool, t.colCategory, t.colCalls, t.colErrRate, t.colAvgMs, t.colShare].map((label, i) => h("th", {
						className: "tu-th",
						key: i,
						style: i >= 2 ? { textAlign: "right" } : undefined
					}, label)))),
					h("tbody", null, rows.map((row) => {
						const rate = row.calls > 0 ? row.errs / row.calls : 0;
						const avg = row.measured > 0 ? row.ms / row.measured : 0;
						return h("tr", { className: "tu-tr", key: row.n },
							h("td", { className: "tu-td" }, h("div", { className: "tu-tableMain" },
								h("div", { className: "tu-tableName", title: row.n }, toolLabel(row)),
								h("div", { className: "tu-tableSub", title: row.n }, toolSub(row)))),
							h("td", { className: "tu-td" }, h("span", { className: "tu-badge" },
								h("i", { className: "tu-badgeDot", style: { background: categoryColor(row.c) } }), categoryLabel(row.c))),
							h("td", { className: "tu-td", style: { textAlign: "right" } }, fmtInt(row.calls)),
							h("td", { className: "tu-td", style: { textAlign: "right" } }, row.errs > 0 ? fmtPct(rate) : "—"),
							h("td", { className: "tu-td", style: { textAlign: "right" } }, row.measured > 0 ? fmtDuration(avg) : "—"),
							h("td", { className: "tu-td", style: { textAlign: "right" } }, totalCalls > 0 ? fmtPct(row.calls / totalCalls) : "—"));
					}))));
			}
			function TurnOutcomeBar({ rows, empty }) {
				const t = pick();
				const total = rows.reduce((acc, row) => acc + row.value, 0);
				if (total === 0) return h("div", { className: "tu-empty" }, empty || t.noOutcome);
				return h("div", null,
					h("div", { className: "tu-stackBar" }, rows.map((row) => h("div", {
						className: "tu-stackSeg",
						key: row.key,
						style: { flexGrow: row.value, background: row.color }
					}))),
					h("div", { className: "tu-catLegend" }, rows.map((row) => h("span", { className: "tu-catLegendItem", key: row.key },
						h("i", { className: "tu-badgeDot", style: { background: row.color } }),
						row.label,
						` ${fmtInt(row.value)} (${fmtPct(row.value / total)})`))));
			}
			function SessionTrend({ seq, dayMap }) {
				const t = pick();
				const n = seq.length;
				let max = 1;
				for (const d of seq) {
					const row = dayMap.get(d);
					if (row !== undefined) max = Math.max(max, row.sessionsStarted || 0, row.activeSessions || 0);
				}
				const points = seq.map((d, i) => {
					const row = dayMap.get(d);
					const value = row !== undefined ? row.activeSessions || 0 : 0;
					return [((i + 0.5) / n * 100).toFixed(2), (100 - value / max * 100).toFixed(2)];
				});
				const step = Math.max(1, Math.ceil(n / 8));
				return h("div", null,
					h("div", { className: "tu-trend" },
						h("div", { className: "tu-trendY" }, [1, 0.75, 0.5, 0.25, 0].map((f) => h("div", { key: f }, fmtInt(Math.round(max * f))))),
						h("div", { className: "tu-trendMain" },
							h("div", { className: "tu-trendPlot" },
								[0, 25, 50, 75, 100].map((p) => h("div", { className: "tu-trendGrid", key: p, style: { top: p + "%" } })),
								h("div", { className: "tu-trendBars" }, seq.map((d) => {
									const row = dayMap.get(d) || {};
									const started = row.sessionsStarted || 0;
									return h("div", { className: "tu-trendCol", key: d }, h("div", {
										className: "tu-trendStack",
										style: { height: started > 0 ? Math.max(2, Math.round(started / max * 100)) + "%" : "0%" },
										title: `${d} · ${t.sessionStartedLegend} ${started} · ${t.sessionActiveLegend} ${row.activeSessions || 0}`
									}, h("div", { className: "tu-trendSeg", style: { flexGrow: 1, background: "var(--dsw-static-deepseek-500)" } })));
								})),
								h("svg", { className: "tu-trendLine", viewBox: "0 0 100 100", preserveAspectRatio: "none" },
									h("polyline", {
										fill: "none",
										stroke: "var(--dsw-static-blue-500)",
										strokeWidth: 2,
										vectorEffect: "non-scaling-stroke",
										points: points.map((p) => p[0] + "," + p[1]).join(" ")
									}))),
							h("div", { className: "tu-trendX" }, seq.map((d, i) => h("div", { className: "tu-trendXCell", key: d }, i % step === 0 ? d.slice(5) : "")))),
						h("div", { className: "tu-trendY2" })),
					h("div", { className: "tu-legend", style: { marginTop: "10px" } },
						h("span", { key: "started" }, h("i", { className: "tu-dot", style: { background: "var(--dsw-static-deepseek-500)" } }), t.sessionStartedLegend),
						h("span", { key: "active" }, h("i", { className: "tu-lineDot", style: { background: "var(--dsw-static-blue-500)" } }), t.sessionActiveLegend)));
			}
			function AgentCompare({ main, sub, subRows, toolRows }) {
				const t = pick();
				if ((sub.sessions || 0) === 0 && (sub.tokens || 0) === 0) return h("div", { className: "tu-empty" }, t.compareNoSub);
				const average = (bucket, key) => bucket.sessions > 0 ? bucket[key] / bucket.sessions : null;
				const rows = [
					{ label: t.compareSessions, main: main.sessions, sub: sub.sessions, format: fmtInt },
					{ label: t.compareTokens, main: main.tokens, sub: sub.tokens, format: compact },
					{ label: t.compareToolCalls, main: main.toolCalls, sub: sub.toolCalls, format: fmtInt },
					{ label: t.compareTurns, main: main.turns, sub: sub.turns, format: fmtInt },
					{ label: t.compareAvgTokens, main: average(main, "tokens"), sub: average(sub, "tokens"), format: (v) => v === null ? "—" : compact(v) },
					{ label: t.compareAvgTools, main: average(main, "toolCalls"), sub: average(sub, "toolCalls"), format: (v) => v === null ? "—" : Number(v).toFixed(1) },
					{ label: t.compareAvgActive, main: main.sessions > 0 ? (main.llmMs + main.toolMs) / main.sessions : null, sub: sub.sessions > 0 ? (sub.llmMs + sub.toolMs) / sub.sessions : null, format: (v) => v === null ? "—" : fmtDuration(v) },
					{ label: t.compareSuccess, main: splitSuccess(main), sub: splitSuccess(sub), format: (v) => v === null ? "—" : fmtPct(v) }
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
				const spawnText = [...spawn.entries()].sort((a, b) => b[1] - a[1]).map(([name, calls]) => `${name} ${fmtInt(calls)}`).join(" · ");
				return h("div", null,
					h("div", { className: "tu-compare" },
						h("div", { className: "tu-compareHead" }, ""),
						h("div", { className: "tu-compareHead", style: { textAlign: "right" } },
							h("i", { className: "tu-badgeDot", style: { background: MAIN_COLOR } }), ` ${t.compareMain}`),
						h("div", { className: "tu-compareHead", style: { textAlign: "right" } },
							h("i", { className: "tu-badgeDot", style: { background: SUB_COLOR } }), ` ${t.compareSub}`),
						rows.map((row) => {
							const mainValue = row.main === null ? 0 : row.main;
							const subValue = row.sub === null ? 0 : row.sub;
							const max = Math.max(mainValue, subValue) || 1;
							const cell = (value, color) => h("div", { className: "tu-compareCell" },
								h("span", { className: "tu-compareVal" }, row.format(value)),
								h("div", { className: "tu-compareBar" }, h("div", {
									className: "tu-compareFill",
									style: { width: Math.max(0, Math.round((value === null ? 0 : value) / max * 100)) + "%", background: color }
								})));
							return h(react.Fragment, { key: row.label },
								h("div", { className: "tu-compareMetric" }, row.label),
								cell(row.main, MAIN_COLOR),
								cell(row.sub, SUB_COLOR));
						})),
					h("div", { className: "tu-compareFoot" },
						h("div", { className: "tu-sub" }, `${t.compareSubSources}：${t.kindSub} ${fmtInt(sources.subagent)} · ${t.kindTeam} ${fmtInt(sources.team)} · ${t.kindWorkflow} ${fmtInt(sources.workflow)}`),
						h("div", { className: "tu-sub" }, `${t.compareSubCalls}：${spawnText || "—"}`)));
			}
			function SplitTrend({ seq, dayMap }) {
				const t = pick();
				const [metric, setMetric] = react.useState("tokens");
				const valueOf = (bucket) => bucket === undefined ? 0 : (metric === "tokens" ? bucket.tokens || 0 : bucket.toolCalls || 0);
				const format = metric === "tokens" ? compact : fmtInt;
				let max = 1;
				let hasData = false;
				for (const d of seq) {
					const row = dayMap.get(d);
					if (row === undefined) continue;
					const total = valueOf(row.main) + valueOf(row.sub);
					if (total > 0) hasData = true;
					max = Math.max(max, total);
				}
				const step = Math.max(1, Math.ceil(seq.length / 8));
				const metricTabs = [["tokens", t.splitTokens], ["tools", t.splitTools]];
				return h("div", { className: "tu-card" },
					h("div", { className: "tu-toolHead" },
						h("div", { className: "tu-cardTitle" }, t.splitTrendTitle),
						h("div", { className: "tu-miniTabs" }, metricTabs.map((entry) => h("button", {
							key: entry[0],
							className: "tu-miniTab" + (metric === entry[0] ? " tu-miniTabActive" : ""),
							onClick: () => setMetric(entry[0])
						}, entry[1])))),
					seq.length === 0 || !hasData ? h("div", { className: "tu-empty" }, t.compareNoSub) :
						h(react.Fragment, null,
							h("div", { className: "tu-trend" },
								h("div", { className: "tu-trendY" }, [1, 0.75, 0.5, 0.25, 0].map((f) => h("div", { key: f }, format(Math.round(max * f))))),
								h("div", { className: "tu-trendMain" },
									h("div", { className: "tu-trendPlot" },
										[0, 25, 50, 75, 100].map((p) => h("div", { className: "tu-trendGrid", key: p, style: { top: p + "%" } })),
										h("div", { className: "tu-trendBars" }, seq.map((d) => {
											const row = dayMap.get(d) || {};
											const mainValue = valueOf(row.main);
											const subValue = valueOf(row.sub);
											const total = mainValue + subValue;
											return h("div", { className: "tu-trendCol", key: d }, h("div", {
												className: "tu-trendStack",
												style: { height: total > 0 ? Math.max(2, Math.round(total / max * 100)) + "%" : "0%" },
												title: `${d} · ${t.compareMain} ${format(mainValue)} · ${t.compareSub} ${format(subValue)}`
											},
												h("div", { className: "tu-trendSeg", style: { flexGrow: mainValue, background: MAIN_COLOR } }),
												h("div", { className: "tu-trendSeg", style: { flexGrow: subValue, background: SUB_COLOR } })));
										}))),
									h("div", { className: "tu-trendX" }, seq.map((d, i) => h("div", { className: "tu-trendXCell", key: d }, i % step === 0 ? d.slice(5) : "")))),
								h("div", { className: "tu-trendY2" })),
							h("div", { className: "tu-legend", style: { marginTop: "10px" } },
								h("span", { key: "main" }, h("i", { className: "tu-dot", style: { background: MAIN_COLOR } }), t.compareMain),
								h("span", { key: "sub" }, h("i", { className: "tu-dot", style: { background: SUB_COLOR } }), t.compareSub))));
			}
			function SessionTable({ rows, truncated }) {
				const t = pick();
				const [sortKey, setSortKey] = react.useState("recent");
				const [filter, setFilter] = react.useState("all");
				const visible = rows.filter((row) => {
					if (filter === "all") return true;
					const kind = kindOf(row);
					return filter === "main" ? kind === "main" : kind === "subagent";
				});
				const sorted = [...visible].sort((a, b) => {
					if (sortKey === "tokens") return b.tokens - a.tokens || b.lastAt - a.lastAt;
					if (sortKey === "tools") return b.toolCalls - a.toolCalls || b.lastAt - a.lastAt;
					if (sortKey === "turns") return b.turns - a.turns || b.lastAt - a.lastAt;
					return b.lastAt - a.lastAt;
				});
				const show = sorted.slice(0, 30);
				const sortTabs = [["recent", t.sortRecent], ["tokens", t.sortTokens], ["tools", t.sortTools], ["turns", t.sortTurns]];
				const filterTabs = [["all", t.filterAll], ["main", t.filterMain], ["sub", t.filterSub]];
				const countText = filter === "all" ? `${rows.length} ${t.sessionsUnit}` : `${sorted.length} / ${rows.length}`;
				return h("div", { className: "tu-card" },
					h("div", { className: "tu-toolHead" },
						h("div", null,
							h("div", { className: "tu-cardTitle" }, t.sessionTable),
							rows.length > 0 ? h("div", { className: "tu-sub" }, truncated ? t.truncatedRows : countText) : null),
						h("div", { className: "tu-tableTools" },
							h("div", { className: "tu-miniTabs" }, filterTabs.map((entry) => h("button", {
								key: entry[0],
								className: "tu-miniTab" + (filter === entry[0] ? " tu-miniTabActive" : ""),
								onClick: () => setFilter(entry[0])
							}, entry[1]))),
							h("div", { className: "tu-miniTabs" }, sortTabs.map((entry) => h("button", {
								key: entry[0],
								className: "tu-miniTab" + (sortKey === entry[0] ? " tu-miniTabActive" : ""),
								onClick: () => setSortKey(entry[0])
							}, entry[1]))))),
					rows.length === 0 ? h("div", { className: "tu-empty" }, t.sessionNoData) :
						visible.length === 0 ? h("div", { className: "tu-empty" }, t.sessionNoData) :
							h("div", { className: "tu-tableWrap" }, h("table", { className: "tu-table" },
								h("thead", null, h("tr", null, [t.colSession, t.colCreated, t.colTurns, t.colTools, t.colTokens, t.colErrors].map((label, i) => h("th", {
									className: "tu-th",
									key: i,
									style: i >= 2 ? { textAlign: "right" } : undefined
								}, label)))),
								h("tbody", null, show.map((row) => h("tr", { className: "tu-tr", key: row.id },
									h("td", { className: "tu-td" }, h("div", { className: "tu-tableMain" },
										h("div", { className: "tu-tableName", title: row.title || row.id }, row.title || row.id),
										h("div", { className: "tu-tableSub", title: row.cwd },
											h("span", { className: "tu-badge" },
												h("i", { className: "tu-badgeDot", style: { background: kindColorOf(row) } }),
												kindLabelOf(row)),
											` · ${shortCwd(row.cwd)} · ${row.model}`))),
									h("td", { className: "tu-td" }, fmtTime(row.createdAt)),
									h("td", { className: "tu-td", style: { textAlign: "right" } }, fmtInt(row.turns)),
									h("td", { className: "tu-td", style: { textAlign: "right" } }, fmtInt(row.toolCalls)),
									h("td", { className: "tu-td", style: { textAlign: "right" } }, compact(row.tokens)),
									h("td", { className: "tu-td", style: { textAlign: "right" } }, row.toolErrs > 0 ? String(row.toolErrs) : "—")))))));
			}
			function OverviewView({ days, daysMap, seq, dayModelMap, series, models, agg, byDayMapAll }) {
				const t = pick();
				const top = models.length > 0 ? models[0] : null;
				const activeDays = days.filter((row) => (row.req || 0) > 0 || (row.toolCalls || 0) > 0 || (row.userMsgs || 0) > 0).length;
				const toolErrRate = agg.toolCalls > 0 ? agg.toolErrs / agg.toolCalls : 0;
				const cells = [
					{ label: t.statTokens, value: fmtInt(totalOf(agg)) },
					{ label: t.statTurns, value: fmtInt(agg.turns) },
					{ label: t.statReqs, value: fmtInt(agg.req) },
					{ label: t.statToolCalls, value: fmtInt(agg.toolCalls) },
					{ label: t.statToolErrRate, value: agg.toolCalls > 0 ? fmtPct(toolErrRate) : "—" },
					{ label: t.statSessions, value: fmtInt(agg.sessionsStarted) },
					{ label: t.statDays, value: String(activeDays) },
					{ label: t.statCache, value: fmtPct(cacheRate(agg)) },
					{ label: t.statTop, value: top ? top.m : "—", small: true }
				];
				return h(react.Fragment, null,
					h(StatCards, { cells: cells }),
					h(Heatmap, { byDayMap: byDayMapAll }),
					h("div", { className: "tu-card" },
						h("div", { className: "tu-cardTitle" }, t.trendTitle),
						h(TrendChart, { seq: seq, dayModelMap: dayModelMap, series: series, daysMap: daysMap })));
			}
			function ToolsView({ agg, toolRows, tools, categories, seq }) {
				const t = pick();
				const skillCat = categories.filter((row) => row.c === "skill")[0];
				const mcpCat = categories.filter((row) => row.c === "mcp")[0];
				const avg = agg.toolMeasured > 0 ? agg.toolMs / agg.toolMeasured : 0;
				const cells = [
					{ label: t.statToolCalls, value: fmtInt(agg.toolCalls) },
					{ label: t.statToolErrRate, value: agg.toolCalls > 0 ? fmtPct(agg.toolErrs / agg.toolCalls) : "—" },
					{ label: t.statAvgLatency, value: fmtDuration(avg) },
					{ label: t.statToolKinds, value: fmtInt(tools.length) },
					{ label: t.statSkillCalls, value: fmtInt(skillCat ? skillCat.calls : 0) },
					{ label: t.statMcpCalls, value: fmtInt(mcpCat ? mcpCat.calls : 0) }
				];
				const topCats = categories.slice(0, 6);
				const restCalls = categories.slice(6).reduce((acc, row) => acc + row.calls, 0);
				const catSeries = topCats.map((row) => ({ key: row.c, label: categoryLabel(row.c), color: categoryColor(row.c) }));
				if (restCalls > 0) catSeries.push({ key: "other", label: t.catOther, color: CATEGORY_COLORS.other });
				const seriesKeys = new Set(catSeries.map((row) => row.key));
				const dayCatMap = buildDayCatMap(seq, toolRows, seriesKeys);
				const skills = groupSkills(tools, t);
				const servers = groupMcpServers(tools, t);
				return h(react.Fragment, null,
					h(StatCards, { cells: cells }),
					h("div", { className: "tu-card" },
						h("div", { className: "tu-cardTitle" }, t.toolCategoryTitle),
						h(CategoryBar, { rows: categories, total: agg.toolCalls })),
					h("div", { className: "tu-card" },
						h("div", { className: "tu-cardTitle" }, t.toolTrendTitle),
						toolRows.length > 0 ? h(ToolTrend, { seq: seq, dayCatMap: dayCatMap, series: catSeries }) : h("div", { className: "tu-empty" }, t.toolNoData)),
					h("div", { className: "tu-card" },
						h("div", { className: "tu-cardTitle" }, t.toolTopTitle),
						h(ToolTable, { tools: tools, totalCalls: agg.toolCalls })),
					h("div", { className: "tu-grid2" },
						h("div", { className: "tu-card" },
							h("div", { className: "tu-cardTitle" }, t.toolSkillsTitle),
							h(RankList, { rows: skills, empty: t.toolNoData })),
						h("div", { className: "tu-card" },
							h("div", { className: "tu-cardTitle" }, t.toolMcpTitle),
							h(RankList, { rows: servers, empty: t.toolNoData }))));
			}
			function SessionsView({ agg, daysMap, seq, sessionRows, truncated, comparisonDays, toolRows }) {
				const t = pick();
				const started = agg.sessionsStarted;
				const outcomes = turnOutcomeRows(agg, t);
				const outcomeTotal = outcomes.reduce((acc, row) => acc + row.value, 0);
				const tokenTotal = totalOf(agg);
				const comparisonMain = sumComparison(comparisonDays, "main");
				const comparisonSub = sumComparison(comparisonDays, "sub");
				const comparisonMap = new Map(comparisonDays.map((row) => [row.d, row]));
				const subRows = sessionRows.filter((row) => kindOf(row) === "subagent");
				const cells = [
					{ label: t.statSessions, value: fmtInt(started) },
					{ label: t.statMainSub, value: `${fmtInt(agg.mainStarted)} / ${fmtInt(agg.subStarted)}` },
					{ label: t.statAvgTurns, value: started > 0 ? (agg.turns / started).toFixed(1) : "—" },
					{ label: t.statAvgTools, value: started > 0 ? (agg.toolCalls / started).toFixed(1) : "—" },
					{ label: t.statSteps, value: fmtInt(agg.steps) },
					{ label: t.statAvgLlm, value: agg.turns > 0 ? fmtDuration(agg.llmMs / agg.turns) : "—" },
					{ label: t.statUserMsgs, value: fmtInt(agg.userMsgs) },
					{ label: t.statAsstMsgs, value: fmtInt(agg.asstMsgs) },
					{ label: t.statTurnOk, value: outcomeTotal > 0 ? fmtPct(agg.turnOk / outcomeTotal) : "—" },
					{ label: t.statAvgTokens, value: started > 0 ? compact(tokenTotal / started) : "—" }
				];
				const workspaces = aggregateWorkspaces(sessionRows, t);
				return h(react.Fragment, null,
					h(StatCards, { cells: cells }),
					h("div", { className: "tu-card" },
						h("div", { className: "tu-cardTitle" }, t.compareTitle),
						h(AgentCompare, { main: comparisonMain, sub: comparisonSub, subRows: subRows, toolRows: toolRows })),
					h("div", { className: "tu-card" },
						h("div", { className: "tu-cardTitle" }, t.sessionTrendTitle),
						h(SessionTrend, { seq: seq, dayMap: daysMap })),
					h(SplitTrend, { seq: seq, dayMap: comparisonMap }),
					h("div", { className: "tu-grid2" },
						h("div", { className: "tu-card" },
							h("div", { className: "tu-cardTitle" }, t.turnOutcomeTitle),
							h(TurnOutcomeBar, { rows: outcomes })),
						h("div", { className: "tu-card" },
							h("div", { className: "tu-cardTitle" }, t.workspaceTitle),
							h(RankList, { rows: workspaces, empty: t.sessionNoData }))),
					h(SessionTable, { rows: sessionRows, truncated: truncated }));
			}
			//#endregion
			function Dashboard() {
				useLocaleTick();
				const t = pick();
				const [view, setView] = react.useState("overview");
				const [range, setRange] = react.useState({ preset: 30, from: shiftDays(dateStr(new Date()), -29), to: dateStr(new Date()) });
				const [state, setState] = react.useState({ status: "loading" });
				const abortRef = react.useRef(null);
				const load = react.useCallback((refresh) => {
					if (abortRef.current) abortRef.current.abort();
					const controller = new AbortController();
					abortRef.current = controller;
					// stale-while-revalidate：已有数据时保留视图，仅标记 refreshing
					setState((prev) => prev.status === "ready" ? { status: "ready", data: prev.data, refreshing: true } : { status: "loading" });
					fetch("/token-usage/stats" + (refresh ? "?refresh=1" : ""), { signal: controller.signal }).then((response) => {
						if (!response.ok) return response.json().catch(() => ({})).then((body) => Promise.reject(new Error(body.error || "HTTP " + response.status)));
						return response.json();
					}).then((data) => setState({ status: "ready", data: data, refreshing: false }))
						.catch((error) => {
							if (controller.signal.aborted) return;
							// 刷新失败时保留旧数据，首载失败才进错误态
							setState((prev) => prev.status === "ready" && prev.data
								? { status: "ready", data: prev.data, refreshing: false }
								: { status: "error", message: error && error.message ? String(error.message) : String(error) });
						});
				}, []);
				react.useEffect(() => {
					load(false);
					return () => { if (abortRef.current) abortRef.current.abort(); };
				}, [load]);
				// 页面重新可见时静默刷新（走 host 60s 缓存，不强制重建）
				react.useEffect(() => {
					const onVisible = () => { if (document.visibilityState === "visible") load(false); };
					document.addEventListener("visibilitychange", onVisible);
					return () => document.removeEventListener("visibilitychange", onVisible);
				}, [load]);
				const header = h("div", { className: "tu-head" },
					h("div", { style: { minWidth: 0 } },
						h("div", { className: "tu-title" }, t.title),
						state.status === "ready" ? h("div", { className: "tu-sub" },
							state.data.sessions + " " + t.sessionsUnit + " · " + t.updatedAt + " " + new Date(state.data.generatedAt).toLocaleString() +
							(state.data.failed > 0 ? " · " + state.data.failed + " " + t.failedUnit : "")) : null),
					h("button", { className: "tu-btn", onClick: () => load(true), disabled: state.status === "loading" || state.refreshing === true }, state.refreshing === true ? t.refreshing : t.refresh));
				if (state.status === "loading") return h("div", { className: "tu-root" }, header, h("div", { className: "tu-state" }, t.loading));
				if (state.status === "error") {
					return h("div", { className: "tu-root" }, header, h("div", { className: "tu-card" },
						h("div", { className: "tu-cardTitle" }, t.error),
						h("div", { className: "tu-sub" }, state.message),
						h("div", null, h("button", { className: "tu-btn", onClick: () => load(true) }, t.retry))));
				}
				const data = state.data;
				const today = dateStr(new Date());
				const from = range.preset === "custom" ? range.from : shiftDays(today, -(range.preset - 1));
				const to = range.preset === "custom" ? range.to : today;
				const effFrom = from <= to ? from : to;
				const effTo = to;
				const days = (data.byDay || []).filter((row) => row.d >= effFrom && row.d <= effTo);
				const daysMap = new Map(days.map((row) => [row.d, row]));
				const dayModelRows = (data.byDayModel || []).filter((row) => row.d >= effFrom && row.d <= effTo);
				const modelAgg = new Map();
				const dayModelMap = new Map();
				for (const row of dayModelRows) {
					const key = row.m;
					const agg = modelAgg.get(key) || { m: row.m, in: 0, cr: 0, cw: 0, out: 0, req: 0, turns: 0 };
					agg.in += row.in; agg.cr += row.cr; agg.cw += row.cw; agg.out += row.out; agg.req += row.req;
					modelAgg.set(key, agg);
					let per = dayModelMap.get(row.d);
					if (per === undefined) { per = new Map(); dayModelMap.set(row.d, per); }
					per.set(key, totalOf(row));
				}
				const models = [...modelAgg.values()].sort((a, b) => totalOf(b) - totalOf(a));
				const grand = days.reduce((acc, row) => acc + totalOf(row), 0);
				const series = models.slice(0, 5).map((row, i) => ({ key: row.m, label: row.m, color: SERIES_COLORS[i] }));
				const seq = seqDays(effFrom, effTo);
				const byDayMapAll = new Map((data.byDay || []).map((row) => [row.d, totalOf(row)]));
				const agg = sumDays(days);
				const toolRows = ((data.toolStats && data.toolStats.byDayTool) || []).filter((row) => row.d >= effFrom && row.d <= effTo);
				const toolAgg = aggregateTools(toolRows);
				const comparisonDays = ((data.agentComparison && data.agentComparison.byDay) || []).filter((row) => row.d >= effFrom && row.d <= effTo);
				const sessionRows = ((data.sessionStats && data.sessionStats.rows) || []).filter((row) => {
					const created = row.createdAt ? dateStr(new Date(row.createdAt)) : "";
					return created >= effFrom && created <= effTo;
				});
				const truncated = data.sessionStats ? data.sessionStats.rowsTruncated === true : false;
				const presets = [[7, t.range7], [14, t.range14], [30, t.range30], [90, t.range90], ["custom", t.rangeCustom]];
				const viewTabs = h("div", { className: "tu-viewTabs" }, [["overview", t.tabOverview], ["tools", t.tabTools], ["sessions", t.tabSessions], ["models", t.tabModels]].map((entry) => h("button", {
					key: entry[0],
					className: "tu-viewTab" + (view === entry[0] ? " tu-viewTabActive" : ""),
					onClick: () => setView(entry[0])
				}, entry[1])));
				const rangeRow = h("div", { className: "tu-rangeRow" },
					h("div", { className: "tu-tabs" }, presets.map((entry) => h("button", {
						key: String(entry[0]),
						className: "tu-tab" + (range.preset === entry[0] ? " tu-tabActive" : ""),
						onClick: () => setRange((r) => ({ ...r, preset: entry[0] }))
					}, entry[1]))),
					range.preset === "custom" ? h(react.Fragment, null,
						h("input", { type: "date", className: "tu-dateIn", value: range.from, max: range.to, onChange: (e) => setRange((r) => ({ ...r, from: e.target.value })) }),
						h("span", { className: "tu-sub" }, "–"),
						h("input", { type: "date", className: "tu-dateIn", value: range.to, min: range.from, max: today, onChange: (e) => setRange((r) => ({ ...r, to: e.target.value })) })) : null);
				let content;
				if (view === "tools") {
					content = h(ToolsView, { agg: agg, toolRows: toolRows, tools: toolAgg.tools, categories: toolAgg.categories, seq: seq });
				} else if (view === "sessions") {
					content = h(SessionsView, { agg: agg, daysMap: daysMap, seq: seq, sessionRows: sessionRows, truncated: truncated, comparisonDays: comparisonDays, toolRows: toolRows });
				} else if (view === "models") {
					content = models.length > 0 ? h(ModelUsage, { models: models, grand: grand }) : h("div", { className: "tu-state" }, t.empty);
				} else {
					content = h(OverviewView, { days: days, daysMap: daysMap, seq: seq, dayModelMap: dayModelMap, series: series, models: models, agg: agg, byDayMapAll: byDayMapAll });
				}
				return h("div", { className: "tu-root" },
					header,
					viewTabs,
					rangeRow,
					content);
			}
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
		//#endregion
	}
});
