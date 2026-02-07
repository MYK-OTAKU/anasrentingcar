# Configuration Admin - Guide Rapide

## Problème Actuel

L'erreur `Admin check failed: {}` indique que l'utilisateur n'existe pas dans la table `admins`, même s'il peut se connecter.

## Solution en 3 Étapes

### 1️⃣ Créer l'utilisateur dans Supabase Auth

1. Ouvrez Supabase Dashboard: https://supabase.com
2. Allez dans **Authentication** → **Users**
3. Cliquez sur **Add user** → **Create new user**
4. Remplissez:
   - **Email**: `m2017koita@gmail.com`
   - **Password**: (choisissez un mot de passe sécurisé)
   - ✅ **Cochez "Auto Confirm User"**
5. Cliquez sur **Create user**
6. **IMPORTANT**: Notez l'**User UID** qui apparaît (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### 2️⃣ Exécuter le script SQL

1. Allez dans **SQL Editor** dans Supabase
2. Ouvrez le fichier `scripts/SETUP_ADMIN_SIMPLE.sql`
3. **LIGNE 48**: Remplacez `'VOTRE_USER_UID_ICI'` par l'UID réel copié à l'étape 1

Par exemple, si votre UID est `a1b2c3d4-e5f6-7890-abcd-ef1234567890`, la ligne devient:
```sql
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',  -- UID réel
  'm2017koita@gmail.com',
  'Admin Anas'
)
```

4. Cliquez sur **RUN** pour exécuter tout le script

### 3️⃣ Vérifier et tester

Exécutez cette requête dans le SQL Editor:
```sql
SELECT * FROM admins;
```

Vous devriez voir votre admin avec l'email `m2017koita@gmail.com`.

Ensuite, testez la connexion:
1. Allez sur: http://localhost:3000/admin/login
2. Connectez-vous avec `m2017koita@gmail.com` et votre mot de passe
3. Vous devriez être redirigé vers `/admin`

## Astuce: Récupérer l'UID d'un utilisateur existant

Si vous avez déjà créé l'utilisateur mais n'avez pas noté l'UID :

```sql
SELECT id, email FROM auth.users WHERE email = 'm2017koita@gmail.com';
```

Copiez l'`id` et utilisez-le dans le script.

## En cas d'erreur "policy already exists"

Le script `SETUP_ADMIN_SIMPLE.sql` inclut déjà les commandes `DROP POLICY IF EXISTS` pour éviter cette erreur. Si vous utilisez un autre script, assurez-vous d'inclure ces lignes.

## Données de connexion Supabase

Vérifiez que votre `.env.local` contient bien:
```
NEXT_PUBLIC_SUPABASE_URL=https://zjshxlmklezxucxihffz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ADMIN_EMAILS=m2017koita@gmail.com
```

---

**Note**: Pour l'image du hero, je ne peux pas la générer (quota épuisé). Veuillez télécharger manuellement une image de voiture rouge premium et la placer dans `/public/hero-background-anas.jpg`.
