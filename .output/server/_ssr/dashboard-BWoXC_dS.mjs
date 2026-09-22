import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CMmWOs4a.mjs";
import { i as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as useAuth } from "./useAuth-45kOB3fg.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as CircleCheck, M as ArrowRight, N as Activity, O as CircleAlert, b as FileImage, j as BrainCircuit, p as LogOut, r as User, y as FileText } from "../_libs/lucide-react.mjs";
import { t as AuthGuard } from "./AuthGuard-qxpQLo2i.mjs";
import { r as MedicalDisclaimer, t as Button } from "./MedicalDisclaimer-NC_BZP6V.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, o as SiteFooter, r as CardDescription, s as SiteHeader, t as Card } from "./card-I-z7i_Y3.mjs";
import { t as Badge } from "./badge-eTvNdS7W.mjs";
import { t as Skeleton } from "./skeleton-MGsKMm1R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BWoXC_dS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PatientDashboardPage() {
	const { profile, user, signOut } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [latestDiagnostic, setLatestDiagnostic] = (0, import_react.useState)(null);
	const [recentImages, setRecentImages] = (0, import_react.useState)([]);
	const isAssessmentDone = profile?.assessment_completed ?? false;
	(0, import_react.useEffect)(() => {
		async function loadDashboardData() {
			if (!user) return;
			setLoading(true);
			try {
				const [diagRes, imgRes] = await Promise.all([supabase.from("diagnostic_results").select("id, created_at, model_outputs").eq("patient_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle(), supabase.from("medical_image_analyses").select("id, file_name, status, created_at, analysis_result").eq("patient_id", user.id).order("created_at", { ascending: false }).limit(4)]);
				setLatestDiagnostic(diagRes.data);
				setRecentImages(imgRes.data || []);
			} catch (err) {
				console.error("Dashboard fetch error:", err);
			} finally {
				setLoading(false);
			}
		}
		loadDashboardData();
	}, [user]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGuard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 px-4 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-3xl font-bold tracking-tight",
								children: ["Welcome back, ", profile?.full_name || user?.email || "Patient"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: ["Patient ID: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "rounded bg-muted px-1.5 py-0.5 text-xs",
									children: user?.id
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => signOut(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 size-4" }), " Sign Out"]
								})
							})]
						}),
						!isAssessmentDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-amber-500/40 bg-amber-500/10 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 size-6 shrink-0 text-amber-600 dark:text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-foreground",
										children: "Patient Health Assessment Required"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Please complete your baseline health & concern assessment to unlock diagnostic research models and image uploads."
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									className: "shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/assessment",
										children: ["Complete Assessment ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 size-4" })]
									})
								})]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-emerald-500/30 bg-emerald-500/10 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "flex items-center gap-3 p-4 text-sm text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-emerald-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your baseline health assessment is completed. Diagnostic ML and Clinician Image Review modules are unlocked." })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "flex flex-col justify-between shadow-[var(--shadow-card)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: isAssessmentDone ? "default" : "secondary",
											children: isAssessmentDone ? "Unlocked" : "Locked"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										className: "mt-4 text-xl",
										children: "Diagnostic ML Analysis"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Inference across 4 real scikit-learn models (Logistic Regression, SVM, Random Forest, KNN) using UCI Breast Cancer features." })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "space-y-2 text-sm text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-primary" }), " Genuine log-odds feature attributions"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-primary" }), " Test-set model accuracy & macro F1 badges"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-primary" }), " Benchmark sample cases"]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										className: "w-full",
										disabled: !isAssessmentDone,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/diagnostic-analysis",
											children: ["Launch Diagnostic Analysis ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 size-4" })]
										})
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "flex flex-col justify-between shadow-[var(--shadow-card)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "size-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: isAssessmentDone ? "default" : "secondary",
											children: isAssessmentDone ? "Unlocked" : "Locked"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										className: "mt-4 text-xl",
										children: "Clinician Image Review"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Upload protected mammography or ultrasound scans for manual review by qualified research clinicians." })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "space-y-2 text-sm text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-primary" }), " Human clinician oversight & findings"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-primary" }), " Encrypted private bucket storage"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-primary" }), " On-demand 5-min signed URL access"]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										className: "w-full",
										disabled: !isAssessmentDone,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/image-analysis",
											children: ["Launch Image Analysis ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 size-4" })]
										})
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									className: "text-base flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "size-4 text-primary" }), " Recent Diagnostic Results"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "ghost",
									size: "sm",
									className: "text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/diagnostic-analysis",
										children: "View All"
									})
								})]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-3/4" })]
							}) : !latestDiagnostic ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground py-2",
								children: "No diagnostic ML analysis runs recorded yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Consensus Risk Assessment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: latestDiagnostic.model_outputs?.overall_risk_assessment === "Malignant" ? "destructive" : "outline",
											children: latestDiagnostic.model_outputs?.overall_risk_assessment || "Completed"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground",
										children: ["Executed: ", new Date(latestDiagnostic.created_at).toLocaleString()]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground",
										children: [
											"Avg Malignancy Risk: ",
											((latestDiagnostic.model_outputs?.average_probability || 0) * 100).toFixed(1),
											"%"
										]
									})
								]
							}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									className: "text-base flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-primary" }), " Recent Image Submissions"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "ghost",
									size: "sm",
									className: "text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/image-analysis",
										children: "View All"
									})
								})]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-3/4" })]
							}) : recentImages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground py-2",
								children: "No medical scans uploaded yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2.5 divide-y divide-border text-xs",
								children: recentImages.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate max-w-[180px] font-medium",
										title: img.file_name,
										children: img.file_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: img.status === "completed" ? "default" : img.status === "flagged" ? "destructive" : "outline",
										className: "text-[10px]",
										children: img.status === "completed" ? "Reviewed" : img.status === "flagged" ? "Flagged" : "Awaiting Review"
									})]
								}, img.id))
							}) })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							className: "flex items-center gap-2 text-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-5 text-primary" }), " Profile Overview"]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "grid gap-4 sm:grid-cols-2 md:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: profile?.full_name || "N/A"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: profile?.email || user?.email || "N/A"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Mobile"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: profile?.mobile || "N/A"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Age"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: profile?.age ? `${profile.age} years` : "N/A"
								})] })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedicalDisclaimer, { variant: "full" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	}) });
}
//#endregion
export { PatientDashboardPage as component };
