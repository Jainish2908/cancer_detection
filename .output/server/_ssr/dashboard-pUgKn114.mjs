import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as useAuth } from "./useAuth-45kOB3fg.mjs";
import { _ as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AuthGuard } from "./AuthGuard-qxpQLo2i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-pUgKn114.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const { isAdmin } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGuard, { children: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/admin/dashboard",
		replace: true
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/patient/dashboard",
		replace: true
	}) });
}
//#endregion
export { DashboardPage as component };
