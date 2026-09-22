import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CMmWOs4a.mjs";
import { i as require_react, n as Controller, r as useForm, t } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as CheckboxIndicator, o as require_jsx_runtime, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as useAuth } from "./useAuth-45kOB3fg.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as ClipboardCheck, M as ArrowRight, h as LoaderCircle, k as Check } from "../_libs/lucide-react.mjs";
import { t as AuthGuard } from "./AuthGuard-qxpQLo2i.mjs";
import { a as cn, r as MedicalDisclaimer, t as Button } from "./MedicalDisclaimer-NC_BZP6V.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, o as SiteFooter, r as CardDescription, s as SiteHeader, t as Card } from "./card-I-z7i_Y3.mjs";
import { t as Textarea } from "./textarea-MHI0PJVS.mjs";
import { t as Label } from "./label-ChFdRn45.mjs";
import { t as Input } from "./input-BIiJxMbQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as stringType, i as objectType, n as coerce, r as literalType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assessment-CoZIgfDo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var CONCERN_OPTIONS = [
	"Lump or palpable mass",
	"Pain or discomfort",
	"Nipple changes or discharge",
	"Skin dimpling or texture changes",
	"Family history of breast cancer",
	"Routine annual screening",
	"Follow-up on previous imaging",
	"Other concern"
];
var assessmentSchema = objectType({
	full_name: stringType().min(2, "Full name must be at least 2 characters."),
	mobile: stringType().min(5, "Please enter a valid mobile number."),
	email: stringType().email("Please enter a valid email address."),
	address: stringType().optional(),
	age: coerce.number().min(18, "Age must be at least 18.").max(120, "Please enter a valid age."),
	concern_description: stringType().optional(),
	concern_categories: arrayType(stringType()).min(1, "Please select at least one concern category."),
	information_confirmed: literalType(true, { errorMap: () => ({ message: "You must confirm that the information provided is accurate." }) })
});
function AssessmentPage() {
	const navigate = useNavigate();
	const { user, profile, refresh } = useAuth();
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
		resolver: t(assessmentSchema),
		defaultValues: {
			full_name: profile?.full_name || "",
			mobile: profile?.mobile || "",
			email: profile?.email || user?.email || "",
			address: profile?.address || "",
			age: profile?.age || void 0,
			concern_description: "",
			concern_categories: [],
			information_confirmed: false
		}
	});
	(0, import_react.useEffect)(() => {
		if (profile) {
			if (profile.full_name) setValue("full_name", profile.full_name);
			if (profile.mobile) setValue("mobile", profile.mobile);
			if (profile.email) setValue("email", profile.email);
			if (profile.address) setValue("address", profile.address);
			if (profile.age) setValue("age", profile.age);
		}
	}, [profile, setValue]);
	const onSubmit = async (values) => {
		if (!user) {
			toast.error("You must be logged in to submit an assessment.");
			return;
		}
		setSubmitting(true);
		try {
			const { error: insertErr } = await supabase.from("patient_assessments").insert({
				patient_id: user.id,
				full_name: values.full_name.trim(),
				mobile: values.mobile.trim(),
				email: values.email.trim(),
				address: values.address?.trim() || null,
				age: values.age,
				concern_description: values.concern_description?.trim() || null,
				concern_categories: values.concern_categories,
				information_confirmed: true,
				submitted_at: (/* @__PURE__ */ new Date()).toISOString()
			});
			if (insertErr) throw new Error(insertErr.message || "Failed to save assessment.");
			const { error: profileErr } = await supabase.from("profiles").update({ assessment_completed: true }).eq("id", user.id);
			if (profileErr) console.warn("Could not update profile assessment state:", profileErr.message);
			await supabase.from("audit_logs").insert({
				user_id: user.id,
				action: "assessment_submitted",
				resource: "patient_assessments",
				status: "success",
				metadata: {
					submitted_at: (/* @__PURE__ */ new Date()).toISOString(),
					categories_count: values.concern_categories.length
				}
			});
			await refresh();
			toast.success("Patient assessment completed successfully!");
			navigate({ to: "/patient/dashboard" });
		} catch (err) {
			toast.error(err.message || "An error occurred while submitting your assessment.");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGuard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 px-4 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold md:text-3xl",
								children: "Patient Health & Concern Assessment"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: "Please complete this baseline questionnaire before proceeding to Diagnostic Analysis or Image Analysis."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "shadow-[var(--shadow-card)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-lg",
								children: "Personal Details & Primary Concerns"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "This information ensures accurate clinical context and research traceability." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit(onSubmit),
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
														htmlFor: "full_name",
														children: ["Full Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-destructive",
															children: "*"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "full_name",
														...register("full_name"),
														placeholder: "Jane Doe"
													}),
													errors.full_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-destructive",
														children: errors.full_name.message
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
														htmlFor: "email",
														children: ["Email Address ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-destructive",
															children: "*"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "email",
														type: "email",
														...register("email"),
														placeholder: "jane@example.com"
													}),
													errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-destructive",
														children: errors.email.message
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
														htmlFor: "mobile",
														children: ["Mobile Phone ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-destructive",
															children: "*"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "mobile",
														type: "tel",
														...register("mobile"),
														placeholder: "+1 555-0199"
													}),
													errors.mobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-destructive",
														children: errors.mobile.message
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
														htmlFor: "age",
														children: ["Age ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-destructive",
															children: "*"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "age",
														type: "number",
														...register("age"),
														placeholder: "45"
													}),
													errors.age && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-destructive",
														children: errors.age.message
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "address",
											children: "Address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "address",
											...register("address"),
											placeholder: "Street, City, State, ZIP"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 pt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Concern Categories ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Select all options that describe your current symptoms or purpose."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
												name: "concern_categories",
												control,
												render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid gap-2.5 sm:grid-cols-2",
													children: CONCERN_OPTIONS.map((option) => {
														const isChecked = field.value?.includes(option);
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: `flex items-center gap-3 rounded-lg border p-3 text-sm cursor-pointer transition-colors ${isChecked ? "border-primary bg-primary/5 font-medium" : "border-border hover:bg-muted/50"}`,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
																checked: isChecked,
																onCheckedChange: (checked) => {
																	const current = field.value || [];
																	if (checked) field.onChange([...current, option]);
																	else field.onChange(current.filter((item) => item !== option));
																}
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: option })]
														}, option);
													})
												})
											}),
											errors.concern_categories && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-destructive",
												children: errors.concern_categories.message
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "concern_description",
											children: "Detailed Description of Concern"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "concern_description",
											...register("concern_description"),
											rows: 4,
											placeholder: "Describe symptoms, duration, location, or any notes for clinical context..."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border bg-muted/30 p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
											name: "information_confirmed",
											control,
											render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													id: "information_confirmed",
													checked: field.value,
													onCheckedChange: field.onChange,
													className: "mt-0.5"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "information_confirmed",
													className: "text-xs leading-normal cursor-pointer",
													children: "I confirm that the information provided above is accurate to the best of my knowledge, and I understand this assessment is for research early-detection support."
												})]
											})
										}), errors.information_confirmed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-destructive",
											children: errors.information_confirmed.message
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										size: "lg",
										className: "w-full",
										disabled: submitting,
										children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Submitting Assessment..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Submit & Unlock Analysis Modules ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 size-4" })] })
									})
								]
							}) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedicalDisclaimer, { variant: "short" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	}) });
}
//#endregion
export { AssessmentPage as component };
