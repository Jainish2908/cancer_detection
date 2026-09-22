import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  FileImage,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Loader2,
  UserCheck,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/admin/image-review")({
  head: () => ({
    meta: [
      { title: "Clinician Image Review — BreastCare AI" },
      { name: "description", content: "Clinician review queue for patient medical images." },
    ],
  }),
  component: AdminImageReviewPage,
});

type ImageRecord = {
  id: string;
  patient_id: string;
  file_path: string;
  file_name: string;
  file_size: number;
  analysis_notes: string | null;
  analysis_result: string | null;
  status: string;
  created_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  signedUrl?: string;
};

function AdminImageReviewPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<ImageRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<ImageRecord | null>(null);
  const [reviewStatus, setReviewStatus] = useState<"completed" | "flagged">("completed");
  const [reviewNote, setReviewNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchQueue = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("medical_image_analyses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const items: ImageRecord[] = (data as ImageRecord[]) || [];

      // Generate short-lived signed URLs (5 minutes / 300s expiry) on demand
      const itemsWithUrls = await Promise.all(
        items.map(async (item) => {
          const { data: signed } = await supabase.storage
            .from("medical-images")
            .createSignedUrl(item.file_path, 300);

          return {
            ...item,
            signedUrl: signed?.signedUrl || undefined,
          };
        }),
      );

      setRecords(itemsWithUrls);
      if (itemsWithUrls.length > 0 && !selectedRecord) {
        setSelectedRecord(itemsWithUrls[0]);
      }
    } catch (err: any) {
      toast.error("Failed to load image review queue.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleSelect = (rec: ImageRecord) => {
    setSelectedRecord(rec);
    setReviewStatus(rec.status === "flagged" ? "flagged" : "completed");
    setReviewNote(rec.analysis_result || "");
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord || !user) return;

    if (!reviewNote.trim()) {
      toast.error("Please enter clinical review findings before saving.");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Update medical_image_analyses table
      const { error: updateErr } = await supabase
        .from("medical_image_analyses")
        .update({
          status: reviewStatus,
          analysis_result: reviewNote.trim(),
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", selectedRecord.id);

      if (updateErr) throw updateErr;

      // 2. Insert audit log
      await supabase.from("audit_logs").insert({
        user_id: user.id,
        action: "image_reviewed",
        resource: "medical_image_analyses",
        status: "success",
        metadata: {
          image_id: selectedRecord.id,
          patient_id: selectedRecord.patient_id,
          new_status: reviewStatus,
        },
      });

      toast.success(`Image review saved as '${reviewStatus}'`);
      await fetchQueue();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit image review.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatSize = (b: number) => (b / 1024 < 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(1)} MB`);

  return (
    <AuthGuard requireAdmin>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />

        <main className="flex-1 px-4 py-8">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <UserCheck className="size-6 text-primary" />
                  <h1 className="font-display text-2xl font-bold md:text-3xl">Clinician Image Review Queue</h1>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Human clinician review portal. On-demand signed URLs expire after 5 minutes.
                </p>
              </div>
              <Badge variant="secondary">Admin Portal</Badge>
            </div>

            {loading ? (
              <div className="grid gap-6 md:grid-cols-[1fr_1.5fr]">
                <Card className="p-4 space-y-4">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </Card>
                <Card className="p-6 space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-24 w-full" />
                </Card>
              </div>
            ) : records.length === 0 ? (
              <Card className="p-12 text-center">
                <FileImage className="mx-auto size-12 text-muted-foreground mb-3" />
                <h3 className="font-semibold text-lg">No Images in Review Queue</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  When patients upload medical scans, they will appear here for clinician review.
                </p>
              </Card>
            ) : (
              <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
                {/* Queue list */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Upload History Queue ({records.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                    {records.map((rec) => {
                      const isSelected = selectedRecord?.id === rec.id;
                      return (
                        <div
                          key={rec.id}
                          onClick={() => handleSelect(rec)}
                          className={`flex items-start justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            isSelected ? "border-primary bg-primary/5 font-medium" : "border-border hover:bg-muted/50"
                          }`}
                        >
                          <div className="space-y-1 truncate">
                            <p className="text-sm font-semibold truncate">{rec.file_name}</p>
                            <p className="text-xs text-muted-foreground font-mono">
                              Patient: {rec.patient_id.substring(0, 8)}... · {formatSize(rec.file_size)}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {new Date(rec.created_at).toLocaleString()}
                            </p>
                          </div>
                          <Badge
                            variant={
                              rec.status === "completed"
                                ? "outline"
                                : rec.status === "flagged"
                                ? "destructive"
                                : "secondary"
                            }
                            className="shrink-0 text-[10px]"
                          >
                            {rec.status === "completed"
                              ? "Reviewed"
                              : rec.status === "flagged"
                              ? "Flagged"
                              : "Pending Review"}
                          </Badge>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Selected Review Panel */}
                {selectedRecord && (
                  <Card className="shadow-[var(--shadow-card)]">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base truncate" title={selectedRecord.file_name}>
                          {selectedRecord.file_name}
                        </CardTitle>
                        {selectedRecord.signedUrl && (
                          <Button asChild variant="outline" size="sm">
                            <a href={selectedRecord.signedUrl} target="_blank" rel="noreferrer">
                              Open Full Scan <ExternalLink className="ml-1.5 size-3.5" />
                            </a>
                          </Button>
                        )}
                      </div>
                      <CardDescription className="text-xs">
                        Signed URL active for 5 minutes · Access logged under audit system
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Image Preview Box */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-slate-950 flex items-center justify-center">
                        {selectedRecord.signedUrl ? (
                          <img
                            src={selectedRecord.signedUrl}
                            alt={selectedRecord.file_name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <p className="text-xs text-muted-foreground">Signed preview link expired or unavailable</p>
                        )}
                      </div>

                      {/* Patient Notes */}
                      {selectedRecord.analysis_notes && (
                        <div className="rounded-md border border-border bg-muted/40 p-3 text-xs">
                          <p className="font-semibold text-muted-foreground">Patient / Radiologist Note:</p>
                          <p className="mt-1 text-foreground">"{selectedRecord.analysis_notes}"</p>
                        </div>
                      )}

                      {/* Review Form */}
                      <form onSubmit={handleSaveReview} className="space-y-4 border-t border-border pt-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">Clinician Finding Decision</Label>
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              type="button"
                              variant={reviewStatus === "completed" ? "default" : "outline"}
                              onClick={() => setReviewStatus("completed")}
                              className="justify-start gap-2"
                            >
                              <CheckCircle2 className="size-4 text-emerald-500" /> Completed (Normal)
                            </Button>
                            <Button
                              type="button"
                              variant={reviewStatus === "flagged" ? "destructive" : "outline"}
                              onClick={() => setReviewStatus("flagged")}
                              className="justify-start gap-2"
                            >
                              <AlertTriangle className="size-4" /> Flagged for Follow-up
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="reviewNote" className="text-xs font-semibold">
                            Clinical Review Findings & Recommendation <span className="text-destructive">*</span>
                          </Label>
                          <Textarea
                            id="reviewNote"
                            rows={4}
                            required
                            value={reviewNote}
                            onChange={(e) => setReviewNote(e.target.value)}
                            placeholder="Enter detailed clinical findings, observations, or follow-up recommendations for the patient..."
                          />
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                          {submitting ? (
                            <>
                              <Loader2 className="mr-2 size-4 animate-spin" /> Saving Review...
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="mr-2 size-4" /> Submit Clinician Review
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </main>

        <SiteFooter />
      </div>
    </AuthGuard>
  );
}
