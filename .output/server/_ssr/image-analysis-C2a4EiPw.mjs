import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CMmWOs4a.mjs";
import { i as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as useAuth } from "./useAuth-45kOB3fg.mjs";
import { D as CircleCheck, a as Upload, b as FileImage, h as LoaderCircle, i as UserCheck, m as Lock, o as TriangleAlert, s as Trash2, u as ShieldCheck, w as Clock, x as Eye, y as FileText } from "../_libs/lucide-react.mjs";
import { t as AuthGuard } from "./AuthGuard-qxpQLo2i.mjs";
import { r as MedicalDisclaimer, t as Button } from "./MedicalDisclaimer-NC_BZP6V.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, o as SiteFooter, r as CardDescription, s as SiteHeader, t as Card } from "./card-I-z7i_Y3.mjs";
import { t as Textarea } from "./textarea-MHI0PJVS.mjs";
import { t as Label } from "./label-ChFdRn45.mjs";
import { t as Input } from "./input-BIiJxMbQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-eTvNdS7W.mjs";
import { t as Skeleton } from "./skeleton-MGsKMm1R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/image-analysis-C2a4EiPw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ImageAnalysisPage() {
	const { user } = useAuth();
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [loadingList, setLoadingList] = (0, import_react.useState)(true);
	const [images, setImages] = (0, import_react.useState)([]);
	const [selectedFile, setSelectedFile] = (0, import_react.useState)(null);
	const [notes, setNotes] = (0, import_react.useState)("");
	const loadImages = async () => {
		if (!user) return;
		setLoadingList(true);
		try {
			const { data, error } = await supabase.from("medical_image_analyses").select("*").eq("patient_id", user.id).order("created_at", { ascending: false });
			if (error) throw error;
			const records = data || [];
			const recordsWithUrls = await Promise.all(records.map(async (rec) => {
				const { data: signedData } = await supabase.storage.from("medical-images").createSignedUrl(rec.file_path, 300);
				return {
					...rec,
					signedUrl: signedData?.signedUrl || void 0
				};
			}));
			setImages(recordsWithUrls);
		} catch (err) {
			console.error("Error loading images:", err);
			toast.error("Failed to load image library.");
		} finally {
			setLoadingList(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadImages();
	}, [user]);
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
	};
	const handleUpload = async (e) => {
		e.preventDefault();
		if (!user || !selectedFile) {
			toast.error("Please select a valid image file to upload.");
			return;
		}
		setUploading(true);
		try {
			const sanitizedFileName = selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
			const filePath = `${user.id}/${Date.now()}_${sanitizedFileName}`;
			const { error: uploadErr } = await supabase.storage.from("medical-images").upload(filePath, selectedFile, {
				cacheControl: "3600",
				upsert: false
			});
			if (uploadErr) throw uploadErr;
			const { error: dbErr } = await supabase.from("medical_image_analyses").insert({
				patient_id: user.id,
				file_path: filePath,
				file_name: selectedFile.name,
				file_size: selectedFile.size,
				analysis_notes: notes.trim() || null,
				status: "pending"
			});
			if (dbErr) throw dbErr;
			await supabase.from("audit_logs").insert({
				user_id: user.id,
				action: "image_uploaded",
				resource: "medical-images",
				status: "success",
				metadata: {
					file_name: selectedFile.name,
					file_size: selectedFile.size,
					file_path: filePath
				}
			});
			toast.success("Medical scan uploaded for clinician review!");
			setSelectedFile(null);
			setNotes("");
			await loadImages();
		} catch (err) {
			toast.error(err.message || "An error occurred during file upload.");
		} finally {
			setUploading(false);
		}
	};
	const handleDelete = async (rec) => {
		if (!confirm(`Are you sure you want to delete ${rec.file_name}?`)) return;
		try {
			await supabase.storage.from("medical-images").remove([rec.file_path]);
			await supabase.from("medical_image_analyses").delete().eq("id", rec.id);
			await supabase.from("audit_logs").insert({
				user_id: user?.id || null,
				action: "image_deleted",
				resource: "medical-images",
				status: "success",
				metadata: {
					file_name: rec.file_name,
					file_path: rec.file_path
				}
			});
			toast.success("File deleted.");
			await loadImages();
		} catch (err) {
			toast.error(err.message || "Failed to delete file.");
		}
	};
	const formatFileSize = (bytes) => {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / 1048576).toFixed(1)} MB`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGuard, {
		requireAssessment: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col bg-background",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 px-4 py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "size-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-2xl font-bold md:text-3xl",
										children: "Clinician Image Review & Upload"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Human clinician review workflow. Uploaded mammography and ultrasound scans are held in private patient-encrypted storage."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: "w-fit gap-1 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-3 text-primary" }), " Human Clinician Oversight"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "border-primary/20 bg-primary/5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "flex items-start gap-3 p-4 text-xs text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 shrink-0 text-primary mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-semibold text-sm",
										children: "Human Clinician Review Workflow"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-muted-foreground",
										children: "Medical image analysis on BreastCare AI is conducted by qualified healthcare research clinicians, not by automated black-box AI software. Your uploaded scans are encrypted and reviewed manually by trained professionals."
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "shadow-[var(--shadow-card)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-lg",
									children: "Upload Medical Image Scan"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Select a mammography, ultrasound, or fine-needle scan to submit for clinician review." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleUpload,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center hover:bg-muted/30 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-10 text-muted-foreground mb-3" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "image-input",
													className: "cursor-pointer font-medium text-primary hover:underline",
													children: selectedFile ? selectedFile.name : "Click to select or drag and drop image file"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-xs text-muted-foreground",
													children: "Supported formats: PNG, JPEG, WebP, DICOM (Max 50MB)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "image-input",
													type: "file",
													accept: "image/*,.dcm",
													onChange: handleFileChange,
													className: "hidden"
												})
											]
										}),
										selectedFile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border bg-muted/40 p-3 flex items-center justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: selectedFile.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "ml-2 text-muted-foreground",
												children: [
													"(",
													formatFileSize(selectedFile.size),
													")"
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => setSelectedFile(null),
												children: "Remove"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "notes",
												className: "text-xs",
												children: "Optional Clinical Context / Radiologist Notes"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												id: "notes",
												rows: 2,
												value: notes,
												onChange: (e) => setNotes(e.target.value),
												placeholder: "Add scan date, imaging type, or specific notes..."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											size: "lg",
											className: "w-full",
											disabled: uploading || !selectedFile,
											children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Uploading Scan..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mr-2 size-4" }), " Submit for Clinician Review"] })
										})
									]
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-lg",
								children: "Your Medical Image Scans"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Track clinician review status and view clinical findings notes." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: loadingList ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
								children: [
									1,
									2,
									3
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									className: "p-4 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-36 w-full rounded-md" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-3/4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-1/2" })
									]
								}, i))
							}) : images.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-8 text-center text-sm text-muted-foreground",
								children: "No medical scans uploaded yet. Submit a scan above for clinician review."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
								children: images.map((img) => {
									const isPending = img.status === "uploaded" || img.status === "pending";
									const isFlagged = img.status === "flagged";
									const isCompleted = img.status === "completed";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
										className: "overflow-hidden border border-border shadow-sm flex flex-col justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden",
											children: img.signedUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: img.signedUrl,
												alt: img.file_name,
												className: "object-cover w-full h-full",
												onError: (e) => {
													e.target.style.display = "none";
												}
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-12 text-muted-foreground" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
											className: "p-4 space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-semibold text-sm truncate",
												title: img.file_name,
												children: img.file_name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													formatFileSize(img.file_size),
													" · ",
													new Date(img.created_at).toLocaleDateString()
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2 pt-2 border-t border-border",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-medium text-muted-foreground",
															children: "Status"
														}),
														isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
															variant: "outline",
															className: "gap-1 text-[10px] text-amber-600 border-amber-500/40 bg-amber-500/10",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), " Awaiting clinician review"]
														}),
														isCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
															variant: "default",
															className: "gap-1 text-[10px] bg-emerald-600",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Reviewed by Clinician"]
														}),
														isFlagged && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
															variant: "destructive",
															className: "gap-1 text-[10px]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3" }), " Flagged for Follow-up"]
														})
													]
												}), img.analysis_result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-md bg-muted/60 p-2.5 text-xs space-y-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-semibold text-foreground",
															children: "Clinician Review Note:"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-muted-foreground leading-relaxed",
															children: img.analysis_result
														}),
														img.reviewed_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[10px] text-muted-foreground font-mono pt-1",
															children: ["Reviewed: ", new Date(img.reviewed_at).toLocaleDateString()]
														})
													]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground italic",
													children: "Pending manual review by research clinician."
												})]
											})]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 pt-0 flex items-center justify-between border-t border-border mt-3",
											children: [img.signedUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												variant: "ghost",
												size: "sm",
												className: "text-xs",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: img.signedUrl,
													target: "_blank",
													rel: "noreferrer",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "mr-1.5 size-3.5" }), " View Scan"]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "ghost",
												size: "sm",
												className: "text-xs text-destructive hover:text-destructive",
												onClick: () => handleDelete(img),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1.5 size-3.5" }), " Delete"]
											})]
										})]
									}, img.id);
								})
							}) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedicalDisclaimer, { variant: "short" })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			]
		})
	});
}
//#endregion
export { ImageAnalysisPage as component };
