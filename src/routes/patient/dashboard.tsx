import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MedicalDisclaimer } from "@/components/medical/MedicalDisclaimer";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileImage,
  LogOut,
  User,
  Clock,
  BrainCircuit,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/patient/dashboard")({
  head: () => ({
    meta: [{ title: "Patient Dashboard — BreastCare AI" }],
  }),
  component: PatientDashboardPage,
});

type DiagnosticRow = {
  id: string;
  created_at: string;
  model_outputs: any;
};

type ImageRow = {
  id: string;
  file_name: string;
  status: string;
  created_at: string;
  analysis_result: string | null;
};

function PatientDashboardPage() {
  const { profile, user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [latestDiagnostic, setLatestDiagnostic] = useState<DiagnosticRow | null>(null);
  const [recentImages, setRecentImages] = useState<ImageRow[]>([]);

  const isAssessmentDone = profile?.assessment_completed ?? false;

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return;
      setLoading(true);
      try {
        const [diagRes, imgRes] = await Promise.all([
          supabase
            .from("diagnostic_results")
            .select("id, created_at, model_outputs")
            .eq("patient_id", user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
          supabase
            .from("medical_image_analyses")
            .select("id, file_name, status, created_at, analysis_result")
            .eq("patient_id", user.id)
            .order("created_at", { ascending: false })
            .limit(4),
        ]);

        setLatestDiagnostic(diagRes.data as DiagnosticRow | null);
        setRecentImages((imgRes.data as ImageRow[]) || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />

        <main className="flex-1 px-4 py-8">
          <div className="mx-auto max-w-6xl space-y-8">
            {/* Header Section */}
            <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center">
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight">
                  Welcome back, {profile?.full_name || user?.email || "Patient"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Patient ID: <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{user?.id}</code>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  <LogOut className="mr-2 size-4" /> Sign Out
                </Button>
              </div>
            </div>

            {/* Assessment Banner */}
            {!isAssessmentDone ? (
              <Card className="border-amber-500/40 bg-amber-500/10 shadow-sm">
                <CardContent className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 size-6 shrink-0 text-amber-600 dark:text-amber-500" />
                    <div>
                      <h3 className="font-semibold text-foreground">Patient Health Assessment Required</h3>
                      <p className="text-sm text-muted-foreground">
                        Please complete your baseline health & concern assessment to unlock diagnostic research models and image uploads.
                      </p>
                    </div>
                  </div>
                  <Button asChild size="lg" className="shrink-0">
                    <Link to="/assessment">
                      Complete Assessment <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-emerald-500/30 bg-emerald-500/10 shadow-sm">
                <CardContent className="flex items-center gap-3 p-4 text-sm text-foreground">
                  <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
                  <span>
                    Your baseline health assessment is completed. Diagnostic ML and Clinician Image Review modules are unlocked.
                  </span>
                </CardContent>
              </Card>
            )}

            {/* Main Action Modules */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="flex flex-col justify-between shadow-[var(--shadow-card)]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Activity className="size-5" />
                    </span>
                    <Badge variant={isAssessmentDone ? "default" : "secondary"}>
                      {isAssessmentDone ? "Unlocked" : "Locked"}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-xl">Diagnostic ML Analysis</CardTitle>
                  <CardDescription>
                    Inference across 4 real scikit-learn models (Logistic Regression, SVM, Random Forest, KNN) using UCI Breast Cancer features.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> Genuine log-odds feature attributions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> Test-set model accuracy & macro F1 badges
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> Benchmark sample cases
                    </li>
                  </ul>
                  <Button asChild className="w-full" disabled={!isAssessmentDone}>
                    <Link to="/diagnostic-analysis">
                      Launch Diagnostic Analysis <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col justify-between shadow-[var(--shadow-card)]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileImage className="size-5" />
                    </span>
                    <Badge variant={isAssessmentDone ? "default" : "secondary"}>
                      {isAssessmentDone ? "Unlocked" : "Locked"}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-xl">Clinician Image Review</CardTitle>
                  <CardDescription>
                    Upload protected mammography or ultrasound scans for manual review by qualified research clinicians.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> Human clinician oversight & findings
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> Encrypted private bucket storage
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> On-demand 5-min signed URL access
                    </li>
                  </ul>
                  <Button asChild className="w-full" disabled={!isAssessmentDone}>
                    <Link to="/image-analysis">
                      Launch Image Analysis <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Diagnostic & Image Activity History */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Latest Diagnostic Result Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BrainCircuit className="size-4 text-primary" /> Recent Diagnostic Results
                    </CardTitle>
                    <Button asChild variant="ghost" size="sm" className="text-xs">
                      <Link to="/diagnostic-analysis">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ) : !latestDiagnostic ? (
                    <p className="text-xs text-muted-foreground py-2">No diagnostic ML analysis runs recorded yet.</p>
                  ) : (
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between font-medium">
                        <span>Consensus Risk Assessment</span>
                        <Badge variant={latestDiagnostic.model_outputs?.overall_risk_assessment === "Malignant" ? "destructive" : "outline"}>
                          {latestDiagnostic.model_outputs?.overall_risk_assessment || "Completed"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">
                        Executed: {new Date(latestDiagnostic.created_at).toLocaleString()}
                      </p>
                      <p className="text-muted-foreground">
                        Avg Malignancy Risk: {((latestDiagnostic.model_outputs?.average_probability || 0) * 100).toFixed(1)}%
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Image Submissions Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="size-4 text-primary" /> Recent Image Submissions
                    </CardTitle>
                    <Button asChild variant="ghost" size="sm" className="text-xs">
                      <Link to="/image-analysis">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ) : recentImages.length === 0 ? (
                    <p className="text-xs text-muted-foreground py-2">No medical scans uploaded yet.</p>
                  ) : (
                    <div className="space-y-2.5 divide-y divide-border text-xs">
                      {recentImages.map((img) => (
                        <div key={img.id} className="pt-2 flex items-center justify-between">
                          <span className="truncate max-w-[180px] font-medium" title={img.file_name}>
                            {img.file_name}
                          </span>
                          <Badge
                            variant={
                              img.status === "completed"
                                ? "default"
                                : img.status === "flagged"
                                ? "destructive"
                                : "outline"
                            }
                            className="text-[10px]"
                          >
                            {img.status === "completed"
                              ? "Reviewed"
                              : img.status === "flagged"
                              ? "Flagged"
                              : "Awaiting Review"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Profile Overview Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="size-5 text-primary" /> Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="text-sm font-semibold">{profile?.full_name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-semibold">{profile?.email || user?.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Mobile</p>
                  <p className="text-sm font-semibold">{profile?.mobile || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Age</p>
                  <p className="text-sm font-semibold">{profile?.age ? `${profile.age} years` : "N/A"}</p>
                </div>
              </CardContent>
            </Card>

            <MedicalDisclaimer variant="full" />
          </div>
        </main>

        <SiteFooter />
      </div>
    </AuthGuard>
  );
}
