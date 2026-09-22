import { i as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as AuthProvider } from "./useAuth-45kOB3fg.mjs";
import { b as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as stringType, i as objectType, n as coerce, r as literalType, t as arrayType } from "../_libs/zod.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-B6UpFf-L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-tbquxS1k.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$11 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "BreastCare AI" },
			{
				name: "description",
				content: "BreastCare AI is a research platform for AI-supported breast cancer early detection, explainable predictions and secure medical data handling."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$11.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] })
	});
}
var $$splitComponentImporter$10 = () => import("./routes-BuqGjIzC.mjs");
var TITLE$1 = "BreastCare AI — AI-Powered Breast Cancer Research & Early Detection Support";
var DESCRIPTION$1 = "A research platform combining machine learning, explainable AI, secure medical data handling and healthcare discovery for breast cancer early detection support.";
var Route$10 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: TITLE$1 },
		{
			name: "description",
			content: DESCRIPTION$1
		},
		{
			property: "og:title",
			content: TITLE$1
		},
		{
			property: "og:description",
			content: DESCRIPTION$1
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./assessment-CoZIgfDo.mjs");
var Route$9 = createFileRoute("/assessment")({
	head: () => ({ meta: [{ title: "Patient Assessment — BreastCare AI" }, {
		name: "description",
		content: "Complete your baseline patient health and concern assessment."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
objectType({
	full_name: stringType().min(2, "Full name must be at least 2 characters."),
	mobile: stringType().min(5, "Please enter a valid mobile number."),
	email: stringType().email("Please enter a valid email address."),
	address: stringType().optional(),
	age: coerce.number().min(18, "Age must be at least 18.").max(120, "Please enter a valid age."),
	concern_description: stringType().optional(),
	concern_categories: arrayType(stringType()).min(1, "Please select at least one concern category."),
	information_confirmed: literalType(true, { errorMap: () => ({ message: "You must confirm that the information provided is accurate." }) })
});
var $$splitComponentImporter$8 = () => import("./dashboard-pUgKn114.mjs");
var Route$8 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — BreastCare AI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./diagnostic-analysis-ChkKDtQg.mjs");
var Route$7 = createFileRoute("/diagnostic-analysis")({
	head: () => ({ meta: [{ title: "Diagnostic Analysis — BreastCare AI" }, {
		name: "description",
		content: "Run 4-model machine learning diagnostic predictions on UCI Breast Cancer features."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./how-it-works-Dl-Fm4ns.mjs");
var TITLE = "How BreastCare AI Works — Assessment to Professional Consultation";
var DESCRIPTION = "The five steps of the BreastCare AI research workflow: create an account, complete the patient assessment, choose an analysis, review the AI result and consult a healthcare professional.";
var Route$6 = createFileRoute("/how-it-works")({
	head: () => ({ meta: [
		{ title: TITLE },
		{
			name: "description",
			content: DESCRIPTION
		},
		{
			property: "og:title",
			content: TITLE
		},
		{
			property: "og:description",
			content: DESCRIPTION
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./image-analysis-C2a4EiPw.mjs");
var Route$5 = createFileRoute("/image-analysis")({
	head: () => ({ meta: [{ title: "Image Analysis — BreastCare AI" }, {
		name: "description",
		content: "Protected medical image upload and clinician-review workflow."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./login-CqjwKkmp.mjs");
var Route$4 = createFileRoute("/login")({
	validateSearch: (search) => ({ redirect: search.redirect || void 0 }),
	head: () => ({ meta: [{ title: "Login — BreastCare AI" }, {
		name: "description",
		content: "Sign in to your BreastCare AI patient or researcher account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./register-BxpVNAo8.mjs");
var Route$3 = createFileRoute("/register")({
	head: () => ({ meta: [{ title: "Register — BreastCare AI" }, {
		name: "description",
		content: "Create your account on BreastCare AI to access research analysis tools."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./dashboard-Bw7ayXyK.mjs");
var Route$2 = createFileRoute("/admin/dashboard")({
	head: () => ({ meta: [{ title: "Admin Dashboard — BreastCare AI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./image-review-CcQJxlDa.mjs");
var Route$1 = createFileRoute("/admin/image-review")({
	head: () => ({ meta: [{ title: "Clinician Image Review — BreastCare AI" }, {
		name: "description",
		content: "Clinician review queue for patient medical images."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./dashboard-BWoXC_dS.mjs");
var Route = createFileRoute("/patient/dashboard")({
	head: () => ({ meta: [{ title: "Patient Dashboard — BreastCare AI" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$10.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$11
	}),
	AssessmentRoute: Route$9.update({
		id: "/assessment",
		path: "/assessment",
		getParentRoute: () => Route$11
	}),
	DashboardRoute: Route$8.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$11
	}),
	DiagnosticAnalysisRoute: Route$7.update({
		id: "/diagnostic-analysis",
		path: "/diagnostic-analysis",
		getParentRoute: () => Route$11
	}),
	HowItWorksRoute: Route$6.update({
		id: "/how-it-works",
		path: "/how-it-works",
		getParentRoute: () => Route$11
	}),
	ImageAnalysisRoute: Route$5.update({
		id: "/image-analysis",
		path: "/image-analysis",
		getParentRoute: () => Route$11
	}),
	LoginRoute: Route$4.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$11
	}),
	RegisterRoute: Route$3.update({
		id: "/register",
		path: "/register",
		getParentRoute: () => Route$11
	}),
	AdminDashboardRoute: Route$2.update({
		id: "/admin/dashboard",
		path: "/admin/dashboard",
		getParentRoute: () => Route$11
	}),
	AdminImageReviewRoute: Route$1.update({
		id: "/admin/image-review",
		path: "/admin/image-review",
		getParentRoute: () => Route$11
	}),
	PatientDashboardRoute: Route.update({
		id: "/patient/dashboard",
		path: "/patient/dashboard",
		getParentRoute: () => Route$11
	})
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
