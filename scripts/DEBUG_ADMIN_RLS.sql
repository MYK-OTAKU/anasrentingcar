-- SCRIPT DE DÉBOGAGE ADMIN
-- Exécutez ce script pour vérifier la configuration RLS

-- 1. Vérifier que l'admin existe
SELECT * FROM admins WHERE email = 'm2017koita@gmail.com';

-- 2. Vérifier les policies RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'admins';

-- 3. Tester si RLS bloque l'accès
-- Désactiver temporairement RLS pour tester (NE PAS FAIRE EN PRODUCTION!)
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- Après le test de connexion, RÉACTIVER RLS:
-- ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- 4. Ajouter une policy publique temporaire pour déboguer
-- (ATTENTION: Supprimez cette policy après le test!)
DROP POLICY IF EXISTS "Public read for debugging" ON admins;
CREATE POLICY "Public read for debugging"
  ON admins
  FOR SELECT
  TO authenticated
  USING (true);

-- IMPORTANT: Après avoir testé la connexion, supprimez cette policy:
-- DROP POLICY "Public read for debugging" ON admins;
