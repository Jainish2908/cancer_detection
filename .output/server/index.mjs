globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/arrow-right-BWHUylrN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-5iWyIaxwtwGZw/VQUT+R67OGwxo\"",
		"mtime": "2026-09-22T16:50:17.884Z",
		"size": 165,
		"path": "../public/assets/arrow-right-BWHUylrN.js"
	},
	"/assets/assessment-CJIRxota.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d854-PW/bQfbpgIrvyaRzcApx6AbdvC0\"",
		"mtime": "2026-09-22T16:50:17.885Z",
		"size": 55380,
		"path": "../public/assets/assessment-CJIRxota.js"
	},
	"/assets/AuthGuard-B3kgJAJy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36d-vQHel/xr01enLR+G3nUGA7pQp1Q\"",
		"mtime": "2026-09-22T16:50:17.882Z",
		"size": 877,
		"path": "../public/assets/AuthGuard-B3kgJAJy.js"
	},
	"/assets/badge-CAkVk67p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"310-mSXF0psdvg4nAKuVFxqo09YNbdY\"",
		"mtime": "2026-09-22T16:50:17.885Z",
		"size": 784,
		"path": "../public/assets/badge-CAkVk67p.js"
	},
	"/assets/brain-circuit-Bnzhl973.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"320-b/FBqzHsK1luWr8JWXclqUqBzss\"",
		"mtime": "2026-09-22T16:50:17.886Z",
		"size": 800,
		"path": "../public/assets/brain-circuit-Bnzhl973.js"
	},
	"/assets/card-Bjc0_hnu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1a-jzqzoKZSCtoGgb3axB1o1TlriIg\"",
		"mtime": "2026-09-22T16:50:17.886Z",
		"size": 7194,
		"path": "../public/assets/card-Bjc0_hnu.js"
	},
	"/assets/createLucideIcon-C_E0RjOv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a6-WU/BLZA1PRroHa8Sp6R0K4CmfR0\"",
		"mtime": "2026-09-22T16:50:17.888Z",
		"size": 1190,
		"path": "../public/assets/createLucideIcon-C_E0RjOv.js"
	},
	"/assets/client-C5yE1iU5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38d94-G304lAEuqYYtJ7zDABCWJkJlB6A\"",
		"mtime": "2026-09-22T16:50:17.887Z",
		"size": 232852,
		"path": "../public/assets/client-C5yE1iU5.js"
	},
	"/assets/dashboard-CZaldhcm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2871-hU09zAPsGwdtf9LKx39jdC3W08E\"",
		"mtime": "2026-09-22T16:50:17.889Z",
		"size": 10353,
		"path": "../public/assets/dashboard-CZaldhcm.js"
	},
	"/assets/dashboard-DLF60vd5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-KFcOsG7Ib/izhvLwNekeN84t8pg\"",
		"mtime": "2026-09-22T16:50:17.890Z",
		"size": 322,
		"path": "../public/assets/dashboard-DLF60vd5.js"
	},
	"/assets/dashboard-Qy1-L_ii.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1983-iOrfVVvkl4VheIUh1IK0USzTIUM\"",
		"mtime": "2026-09-22T16:50:17.891Z",
		"size": 6531,
		"path": "../public/assets/dashboard-Qy1-L_ii.js"
	},
	"/assets/eye-CgvmUoUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-5xtKwdP14741E2EurTQhi+cvuXo\"",
		"mtime": "2026-09-22T16:50:17.893Z",
		"size": 256,
		"path": "../public/assets/eye-CgvmUoUi.js"
	},
	"/assets/file-image-LRFqO3nY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"190-Rq8FHwu61NoFagJ0k8Co+57MzwQ\"",
		"mtime": "2026-09-22T16:50:17.895Z",
		"size": 400,
		"path": "../public/assets/file-image-LRFqO3nY.js"
	},
	"/assets/file-text-BlvmGplJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-dRN6RmxrwWRM3HaD8h2AaEjuSjE\"",
		"mtime": "2026-09-22T16:50:17.897Z",
		"size": 385,
		"path": "../public/assets/file-text-BlvmGplJ.js"
	},
	"/assets/how-it-works-BwtDDtq_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a70-hnhD4q/R9sDn0lTl/iVYQDy21+Q\"",
		"mtime": "2026-09-22T16:50:17.898Z",
		"size": 2672,
		"path": "../public/assets/how-it-works-BwtDDtq_.js"
	},
	"/assets/image-analysis-Bfh2P5R7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a3a-H+5kiIXB1mOzXtOvIevBR4lgQCs\"",
		"mtime": "2026-09-22T16:50:17.898Z",
		"size": 10810,
		"path": "../public/assets/image-analysis-Bfh2P5R7.js"
	},
	"/assets/image-review-CFUHWAGZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fbf-Wn4rgSkPjTd1wGFby0LRnAdZvCI\"",
		"mtime": "2026-09-22T16:50:17.899Z",
		"size": 8127,
		"path": "../public/assets/image-review-CFUHWAGZ.js"
	},
	"/assets/label-CAgyzdmB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d0-bMLOi6DO4RZH7tBaseiv608zU6k\"",
		"mtime": "2026-09-22T16:50:17.900Z",
		"size": 1232,
		"path": "../public/assets/label-CAgyzdmB.js"
	},
	"/assets/input-97jF04FI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"274-F2K2R81oauC4H9fKijy97pUWlyI\"",
		"mtime": "2026-09-22T16:50:17.900Z",
		"size": 628,
		"path": "../public/assets/input-97jF04FI.js"
	},
	"/assets/loader-circle-CnrF3DeK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-mCErl4EDFogqMJ51/JiERR/qwl4\"",
		"mtime": "2026-09-22T16:50:17.901Z",
		"size": 144,
		"path": "../public/assets/loader-circle-CnrF3DeK.js"
	},
	"/assets/diagnostic-analysis-6750TN2f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b872-aaZnyATvTr4eMx6PTY9uvRihBFI\"",
		"mtime": "2026-09-22T16:50:17.892Z",
		"size": 374898,
		"path": "../public/assets/diagnostic-analysis-6750TN2f.js"
	},
	"/assets/lock-B-NMoCtY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-M+ClCMbWqP1oJ7r03vJh2YU8wfU\"",
		"mtime": "2026-09-22T16:50:17.902Z",
		"size": 206,
		"path": "../public/assets/lock-B-NMoCtY.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-22T13:20:13.418Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/index-DV4lY1lw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70ad6-O5tO3Qlp2PgCKGDFT/WqUHbKmLQ\"",
		"mtime": "2026-09-22T16:50:17.881Z",
		"size": 461526,
		"path": "../public/assets/index-DV4lY1lw.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-22T13:20:20.645Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/login-DEaUzNBd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7b0-8XURUcbu6g1jGRIsJPd3x5M1yyc\"",
		"mtime": "2026-09-22T16:50:17.904Z",
		"size": 1968,
		"path": "../public/assets/login-DEaUzNBd.js"
	},
	"/assets/MedicalDisclaimer-pfH92r14.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8653-HsquBqQSUn4XvEMJMVpUYonmHas\"",
		"mtime": "2026-09-22T16:50:17.882Z",
		"size": 34387,
		"path": "../public/assets/MedicalDisclaimer-pfH92r14.js"
	},
	"/assets/PasswordField-B5CIp4ps.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e81-NX/NFlhpkaNrfjtsIjdDMjda8sg\"",
		"mtime": "2026-09-22T16:50:17.883Z",
		"size": 3713,
		"path": "../public/assets/PasswordField-B5CIp4ps.js"
	},
	"/assets/routes-Cs_OhsnZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22bc-Q+eGEYI+logjrmwQ6yPBAL68od8\"",
		"mtime": "2026-09-22T16:50:17.908Z",
		"size": 8892,
		"path": "../public/assets/routes-Cs_OhsnZ.js"
	},
	"/assets/register-CEr21Rsh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d1c-rtCK8Tszm8mu2Y64uinbYN8OVSk\"",
		"mtime": "2026-09-22T16:50:17.907Z",
		"size": 3356,
		"path": "../public/assets/register-CEr21Rsh.js"
	},
	"/assets/shield-check-D0KdrSBk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-3IWvUmLB9Og+QeSIVeCE3Sv5B4E\"",
		"mtime": "2026-09-22T16:50:17.909Z",
		"size": 320,
		"path": "../public/assets/shield-check-D0KdrSBk.js"
	},
	"/assets/skeleton-COuXYLqj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191-5B4cgPFtacKIc5Hrj1/IvwlppFs\"",
		"mtime": "2026-09-22T16:50:17.911Z",
		"size": 401,
		"path": "../public/assets/skeleton-COuXYLqj.js"
	},
	"/assets/styles-tbquxS1k.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"15270-dqQkDvYCLcAFGzKQZ1nKf6ZbM7E\"",
		"mtime": "2026-09-22T16:50:17.916Z",
		"size": 86640,
		"path": "../public/assets/styles-tbquxS1k.css"
	},
	"/assets/textarea-C-F8o6fJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20e-QZh/JVi+o5a2YoTC4m9rLTs3tqE\"",
		"mtime": "2026-09-22T16:50:17.911Z",
		"size": 526,
		"path": "../public/assets/textarea-C-F8o6fJ.js"
	},
	"/assets/triangle-alert-BPz2Deg0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-imrN2B1XB80YClcu8BqQTi6CjGc\"",
		"mtime": "2026-09-22T16:50:17.912Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-BPz2Deg0.js"
	},
	"/assets/user-check-Ch_zt-8x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f3-V4IlpkxEpzSfwQwUGMkyTNO2Pj8\"",
		"mtime": "2026-09-22T16:50:17.916Z",
		"size": 243,
		"path": "../public/assets/user-check-Ch_zt-8x.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_FzEe9l = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_FzEe9l
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
