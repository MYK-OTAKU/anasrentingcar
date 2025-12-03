-- Script SQL pour vérifier et configurer la colonne display_order
-- À exécuter dans Supabase SQL Editor

-- 1. Vérifier si la colonne existe, sinon la créer
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'reviews' 
        AND column_name = 'display_order'
    ) THEN
        ALTER TABLE reviews ADD COLUMN display_order INTEGER;
    END IF;
END $$;

-- 2. Mettre à jour les avis existants sans display_order
-- Les avis approuvés obtiennent des numéros séquentiels
WITH ranked_reviews AS (
  SELECT 
    id,
    ROW_NUMBER() OVER (ORDER BY created_at DESC) as rank
  FROM reviews
  WHERE approved = true AND display_order IS NULL
)
UPDATE reviews
SET display_order = (SELECT rank FROM ranked_reviews WHERE ranked_reviews.id = reviews.id)
WHERE id IN (SELECT id FROM ranked_reviews);

-- 3. Les avis non approuvés obtiennent un display_order élevé (999)
UPDATE reviews
SET display_order = 999
WHERE approved = false AND display_order IS NULL;

-- 4. Créer un index pour améliorer les performances de tri
CREATE INDEX IF NOT EXISTS idx_reviews_display_order ON reviews(display_order);

-- 5. Créer un index composite pour le tri optimisé
CREATE INDEX IF NOT EXISTS idx_reviews_approved_display_order ON reviews(approved, display_order);

-- 6. Vérifier les résultats
SELECT 
  id, 
  customer_name, 
  rating, 
  approved, 
  display_order,
  created_at
FROM reviews
ORDER BY display_order ASC NULLS LAST, created_at DESC;
