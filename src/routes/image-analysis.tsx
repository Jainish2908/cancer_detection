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
} from "lucide-react";

export const Route = createFileRoute("/image-analysis")({
  head: () => ({
    meta: [
      { title: "Image Analysis — BreastCare AI" },
      { name: "description", content: "Protected medical image upload and private storage management." },
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
  status: string;
  created_at: string;
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

      // Generate signed URLs for private images
      const recordsWithUrls = await Promise.all(
        records.map(async (rec) => {
          const { data: signedData } = await supabase.storage
            .from("medical-images")
            .createSignedUrl(rec.file_path, 3600);

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

      // 1. Upload to Supabase Storage bucket 'medical-images'
      const { error: uploadErr } = await supabase.storage
        .from("medical-images")
        .upload(filePath, selectedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadErr) {
        throw new Error(uploadErr.message || "Failed to upload file to storage.");
      }

      // 2. Insert record into medical_image_analyses DB table
      const { error: dbErr } = await supabase.from("medical_image_analyses").insert({
        patient_id: user.id,
        file_path: filePath,
        file_name: selectedFile.name,
        file_size: selectedFile.size,
        analysis_notes: notes.trim() || null,
        status: "uploaded",
      });

      if (dbErr) {
        throw new Error(dbErr.message || "Failed to create database record.");
      }

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

      toast.success("Medical image securely uploaded!");
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
      // Delete from storage
      await supabase.storage.from("medical-images").remove([rec.file_path]);

      // Delete DB record
      await supabase.from("medical_image_analyses").delete().eq("id", rec.id);

      // Audit Log
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
                  <h1 className="font-display text-2xl font-bold md:text-3xl">Protected Image Analysis</h1>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Securely upload and store mammography or ultrasound medical images with patient-controlled RLS encryption.
                </p>
              </div>

              <Badge variant="outline" className="w-fit gap-1 text-xs">
                <Lock className="size-3 text-primary" /> Private Bucket: medical-images
              </Badge>
            </div>

            {/* Upload Card */}
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="text-lg">Upload Medical Image Scan</CardTitle>
                <CardDescription>
                  Select a DICOM, PNG, JPEG, or WebP scan file to store in your private folder.
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
                    <Label htmlFor="notes" className="text-xs">Optional Clinical / Research Notes</Label>
                    <Textarea
                      id="notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any radiologist notes or scan context..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={uploading || !selectedFile}>
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" /> Uploading to Encrypted Bucket...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 size-4" /> Upload Protected Image
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Library / Gallery */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Protected Medical Images</CardTitle>
                <CardDescription>
                  Only you have access to read or generate signed URLs for these files.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingList ? (
                  <div className="flex py-8 justify-center">
                    <Loader2 className="size-6 animate-spin text-primary" />
                  </div>
                ) : images.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    No medical images uploaded yet. Upload a scan above to start.
                  </p>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {images.map((img) => (
                      <Card key={img.id} className="overflow-hidden border border-border shadow-sm">
                        <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
                          {img.signedUrl ? (
                            <img
                              src={img.signedUrl}
                              alt={img.file_name}
                              className="object-cover w-full h-full"
                              onError={(e) => {
                                // Fallback icon for non-image / DICOM files
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

                          {img.analysis_notes && (
                            <p className="text-xs italic text-muted-foreground line-clamp-2">
                              "{img.analysis_notes}"
                            </p>
                          )}

                          <div className="flex items-center justify-between pt-2 border-t border-border">
                            <Badge variant="outline" className="text-[10px] gap-1">
                              <ShieldCheck className="size-3 text-emerald-500" /> {img.status}
                            </Badge>

                            <div className="flex items-center gap-1">
                              {img.signedUrl && (
                                <Button asChild variant="ghost" size="icon" title="View Full Image">
                                  <a href={img.signedUrl} target="_blank" rel="noreferrer">
                                    <Eye className="size-4" />
                                  </a>
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                title="Delete Image"
                                onClick={() => handleDelete(img)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
