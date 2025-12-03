-- Script pour créer le bucket Supabase Storage pour les images de voitures
-- À exécuter dans le SQL Editor de Supabase

-- 1. Créer le bucket pour les images de voitures
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'car-images',
  'car-images',
  true,
  52428800, -- 50MB en bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Policy pour permettre aux admins de lire les images
CREATE POLICY "Admins can read car images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'car-images');

-- 3. Policy pour permettre aux admins d'uploader des images
CREATE POLICY "Admins can upload car images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'car-images' AND
    auth.uid() IN (SELECT id FROM public.admins)
  );

-- 4. Policy pour permettre aux admins de mettre à jour des images
CREATE POLICY "Admins can update car images"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'car-images' AND
    auth.uid() IN (SELECT id FROM public.admins)
  );

-- 5. Policy pour permettre aux admins de supprimer des images
CREATE POLICY "Admins can delete car images"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'car-images' AND
    auth.uid() IN (SELECT id FROM public.admins)
  );

-- 6. Vérifier que le bucket a été créé
SELECT * FROM storage.buckets WHERE id = 'car-images';
