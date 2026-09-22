import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MedicalDisclaimer } from "@/components/medical/MedicalDisclaimer";
import { Activity, AlertCircle, ArrowRight, CheckCircle2, Database, FileImage, LogOut, User } from "lucide-react";

export const Route = createFileRoute("/patient/dashboard")({
  head: () => ({
    meta: [{ title: "Patient Dashboard — BreastCare AI" }],
  }),
  component: PatientDashboardPage,
});

function PatientDashboardPage() {
  const { profile, user, signOut } = useAuth();

  const isAssessmentDone = profile?.assessment_completed ?? false;

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
              <Card className="border-amber-500/40 bg-amber-500/10">
                <CardContent className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 size-6 shrink-0 text-amber-600 dark:text-amber-500" />
                    <div>
                      <h3 className="font-semibold text-foreground">Patient Assessment Required</h3>
                      <p className="text-sm text-muted-foreground">
                        You must complete your baseline health & concern assessment before running diagnostic or image research models.
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
              <Card className="border-success/30 bg-success/10">
                <CardContent className="flex items-center gap-3 p-4 text-sm text-foreground">
                  <CheckCircle2 className="size-5 text-success" />
                  <span>
                    Your patient assessment is completed and on file. Diagnostic and Image analysis modules are unlocked.
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
                    Input 30 UCI Breast Cancer Wisconsin (Diagnostic) features to evaluate risk across 4 ML models (Logistic Regression, SVM, Random Forest, KNN).
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> Feature-level explanations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> Multi-model comparison matrix
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> Preset benchmark research values
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
                  <CardTitle className="mt-4 text-xl">Protected Image Analysis</CardTitle>
                  <CardDescription>
                    Upload protected mammography scans or medical images to your private, encrypted Supabase storage bucket.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> Encrypted private bucket storage
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> Patient-controlled access tokens
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> Secure signed URL preview
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

            {/* Profile Overview */}
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
