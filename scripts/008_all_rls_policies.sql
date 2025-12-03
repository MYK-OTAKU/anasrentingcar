-- Script pour ajouter les policies RLS sur toutes les tables
-- À exécuter dans le SQL Editor de Supabase

-- ==================== TABLE: reviews ====================
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire les avis approuvés
CREATE POLICY "Anyone can read approved reviews"
  ON public.reviews
  FOR SELECT
  USING (approved = true);

-- Tout le monde peut soumettre un avis (sera marqué comme non approuvé par défaut)
CREATE POLICY "Anyone can submit reviews"
  ON public.reviews
  FOR INSERT
  WITH CHECK (true);

-- Admins peuvent lire tous les avis
CREATE POLICY "Admins can read all reviews"
  ON public.reviews
  FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.admins));

-- Admins peuvent modifier des avis (notamment pour approuver)
CREATE POLICY "Admins can update reviews"
  ON public.reviews
  FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.admins));

-- Admins peuvent supprimer des avis
CREATE POLICY "Admins can delete reviews"
  ON public.reviews
  FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.admins));

-- ==================== TABLE: contact_requests ====================
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Admins peuvent lire toutes les demandes
CREATE POLICY "Admins can read all contact requests"
  ON public.contact_requests
  FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.admins));

-- Tout le monde peut créer une demande de contact
CREATE POLICY "Anyone can create contact requests"
  ON public.contact_requests
  FOR INSERT
  WITH CHECK (true);

-- Admins peuvent modifier les demandes
CREATE POLICY "Admins can update contact requests"
  ON public.contact_requests
  FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.admins));

-- Admins peuvent supprimer les demandes
CREATE POLICY "Admins can delete contact requests"
  ON public.contact_requests
  FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.admins));

-- ==================== Vérification ====================
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  cmd
FROM pg_policies 
WHERE tablename IN ('cars', 'reviews', 'contact_requests')
ORDER BY tablename, policyname;
