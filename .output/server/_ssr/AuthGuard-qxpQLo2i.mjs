import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as useAuth } from "./useAuth-45kOB3fg.mjs";
import { _ as Navigate, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthGuard-qxpQLo2i.js
var import_jsx_runtime = require_jsx_runtime();
function AuthGuard({ children, requireAssessment = false, requireAdmin = false }) {
	const { session, profile, isAdmin, loading } = useAuth();
	const location = useLocation();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center bg-background p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted-foreground",
			children: "Verifying authentication..."
		})]
	});
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		search: { redirect: location.href },
		replace: true
	});
	if (requireAdmin && !isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/patient/dashboard",
		replace: true
	});
	if (requireAssessment && !profile?.assessment_completed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/assessment",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { AuthGuard as t };
