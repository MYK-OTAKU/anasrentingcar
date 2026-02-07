-- SOLUTION RAPIDE: Désactiver temporairement RLS sur la table admins
-- Cela permettra de tester si le problème vient bien des policies RLS

-- Exécutez cette ligne dans le SQL Editor:
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- Après avoir testé et confirmé que la connexion fonctionne,
-- vous pourrez réactiver RLS et ajuster les policies:
-- ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
