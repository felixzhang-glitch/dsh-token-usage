/**
 * Usage statistics — host half.
 *
 * Registers GET /token-usage/stats, aggregating provider-reported token usage,
 * tool-call activity, and session metadata from every logical session log.
 * One pass covers all views; a session read failure counts in `failed` without
 * interrupting the corpus scan. Forked sessions skip seed events already
 * covered by a parent present in the corpus, so inherited history is not
 * double-counted (known boundary: a fork whose parent is absent re-counts its
 * seed events).
 *
 * Event sources:
 * - `assistant/message`: `data.usage` plus `data.message.source.model`; each
 *   usage-bearing message also counts as one request and as one assistant
 *   message. Turns keep the existing definition: distinct turn ids carrying
 *   usage, deduped per bucket.
 * - `tool/call` + `tool/result`: call count at dispatch; error from
 *   `message.isError`/`data.error`; wall time paired by callId and attributed
 *   to the dispatch day. Unpaired calls still count as calls but contribute no
 *   latency or error attribution.
 * - `step/start` → `assistant/message`: model wall time (`llmMs`);
 *   `step/end`: step count; `turn/end`: completed/error/aborted/interrupted.
 * - `user/message`: user message count.
 * - `session/title`, `subagent/descriptor`: session title fallback.
 * - Session headers: createdAt/cwd/delegationDepth for start-day, workspace,
 *   and main/sub counts.
 *
 * Tool dimension key: regular tools use their name; `skill` calls use
 * `skill:<name>`; MCP tools keep `mcp__<server>__<tool>`. Categories:
 * `mcp | skill | cli | file | web | agent | session | other`.
 *
 * Response shape:
 * {
 *   generatedAt: number,
 *   sessions: number, failed: number,
 *   totals: Bucket,
 *   byDay: [{ d, ...Bucket, sessionsStarted, mainStarted, subStarted, activeSessions }],
 *   byModel: [{ m, ...TokenBucket }],
 *   byDayModel: [{ d, m, in, cr, cw, out, req }],
 *   toolStats: {
 *     byTool: [{ n, c, calls, errs, ms, measured }],
 *     byDayTool: [{ d, n, c, calls, errs, ms, measured }]
 *   },
 *   sessionStats: {
 *     total, main, sub, workspaces, activeDays, rowsTruncated,
 *     rows: [{ id, title, cwd, createdAt, lastAt, model, tokens, req, turns,
 *              steps, toolCalls, toolErrs, userMsgs, asstMsgs, depth }]
 *   }
 * }
 * TokenBucket = { in, cr, cw, out, reason, req, turns }.
 * Bucket = TokenBucket + { steps, llmMs, toolMs, toolMeasured, userMsgs,
 * asstMsgs, toolCalls, toolErrs, turnOk, turnErr, turnAbort, turnInterrupt }.
 * Total tokens of a row = in + cr + cw + out (reason is informational and is
 * already included in out).
 */

const name = "token-usage";
/** Both services are mounted by the web profile; wait for them if late. */
const inject = ["webServer", "sessionQuery"];

const CACHE_TTL_MS = 60000;
/** Minimum gap between forced rebuilds; rapid `?refresh=1` hits return the cache. */
const REFRESH_MIN_MS = 5000;
const WORKERS = 8;
/** Bound the per-session detail payload; byDay aggregates stay complete. */
const SESSION_ROWS_MAX = 1000;

const num = (value) => typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.round(value) : 0;
const pad2 = (value) => String(value).padStart(2, "0");
const dayKey = (time) => {
	const date = new Date(time);
	return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
};
const newTokenBucket = () => ({ in: 0, cr: 0, cw: 0, out: 0, reason: 0, req: 0, turns: 0 });
const newBucket = () => ({
	in: 0, cr: 0, cw: 0, out: 0, reason: 0, req: 0, turns: 0,
	steps: 0, llmMs: 0, toolMs: 0, toolMeasured: 0,
	userMsgs: 0, asstMsgs: 0, toolCalls: 0, toolErrs: 0,
	turnOk: 0, turnErr: 0, turnAbort: 0, turnInterrupt: 0
});
const addUsage = (bucket, usage, countTurn) => {
	bucket.in += num(usage.inputTokens);
	bucket.cr += num(usage.cacheReadTokens);
	bucket.cw += num(usage.cacheWriteTokens);
	bucket.out += num(usage.outputTokens);
	bucket.reason += num(usage.reasoningTokens);
	bucket.req += 1;
	if (countTurn === true) bucket.turns += 1;
};
const totalOf = (row) => row.in + row.cr + row.cw + row.out;
const getOrCreate = (map, key, create) => {
	const found = map.get(key);
	if (found !== undefined) return found;
	const created = create();
	map.set(key, created);
	return created;
};
const bucketOf = (map, key) => getOrCreate(map, key, newBucket);
const tokenBucketOf = (map, key) => getOrCreate(map, key, newTokenBucket);

const FILE_TOOLS = new Set([
	"read", "write", "edit", "str_replace_editor", "read_image", "grep", "glob",
	"load_workspace_dependencies"
]);
const WEB_TOOLS = new Set(["web_search", "web_fetch"]);
const AGENT_TOOLS = new Set([
	"subagent", "subagent_fork", "workflow", "ralph", "spawn_teammate",
	"send_message", "wait_agent", "list_agents", "interrupt_agent",
	"list_subagent_models"
]);
const SESSION_TOOLS = new Set([
	"session_search", "session_trace", "list_mcp_resources",
	"list_mcp_resource_templates", "read_mcp_resource"
]);
const TURN_REASON_FIELDS = {
	completed: "turnOk",
	error: "turnErr",
	aborted: "turnAbort",
	interrupted: "turnInterrupt"
};

/** Classify one tool name into the fixed category vocabulary. */
function categoryOf(tool) {
	if (typeof tool !== "string" || tool.length === 0) return "other";
	if (tool.startsWith("mcp__")) return "mcp";
	if (tool === "skill") return "skill";
	if (tool === "bash" || tool.startsWith("terminal_")) return "cli";
	if (FILE_TOOLS.has(tool)) return "file";
	if (WEB_TOOLS.has(tool)) return "web";
	if (AGENT_TOOLS.has(tool) || tool.startsWith("team_task_")) return "agent";
	if (SESSION_TOOLS.has(tool) || tool.startsWith("session_event_")) return "session";
	return "other";
}

/** Parse a skill call's arguments; tolerate JSON strings, objects, and junk. */
function skillNameOf(args) {
	let parsed;
	if (typeof args === "string") {
		try {
			parsed = JSON.parse(args);
		} catch {
			const match = args.match(/"name"\s*:\s*"([^"]+)"/);
			if (match !== null && match[1].length > 0) return match[1];
			return "unknown";
		}
	} else if (args !== null && typeof args === "object") {
		parsed = args;
	}
	if (parsed !== null && typeof parsed === "object" && typeof parsed.name === "string" && parsed.name.trim().length > 0) {
		return parsed.name.trim();
	}
	return "unknown";
}

/** Dimension key used by toolStats: skills carry their loaded skill name. */
const toolKeyOf = (tool, args) => tool === "skill" ? "skill:" + skillNameOf(args) : tool;

/** Extract the paired tool call id across session format generations. */
function resultCallIdOf(data) {
	const message = data.message !== null && typeof data.message === "object" ? data.message : {};
	if (typeof message.toolCallId === "string" && message.toolCallId.length > 0) return message.toolCallId;
	const source = message.source !== null && typeof message.source === "object" ? message.source : {};
	if (typeof source.callId === "string" && source.callId.length > 0) return source.callId;
	if (typeof data.callId === "string" && data.callId.length > 0) return data.callId;
	return undefined;
}

/** Structured error signal from one tool result; no text heuristics. */
function isToolError(data) {
	const message = data.message !== null && typeof data.message === "object" ? data.message : {};
	return message.isError === true || (data.error !== undefined && data.error !== null);
}

/** One tool dimension row; map keys differ for all-time vs per-day views. */
function newToolRow(n, c) {
	return { n, c, calls: 0, errs: 0, ms: 0, measured: 0 };
}
function toolRowOf(map, mapKey, n, c) {
	return getOrCreate(map, mapKey, () => newToolRow(n, c));
}

/**
 * Scan every logical session once and fold usage, tool calls, and session
 * activity into the views.
 * @param sessionQuery - live-preferred session query service.
 * @returns detached JSON-safe aggregation.
 */
async function collect(sessionQuery) {
	const records = await sessionQuery.listSessions();
	const known = new Set(records.map((record) => record.header.id));
	const totals = newBucket();
	const byDay = new Map();
	const byModel = new Map();
	const byDayModel = new Map();
	const byTool = new Map();
	const byDayTool = new Map();
	// distinct turn ids per token bucket, materialized into counts at the end
	const turnSets = new Map([["totals", new Set()]]);
	// distinct session ids per day (active sessions) and days with any activity
	const daySessions = new Map();
	const activeDays = new Set();
	// session starts / main-sub split from headers (includes unreadable sessions)
	const sessionStarts = new Map();
	const workspaces = new Set();
	let mainCount = 0;
	let subCount = 0;
	for (const record of records) {
		const header = record.header !== null && typeof record.header === "object" ? record.header : {};
		const depth = typeof header.delegationDepth === "number" ? header.delegationDepth : 0;
		const isSub = depth > 0 || header.parentSession !== undefined;
		if (isSub) subCount += 1;
		else mainCount += 1;
		if (typeof header.cwd === "string" && header.cwd.length > 0) workspaces.add(header.cwd);
		if (typeof header.createdAt === "number") {
			const start = getOrCreate(sessionStarts, dayKey(header.createdAt), () => ({ started: 0, main: 0, sub: 0 }));
			start.started += 1;
			if (isSub) start.sub += 1;
			else start.main += 1;
		}
	}
	const sessionRows = [];
	let failed = 0;
	// shared cursor instead of queue.shift(): shift is O(n) per take, O(n²) overall
	let next = 0;
	async function worker() {
		while (true) {
			const i = next++;
			if (i >= records.length) break;
			const record = records[i];
			let snapshot;
			try {
				snapshot = await sessionQuery.readSession(record.header.id);
			} catch {
				failed += 1;
				continue;
			}
			writeSession(snapshot, record);
		}
	}
	function writeSession(snapshot, record) {
		const recordHeader = record.header !== null && typeof record.header === "object" ? record.header : {};
		const header = snapshot.session !== null && typeof snapshot.session === "object"
			? snapshot.session
			: recordHeader;
		const sessionId = typeof header.id === "string" ? header.id : recordHeader.id;
		const depth = typeof header.delegationDepth === "number" ? header.delegationDepth : 0;
		const cwd = typeof header.cwd === "string" ? header.cwd : "";
		let createdAt = typeof header.createdAt === "number" ? header.createdAt : 0;
		const seedLength = typeof recordHeader.seedLength === "number" ? recordHeader.seedLength : 0;
		const inherited = typeof snapshot.inheritedEventCount === "number" ? snapshot.inheritedEventCount : 0;
		const seedCut = seedLength > 0 ? seedLength : inherited;
		const parentCovered = seedCut > 0 && recordHeader.parentSession !== undefined && known.has(recordHeader.parentSession);
		let title;
		let descriptorTitle;
		let lastAt = createdAt;
		let tokens = 0;
		let req = 0;
		let steps = 0;
		let toolCalls = 0;
		let toolErrs = 0;
		let userMsgs = 0;
		let asstMsgs = 0;
		let openStep = null;
		const turnIds = new Set();
		const modelTokens = new Map();
		const pending = new Map();
		for (const event of snapshot.events) {
			if (parentCovered && typeof event.seq === "number" && event.seq < seedCut) continue;
			const type = event.type;
			const time = typeof event.time === "number" && Number.isFinite(event.time) ? event.time : undefined;
			if (time !== undefined) {
				if (lastAt === 0 || time > lastAt) lastAt = time;
				const day = dayKey(time);
				// every activity day owns a row, even when it only carries system events
				bucketOf(byDay, day);
				activeDays.add(day);
				let members = daySessions.get(day);
				if (members === undefined) {
					members = new Set();
					daySessions.set(day, members);
				}
				members.add(sessionId);
			}
			if (type === "assistant/message") {
				const data = event.data !== null && typeof event.data === "object" ? event.data : {};
				asstMsgs += 1;
				const day = time !== undefined ? dayKey(time) : undefined;
				const dayBucket = day !== undefined ? bucketOf(byDay, day) : undefined;
				totals.asstMsgs += 1;
				if (dayBucket !== undefined) dayBucket.asstMsgs += 1;
				// close the model-time boundary even when the message carries no usage
				if (openStep !== null && time !== undefined && openStep.turn === data.turn && openStep.step === data.step) {
					const delta = Math.max(0, time - openStep.startTime);
					totals.llmMs += delta;
					if (dayBucket !== undefined) dayBucket.llmMs += delta;
					openStep = null;
				}
				const usage = data.usage;
				if (usage === undefined || usage === null) continue;
				const source = data.message && data.message.source || {};
				const model = typeof source.model === "string" && source.model.length > 0 ? source.model : "unknown";
				const turnId = typeof data.turn === "number" ? `${sessionId}:${data.turn}` : undefined;
				const modelBucket = tokenBucketOf(byModel, model);
				const dayModelBucket = day !== undefined ? tokenBucketOf(byDayModel, `${day}\u0000${model}`) : undefined;
				const targets = day !== undefined
					? [[totals, "totals"], [dayBucket, "day:" + day], [modelBucket, "model:" + model], [dayModelBucket, undefined]]
					: [[totals, "totals"], [modelBucket, "model:" + model]];
				for (const [bucket, setKey] of targets) {
					let fresh = true;
					if (turnId !== undefined && setKey !== undefined) {
						let set = turnSets.get(setKey);
						if (set === undefined) {
							set = new Set();
							turnSets.set(setKey, set);
						}
						fresh = !set.has(turnId);
						set.add(turnId);
					}
					addUsage(bucket, usage, fresh && turnId !== undefined);
				}
				req += 1;
				const rowTokens = num(usage.inputTokens) + num(usage.cacheReadTokens) + num(usage.cacheWriteTokens) + num(usage.outputTokens);
				tokens += rowTokens;
				modelTokens.set(model, (modelTokens.get(model) || 0) + rowTokens);
				if (typeof data.turn === "number") turnIds.add(data.turn);
				continue;
			}
			if (type === "tool/call") {
				const toolName = event.data && typeof event.data.name === "string" && event.data.name.length > 0 ? event.data.name : "unknown";
				const key = toolKeyOf(toolName, event.data && event.data.arguments);
				const category = categoryOf(toolName);
				const day = time !== undefined ? dayKey(time) : undefined;
				const row = toolRowOf(byTool, key, key, category);
				row.calls += 1;
				totals.toolCalls += 1;
				if (day !== undefined) {
					const dayRow = toolRowOf(byDayTool, `${day}\u0000${key}`, key, category);
					dayRow.d = day;
					dayRow.calls += 1;
					const dayBucket = bucketOf(byDay, day);
					dayBucket.toolCalls += 1;
				}
				toolCalls += 1;
				const callId = event.data && typeof event.data.callId === "string" && event.data.callId.length > 0 ? event.data.callId : undefined;
				if (callId !== undefined && time !== undefined && day !== undefined) {
					pending.set(callId, { key, category, day, time });
				}
				continue;
			}
			if (type === "tool/result") {
				const data = event.data !== null && typeof event.data === "object" ? event.data : {};
				const callId = resultCallIdOf(data);
				const hit = callId !== undefined ? pending.get(callId) : undefined;
				if (hit === undefined) continue;
				pending.delete(callId);
				const error = isToolError(data);
				const row = toolRowOf(byTool, hit.key, hit.key, hit.category);
				const dayRow = toolRowOf(byDayTool, `${hit.day}\u0000${hit.key}`, hit.key, hit.category);
				dayRow.d = hit.day;
				const dayBucket = bucketOf(byDay, hit.day);
				if (error) {
					row.errs += 1;
					dayRow.errs += 1;
					totals.toolErrs += 1;
					toolErrs += 1;
					dayBucket.toolErrs += 1;
				}
				if (time !== undefined) {
					const delta = Math.max(0, time - hit.time);
					row.measured += 1;
					row.ms += delta;
					dayRow.measured += 1;
					dayRow.ms += delta;
					totals.toolMeasured += 1;
					totals.toolMs += delta;
					dayBucket.toolMeasured += 1;
					dayBucket.toolMs += delta;
				}
				continue;
			}
			if (type === "step/start") {
				const data = event.data || {};
				if (time !== undefined) {
					openStep = {
						turn: typeof data.turn === "number" ? data.turn : undefined,
						step: typeof data.step === "number" ? data.step : undefined,
						startTime: time
					};
				}
				continue;
			}
			if (type === "step/end") {
				steps += 1;
				totals.steps += 1;
				openStep = null;
				if (time !== undefined) bucketOf(byDay, dayKey(time)).steps += 1;
				continue;
			}
			if (type === "turn/end") {
				const reason = event.data && event.data.reason && typeof event.data.reason.kind === "string" ? event.data.reason.kind : undefined;
				const field = reason !== undefined ? TURN_REASON_FIELDS[reason] : undefined;
				if (field !== undefined) {
					totals[field] += 1;
					if (time !== undefined) bucketOf(byDay, dayKey(time))[field] += 1;
				}
				pending.clear();
				continue;
			}
			if (type === "user/message") {
				userMsgs += 1;
				totals.userMsgs += 1;
				if (time !== undefined) bucketOf(byDay, dayKey(time)).userMsgs += 1;
				continue;
			}
			if (type === "session/title") {
				const value = event.data && event.data.title;
				if (typeof value === "string" && value.length > 0) title = value;
				continue;
			}
			if (type === "subagent/descriptor") {
				const value = event.data && event.data.label;
				if (typeof value === "string" && value.length > 0) descriptorTitle = value;
				continue;
			}
		}
		if (createdAt === 0 && lastAt > 0) createdAt = lastAt;
		if (lastAt === 0) lastAt = createdAt;
		let topModel = "unknown";
		let topTokens = -1;
		for (const [model, value] of modelTokens) {
			if (value > topTokens) {
				topTokens = value;
				topModel = model;
			}
		}
		sessionRows.push({
			id: sessionId,
			title: title !== undefined ? title : (descriptorTitle !== undefined ? descriptorTitle : ""),
			cwd,
			createdAt,
			lastAt,
			model: topModel,
			tokens,
			req,
			turns: turnIds.size,
			steps,
			toolCalls,
			toolErrs,
			userMsgs,
			asstMsgs,
			depth
		});
	}
	await Promise.all(Array.from({ length: Math.min(WORKERS, Math.max(1, records.length)) }, () => worker()));
	// materialize day rows, including session-start-only days
	for (const day of sessionStarts.keys()) bucketOf(byDay, day);
	const byDayRows = [];
	for (const [day, bucket] of byDay) {
		const start = sessionStarts.get(day) || { started: 0, main: 0, sub: 0 };
		const members = daySessions.get(day);
		byDayRows.push(Object.assign({ d: day }, bucket, {
			sessionsStarted: start.started,
			mainStarted: start.main,
			subStarted: start.sub,
			activeSessions: members === undefined ? 0 : members.size
		}));
	}
	byDayRows.sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : 0);
	const byModelRows = [];
	for (const [model, bucket] of byModel) byModelRows.push(Object.assign({ m: model }, bucket));
	byModelRows.sort((a, b) => totalOf(b) - totalOf(a));
	const byDayModelRows = [];
	for (const [key, bucket] of byDayModel) {
		const sep = key.indexOf("\u0000");
		byDayModelRows.push({ d: key.slice(0, sep), m: key.slice(sep + 1), in: bucket.in, cr: bucket.cr, cw: bucket.cw, out: bucket.out, req: bucket.req });
	}
	byDayModelRows.sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : a.m < b.m ? -1 : 1);
	const byToolRows = [...byTool.values()];
	byToolRows.sort((a, b) => b.calls - a.calls || (a.n < b.n ? -1 : a.n > b.n ? 1 : 0));
	const byDayToolRows = [...byDayTool.values()];
	byDayToolRows.sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : a.n < b.n ? -1 : a.n > b.n ? 1 : 0);
	sessionRows.sort((a, b) => b.lastAt - a.lastAt || b.createdAt - a.createdAt || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
	return {
		generatedAt: Date.now(),
		sessions: records.length,
		failed,
		totals,
		byDay: byDayRows,
		byModel: byModelRows,
		byDayModel: byDayModelRows,
		toolStats: {
			byTool: byToolRows,
			byDayTool: byDayToolRows
		},
		sessionStats: {
			total: records.length,
			main: mainCount,
			sub: subCount,
			workspaces: workspaces.size,
			activeDays: activeDays.size,
			rowsTruncated: sessionRows.length > SESSION_ROWS_MAX,
			rows: sessionRows.slice(0, SESSION_ROWS_MAX)
		}
	};
}

/**
 * Register the stats route; the registration is an effect on this fiber, so
 * unloading removes the endpoint.
 *
 * Caching: a collect() runs in the background at activation (warm-up), so the
 * first page load usually hits a ready cache. Non-forced requests serve the
 * cache stale-while-revalidate: an expired cache is returned immediately while
 * a rebuild runs in the background. Forced refreshes (`?refresh=1`) await the
 * rebuild so the button always returns fresh data, rate-limited to
 * REFRESH_MIN_MS. A single-flight promise guarantees at most one full scan at
 * any time.
 * @param ctx - context carrying webServer and sessionQuery.
 */
function apply(ctx) {
	let cached = null;
	let cachedAt = 0;
	let pending = null;
	const rebuild = () => {
		if (pending === null) {
			pending = collect(ctx.sessionQuery).then((result) => {
				cached = result;
				cachedAt = Date.now();
				pending = null;
				return result;
			}, (error) => {
				pending = null;
				throw error;
			});
		}
		return pending;
	};
	const stats = (force) => {
		if (force) {
			// rapid forced refreshes within the cooldown get the cache
			if (cached !== null && Date.now() - cachedAt < REFRESH_MIN_MS) return Promise.resolve(cached);
			return rebuild();
		}
		if (cached !== null) {
			// stale-while-revalidate: serve the cache, refresh in the background when stale
			if (Date.now() - cachedAt >= CACHE_TTL_MS) rebuild().catch(() => {});
			return Promise.resolve(cached);
		}
		return rebuild();
	};
	// warm-up: scan right after activation so the first page load hits the cache
	rebuild().catch(() => {});
	const handler = async (req, res) => {
		if (req.method !== "GET" && req.method !== "HEAD") {
			res.writeHead(405, { "content-type": "application/json; charset=utf-8" });
			res.end(JSON.stringify({ error: "method not allowed" }));
			return;
		}
		try {
			const url = new URL(req.url ?? "/", "http://localhost");
			const result = await stats(url.searchParams.get("refresh") === "1");
			res.writeHead(200, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
			res.end(JSON.stringify(result));
		} catch (error) {
			res.writeHead(500, { "content-type": "application/json; charset=utf-8" });
			res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }));
		}
	};
	ctx.effect(() => ctx.webServer.register({
		kind: "exact",
		path: "/token-usage/stats",
		handler
	}), "token-usage stats route");
}

export { apply, inject, name };
