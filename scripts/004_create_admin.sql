-- Script pour créer un utilisateur admin dans Supabase
-- À exécuter dans le SQL Editor de Supabase

-- 1. D'abord, créez un utilisateur via l'interface Supabase Authentication
--    Email: admin@yr-location.fr
--    Password: (votre mot de passe)

-- 2. Ensuite, exécutez cette requête pour ajouter le flag is_admin
-- Remplacez 'admin@yr-location.fr' par l'email de votre admin

UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'm2017koita@gmail.com';

-- 3. Vérifiez que ça a fonctionné :
SELECT 
  id, 
  email, 
  raw_user_meta_data->'is_admin' as is_admin,
  raw_user_meta_data
FROM auth.users 
WHERE email = 'm2017koita@gmail.com';
