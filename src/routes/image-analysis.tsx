import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MedicalDisclaimer } from "@/components/medical/MedicalDisclaimer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  FileImage,
  Upload,
  Trash2,
  Lock,
  Loader2,
  Eye,
  ShieldCheck,
  FileText,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/image-analysis")({
  head: () => ({
    meta: [
      { title: "Image Analysis — BreastCare AI" },
      { name: "description", content: "Protected medical image upload and clinician-review workflow." },
    ],
  }),
  component: ImageAnalysisPage,
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
  signedUrl?: string;
};

function ImageAnalysisPage() {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [images, setImages] = useState<ImageRecord[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");

  const loadImages = async () => {
    if (!user) return;
    setLoadingList(true);
    try {
      const { data, error } = await supabase
        .from("medical_image_analyses")
        .select("*")
        .eq("patient_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const records: ImageRecord[] = (data as ImageRecord[]) || [];

      // Generate signed URLs for private images (5 min expiry)
      const recordsWithUrls = await Promise.all(
        records.map(async (rec) => {
          const { data: signedData } = await supabase.storage
            .from("medical-images")
            .createSignedUrl(rec.file_path, 300);

          return {
            ...rec,
            signedUrl: signedData?.signedUrl || undefined,
          };
        }),
      );

      setImages(recordsWithUrls);
    } catch (err: any) {
      console.error("Error loading images:", err);
      toast.error("Failed to load image library.");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedFile) {
      toast.error("Please select a valid image file to upload.");
      return;
    }

    setUploading(true);

    try {
      const sanitizedFileName = selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `${user.id}/${Date.now()}_${sanitizedFileName}`;

      // 1. Upload to private Supabase Storage bucket 'medical-images'
      const { error: uploadErr } = await supabase.storage
        .from("medical-images")
        .upload(filePath, selectedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadErr) throw uploadErr;

      // 2. Insert record into medical_image_analyses DB table
      const { error: dbErr } = await supabase.from("medical_image_analyses").insert({
        patient_id: user.id,
        file_path: filePath,
        file_name: selectedFile.name,
        file_size: selectedFile.size,
        analysis_notes: notes.trim() || null,
        status: "pending",
      });

      if (dbErr) throw dbErr;

      // 3. Create Audit Log
      await supabase.from("audit_logs").insert({
        user_id: user.id,
        action: "image_uploaded",
        resource: "medical-images",
        status: "success",
        metadata: {
          file_name: selectedFile.name,
          file_size: selectedFile.size,
          file_path: filePath,
        },
      });

      toast.success("Medical scan uploaded for clinician review!");
      setSelectedFile(null);
      setNotes("");
      await loadImages();
    } catch (err: any) {
      toast.error(err.message || "An error occurred during file upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (rec: ImageRecord) => {
    if (!confirm(`Are you sure you want to delete ${rec.file_name}?`)) return;

    try {
      await supabase.storage.from("medical-images").remove([rec.file_path]);
      await supabase.from("medical_image_analyses").delete().eq("id", rec.id);

      await supabase.from("audit_logs").insert({
        user_id: user?.id || null,
        action: "image_deleted",
        resource: "medical-images",
        status: "success",
        metadata: { file_name: rec.file_name, file_path: rec.file_path },
      });

      toast.success("File deleted.");
      await loadImages();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete file.");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <AuthGuard requireAssessment>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />

        <main className="flex-1 px-4 py-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <FileImage className="size-6 text-primary" />
                  <h1 className="font-display text-2xl font-bold md:text-3xl">Clinician Image Review & Upload</h1>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Human clinician review workflow. Uploaded mammography and ultrasound scans are held in private patient-encrypted storage.
                </p>
              </div>

              <Badge variant="outline" className="w-fit gap-1 text-xs">
                <UserCheck className="size-3 text-primary" /> Human Clinician Oversight
              </Badge>
            </div>

            {/* Workflow Disclaimer Banner */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="flex items-start gap-3 p-4 text-xs text-foreground">
                <ShieldCheck className="size-5 shrink-0 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Human Clinician Review Workflow</h4>
                  <p className="mt-0.5 text-muted-foreground">
                    Medical image analysis on BreastCare AI is conducted by qualified healthcare research clinicians, not by automated black-box AI software. Your uploaded scans are encrypted and reviewed manually by trained professionals.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Upload Form Card */}
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="text-lg">Upload Medical Image Scan</CardTitle>
                <CardDescription>
                  Select a mammography, ultrasound, or fine-needle scan to submit for clinician review.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center hover:bg-muted/30 transition-colors">
                    <Upload className="size-10 text-muted-foreground mb-3" />
                    <Label htmlFor="image-input" className="cursor-pointer font-medium text-primary hover:underline">
                      {selectedFile ? selectedFile.name : "Click to select or drag and drop image file"}
                    </Label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Supported formats: PNG, JPEG, WebP, DICOM (Max 50MB)
                    </p>
                    <Input
                      id="image-input"
                      type="file"
                      accept="image/*,.dcm"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {selectedFile && (
                    <div className="rounded-lg border border-border bg-muted/40 p-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-foreground">{selectedFile.name}</span>
                        <span className="ml-2 text-muted-foreground">({formatFileSize(selectedFile.size)})</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                        Remove
                      </Button>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label htmlFor="notes" className="text-xs">Optional Clinical Context / Radiologist Notes</Label>
                    <Textarea
                      id="notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add scan date, imaging type, or specific notes..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={uploading || !selectedFile}>
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" /> Uploading Scan...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 size-4" /> Submit for Clinician Review
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Uploaded Scans & Review Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Medical Image Scans</CardTitle>
                <CardDescription>
                  Track clinician review status and view clinical findings notes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingList ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="p-4 space-y-3">
                        <Skeleton className="h-36 w-full rounded-md" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </Card>
                    ))}
                  </div>
                ) : images.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    No medical scans uploaded yet. Submit a scan above for clinician review.
                  </p>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {images.map((img) => {
                      const isPending = img.status === "uploaded" || img.status === "pending";
                      const isFlagged = img.status === "flagged";
                      const isCompleted = img.status === "completed";

                      return (
                        <Card key={img.id} className="overflow-hidden border border-border shadow-sm flex flex-col justify-between">
                          <div>
                            <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                              {img.signedUrl ? (
                                <img
                                  src={img.signedUrl}
                                  alt={img.file_name}
                                  className="object-cover w-full h-full"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = "none";
                                  }}
                                />
                              ) : (
                                <FileText className="size-12 text-muted-foreground" />
                              )}
                            </div>

                            <CardContent className="p-4 space-y-3">
                              <div>
                                <h4 className="font-semibold text-sm truncate" title={img.file_name}>
                                  {img.file_name}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  {formatFileSize(img.file_size)} · {new Date(img.created_at).toLocaleDateString()}
                                </p>
                              </div>

                              {/* Status Badge & Clinical Note */}
                              <div className="space-y-2 pt-2 border-t border-border">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-muted-foreground">Status</span>
                                  {isPending && (
                                    <Badge variant="outline" className="gap-1 text-[10px] text-amber-600 border-amber-500/40 bg-amber-500/10">
                                      <Clock className="size-3" /> Awaiting clinician review
                                    </Badge>
                                  )}
                                  {isCompleted && (
                                    <Badge variant="default" className="gap-1 text-[10px] bg-emerald-600">
                                      <CheckCircle2 className="size-3" /> Reviewed by Clinician
                                    </Badge>
                                  )}
                                  {isFlagged && (
                                    <Badge variant="destructive" className="gap-1 text-[10px]">
                                      <AlertTriangle className="size-3" /> Flagged for Follow-up
                                    </Badge>
                                  )}
                                </div>

                                {img.analysis_result ? (
                                  <div className="rounded-md bg-muted/60 p-2.5 text-xs space-y-1">
                                    <p className="font-semibold text-foreground">Clinician Review Note:</p>
                                    <p className="text-muted-foreground leading-relaxed">{img.analysis_result}</p>
                                    {img.reviewed_at && (
                                      <p className="text-[10px] text-muted-foreground font-mono pt-1">
                                        Reviewed: {new Date(img.reviewed_at).toLocaleDateString()}
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-xs text-muted-foreground italic">
                                    Pending manual review by research clinician.
                                  </p>
                                )}
                              </div>
                            </CardContent>
                          </div>

                          <div className="p-4 pt-0 flex items-center justify-between border-t border-border mt-3">
                            {img.signedUrl && (
                              <Button asChild variant="ghost" size="sm" className="text-xs">
                                <a href={img.signedUrl} target="_blank" rel="noreferrer">
                                  <Eye className="mr-1.5 size-3.5" /> View Scan
                                </a>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-destructive hover:text-destructive"
                              onClick={() => handleDelete(img)}
                            >
                              <Trash2 className="mr-1.5 size-3.5" /> Delete
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
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
