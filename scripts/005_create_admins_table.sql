-- Script pour créer une table admins et configurer l'admin
-- À exécuter dans le SQL Editor de Supabase

-- 1. Créer la table admins
CREATE TABLE IF NOT EXISTS public.admins (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Activer RLS sur la table
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- 3. Policy pour permettre aux admins de se lire eux-mêmes
CREATE POLICY "Admins can read themselves"
  ON public.admins
  FOR SELECT
  USING (auth.uid() = id);

-- 4. Ajouter votre compte admin
-- Remplacez par l'ID de votre utilisateur (visible dans auth.users)
INSERT INTO public.admins (id, email)
SELECT id, email
FROM auth.users
WHERE email = 'm2017koita@gmail.com'
ON CONFLICT (id) DO NOTHING;

-- 5. Vérifier que l'admin a été créé
SELECT 
  a.id,
  a.email,
  u.created_at as user_created_at,
  a.created_at as admin_created_at
FROM public.admins a
JOIN auth.users u ON u.id = a.id
WHERE a.email = 'm2017koita@gmail.com';

-- 6. (Optionnel) Pour ajouter d'autres admins plus tard :
-- INSERT INTO public.admins (id, email)
-- SELECT id, email FROM auth.users WHERE email = 'autre-admin@example.com';
