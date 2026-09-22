import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CMmWOs4a.mjs";
import { i as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as useAuth } from "./useAuth-45kOB3fg.mjs";
import { A as ChartColumn, D as CircleCheck, N as Activity, h as LoaderCircle, j as BrainCircuit, l as Sparkles, o as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as AuthGuard } from "./AuthGuard-qxpQLo2i.mjs";
import { r as MedicalDisclaimer, t as Button } from "./MedicalDisclaimer-NC_BZP6V.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, o as SiteFooter, r as CardDescription, s as SiteHeader, t as Card } from "./card-I-z7i_Y3.mjs";
import { t as Label } from "./label-ChFdRn45.mjs";
import { t as Input } from "./input-BIiJxMbQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-eTvNdS7W.mjs";
import { t as Skeleton } from "./skeleton-MGsKMm1R.mjs";
import { a as Cell, i as Bar, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diagnostic-analysis-ChkKDtQg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var models_metadata_default = {
	logistic_regression: {
		"name": "Logistic Regression",
		"accuracy": .9649,
		"f1_score": .9619,
		"description": "Linear probabilistic classifier with exact log-odds feature attribution"
	},
	svm_linear: {
		"name": "Support Vector Machine (Linear)",
		"accuracy": .9649,
		"f1_score": .9615,
		"description": "Maximum-margin hyperplane with linear margin attributions"
	},
	random_forest: {
		"name": "Random Forest",
		"accuracy": .9737,
		"f1_score": .9713,
		"description": "Ensemble of 50 decision trees (max depth 6) with tree-traversal voting"
	},
	knn: {
		"name": "K-Nearest Neighbors",
		"accuracy": .9561,
		"f1_score": .9521,
		"description": "Distance-based instance classifier (k=5) over standardized feature space"
	}
};
var SAMPLE_BENIGN = {
	radius_mean: 13.54,
	texture_mean: 14.36,
	perimeter_mean: 87.46,
	area_mean: 566.3,
	smoothness_mean: .09779,
	compactness_mean: .08129,
	concavity_mean: .06664,
	concave_points_mean: .04781,
	symmetry_mean: .1885,
	fractal_dimension_mean: .05766,
	radius_se: .2699,
	texture_se: .7886,
	perimeter_se: 2.058,
	area_se: 23.56,
	smoothness_se: .008462,
	compactness_se: .0146,
	concavity_se: .02387,
	concave_points_se: .01315,
	symmetry_se: .0198,
	fractal_dimension_se: .0023,
	radius_worst: 15.11,
	texture_worst: 19.26,
	perimeter_worst: 99.7,
	area_worst: 711.2,
	smoothness_worst: .144,
	compactness_worst: .1773,
	concavity_worst: .239,
	concave_points_worst: .1288,
	symmetry_worst: .2977,
	fractal_dimension_worst: .07259
};
var SAMPLE_MALIGNANT = {
	radius_mean: 17.99,
	texture_mean: 10.38,
	perimeter_mean: 122.8,
	area_mean: 1001,
	smoothness_mean: .1184,
	compactness_mean: .2776,
	concavity_mean: .3001,
	concave_points_mean: .1471,
	symmetry_mean: .2419,
	fractal_dimension_mean: .07871,
	radius_se: 1.095,
	texture_se: .9053,
	perimeter_se: 8.589,
	area_se: 153.4,
	smoothness_se: .006399,
	compactness_se: .04904,
	concavity_se: .05373,
	concave_points_se: .01587,
	symmetry_se: .03003,
	fractal_dimension_se: .006193,
	radius_worst: 25.38,
	texture_worst: 17.33,
	perimeter_worst: 184.6,
	area_worst: 2019,
	smoothness_worst: .1622,
	compactness_worst: .6656,
	concavity_worst: .7119,
	concave_points_worst: .2654,
	symmetry_worst: .4601,
	fractal_dimension_worst: .1189
};
function DiagnosticAnalysisPage() {
	const { user } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)(SAMPLE_BENIGN);
	const [result, setResult] = (0, import_react.useState)(null);
	const handleInputChange = (key, val) => {
		const num = parseFloat(val);
		setFormData((prev) => ({
			...prev,
			[key]: isNaN(num) ? 0 : num
		}));
	};
	const loadPreset = (preset) => {
		setFormData(preset);
		toast.info("Loaded benchmark sample research features into the form.");
	};
	const handleRunAnalysis = async (e) => {
		e.preventDefault();
		if (!user) return;
		setLoading(true);
		setResult(null);
		try {
			const { data, error } = await supabase.functions.invoke("diagnostic-predict", { body: formData });
			if (error) throw new Error(error.message || "Failed to execute diagnostic prediction Edge Function.");
			const predictionData = data;
			setResult(predictionData);
			const { error: dbErr } = await supabase.from("diagnostic_results").insert({
				patient_id: user.id,
				input_features: formData,
				model_outputs: predictionData
			});
			if (dbErr) console.warn("Could not save diagnostic_results record:", dbErr.message);
			await supabase.from("audit_logs").insert({
				user_id: user.id,
				action: "diagnostic_analysis_run",
				resource: "diagnostic_results",
				status: "success",
				metadata: {
					overall_assessment: predictionData.overall_risk_assessment,
					average_probability: predictionData.average_probability
				}
			});
			toast.success("Real trained diagnostic inference completed!");
		} catch (err) {
			toast.error(err.message || "An error occurred during diagnostic analysis.");
		} finally {
			setLoading(false);
		}
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
								className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "size-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-2xl font-bold md:text-3xl",
										children: "Structured Diagnostic ML Analysis"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Inference across 4 real trained scikit-learn models using UCI Breast Cancer Wisconsin features."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => loadPreset(SAMPLE_BENIGN),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 size-3.5 text-emerald-500" }), " Use Sample Benign Case"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => loadPreset(SAMPLE_MALIGNANT),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 size-3.5 text-rose-500" }), " Use Sample Malignant Case"]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
								children: Object.entries(models_metadata_default).map(([key, meta]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									className: "p-3 bg-muted/30 border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold",
											children: meta.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "outline",
											className: "text-[10px] bg-background",
											children: [
												"Test Acc: ",
												(meta.accuracy * 100).toFixed(1),
												"%"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-[11px] text-muted-foreground",
										children: ["Macro F1: ", meta.f1_score || meta.f1]
									})]
								}, key))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "shadow-[var(--shadow-card)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-lg",
									children: "UCI Wisconsin 30 Feature Measurements"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Exact ordered features corresponding to standard scikit-learn load_breast_cancer dataset." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleRunAnalysis,
									className: "space-y-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-xs font-semibold text-foreground border-b border-border pb-1",
												children: "1. Mean Measurements"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
												children: [
													{
														key: "radius_mean",
														label: "Radius Mean"
													},
													{
														key: "texture_mean",
														label: "Texture Mean"
													},
													{
														key: "perimeter_mean",
														label: "Perimeter Mean"
													},
													{
														key: "area_mean",
														label: "Area Mean"
													},
													{
														key: "smoothness_mean",
														label: "Smoothness Mean"
													},
													{
														key: "compactness_mean",
														label: "Compactness Mean"
													},
													{
														key: "concavity_mean",
														label: "Concavity Mean"
													},
													{
														key: "concave_points_mean",
														label: "Concave Points Mean"
													},
													{
														key: "symmetry_mean",
														label: "Symmetry Mean"
													},
													{
														key: "fractal_dimension_mean",
														label: "Fractal Dim. Mean"
													}
												].map(({ key, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: key,
														className: "text-xs",
														children: label
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: key,
														type: "number",
														step: "any",
														value: formData[key] ?? "",
														onChange: (e) => handleInputChange(key, e.target.value),
														className: "h-8 text-xs font-mono"
													})]
												}, key))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-xs font-semibold text-foreground border-b border-border pb-1",
												children: "2. Standard Error (SE) Measurements"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
												children: [
													{
														key: "radius_se",
														label: "Radius SE"
													},
													{
														key: "texture_se",
														label: "Texture SE"
													},
													{
														key: "perimeter_se",
														label: "Perimeter SE"
													},
													{
														key: "area_se",
														label: "Area SE"
													},
													{
														key: "smoothness_se",
														label: "Smoothness SE"
													},
													{
														key: "compactness_se",
														label: "Compactness SE"
													},
													{
														key: "concavity_se",
														label: "Concavity SE"
													},
													{
														key: "concave_points_se",
														label: "Concave Points SE"
													},
													{
														key: "symmetry_se",
														label: "Symmetry SE"
													},
													{
														key: "fractal_dimension_se",
														label: "Fractal Dim. SE"
													}
												].map(({ key, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: key,
														className: "text-xs",
														children: label
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: key,
														type: "number",
														step: "any",
														value: formData[key] ?? "",
														onChange: (e) => handleInputChange(key, e.target.value),
														className: "h-8 text-xs font-mono"
													})]
												}, key))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-xs font-semibold text-foreground border-b border-border pb-1",
												children: "3. Worst Measurements"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
												children: [
													{
														key: "radius_worst",
														label: "Radius Worst"
													},
													{
														key: "texture_worst",
														label: "Texture Worst"
													},
													{
														key: "perimeter_worst",
														label: "Perimeter Worst"
													},
													{
														key: "area_worst",
														label: "Area Worst"
													},
													{
														key: "smoothness_worst",
														label: "Smoothness Worst"
													},
													{
														key: "compactness_worst",
														label: "Compactness Worst"
													},
													{
														key: "concavity_worst",
														label: "Concavity Worst"
													},
													{
														key: "concave_points_worst",
														label: "Concave Points Worst"
													},
													{
														key: "symmetry_worst",
														label: "Symmetry Worst"
													},
													{
														key: "fractal_dimension_worst",
														label: "Fractal Dim. Worst"
													}
												].map(({ key, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: key,
														className: "text-xs",
														children: label
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: key,
														type: "number",
														step: "any",
														value: formData[key] ?? "",
														onChange: (e) => handleInputChange(key, e.target.value),
														className: "h-8 text-xs font-mono"
													})]
												}, key))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											size: "lg",
											className: "w-full",
											disabled: loading,
											children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), " Executing TS Model Inference..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "mr-2 size-4" }), " Run Real Trained ML Diagnostic Inference"] })
										})
									]
								}) })]
							}),
							loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 w-full rounded-xl" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
										children: [
											1,
											2,
											3,
											4
										].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 w-full rounded-lg" }, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full rounded-xl" })
								]
							}),
							result && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
										className: `border-2 ${result.overall_risk_assessment === "Malignant" ? "border-rose-500/50 bg-rose-500/10" : "border-emerald-500/50 bg-emerald-500/10"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
											className: "flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-4",
												children: [result.overall_risk_assessment === "Malignant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-10 text-rose-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-10 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
														className: "text-xl font-bold",
														children: ["Overall ML Consensus: ", result.overall_risk_assessment]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
														variant: result.overall_risk_assessment === "Malignant" ? "destructive" : "outline",
														children: [
															"Avg Probability: ",
															(result.average_probability * 100).toFixed(1),
															"%"
														]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-xs text-muted-foreground",
													children: "Evaluated natively in Deno Edge Function using trained scikit-learn model parameters."
												})] })]
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
										children: result.models.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
											className: "shadow-sm flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
												className: "pb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
														className: "text-sm font-semibold",
														children: m.model
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
														variant: "outline",
														className: "text-[10px]",
														children: [
															"Acc: ",
															(m.accuracy * 100).toFixed(1),
															"%"
														]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
													className: "text-[11px]",
													children: ["F1 Score: ", m.f1_score]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
												className: "space-y-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs text-muted-foreground",
															children: "Prediction"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
															variant: m.prediction === "Malignant" ? "destructive" : "secondary",
															children: m.prediction
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex justify-between text-xs font-mono",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Malignancy Risk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [(m.probability * 100).toFixed(1), "%"] })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-2 w-full overflow-hidden rounded-full bg-muted",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: `h-full rounded-full transition-all ${m.probability >= .5 ? "bg-rose-500" : "bg-emerald-500"}`,
																style: { width: `${Math.round(m.probability * 100)}%` }
															})
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[10px] text-muted-foreground pt-1 border-t border-border",
														children: ["Attribution: ", m.attribution_type === "exact_model_coefficient" ? "Exact Linear Coef" : "Dataset Variance Approx"]
													})
												]
											})]
										}, m.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
										className: "flex items-center gap-2 text-lg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-5 text-primary" }), " Genuine Model Feature Explainability (Logistic Regression)"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Exact per-feature contributions calculated as coefficient multiplied by standardized feature value." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-72 w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
											width: "100%",
											height: "100%",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
												data: result.models[0]?.feature_contributions || [],
												margin: {
													top: 10,
													right: 30,
													left: 40,
													bottom: 25
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
														dataKey: "label",
														tick: { fontSize: 11 },
														interval: 0,
														angle: -25,
														textAnchor: "end"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload }) => {
														if (active && payload && payload.length) {
															const data = payload[0].payload;
															return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "rounded-lg border border-border bg-popover p-3 text-xs shadow-md",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																		className: "font-semibold text-popover-foreground",
																		children: data.label
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																		className: "text-muted-foreground",
																		children: ["Raw Value: ", data.raw_value]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																		className: "text-muted-foreground",
																		children: ["Scaled Z-Score: ", data.scaled_value]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																		className: "font-medium text-primary",
																		children: ["Log-Odds Contribution: ", data.contribution]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																		className: "text-[10px] italic text-muted-foreground mt-1",
																		children: data.impact
																	})
																]
															});
														}
														return null;
													} }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
														dataKey: "contribution",
														radius: [
															4,
															4,
															0,
															0
														],
														children: (result.models[0]?.feature_contributions || []).map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: entry.contribution > 0 ? "#e11d48" : "#2563eb" }, `cell-${index}`))
													})
												]
											})
										})
									}) })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedicalDisclaimer, { variant: "full" })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			]
		})
	});
}
//#endregion
export { DiagnosticAnalysisPage as component };
