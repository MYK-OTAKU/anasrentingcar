-- Script simple pour configurer l'admin Anas Rent A Car
-- À exécuter dans le SQL Editor de Supabase

-- ÉTAPE 1: Créer d'abord l'utilisateur dans Supabase Auth UI
-- Allez dans Authentication > Users > Add user
-- Email: m2017koita@gmail.com
-- Password: (votre mot de passe sécurisé)
-- Cochez "Auto Confirm User"
-- COPIEZ L'UID AFFICHÉ

-- ÉTAPE 2: Créer la table admins si elle n'existe pas
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now()
);

-- ÉTAPE 3: Activer RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- ÉTAPE 4: Supprimer les anciennes policies si elles existent
DROP POLICY IF EXISTS "Admins can read themselves" ON admins;
DROP POLICY IF EXISTS "Admins can update themselves" ON admins;
DROP POLICY IF EXISTS "Service role can manage admins" ON admins;

-- ÉTAPE 5: Recréer les policies
CREATE POLICY "Admins can read themselves"
  ON admins
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can update themselves"
  ON admins
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Service role can manage admins"
  ON admins
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ÉTAPE 6: Insérer l'admin (REMPLACEZ 'VOTRE_USER_UID_ICI' par l'UID copié)
-- Si vous avez déjà créé l'utilisateur, récupérez son UID avec:
-- SELECT id, email FROM auth.users WHERE email = 'm2017koita@gmail.com';

INSERT INTO admins (id, email, full_name)
VALUES (
  '92ea1fe6-a350-4fb4-820b-3cf8406635d5',  -- REMPLACEZ PAR L'UID RÉEL
  'm2017koita@gmail.com',
  'Admin Anas'
)
ON CONFLICT (email) DO UPDATE 
SET full_name = EXCLUDED.full_name;

-- ÉTAPE 7: Vérifier que tout fonctionne
SELECT * FROM admins;
