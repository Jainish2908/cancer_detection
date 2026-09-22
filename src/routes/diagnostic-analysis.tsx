import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MedicalDisclaimer } from "@/components/medical/MedicalDisclaimer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Activity,
  BrainCircuit,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import modelsMetadata from "../../supabase/functions/diagnostic-predict/artifacts/models_metadata.json";

export const Route = createFileRoute("/diagnostic-analysis")({
  head: () => ({
    meta: [
      { title: "Diagnostic Analysis — BreastCare AI" },
      { name: "description", content: "Run 4-model machine learning diagnostic predictions on UCI Breast Cancer features." },
    ],
  }),
  component: DiagnosticAnalysisPage,
});

// Preset benchmark test values
const SAMPLE_BENIGN = {
  radius_mean: 13.54,
  texture_mean: 14.36,
  perimeter_mean: 87.46,
  area_mean: 566.3,
  smoothness_mean: 0.09779,
  compactness_mean: 0.08129,
  concavity_mean: 0.06664,
  concave_points_mean: 0.04781,
  symmetry_mean: 0.1885,
  fractal_dimension_mean: 0.05766,
  radius_se: 0.2699,
  texture_se: 0.7886,
  perimeter_se: 2.058,
  area_se: 23.56,
  smoothness_se: 0.008462,
  compactness_se: 0.0146,
  concavity_se: 0.02387,
  concave_points_se: 0.01315,
  symmetry_se: 0.0198,
  fractal_dimension_se: 0.0023,
  radius_worst: 15.11,
  texture_worst: 19.26,
  perimeter_worst: 99.7,
  area_worst: 711.2,
  smoothness_worst: 0.144,
  compactness_worst: 0.1773,
  concavity_worst: 0.239,
  concave_points_worst: 0.1288,
  symmetry_worst: 0.2977,
  fractal_dimension_worst: 0.07259,
};

const SAMPLE_MALIGNANT = {
  radius_mean: 17.99,
  texture_mean: 10.38,
  perimeter_mean: 122.8,
  area_mean: 1001.0,
  smoothness_mean: 0.1184,
  compactness_mean: 0.2776,
  concavity_mean: 0.3001,
  concave_points_mean: 0.1471,
  symmetry_mean: 0.2419,
  fractal_dimension_mean: 0.07871,
  radius_se: 1.095,
  texture_se: 0.9053,
  perimeter_se: 8.589,
  area_se: 153.4,
  smoothness_se: 0.006399,
  compactness_se: 0.04904,
  concavity_se: 0.05373,
  concave_points_se: 0.01587,
  symmetry_se: 0.03003,
  fractal_dimension_se: 0.006193,
  radius_worst: 25.38,
  texture_worst: 17.33,
  perimeter_worst: 184.6,
  area_worst: 2019.0,
  smoothness_worst: 0.1622,
  compactness_worst: 0.6656,
  concavity_worst: 0.7119,
  concave_points_worst: 0.2654,
  symmetry_worst: 0.4601,
  fractal_dimension_worst: 0.1189,
};

type PredictionResult = {
  is_real_trained_inference: boolean;
  timestamp: string;
  overall_risk_assessment: "Malignant" | "Benign";
  average_probability: number;
  models: {
    id: string;
    model: string;
    prediction: "Malignant" | "Benign";
    probability: number;
    accuracy: number;
    f1_score: number;
    attribution_type: string;
    feature_contributions: {
      feature: string;
      label: string;
      raw_value: number;
      scaled_value: number;
      contribution: number;
      impact: string;
    }[];
  }[];
};

function DiagnosticAnalysisPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, number>>(SAMPLE_BENIGN);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleInputChange = (key: string, val: string) => {
    const num = parseFloat(val);
    setFormData((prev) => ({ ...prev, [key]: isNaN(num) ? 0 : num }));
  };

  const loadPreset = (preset: typeof SAMPLE_BENIGN) => {
    setFormData(preset);
    toast.info("Loaded benchmark sample research features into the form.");
  };

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setResult(null);

    try {
      // 1. Invoke Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("diagnostic-predict", {
        body: formData,
      });

      if (error) {
        throw new Error(error.message || "Failed to execute diagnostic prediction Edge Function.");
      }

      const predictionData: PredictionResult = data;
      setResult(predictionData);

      // 2. Insert into diagnostic_results table
      const { error: dbErr } = await supabase.from("diagnostic_results").insert({
        patient_id: user.id,
        input_features: formData as any,
        model_outputs: predictionData as any,
      });

      if (dbErr) {
        console.warn("Could not save diagnostic_results record:", dbErr.message);
      }

      // 3. Audit Log
      await supabase.from("audit_logs").insert({
        user_id: user.id,
        action: "diagnostic_analysis_run",
        resource: "diagnostic_results",
        status: "success",
        metadata: {
          overall_assessment: predictionData.overall_risk_assessment,
          average_probability: predictionData.average_probability,
        },
      });

      toast.success("Real trained diagnostic inference completed!");
    } catch (err: any) {
      toast.error(err.message || "An error occurred during diagnostic analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard requireAssessment>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />

        <main className="flex-1 px-4 py-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="size-6 text-primary" />
                  <h1 className="font-display text-2xl font-bold md:text-3xl">
                    Structured Diagnostic ML Analysis
                  </h1>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Inference across 4 real trained scikit-learn models using UCI Breast Cancer Wisconsin features.
                </p>
              </div>

              {/* Sample Presets */}
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => loadPreset(SAMPLE_BENIGN)}>
                  <Sparkles className="mr-1.5 size-3.5 text-emerald-500" /> Use Sample Benign Case
                </Button>
                <Button variant="outline" size="sm" onClick={() => loadPreset(SAMPLE_MALIGNANT)}>
                  <Sparkles className="mr-1.5 size-3.5 text-rose-500" /> Use Sample Malignant Case
                </Button>
              </div>
            </div>

            {/* Model Benchmark Accuracy Cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(modelsMetadata).map(([key, meta]: [string, any]) => (
                <Card key={key} className="p-3 bg-muted/30 border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">{meta.name}</span>
                    <Badge variant="outline" className="text-[10px] bg-background">
                      Test Acc: {(meta.accuracy * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Macro F1: {meta.f1_score || meta.f1}
                  </p>
                </Card>
              ))}
            </div>

            {/* 30 Features Input Form */}
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="text-lg">UCI Wisconsin 30 Feature Measurements</CardTitle>
                <CardDescription>
                  Exact ordered features corresponding to standard scikit-learn load_breast_cancer dataset.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRunAnalysis} className="space-y-6">
                  {/* Mean features */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-foreground border-b border-border pb-1">
                      1. Mean Measurements
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      {[
                        { key: "radius_mean", label: "Radius Mean" },
                        { key: "texture_mean", label: "Texture Mean" },
                        { key: "perimeter_mean", label: "Perimeter Mean" },
                        { key: "area_mean", label: "Area Mean" },
                        { key: "smoothness_mean", label: "Smoothness Mean" },
                        { key: "compactness_mean", label: "Compactness Mean" },
                        { key: "concavity_mean", label: "Concavity Mean" },
                        { key: "concave_points_mean", label: "Concave Points Mean" },
                        { key: "symmetry_mean", label: "Symmetry Mean" },
                        { key: "fractal_dimension_mean", label: "Fractal Dim. Mean" },
                      ].map(({ key, label }) => (
                        <div key={key} className="space-y-1">
                          <Label htmlFor={key} className="text-xs">{label}</Label>
                          <Input
                            id={key}
                            type="number"
                            step="any"
                            value={formData[key] ?? ""}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            className="h-8 text-xs font-mono"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Standard Error features */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-foreground border-b border-border pb-1">
                      2. Standard Error (SE) Measurements
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      {[
                        { key: "radius_se", label: "Radius SE" },
                        { key: "texture_se", label: "Texture SE" },
                        { key: "perimeter_se", label: "Perimeter SE" },
                        { key: "area_se", label: "Area SE" },
                        { key: "smoothness_se", label: "Smoothness SE" },
                        { key: "compactness_se", label: "Compactness SE" },
                        { key: "concavity_se", label: "Concavity SE" },
                        { key: "concave_points_se", label: "Concave Points SE" },
                        { key: "symmetry_se", label: "Symmetry SE" },
                        { key: "fractal_dimension_se", label: "Fractal Dim. SE" },
                      ].map(({ key, label }) => (
                        <div key={key} className="space-y-1">
                          <Label htmlFor={key} className="text-xs">{label}</Label>
                          <Input
                            id={key}
                            type="number"
                            step="any"
                            value={formData[key] ?? ""}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            className="h-8 text-xs font-mono"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Worst features */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-foreground border-b border-border pb-1">
                      3. Worst Measurements
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      {[
                        { key: "radius_worst", label: "Radius Worst" },
                        { key: "texture_worst", label: "Texture Worst" },
                        { key: "perimeter_worst", label: "Perimeter Worst" },
                        { key: "area_worst", label: "Area Worst" },
                        { key: "smoothness_worst", label: "Smoothness Worst" },
                        { key: "compactness_worst", label: "Compactness Worst" },
                        { key: "concavity_worst", label: "Concavity Worst" },
                        { key: "concave_points_worst", label: "Concave Points Worst" },
                        { key: "symmetry_worst", label: "Symmetry Worst" },
                        { key: "fractal_dimension_worst", label: "Fractal Dim. Worst" },
                      ].map(({ key, label }) => (
                        <div key={key} className="space-y-1">
                          <Label htmlFor={key} className="text-xs">{label}</Label>
                          <Input
                            id={key}
                            type="number"
                            step="any"
                            value={formData[key] ?? ""}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            className="h-8 text-xs font-mono"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" /> Executing TS Model Inference...
                      </>
                    ) : (
                      <>
                        <Activity className="mr-2 size-4" /> Run Real Trained ML Diagnostic Inference
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Skeleton Loader during inference */}
            {loading && (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full rounded-xl" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-lg" />
                  ))}
                </div>
                <Skeleton className="h-64 w-full rounded-xl" />
              </div>
            )}

            {/* Inference Results View */}
            {result && !loading && (
              <div className="space-y-6">
                {/* Consensus Banner */}
                <Card
                  className={`border-2 ${
                    result.overall_risk_assessment === "Malignant"
                      ? "border-rose-500/50 bg-rose-500/10"
                      : "border-emerald-500/50 bg-emerald-500/10"
                  }`}
                >
                  <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      {result.overall_risk_assessment === "Malignant" ? (
                        <AlertTriangle className="size-10 text-rose-500" />
                      ) : (
                        <CheckCircle2 className="size-10 text-emerald-500" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold">
                            Overall ML Consensus: {result.overall_risk_assessment}
                          </h2>
                          <Badge
                            variant={
                              result.overall_risk_assessment === "Malignant" ? "destructive" : "outline"
                            }
                          >
                            Avg Probability: {(result.average_probability * 100).toFixed(1)}%
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Evaluated natively in Deno Edge Function using trained scikit-learn model parameters.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 4 Models Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {result.models.map((m) => (
                    <Card key={m.id} className="shadow-sm flex flex-col justify-between">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-semibold">{m.model}</CardTitle>
                          <Badge variant="outline" className="text-[10px]">
                            Acc: {(m.accuracy * 100).toFixed(1)}%
                          </Badge>
                        </div>
                        <CardDescription className="text-[11px]">
                          F1 Score: {m.f1_score}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Prediction</span>
                          <Badge variant={m.prediction === "Malignant" ? "destructive" : "secondary"}>
                            {m.prediction}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span>Malignancy Risk</span>
                            <span>{(m.probability * 100).toFixed(1)}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className={`h-full rounded-full transition-all ${
                                m.probability >= 0.5 ? "bg-rose-500" : "bg-emerald-500"
                              }`}
                              style={{ width: `${Math.round(m.probability * 100)}%` }}
                            />
                          </div>
                        </div>
                        <p className="text-[10px] text-muted-foreground pt-1 border-t border-border">
                          Attribution: {m.attribution_type === "exact_model_coefficient" ? "Exact Linear Coef" : "Dataset Variance Approx"}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Feature Attribution Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BarChart3 className="size-5 text-primary" /> Genuine Model Feature Explainability (Logistic Regression)
                    </CardTitle>
                    <CardDescription>
                      Exact per-feature contributions calculated as coefficient multiplied by standardized feature value.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={result.models[0]?.feature_contributions || []}
                          margin={{ top: 10, right: 30, left: 40, bottom: 25 }}
                        >
                          <XAxis dataKey="label" tick={{ fontSize: 11 }} interval={0} angle={-25} textAnchor="end" />
                          <YAxis tick={{ fontSize: 11 }} />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="rounded-lg border border-border bg-popover p-3 text-xs shadow-md">
                                    <p className="font-semibold text-popover-foreground">{data.label}</p>
                                    <p className="text-muted-foreground">Raw Value: {data.raw_value}</p>
                                    <p className="text-muted-foreground">Scaled Z-Score: {data.scaled_value}</p>
                                    <p className="font-medium text-primary">Log-Odds Contribution: {data.contribution}</p>
                                    <p className="text-[10px] italic text-muted-foreground mt-1">{data.impact}</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Bar dataKey="contribution" radius={[4, 4, 0, 0]}>
                            {(result.models[0]?.feature_contributions ?? []).map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.contribution > 0 ? "#e11d48" : "#2563eb"}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <MedicalDisclaimer variant="full" />
          </div>
        </main>

        <SiteFooter />
      </div>
    </AuthGuard>
  );
}
