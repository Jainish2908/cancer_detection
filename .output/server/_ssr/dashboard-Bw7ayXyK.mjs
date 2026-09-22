import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CMmWOs4a.mjs";
import { i as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { N as Activity, h as LoaderCircle, n as Users, u as ShieldCheck, y as FileText } from "../_libs/lucide-react.mjs";
import { t as AuthGuard } from "./AuthGuard-qxpQLo2i.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, o as SiteFooter, s as SiteHeader, t as Card } from "./card-I-z7i_Y3.mjs";
import { t as Badge } from "./badge-eTvNdS7W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Bw7ayXyK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboardPage() {
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [auditLogs, setAuditLogs] = (0, import_react.useState)([]);
	const [assessments, setAssessments] = (0, import_react.useState)([]);
	const [stats, setStats] = (0, import_react.useState)({
		profilesCount: 0,
		assessmentsCount: 0,
		auditLogsCount: 0
	});
	(0, import_react.useEffect)(() => {
		async function loadAdminData() {
			setLoading(true);
			try {
				const [logsRes, assessRes, profilesCountRes, assessCountRes, logsCountRes] = await Promise.all([
					supabase.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(10),
					supabase.from("patient_assessments").select("*").order("submitted_at", { ascending: false }).limit(10),
					supabase.from("profiles").select("id", {
						count: "exact",
						head: true
					}),
					supabase.from("patient_assessments").select("id", {
						count: "exact",
						head: true
					}),
					supabase.from("audit_logs").select("id", {
						count: "exact",
						head: true
					})
				]);
				setAuditLogs(logsRes.data || []);
				setAssessments(assessRes.data || []);
				setStats({
					profilesCount: profilesCountRes.count || 0,
					assessmentsCount: assessCountRes.count || 0,
					auditLogsCount: logsCountRes.count || 0
				});
			} catch (err) {
				console.error("Error loading admin data:", err);
			} finally {
				setLoading(false);
			}
		}
		loadAdminData();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGuard, {
		requireAdmin: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col bg-background",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 px-4 py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl space-y-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between border-b border-border pb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-3xl font-bold",
									children: "Admin Portal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "destructive",
									children: "Admin Access"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "System audit oversight, patient assessment registry, and platform statistics."
							})] })
						}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex py-12 justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-8 animate-spin text-primary" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
										className: "flex flex-row items-center justify-between pb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
											className: "text-sm font-medium text-muted-foreground",
											children: "Total Registered Users"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-primary" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-bold",
										children: stats.profilesCount
									}) })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
										className: "flex flex-row items-center justify-between pb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
											className: "text-sm font-medium text-muted-foreground",
											children: "Completed Assessments"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-primary" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-bold",
										children: stats.assessmentsCount
									}) })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
										className: "flex flex-row items-center justify-between pb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
											className: "text-sm font-medium text-muted-foreground",
											children: "Audit Log Entries"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4 text-primary" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-bold",
										children: stats.auditLogsCount
									}) })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "flex items-center gap-2 text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-primary" }), " Security Audit Log"]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: auditLogs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-4 text-center text-sm text-muted-foreground",
								children: "No audit logs recorded yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "border-b border-border text-xs font-semibold text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-2",
												children: "Timestamp"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-2",
												children: "Action"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-2",
												children: "Resource"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-2",
												children: "Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-2",
												children: "User ID"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-border",
										children: auditLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 text-xs text-muted-foreground",
												children: new Date(log.created_at).toLocaleString()
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 font-medium",
												children: log.action
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 font-mono text-xs",
												children: log.resource || "-"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: log.status === "success" ? "outline" : "destructive",
													children: log.status
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 font-mono text-xs text-muted-foreground",
												children: log.user_id ? `${log.user_id.substring(0, 8)}...` : "System"
											})
										] }, log.id))
									})]
								})
							}) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-lg",
								children: "Recent Patient Assessments"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: assessments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-4 text-center text-sm text-muted-foreground",
								children: "No patient assessments submitted yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "border-b border-border text-xs font-semibold text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-2",
												children: "Submitted"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-2",
												children: "Patient Name"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-2",
												children: "Email"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-2",
												children: "Categories"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-border",
										children: assessments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 text-xs text-muted-foreground",
												children: new Date(a.submitted_at).toLocaleDateString()
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 font-medium",
												children: a.full_name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 text-muted-foreground",
												children: a.email
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex flex-wrap gap-1",
													children: a.concern_categories?.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "secondary",
														className: "text-[10px]",
														children: cat
													}, cat))
												})
											})
										] }, a.id))
									})]
								})
							}) })] })
						] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			]
		})
	});
}
//#endregion
export { AdminDashboardPage as component };
