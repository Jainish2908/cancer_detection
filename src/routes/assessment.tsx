import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MedicalDisclaimer } from "@/components/medical/MedicalDisclaimer";
import { Loader2, ClipboardCheck, ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Patient Assessment — BreastCare AI" },
      { name: "description", content: "Complete your baseline patient health and concern assessment." },
    ],
  }),
  component: AssessmentPage,
});

const CONCERN_OPTIONS = [
  "Lump or palpable mass",
  "Pain or discomfort",
  "Nipple changes or discharge",
  "Skin dimpling or texture changes",
  "Family history of breast cancer",
  "Routine annual screening",
  "Follow-up on previous imaging",
  "Other concern",
];

const assessmentSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters."),
  mobile: z.string().min(5, "Please enter a valid mobile number."),
  email: z.string().email("Please enter a valid email address."),
  address: z.string().optional(),
  age: z.coerce.number().min(18, "Age must be at least 18.").max(120, "Please enter a valid age."),
  concern_description: z.string().optional(),
  concern_categories: z.array(z.string()).min(1, "Please select at least one concern category."),
  information_confirmed: z.literal(true, {
    errorMap: () => ({ message: "You must confirm that the information provided is accurate." }),
  }),
});

type AssessmentFormValues = z.infer<typeof assessmentSchema>;

function AssessmentPage() {
  const navigate = useNavigate();
  const { user, profile, refresh } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AssessmentFormValues>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      mobile: profile?.mobile || "",
      email: profile?.email || user?.email || "",
      address: profile?.address || "",
      age: profile?.age || undefined,
      concern_description: "",
      concern_categories: [],
      information_confirmed: false as any,
    },
  });

  useEffect(() => {
    if (profile) {
      if (profile.full_name) setValue("full_name", profile.full_name);
      if (profile.mobile) setValue("mobile", profile.mobile);
      if (profile.email) setValue("email", profile.email);
      if (profile.address) setValue("address", profile.address);
      if (profile.age) setValue("age", profile.age);
    }
  }, [profile, setValue]);

  const onSubmit = async (values: AssessmentFormValues) => {
    if (!user) {
      toast.error("You must be logged in to submit an assessment.");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Insert into patient_assessments table
      const { error: insertErr } = await supabase.from("patient_assessments").insert({
        patient_id: user.id,
        full_name: values.full_name.trim(),
        mobile: values.mobile.trim(),
        email: values.email.trim(),
        address: values.address?.trim() || null,
        age: values.age,
        concern_description: values.concern_description?.trim() || null,
        concern_categories: values.concern_categories,
        information_confirmed: true,
        submitted_at: new Date().toISOString(),
      });

      if (insertErr) {
        throw new Error(insertErr.message || "Failed to save assessment.");
      }

      // 2. Update profiles table assessment_completed = true
      const { error: profileErr } = await supabase
        .from("profiles")
        .update({ assessment_completed: true })
        .eq("id", user.id);

      if (profileErr) {
        console.warn("Could not update profile assessment state:", profileErr.message);
      }

      // 3. Insert audit log
      await supabase.from("audit_logs").insert({
        user_id: user.id,
        action: "assessment_submitted",
        resource: "patient_assessments",
        status: "success",
        metadata: {
          submitted_at: new Date().toISOString(),
          categories_count: values.concern_categories.length,
        },
      });

      // Refresh auth state
      await refresh();

      toast.success("Patient assessment completed successfully!");
      navigate({ to: "/patient/dashboard" });
    } catch (err: any) {
      toast.error(err.message || "An error occurred while submitting your assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />

        <main className="flex-1 px-4 py-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-primary">
                <ClipboardCheck className="size-6" />
                <h1 className="font-display text-2xl font-bold md:text-3xl">Patient Health & Concern Assessment</h1>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Please complete this baseline questionnaire before proceeding to Diagnostic Analysis or Image Analysis.
              </p>
            </div>

            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="text-lg">Personal Details & Primary Concerns</CardTitle>
                <CardDescription>
                  This information ensures accurate clinical context and research traceability.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal info fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="full_name">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input id="full_name" {...register("full_name")} placeholder="Jane Doe" />
                      {errors.full_name && (
                        <p className="text-xs text-destructive">{errors.full_name.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input id="email" type="email" {...register("email")} placeholder="jane@example.com" />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="mobile">
                        Mobile Phone <span className="text-destructive">*</span>
                      </Label>
                      <Input id="mobile" type="tel" {...register("mobile")} placeholder="+1 555-0199" />
                      {errors.mobile && (
                        <p className="text-xs text-destructive">{errors.mobile.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="age">
                        Age <span className="text-destructive">*</span>
                      </Label>
                      <Input id="age" type="number" {...register("age")} placeholder="45" />
                      {errors.age && (
                        <p className="text-xs text-destructive">{errors.age.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" {...register("address")} placeholder="Street, City, State, ZIP" />
                  </div>

                  {/* Concern Categories Multi-Select */}
                  <div className="space-y-3 pt-2">
                    <Label>
                      Concern Categories <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">Select all options that describe your current symptoms or purpose.</p>
                    
                    <Controller
                      name="concern_categories"
                      control={control}
                      render={({ field }) => (
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {CONCERN_OPTIONS.map((option) => {
                            const isChecked = field.value?.includes(option);
                            return (
                              <label
                                key={option}
                                className={`flex items-center gap-3 rounded-lg border p-3 text-sm cursor-pointer transition-colors ${
                                  isChecked ? "border-primary bg-primary/5 font-medium" : "border-border hover:bg-muted/50"
                                }`}
                              >
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    if (checked) {
                                      field.onChange([...current, option]);
                                    } else {
                                      field.onChange(current.filter((item) => item !== option));
                                    }
                                  }}
                                />
                                <span>{option}</span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    />
                    {errors.concern_categories && (
                      <p className="text-xs text-destructive">{errors.concern_categories.message}</p>
                    )}
                  </div>

                  {/* Concern Description */}
                  <div className="space-y-1.5">
                    <Label htmlFor="concern_description">Detailed Description of Concern</Label>
                    <Textarea
                      id="concern_description"
                      {...register("concern_description")}
                      rows={4}
                      placeholder="Describe symptoms, duration, location, or any notes for clinical context..."
                    />
                  </div>

                  {/* Confirmation Checkbox */}
                  <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
                    <Controller
                      name="information_confirmed"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="information_confirmed"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5"
                          />
                          <Label htmlFor="information_confirmed" className="text-xs leading-normal cursor-pointer">
                            I confirm that the information provided above is accurate to the best of my knowledge, and I understand this assessment is for research early-detection support.
                          </Label>
                        </div>
                      )}
                    />
                    {errors.information_confirmed && (
                      <p className="text-xs text-destructive">{errors.information_confirmed.message}</p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" /> Submitting Assessment...
                      </>
                    ) : (
                      <>
                        Submit & Unlock Analysis Modules <ArrowRight className="ml-2 size-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <MedicalDisclaimer variant="short" />
          </div>
        </main>

        <SiteFooter />
      </div>
    </AuthGuard>
  );
}
