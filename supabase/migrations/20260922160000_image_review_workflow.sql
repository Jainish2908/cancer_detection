-- Migration: Add clinician review fields to medical_image_analyses
ALTER TABLE public.medical_image_analyses
  ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS analysis_result TEXT;

-- Admin update RLS policy for clinician review workflow
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'medical_image_analyses' AND policyname = 'image_update_admin'
  ) THEN
    CREATE POLICY "image_update_admin" ON public.medical_image_analyses
      FOR UPDATE TO authenticated
      USING (public.has_role(auth.uid(), 'admin'))
      WITH CHECK (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;
