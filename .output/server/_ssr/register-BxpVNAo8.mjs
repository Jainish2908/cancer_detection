import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CMmWOs4a.mjs";
import { i as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Button } from "./MedicalDisclaimer-NC_BZP6V.mjs";
import { t as Label } from "./label-ChFdRn45.mjs";
import { t as Input } from "./input-BIiJxMbQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as PasswordField, r as PasswordStrength, t as AuthLayout } from "./PasswordField-CfssE_CZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-BxpVNAo8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RegisterPage() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [mobile, setMobile] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [age, setAge] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const handleRegister = async (e) => {
		e.preventDefault();
		if (!email || !password || !fullName) {
			toast.error("Please fill in all required fields.");
			return;
		}
		if (password.length < 8) {
			toast.error("Password must be at least 8 characters long.");
			return;
		}
		setLoading(true);
		try {
			const { data, error } = await supabase.auth.signUp({
				email: email.trim(),
				password,
				options: { data: {
					full_name: fullName.trim(),
					mobile: mobile.trim() || null,
					address: address.trim() || null,
					age: age ? parseInt(age, 10) : null
				} }
			});
			if (error) {
				toast.error(error.message || "Registration failed. Please check your credentials.");
				setLoading(false);
				return;
			}
			if (data.user) {
				toast.success("Account created successfully! Welcome to BreastCare AI.");
				navigate({ to: "/assessment" });
			}
		} catch (err) {
			toast.error(err.message || "An unexpected error occurred during registration.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, {
		title: "Create your account",
		description: "Enter your details to register for research analysis access",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-center text-sm text-muted-foreground",
			children: [
				"Already have an account?",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "font-medium text-primary hover:underline",
					children: "Log in"
				})
			]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleRegister,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
						htmlFor: "fullName",
						children: ["Full Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-destructive",
							children: "*"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "fullName",
						type: "text",
						placeholder: "Jane Doe",
						required: true,
						value: fullName,
						onChange: (e) => setFullName(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
						htmlFor: "email",
						children: ["Email address ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-destructive",
							children: "*"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						type: "email",
						placeholder: "jane@example.com",
						required: true,
						value: email,
						onChange: (e) => setEmail(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "mobile",
							children: "Mobile Number"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "mobile",
							type: "tel",
							placeholder: "+1 555-0199",
							value: mobile,
							onChange: (e) => setMobile(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "age",
							children: "Age"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "age",
							type: "number",
							min: "18",
							max: "120",
							placeholder: "45",
							value: age,
							onChange: (e) => setAge(e.target.value)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "address",
						children: "Address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "address",
						type: "text",
						placeholder: "123 Medical Center Way, Suite 4",
						value: address,
						onChange: (e) => setAddress(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
						id: "password",
						label: "Password",
						value: password,
						onChange: setPassword,
						autoComplete: "new-password"
					}), password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordStrength, { value: password })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					size: "lg",
					disabled: loading,
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Creating Account..."] }) : "Register Account"
				})
			]
		})
	});
}
//#endregion
export { RegisterPage as component };
