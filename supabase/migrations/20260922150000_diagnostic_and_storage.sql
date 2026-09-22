-- Diagnostic analysis results table
CREATE TABLE IF NOT EXISTS public.diagnostic_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  input_features JSONB NOT NULL DEFAULT '{}'::jsonb,
  model_outputs JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.diagnostic_results TO authenticated;
GRANT ALL ON public.diagnostic_results TO service_role;
ALTER TABLE public.diagnostic_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "diagnostic_select_own" ON public.diagnostic_results
  FOR SELECT TO authenticated USING (patient_id = auth.uid());

CREATE POLICY "diagnostic_select_admin" ON public.diagnostic_results
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "diagnostic_insert_own" ON public.diagnostic_results
  FOR INSERT TO authenticated WITH CHECK (patient_id = auth.uid());


-- Medical image analyses table
CREATE TABLE IF NOT EXISTS public.medical_image_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  analysis_notes TEXT,
  status TEXT NOT NULL DEFAULT 'uploaded',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.medical_image_analyses TO authenticated;
GRANT ALL ON public.medical_image_analyses TO service_role;
ALTER TABLE public.medical_image_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "image_select_own" ON public.medical_image_analyses
  FOR SELECT TO authenticated USING (patient_id = auth.uid());

CREATE POLICY "image_select_admin" ON public.medical_image_analyses
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "image_insert_own" ON public.medical_image_analyses
  FOR INSERT TO authenticated WITH CHECK (patient_id = auth.uid());

CREATE POLICY "image_delete_own" ON public.medical_image_analyses
  FOR DELETE TO authenticated USING (patient_id = auth.uid());


-- Storage Bucket for Medical Images (Private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('medical-images', 'medical-images', false)
ON CONFLICT (id) DO NOTHING;

-- Storage object policies
CREATE POLICY "medical_images_user_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'medical-images' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "medical_images_user_select" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'medical-images' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "medical_images_user_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'medical-images' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "medical_images_admin_select" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'medical-images' AND public.has_role(auth.uid(), 'admin'));
