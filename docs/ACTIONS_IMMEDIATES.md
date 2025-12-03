# 🚨 ACTIONS IMMÉDIATES À EFFECTUER

## 1️⃣ Configuration Base de Données Supabase (CRITIQUE)

### Problème
Les avis soumis par les visiteurs seront bloqués par RLS si vous n'exécutez pas le script SQL.

### Solution
Allez dans **Supabase Dashboard → SQL Editor** et exécutez ceci :

```sql
-- Suppression des anciennes policies (si elles existent)
DROP POLICY IF EXISTS "Admins can insert reviews" ON public.reviews;

-- Nouvelle policy pour permettre les soumissions publiques
CREATE POLICY "Anyone can submit reviews"
  ON public.reviews
  FOR INSERT
  WITH CHECK (true);
```

✅ **Comment vérifier** : Allez sur `/contact`, soumettez un avis test, ça doit fonctionner sans erreur.

---

## 2️⃣ Configuration Variables d'Environnement

### Dans `.env.local` (racine du projet)

Ajoutez ou vérifiez ces lignes :

```env
# Email admin pour la double vérification (REQUIS)
ADMIN_EMAILS=m2017koita@gmail.com

# Email pour recevoir les demandes de contact
CONTACT_EMAIL=m2017koita@gmail.com

# Supabase (normalement déjà configuré)
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anonyme
```

✅ **Comment vérifier** : 
- Essayez de vous connecter à `/admin/login` avec votre email
- Si votre email n'est PAS dans ADMIN_EMAILS, vous devriez voir l'erreur : "Votre email n'est pas dans la liste des administrateurs autorisés"

---

## 3️⃣ Test du Workflow Complet

### A. Test en tant que visiteur

1. Allez sur `http://localhost:3000/contact`
2. Scrollez jusqu'à "Partagez votre expérience"
3. Remplissez :
   - Nom : "Client Test"
   - Note : 5 étoiles
   - Commentaire : "Excellent service !"
4. Cliquez "Publier mon avis"
5. ✅ Vous devez voir : "Merci pour votre avis ! Votre commentaire sera publié après validation..."

### B. Test modération admin

1. Connectez-vous à `http://localhost:3000/admin/login`
2. Allez dans "Avis clients"
3. ✅ Vous devez voir le nouvel avis avec badge orange "En attente"
4. Cliquez sur "Approuver" (icône check verte)
5. Le badge doit passer à vert "Approuvé"

### C. Vérification affichage public

1. Retournez sur la page d'accueil `/`
2. Scrollez jusqu'à la section "Avis clients"
3. ✅ Votre avis approuvé doit maintenant apparaître

---

## 📊 Résumé des 3 fonctionnalités implémentées

| Fonctionnalité | Statut | Action requise |
|---------------|--------|----------------|
| **1. Devise DH** | ✅ Terminé | Aucune - déjà actif |
| **2. Double vérification admin** | ⚠️ Config requise | Ajouter `ADMIN_EMAILS` dans .env.local |
| **3. Formulaire avis clients** | ⚠️ SQL requis | Exécuter policy SQL ci-dessus |

---

## ⚡ Commandes rapides

### Redémarrer le serveur de développement
```bash
npm run dev
```

### Vérifier les erreurs TypeScript
```bash
npm run build
```

---

## 🆘 En cas de problème

### "Error: insert violates row-level security policy"
→ Vous n'avez pas exécuté le script SQL (action 1️⃣)

### "Accès non autorisé. Votre email n'est pas dans la liste..."
→ Vérifiez que ADMIN_EMAILS contient bien votre email dans .env.local (action 2️⃣)

### Les avis ne s'affichent pas sur la homepage
→ Vérifiez que vous avez bien APPROUVÉ l'avis dans le dashboard admin

---

**Date** : Maintenant  
**Priorité** : HAUTE  
**Temps estimé** : 5 minutes
