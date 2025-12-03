-- Script pour ajouter le champ display_order à la table reviews
-- À exécuter dans le SQL Editor de Supabase

-- Ajout de la colonne display_order (ordre d'affichage, 1 = priorité max)
ALTER TABLE public.reviews
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 999;

-- Création d'un index pour optimiser le tri
CREATE INDEX IF NOT EXISTS idx_reviews_display_order 
ON public.reviews(display_order, created_at DESC);

-- Commentaire pour expliquer l'utilisation
COMMENT ON COLUMN public.reviews.display_order IS 
'Ordre d''affichage dans la page d''accueil (1 = priorité maximale, 999 = pas de priorité). Les avis avec display_order le plus bas s''affichent en premier.';

-- Vérification
SELECT id, customer_name, rating, approved, display_order, created_at
FROM public.reviews
ORDER BY display_order ASC, created_at DESC;
