import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MedicalDisclaimer } from "@/components/medical/MedicalDisclaimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TITLE = "How BreastCare AI Works — Assessment to Professional Consultation";
const DESCRIPTION =
  "The five steps of the BreastCare AI research workflow: create an account, complete the patient assessment, choose an analysis, review the AI result and consult a healthcare professional.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  {
    title: "Create Account",
    body: "Register with your email and password, or with a mobile one-time code. Only account and contact details are collected at this stage.",
  },
  {
    title: "Complete Assessment",
    body: "A short three-step assessment records your personal details and your current concern in your own words. This is the gateway to the analysis modules.",
  },
  {
    title: "Choose Analysis",
    body: "Run structured diagnostic analysis on research measurements, or upload a protected medical image for the separate image-analysis module.",
  },
  {
    title: "Review AI Result",
    body: "See what each research model returned, alongside a feature-level explanation of the prediction. Nothing is presented as a clinical conclusion.",
  },
  {
    title: "Consult Healthcare Professional",
    body: "Find doctors and laboratories, book an appointment and take your research result to a qualified professional for interpretation.",
  },
];

function HowItWorks() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-3xl space-y-4 px-4 py-14 text-center">
            <h1 className="font-display text-3xl font-extrabold md:text-4xl">How it works</h1>
            <p className="text-muted-foreground">
              Five steps from account creation to a conversation with a qualified healthcare
              professional.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-14">
          <ol className="space-y-4">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <Card className="shadow-[var(--shadow-card)]">
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{step.body}</CardContent>
                </Card>
              </li>
            ))}
          </ol>

          <MedicalDisclaimer className="mt-8" />

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/register">Create your account</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">I already have an account</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
