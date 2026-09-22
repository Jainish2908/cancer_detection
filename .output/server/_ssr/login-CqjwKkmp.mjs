import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CMmWOs4a.mjs";
import { i as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { g as Link, v as useNavigate, y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Button } from "./MedicalDisclaimer-NC_BZP6V.mjs";
import { t as Label } from "./label-ChFdRn45.mjs";
import { t as Input } from "./input-BIiJxMbQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as PasswordField, t as AuthLayout } from "./PasswordField-CfssE_CZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CqjwKkmp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const search = useSearch({ from: "/login" });
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const handleLogin = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error("Please provide both email and password.");
			return;
		}
		setLoading(true);
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: email.trim(),
				password
			});
			if (error) {
				toast.error(error.message || "Invalid login credentials. Please try again.");
				setLoading(false);
				return;
			}
			if (data.session) {
				toast.success("Successfully logged in.");
				const targetPath = search.redirect || "/dashboard";
				navigate({ to: targetPath });
			}
		} catch (err) {
			toast.error(err.message || "An unexpected error occurred during login.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, {
		title: "Welcome back",
		description: "Enter your credentials to access your dashboard and analysis tools",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-center text-sm text-muted-foreground",
			children: [
				"Don't have an account?",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/register",
					className: "font-medium text-primary hover:underline",
					children: "Register now"
				})
			]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleLogin,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "email",
						children: "Email address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						type: "email",
						placeholder: "jane@example.com",
						required: true,
						value: email,
						onChange: (e) => setEmail(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
						id: "password",
						label: "Password",
						value: password,
						onChange: setPassword,
						autoComplete: "current-password"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					size: "lg",
					disabled: loading,
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Logging in..."] }) : "Sign In"
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
