import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CMmWOs4a.mjs";
import { i as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as useAuth } from "./useAuth-45kOB3fg.mjs";
import { C as ExternalLink, D as CircleCheck, b as FileImage, h as LoaderCircle, i as UserCheck, o as TriangleAlert, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as AuthGuard } from "./AuthGuard-qxpQLo2i.mjs";
import { t as Button } from "./MedicalDisclaimer-NC_BZP6V.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, o as SiteFooter, r as CardDescription, s as SiteHeader, t as Card } from "./card-I-z7i_Y3.mjs";
import { t as Textarea } from "./textarea-MHI0PJVS.mjs";
import { t as Label } from "./label-ChFdRn45.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-eTvNdS7W.mjs";
import { t as Skeleton } from "./skeleton-MGsKMm1R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/image-review-CcQJxlDa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminImageReviewPage() {
	const { user } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [records, setRecords] = (0, import_react.useState)([]);
	const [selectedRecord, setSelectedRecord] = (0, import_react.useState)(null);
	const [reviewStatus, setReviewStatus] = (0, import_react.useState)("completed");
	const [reviewNote, setReviewNote] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const fetchQueue = async () => {
		setLoading(true);
		try {
			const { data, error } = await supabase.from("medical_image_analyses").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			const items = data || [];
			const itemsWithUrls = await Promise.all(items.map(async (item) => {
				const { data: signed } = await supabase.storage.from("medical-images").createSignedUrl(item.file_path, 300);
				return {
					...item,
					signedUrl: signed?.signedUrl || void 0
				};
			}));
			setRecords(itemsWithUrls);
			if (itemsWithUrls.length > 0 && !selectedRecord) setSelectedRecord(itemsWithUrls[0]);
		} catch (err) {
			toast.error("Failed to load image review queue.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchQueue();
	}, []);
	const handleSelect = (rec) => {
		setSelectedRecord(rec);
		setReviewStatus(rec.status === "flagged" ? "flagged" : "completed");
		setReviewNote(rec.analysis_result || "");
	};
	const handleSaveReview = async (e) => {
		e.preventDefault();
		if (!selectedRecord || !user) return;
		if (!reviewNote.trim()) {
			toast.error("Please enter clinical review findings before saving.");
			return;
		}
		setSubmitting(true);
		try {
			const { error: updateErr } = await supabase.from("medical_image_analyses").update({
				status: reviewStatus,
				analysis_result: reviewNote.trim(),
				reviewed_by: user.id,
				reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", selectedRecord.id);
			if (updateErr) throw updateErr;
			await supabase.from("audit_logs").insert({
				user_id: user.id,
				action: "image_reviewed",
				resource: "medical_image_analyses",
				status: "success",
				metadata: {
					image_id: selectedRecord.id,
					patient_id: selectedRecord.patient_id,
					new_status: reviewStatus
				}
			});
			toast.success(`Image review saved as '${reviewStatus}'`);
			await fetchQueue();
		} catch (err) {
			toast.error(err.message || "Failed to submit image review.");
		} finally {
			setSubmitting(false);
		}
	};
	const formatSize = (b) => b / 1024 < 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGuard, {
		requireAdmin: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col bg-background",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 px-4 py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-2xl font-bold md:text-3xl",
									children: "Clinician Image Review Queue"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Human clinician review portal. On-demand signed URLs expire after 5 minutes."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: "Admin Portal"
							})]
						}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 md:grid-cols-[1fr_1.5fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-4 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-1/2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-6 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-48 w-full rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 w-full" })]
							})]
						}) : records.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-12 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "mx-auto size-12 text-muted-foreground mb-3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-lg",
									children: "No Images in Review Queue"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mt-1",
									children: "When patients upload medical scans, they will appear here for clinician review."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 lg:grid-cols-[1.1fr_1.4fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									className: "pb-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
										className: "text-base",
										children: [
											"Upload History Queue (",
											records.length,
											")"
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									className: "space-y-2 max-h-[600px] overflow-y-auto pr-1",
									children: records.map((rec) => {
										const isSelected = selectedRecord?.id === rec.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => handleSelect(rec),
											className: `flex items-start justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? "border-primary bg-primary/5 font-medium" : "border-border hover:bg-muted/50"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1 truncate",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm font-semibold truncate",
														children: rec.file_name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xs text-muted-foreground font-mono",
														children: [
															"Patient: ",
															rec.patient_id.substring(0, 8),
															"... · ",
															formatSize(rec.file_size)
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11px] text-muted-foreground",
														children: new Date(rec.created_at).toLocaleString()
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: rec.status === "completed" ? "outline" : rec.status === "flagged" ? "destructive" : "secondary",
												className: "shrink-0 text-[10px]",
												children: rec.status === "completed" ? "Reviewed" : rec.status === "flagged" ? "Flagged" : "Pending Review"
											})]
										}, rec.id);
									})
								})]
							}), selectedRecord && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "shadow-[var(--shadow-card)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										className: "text-base truncate",
										title: selectedRecord.file_name,
										children: selectedRecord.file_name
									}), selectedRecord.signedUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "outline",
										size: "sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: selectedRecord.signedUrl,
											target: "_blank",
											rel: "noreferrer",
											children: ["Open Full Scan ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "ml-1.5 size-3.5" })]
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									className: "text-xs",
									children: "Signed URL active for 5 minutes · Access logged under audit system"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "space-y-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-slate-950 flex items-center justify-center",
											children: selectedRecord.signedUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: selectedRecord.signedUrl,
												alt: selectedRecord.file_name,
												className: "h-full w-full object-contain"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Signed preview link expired or unavailable"
											})
										}),
										selectedRecord.analysis_notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-md border border-border bg-muted/40 p-3 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-muted-foreground",
												children: "Patient / Radiologist Note:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-foreground",
												children: [
													"\"",
													selectedRecord.analysis_notes,
													"\""
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
											onSubmit: handleSaveReview,
											className: "space-y-4 border-t border-border pt-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs font-semibold",
														children: "Clinician Finding Decision"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-2 gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															type: "button",
															variant: reviewStatus === "completed" ? "default" : "outline",
															onClick: () => setReviewStatus("completed"),
															className: "justify-start gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500" }), " Completed (Normal)"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															type: "button",
															variant: reviewStatus === "flagged" ? "destructive" : "outline",
															onClick: () => setReviewStatus("flagged"),
															className: "justify-start gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" }), " Flagged for Follow-up"]
														})]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
														htmlFor: "reviewNote",
														className: "text-xs font-semibold",
														children: ["Clinical Review Findings & Recommendation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-destructive",
															children: "*"
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
														id: "reviewNote",
														rows: 4,
														required: true,
														value: reviewNote,
														onChange: (e) => setReviewNote(e.target.value),
														placeholder: "Enter detailed clinical findings, observations, or follow-up recommendations for the patient..."
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "submit",
													size: "lg",
													className: "w-full",
													disabled: submitting,
													children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Saving Review..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mr-2 size-4" }), " Submit Clinician Review"] })
												})
											]
										})
									]
								})]
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			]
		})
	});
}
//#endregion
export { AdminImageReviewPage as component };
