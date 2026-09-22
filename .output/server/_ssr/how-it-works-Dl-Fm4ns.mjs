import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as MedicalDisclaimer, t as Button } from "./MedicalDisclaimer-NC_BZP6V.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, o as SiteFooter, s as SiteHeader, t as Card } from "./card-I-z7i_Y3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-it-works-Dl-Fm4ns.js
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		title: "Create Account",
		body: "Register with your email and password, or with a mobile one-time code. Only account and contact details are collected at this stage."
	},
	{
		title: "Complete Assessment",
		body: "A short three-step assessment records your personal details and your current concern in your own words. This is the gateway to the analysis modules."
	},
	{
		title: "Choose Analysis",
		body: "Run structured diagnostic analysis on research measurements, or upload a protected medical image for the separate image-analysis module."
	},
	{
		title: "Review AI Result",
		body: "See what each research model returned, alongside a feature-level explanation of the prediction. Nothing is presented as a clinical conclusion."
	},
	{
		title: "Consult Healthcare Professional",
		body: "Find doctors and laboratories, book an appointment and take your research result to a qualified professional for interpretation."
	}
];
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-b border-border bg-secondary/40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-3xl space-y-4 px-4 py-14 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-extrabold md:text-4xl",
							children: "How it works"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Five steps from account creation to a conversation with a qualified healthcare professional."
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-3xl px-4 py-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "space-y-4",
							children: STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "shadow-[var(--shadow-card)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									className: "flex-row items-center gap-4 space-y-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground",
										children: index + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										className: "text-lg",
										children: step.title
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									className: "text-sm text-muted-foreground",
									children: step.body
								})]
							}) }, step.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedicalDisclaimer, { className: "mt-8" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/register",
									children: "Create your account"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									children: "I already have an account"
								})
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { HowItWorks as component };
