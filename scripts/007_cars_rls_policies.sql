-- Script pour ajouter les policies RLS sur la table cars
-- À exécuter dans le SQL Editor de Supabase

-- 1. Activer RLS sur la table cars (si pas déjà fait)
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- 2. Policy pour permettre à tout le monde de lire les voitures disponibles
CREATE POLICY "Anyone can read available cars"
  ON public.cars
  FOR SELECT
  USING (available = true);

-- 3. Policy pour permettre aux admins de lire toutes les voitures
CREATE POLICY "Admins can read all cars"
  ON public.cars
  FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.admins));

-- 4. Policy pour permettre aux admins d'insérer des voitures
CREATE POLICY "Admins can insert cars"
  ON public.cars
  FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));

-- 5. Policy pour permettre aux admins de mettre à jour des voitures
CREATE POLICY "Admins can update cars"
  ON public.cars
  FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.admins));

-- 6. Policy pour permettre aux admins de supprimer des voitures
CREATE POLICY "Admins can delete cars"
  ON public.cars
  FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.admins));

-- 7. Vérifier les policies créées
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd
FROM pg_policies 
WHERE tablename = 'cars';
