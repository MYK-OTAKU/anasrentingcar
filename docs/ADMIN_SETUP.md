# Guide de Configuration Admin - YR Car

## 🔐 Résolution du Problème d'Authentification Admin

### Problème
L'erreur 400 lors de la connexion admin indique que l'utilisateur n'a pas le flag `is_admin` dans ses métadonnées.

### Solution en 3 étapes

#### 1️⃣ Vérifiez votre utilisateur dans Supabase

Connectez-vous à votre projet Supabase : https://supabase.com/dashboard/project/vzhysgclhquibiqqhtsl

Allez dans **Authentication > Users** et vérifiez que votre utilisateur admin existe.

#### 2️⃣ Exécutez le script SQL

Dans Supabase, allez dans **SQL Editor** et exécutez le script suivant :

```sql
-- Remplacez 'votre-email@example.com' par l'email de votre admin
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'votre-email@example.com';
```

#### 3️⃣ Vérifiez que ça a fonctionné

Toujours dans le SQL Editor :

```sql
SELECT 
  id, 
  email, 
  raw_user_meta_data->'is_admin' as is_admin,
  raw_user_meta_data
FROM auth.users 
WHERE email = 'votre-email@example.com';
```

Vous devriez voir `is_admin: true` dans les résultats.

#### 4️⃣ Testez la connexion

1. Déconnectez-vous si vous êtes déjà connecté
2. Allez sur http://localhost:3000/admin/login
3. Entrez vos identifiants
4. Ouvrez la console du navigateur (F12) pour voir les logs de debug
5. Vous devriez voir :
   ```
   User data: { ... }
   User metadata: { is_admin: true }
   ```

### 🎨 Logs de Debug Ajoutés

Le fichier `app/admin/login/page.tsx` a été modifié pour inclure des logs détaillés :

- ✅ Affichage des erreurs d'authentification
- ✅ Affichage des données utilisateur
- ✅ Affichage des métadonnées
- ✅ Messages d'erreur en français

### 📝 Fichiers Modifiés

- `scripts/004_create_admin.sql` - Script SQL pour créer l'admin
- `app/admin/login/page.tsx` - Ajout de logs et amélioration des erreurs

---

## 🎨 Thème Noir et Doré Implémenté

### Couleurs Principales

- **Noir profond** : `oklch(0.12 0.01 60)` - Fond principal
- **Doré vibrant** : `oklch(0.82 0.15 75)` - Couleur primaire
- **Doré lumineux** : `oklch(0.85 0.16 80)` - Couleur d'accentuation

### Fichiers Modifiés

- `app/globals.css` - Palette de couleurs noir/doré
- `app/layout.tsx` - ThemeProvider avec dark mode par défaut
- `components/layout/header.tsx` - Logo avec gradient doré

### Fonctionnalités Ajoutées

✅ Scrollbar personnalisée noir et doré
✅ Mode sombre activé par défaut
✅ Gradient doré sur le logo
✅ Ombres dorées sur les éléments interactifs

---

## ✨ Animations Subtiles Ajoutées

### Composant d'Animation

`components/animations/fade-in-section.tsx`

- Fade-in progressif au scroll
- Translation verticale douce
- Délais configurables

### Sections Animées

- AboutPreview (100ms de délai)
- CarsPreview (200ms de délai)
- ReservationSection (100ms de délai)
- ReviewsSection (200ms de délai)
- CtaContact (100ms de délai)

---

## 📍 Réorganisation de la Page d'Accueil

### Nouvel Ordre des Sections

1. Hero Section
2. About Preview (À propos)
3. Cars Preview (Nos véhicules)
4. **Reservation Section** ⬅️ **DÉPLACÉE ICI**
5. Reviews Section (Témoignages)
6. CTA Contact

La section "Book your vehicle" est maintenant après les services, comme demandé.

---

## 🚀 Prochaines Étapes

### Pour Tester

```bash
npm run dev
```

Puis visitez : http://localhost:3000

### À Faire

1. ✅ Configurer l'admin dans Supabase (voir instructions ci-dessus)
2. ✅ Vérifier que le thème noir/doré s'affiche correctement
3. ✅ Tester les animations au scroll
4. ⏳ Ajuster les délais d'animation si nécessaire
5. ⏳ Personnaliser davantage les couleurs si besoin

### Personnalisation Supplémentaire

Si vous voulez ajuster les couleurs dorées :
- Ouvrez `app/globals.css`
- Modifiez les valeurs `oklch(...)` dans la section `.dark`
- `--primary` et `--accent` contrôlent le doré

---

## 📞 Support

Si vous avez des questions ou des problèmes :
1. Vérifiez les logs de la console (F12)
2. Vérifiez que Supabase est bien configuré
3. Assurez-vous que les variables d'environnement sont correctes dans `.env.local`
