import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  ClipboardList,
  FlaskConical,
  Lightbulb,
  Lock,
  ShieldCheck,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MedicalDisclaimer } from "@/components/medical/MedicalDisclaimer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TITLE = "BreastCare AI — AI-Powered Breast Cancer Research & Early Detection Support";
const DESCRIPTION =
  "A research platform combining machine learning, explainable AI, secure medical data handling and healthcare discovery for breast cancer early detection support.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Landing,
});

const PIPELINE = [
  { label: "Assessment", icon: ClipboardList },
  { label: "Analysis", icon: FlaskConical },
  { label: "Prediction", icon: BrainCircuit },
  { label: "Explanation", icon: Lightbulb },
  { label: "Consultation", icon: Stethoscope },
];

const SECURITY_CARDS = [
  {
    title: "Secure Medical Data",
    icon: ShieldCheck,
    body: "Medical files are held in private storage with authorization checks and audit logging on every access.",
  },
  {
    title: "AI-Assisted Analysis",
    icon: BrainCircuit,
    body: "Structured diagnostic measurements are analysed by research machine-learning models, never by guesswork.",
  },
  {
    title: "Explainable Predictions",
    icon: Lightbulb,
    body: "Each research result is paired with feature-level explanations so the reasoning can be reviewed.",
  },
  {
    title: "Patient-Controlled Access",
    icon: Lock,
    body: "Only the patient can grant time-limited access to a protected medical file. Administrators cannot decrypt it.",
  },
];

function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border">
          <div className="grid-medical absolute inset-0 opacity-70" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
            <div className="space-y-6">
              <Badge variant="secondary" className="rounded-full">
                M.Sc. Data Science research project
              </Badge>
              <h1 className="font-display text-4xl font-extrabold leading-[1.1] md:text-5xl">
                Intelligent Breast Cancer Detection Support, Designed Around You
              </h1>
              <p className="max-w-xl text-base text-muted-foreground md:text-lg">
                BreastCare AI combines machine learning, explainable AI, secure medical data
                handling, and healthcare discovery into one research-focused platform.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/register">
                    Start Assessment <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/how-it-works">Explore How It Works</Link>
                </Button>
              </div>
              <MedicalDisclaimer variant="short" className="max-w-xl" />
            </div>

            <HeroVisualization />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8 max-w-2xl space-y-2">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Built around safety, transparency and patient control
            </h2>
            <p className="text-muted-foreground">
              Every part of the platform is designed so that research analysis stays auditable and
              medical data stays in the patient's hands.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SECURITY_CARDS.map(({ title, body, icon: Icon }) => (
              <Card key={title} className="h-full shadow-[var(--shadow-card)]">
                <CardHeader className="space-y-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{body}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-secondary/40">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Two analysis modules, kept deliberately separate
              </h2>
              <p className="text-muted-foreground">
                Structured diagnostic analysis uses the UCI Breast Cancer Wisconsin (Diagnostic)
                research dataset. Medical image analysis is a separate module with its own service
                interface, so an image model can be connected later using an appropriate
                medical-image dataset.
              </p>
              <Button asChild variant="outline">
                <Link to="/how-it-works">
                  See the workflow <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Diagnostic Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Structured measurements analysed by four research models.</p>
                  <p className="text-xs">
                    Logistic Regression · SVM · Random Forest · K-Nearest Neighbours
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Image Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Protected upload, encryption workflow and a separate image service.</p>
                  <p className="text-xs">Patient keeps control of every protected file.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-primary/20 bg-primary text-primary-foreground">
            <CardContent className="grid gap-6 p-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold">Create your account to begin</h2>
                <p className="text-sm text-primary-foreground/85">
                  Registration takes a minute. The patient assessment unlocks the research analysis
                  modules.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/register">Register</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function HeroVisualization() {
  return (
    <Card className="shadow-[var(--shadow-lift)]">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Research workflow</CardTitle>
          <Badge variant="outline" className="gap-1 text-[11px]">
            <UserCheck className="size-3" aria-hidden="true" /> Patient controlled
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-6">
        <ol className="space-y-3">
          {PIPELINE.map(({ label, icon: Icon }, index) => (
            <li key={label} className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="flex-1 text-sm font-medium">{label}</span>
              <span className="text-xs text-muted-foreground">Step {index + 1}</span>
            </li>
          ))}
        </ol>
        <div className="rounded-xl border border-dashed border-border bg-muted/50 p-4 text-xs text-muted-foreground">
          Model outputs and explanations appear here once your research analysis has been run. No
          sample predictions are shown as real results.
        </div>
      </CardContent>
    </Card>
  );
}
