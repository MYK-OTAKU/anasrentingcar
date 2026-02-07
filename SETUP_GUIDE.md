# ANAS RENT A CAR - Guide de Configuration

Ce guide explique comment configurer la nouvelle instance Supabase pour l'application Anas Rent A Car.

## Prérequis

- Compte Supabase actif
- Accès au projet: `https://zjshxlmklezxucxihffz.supabase.co`
- Les credentials fournis (déjà dans `.env.local`)

## Étape 1: Configuration de la Base de Données

### 1.1 Accéder au SQL Editor

1. Connectez-vous à Supabase: https://supabase.com
2. Sélectionnez votre projet
3. Allez dans **SQL Editor** depuis la barre latérale

### 1.2 Exécuter le Script de Configuration

1. Ouvrez le fichier `scripts/complete_db_setup_anas.sql`
2. Copiez tout le contenu du fichier
3. Collez-le dans le SQL Editor de Supabase
4. Cliquez sur **RUN** pour exécuter le script

Ce script va créer :
- ✅ Tables: `cars`, `reviews`, `contact_requests`, `admins`
- ✅ Index de performance
- ✅ Row Level Security (RLS) policies
- ✅ Storage bucket `car-images`
- ✅ Données d'exemple (4 voitures, 4 avis)

### 1.3 Vérifier la Configuration

Exécutez cette requête pour vérifier que tout est bien créé :

```sql
-- Vérifier les tables
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

-- Vérifier le bucket de stockage
SELECT * FROM storage.buckets WHERE id = 'car-images';

-- Compter les enregistrements
SELECT 'cars' as table_name, COUNT(*) as records FROM cars
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews;
```

## Étape 2: Créer le Compte Admin

### 2.1 Créer l'utilisateur dans Auth

1. Allez dans **Authentication** → **Users** dans Supabase
2. Cliquez sur **Add user** → **Create new user**
3. Entrez :
   - Email: `Tva25459@gmail.com`
   - Password: [choisissez un mot de passe sécurisé]
   - **Cochez** "Auto Confirm User"
4. Cliquez sur **Create user**
5. **IMPORTANT**: Copiez l'`User UID` affiché

### 2.2 Ajouter l'admin dans la table

Retournez au SQL Editor et exécutez :

```sql
-- Remplacez 'YOUR_USER_ID_HERE' par l'UID réel copié à l'étape précédente
INSERT INTO admins (id, email, full_name)
VALUES ('YOUR_USER_ID_HERE', 'Tva25459@gmail.com', 'Anas Admin')
ON CONFLICT (email) DO NOTHING;
```

### 2.3 Vérifier l'admin

```sql
SELECT * FROM admins;
```

## Étape 3: Configurer le Storage pour les Images

### 3.1 Vérifier le Bucket

1. Allez dans **Storage** dans Supabase
2. Vous devriez voir le bucket `car-images`
3. Il est déjà configuré comme **public**

### 3.2 Upload des Images de Voitures

Méthode 1 - Interface Supabase:
1. Cliquez sur `car-images`
2. Cliquez sur **Upload file**
3. Sélectionnez les images de voitures
4. Les images seront accessibles via : `https://zjshxlmklezxucxihffz.supabase.co/storage/v1/object/public/car-images/nom-fichier.jpg`

Méthode 2 - Depuis l'Admin Dashboard:
1. Lancez l'application : `npm run dev`
2. Allez sur `/admin/login`
3. Connectez-vous avec `Tva25459@gmail.com`
4. Utilisez l'interface pour uploader les images directement

### 3.3 Mettre à Jour les URLs des Voitures

Une fois les images uploadées, mettez à jour les `image_url` dans la table `cars`:

```sql
UPDATE cars 
SET image_url = 'https://zjshxlmklezxucxihffz.supabase.co/storage/v1/object/public/car-images/votre-image.jpg'
WHERE id = 'ID_DE_LA_VOITURE';
```

## Étape 4: Tester la Connexion

### 4.1 Démarrer l'Application

```bash
npm install  # Si ce n'est pas déjà fait
npm run dev
```

### 4.2 Vérifier les Pages

- **Page d'accueil** : http://localhost:3000
  - Vérifiez que le nouveau design rouge/argent s'affiche
  - Vérifiez les 5 étoiles dans le hero
  
- **Page Admin** : http://localhost:3000/admin/login
  - Connectez-vous avec `Tva25459@gmail.com`
  - Vérifiez l'accès au dashboard
  
- **API Test** : Ouvrez la console du navigateur et exécutez :
  ```javascript
  fetch('/api/cars').then(r => r.json()).then(console.log)
  ```

## Étape 5: Configuration Optionnelle

### 5.1 Images du Hero

Remplacez `/public/yellow-chevrolet-camaro-with-black-racing-stripes.jpg` par une image de voiture rouge premium pour correspondre au branding Anas.

Dimensions recommandées : 1920x1080px minimum

### 5.2 Favicon

Pour générer un favicon à partir du logo Anas :

1. Allez sur https://www.favicon-generator.org/
2. Uploadez `/public/logo.png`
3. Téléchargez le package généré
4. Remplacez `/public/favicon.ico`

### 5.3 Métadonnées OpenGraph

L'image OpenGraph est déjà configurée pour utiliser `/logo.png`. Vous pouvez créer une image OG personnalisée (1200x630px) si souhaité.

## Dépannage

### Erreur: Tables déjà existantes

Si les tables existent déjà, supprimez-les d'abord :

```sql
DROP TABLE IF EXISTS contact_requests CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS cars CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
```

Puis réexécutez `complete_db_setup_anas.sql`.

### Erreur: Bucket déjà existant

Si le bucket existe déjà, vous pouvez le recréer :

```sql
DELETE FROM storage.buckets WHERE id = 'car-images';
```

Puis réexécutez la section bucket du script.

### Problème de connexion

Vérifiez que les variables d'environnement dans `.env.local` correspondent exactement :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://zjshxlmklezxucxihffz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Support

Pour toute question sur la configuration, contactez l'équipe technique.

## Checklist de Configuration ✅

- [ ] Script SQL exécuté avec succès
- [ ] Tables créées (cars, reviews, contact_requests, admins)
- [ ] Bucket `car-images` créé et public
- [ ] Compte admin créé dans Auth
- [ ] Admin ajouté dans la table `admins`
- [ ] Images de voitures uploadées
- [ ] URLs des voitures mises à jour
- [ ] Application démarre sans erreur
- [ ] Login admin fonctionne
- [ ] Design rouge/argent visible
- [ ] Hero section affiche les 5 étoiles

---

**Dernière mise à jour** : Février 2026  
**Version Supabase** : PostgreSQL 15  
**Instance** : zjshxlmklezxucxihffz
