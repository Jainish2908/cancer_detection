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
		"mtime": "2026-09-22T18:09:21.414Z",
		"size": 165,
		"path": "../public/assets/arrow-right-BWHUylrN.js"
	},
	"/assets/AuthGuard-BmQtpRjW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36d-ED0lhvKAkA3XBLLFAjUT6ih6008\"",
		"mtime": "2026-09-22T18:09:21.412Z",
		"size": 877,
		"path": "../public/assets/AuthGuard-BmQtpRjW.js"
	},
	"/assets/badge-DoIYvF3l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"310-gcLGwcLYC0QxHr7m77o7DuOlpAk\"",
		"mtime": "2026-09-22T18:09:21.444Z",
		"size": 784,
		"path": "../public/assets/badge-DoIYvF3l.js"
	},
	"/assets/brain-circuit-Bnzhl973.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"320-b/FBqzHsK1luWr8JWXclqUqBzss\"",
		"mtime": "2026-09-22T18:09:21.445Z",
		"size": 800,
		"path": "../public/assets/brain-circuit-Bnzhl973.js"
	},
	"/assets/card-BJCfgxqd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c0c-/zdSUrs9TuOr3ZaY7+xRhXhX3P8\"",
		"mtime": "2026-09-22T18:09:21.445Z",
		"size": 7180,
		"path": "../public/assets/card-BJCfgxqd.js"
	},
	"/assets/assessment-LTK-46qN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d854-5/NZVS6mdvqJQ2x3AMEfmy38Ar8\"",
		"mtime": "2026-09-22T18:09:21.443Z",
		"size": 55380,
		"path": "../public/assets/assessment-LTK-46qN.js"
	},
	"/assets/createLucideIcon-C_E0RjOv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a6-WU/BLZA1PRroHa8Sp6R0K4CmfR0\"",
		"mtime": "2026-09-22T18:09:21.447Z",
		"size": 1190,
		"path": "../public/assets/createLucideIcon-C_E0RjOv.js"
	},
	"/assets/dashboard-CLpNFBTF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2871-5QlyogDaNF0U6hCjUCyrDQ4W/cc\"",
		"mtime": "2026-09-22T18:09:21.448Z",
		"size": 10353,
		"path": "../public/assets/dashboard-CLpNFBTF.js"
	},
	"/assets/dashboard-DAyZUpJ2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-UrAMa15+NhdkbeR8PmEwfEQT5xw\"",
		"mtime": "2026-09-22T18:09:21.449Z",
		"size": 322,
		"path": "../public/assets/dashboard-DAyZUpJ2.js"
	},
	"/assets/dashboard-DJ8nFEK6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1983-0jiNCZv9YwHzbmMSgjMQRQHP54U\"",
		"mtime": "2026-09-22T18:09:21.449Z",
		"size": 6531,
		"path": "../public/assets/dashboard-DJ8nFEK6.js"
	},
	"/assets/diagnostic-analysis-DMu3jOrj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b872-6QaEdvcsRqYCIcJngow6Ac1ffg8\"",
		"mtime": "2026-09-22T18:09:21.451Z",
		"size": 374898,
		"path": "../public/assets/diagnostic-analysis-DMu3jOrj.js"
	},
	"/assets/file-image-LRFqO3nY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"190-Rq8FHwu61NoFagJ0k8Co+57MzwQ\"",
		"mtime": "2026-09-22T18:09:21.476Z",
		"size": 400,
		"path": "../public/assets/file-image-LRFqO3nY.js"
	},
	"/assets/eye-CgvmUoUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-5xtKwdP14741E2EurTQhi+cvuXo\"",
		"mtime": "2026-09-22T18:09:21.452Z",
		"size": 256,
		"path": "../public/assets/eye-CgvmUoUi.js"
	},
	"/assets/file-text-BlvmGplJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-dRN6RmxrwWRM3HaD8h2AaEjuSjE\"",
		"mtime": "2026-09-22T18:09:21.477Z",
		"size": 385,
		"path": "../public/assets/file-text-BlvmGplJ.js"
	},
	"/assets/how-it-works-BwBpBc6v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a70-lHcZnbgSpnDYfV7cVcDfa1RIyxM\"",
		"mtime": "2026-09-22T18:09:21.478Z",
		"size": 2672,
		"path": "../public/assets/how-it-works-BwBpBc6v.js"
	},
	"/assets/image-analysis-DGHb1PNK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a46-tdfSU7UUXjPqCt6pY12a+3kZVdQ\"",
		"mtime": "2026-09-22T18:09:21.478Z",
		"size": 10822,
		"path": "../public/assets/image-analysis-DGHb1PNK.js"
	},
	"/assets/image-review-1NmmgtgS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fd1-F8noK760jDCjhHIJdBH8aOpIcSA\"",
		"mtime": "2026-09-22T18:09:21.479Z",
		"size": 8145,
		"path": "../public/assets/image-review-1NmmgtgS.js"
	},
	"/assets/client-C5yE1iU5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38d94-G304lAEuqYYtJ7zDABCWJkJlB6A\"",
		"mtime": "2026-09-22T18:09:21.447Z",
		"size": 232852,
		"path": "../public/assets/client-C5yE1iU5.js"
	},
	"/assets/input-D8k6_0pY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"274-SyuwITwDEjj6S8HfF0jxAVhWeaE\"",
		"mtime": "2026-09-22T18:09:21.479Z",
		"size": 628,
		"path": "../public/assets/input-D8k6_0pY.js"
	},
	"/assets/label-Qe3B5aI8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d0-4261rBnVhj91gleTKvEU/LWiZaA\"",
		"mtime": "2026-09-22T18:09:21.480Z",
		"size": 1232,
		"path": "../public/assets/label-Qe3B5aI8.js"
	},
	"/assets/loader-circle-CnrF3DeK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-mCErl4EDFogqMJ51/JiERR/qwl4\"",
		"mtime": "2026-09-22T18:09:21.480Z",
		"size": 144,
		"path": "../public/assets/loader-circle-CnrF3DeK.js"
	},
	"/assets/lock-B-NMoCtY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-M+ClCMbWqP1oJ7r03vJh2YU8wfU\"",
		"mtime": "2026-09-22T18:09:21.481Z",
		"size": 206,
		"path": "../public/assets/lock-B-NMoCtY.js"
	},
	"/assets/index-Du_FMwQq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70ad6-XYPgkNVqFEwqBYbCywXa6WwY4fc\"",
		"mtime": "2026-09-22T18:09:21.412Z",
		"size": 461526,
		"path": "../public/assets/index-Du_FMwQq.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-22T13:20:20.645Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-22T13:20:13.418Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/login-DmdysawB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"946-hzzdVEp7/lKqctcfwRm56WYpNdg\"",
		"mtime": "2026-09-22T18:09:21.481Z",
		"size": 2374,
		"path": "../public/assets/login-DmdysawB.js"
	},
	"/assets/MedicalDisclaimer-DWCXYqBZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8653-6LrrM6M+wMY6dlLieGixddWh4P0\"",
		"mtime": "2026-09-22T18:09:21.413Z",
		"size": 34387,
		"path": "../public/assets/MedicalDisclaimer-DWCXYqBZ.js"
	},
	"/assets/PasswordField-uDj-W23S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e81-9fVUGNuGwrzqBTCIjlEbMxzkQnU\"",
		"mtime": "2026-09-22T18:09:21.414Z",
		"size": 3713,
		"path": "../public/assets/PasswordField-uDj-W23S.js"
	},
	"/assets/register-DCb2KFP3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db8-XmHM6jPE8ySakjPE55L6ONU4iHQ\"",
		"mtime": "2026-09-22T18:09:21.482Z",
		"size": 3512,
		"path": "../public/assets/register-DCb2KFP3.js"
	},
	"/assets/routes-6_tSKF-y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22bc-dPPKqg31ruwlHbSqTECbTgWkHuc\"",
		"mtime": "2026-09-22T18:09:21.483Z",
		"size": 8892,
		"path": "../public/assets/routes-6_tSKF-y.js"
	},
	"/assets/shield-check-D0KdrSBk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-3IWvUmLB9Og+QeSIVeCE3Sv5B4E\"",
		"mtime": "2026-09-22T18:09:21.484Z",
		"size": 320,
		"path": "../public/assets/shield-check-D0KdrSBk.js"
	},
	"/assets/styles-tbquxS1k.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"15270-dqQkDvYCLcAFGzKQZ1nKf6ZbM7E\"",
		"mtime": "2026-09-22T18:09:21.547Z",
		"size": 86640,
		"path": "../public/assets/styles-tbquxS1k.css"
	},
	"/assets/skeleton-BYRIQqrC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191-dV1JGpo8m3ajggSd9IJrf/WyTS8\"",
		"mtime": "2026-09-22T18:09:21.485Z",
		"size": 401,
		"path": "../public/assets/skeleton-BYRIQqrC.js"
	},
	"/assets/textarea-D1hQ1izI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20e-0P7wardaBIjyAXuRFyf4qafLz4g\"",
		"mtime": "2026-09-22T18:09:21.487Z",
		"size": 526,
		"path": "../public/assets/textarea-D1hQ1izI.js"
	},
	"/assets/triangle-alert-BPz2Deg0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-imrN2B1XB80YClcu8BqQTi6CjGc\"",
		"mtime": "2026-09-22T18:09:21.545Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-BPz2Deg0.js"
	},
	"/assets/user-check-Ch_zt-8x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f3-V4IlpkxEpzSfwQwUGMkyTNO2Pj8\"",
		"mtime": "2026-09-22T18:09:21.546Z",
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
