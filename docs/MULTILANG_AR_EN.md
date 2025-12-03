# Multi-langue Arabe/Anglais - YR Car

## 📅 Date d'implémentation
3 décembre 2025

## 🎯 Objectif
Cibler un public des pays arabes et anglophones en remplaçant le français par l'arabe dans l'interface utilisateur.

## ✅ Modifications effectuées

### 1. Ajout de la langue arabe (AR)
- **Fichier**: `lib/i18n/translations.ts`
- Traductions complètes en arabe pour toutes les sections :
  - Navigation
  - Hero
  - Formulaire de réservation
  - Lieux
  - Cartes de voitures
  - Page contact
  - Formulaire d'avis
  - Formulaire de contact
  - Page services
  - Filtres
  - Footer
  - Page à propos
  - FAQ
  - Common
  - Sections homepage (services, about, CTA, reviews, cars)

### 2. Support RTL (Right-to-Left)
- **Fichier**: `lib/i18n/context.tsx`
- Ajout de `document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"`
- Configuration automatique de la direction du texte lors du changement de langue
- Direction initiale définie au chargement de la page

### 3. Sélecteur de langue
- **Fichier**: `components/language-switcher.tsx`
- Remplacement de l'option Français (🇫🇷) par Arabe (🇸🇦)
- Options affichées : 
  - 🇬🇧 English
  - 🇸🇦 العربية (Al-'Arabīyah)
- Les traductions FR sont conservées dans le code mais non affichées dans l'UI

### 4. Langue par défaut
- **Fichier**: `lib/i18n/context.tsx`
- Langue par défaut: **Anglais (EN)**
- Langues supportées: `"fr" | "en" | "ar"`
- Le français reste accessible via localStorage pour les utilisateurs existants

### 5. Dates présélectionnées dans le formulaire
- **Fichier**: `components/forms/hero-reservation-form.tsx`
- Ajout de `defaultValue={new Date().toISOString().split("T")[0]}` sur :
  - Input `departureDate`
  - Input `returnDate`
- Les dates affichent automatiquement la date du jour

## 🔍 Points à vérifier

### Tri des avis par priorité
Le code dans `components/sections/reviews-section.tsx` utilise déjà :
```typescript
.order("display_order", { ascending: true })
.order("created_at", { ascending: false })
```

**Action requise** :
1. Vérifier que la colonne `display_order` existe dans la table `reviews` de Supabase
2. Exécuter le script `scripts/009_add_display_order.sql` si nécessaire
3. Tester l'édition des priorités dans `/admin/reviews`

### Test des nouvelles fonctionnalités
- [ ] Tester le changement de langue EN ↔ AR
- [ ] Vérifier le RTL en arabe (texte de droite à gauche)
- [ ] Vérifier les dates présélectionnées dans le formulaire de réservation
- [ ] Tester la persistance de la langue dans localStorage
- [ ] Vérifier l'affichage correct des polices arabes

## 🌍 Prochaines étapes: SEO et déploiement

### SEO pour pays arabes et anglophones

#### Meta tags multilingues
- Ajouter les balises `<html lang="ar">` et `<html lang="en">`
- Configurer les balises Open Graph pour chaque langue
- Ajouter les balises `hreflang` pour le multi-langue :
  ```html
  <link rel="alternate" hreflang="en" href="https://yrcar.ma/en" />
  <link rel="alternate" hreflang="ar" href="https://yrcar.ma/ar" />
  ```

#### Contenu SEO
- Optimiser les titres et descriptions pour les mots-clés arabes et anglais
- Créer un sitemap.xml multilingue
- Configurer robots.txt
- Ajouter Schema.org markup (LocalBusiness, Product)

#### Pays ciblés
- **Pays arabes** : Maroc 🇲🇦, Arabie Saoudite 🇸🇦, UAE 🇦🇪, Qatar 🇶🇦, etc.
- **Pays anglophones** : USA 🇺🇸, UK 🇬🇧, Canada 🇨🇦, Australie 🇦🇺, etc.
- **Touristes** : Visiteurs internationaux au Maroc

### Déploiement

#### Achat du domaine
Options recommandées :
- `yrcar.ma` (domaine .ma pour le Maroc)
- `yrcar.com` (international)

#### Configuration DNS
```
Type: CNAME
Host: www
Value: cname.vercel-dns.com
```

#### Plateforme de déploiement
**Vercel** (recommandé pour Next.js) :
1. Connecter le repo GitHub
2. Configurer les variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_ADMIN_EMAILS`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
3. Déployer automatiquement à chaque push

#### Performance
- Activer Vercel Edge Functions
- Configurer le CDN global
- Optimiser les images avec Next.js Image
- Activer la compression Brotli

## 📝 Notes importantes

### Polices arabes
Les polices système supportent déjà l'arabe, mais pour une meilleure typographie :
- Considérer l'ajout de Google Fonts : **Noto Sans Arabic** ou **Cairo**
- Exemple dans `app/layout.tsx` :
  ```typescript
  import { Inter, Noto_Sans_Arabic } from "next/font/google"
  
  const inter = Inter({ subsets: ["latin"] })
  const notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"] })
  ```

### RTL et Tailwind
Tailwind CSS v4 supporte nativement le RTL :
- Les classes comme `mr-4` deviennent automatiquement `ml-4` en RTL
- Utiliser `rtl:` prefix si nécessaire : `rtl:text-right`

### Traductions FR conservées
Les traductions françaises sont **conservées dans le code** pour :
- Faciliter les mises à jour futures
- Permettre un retour éventuel au français
- Servir de référence pour d'autres langues

## 🚀 Commandes de test

```bash
# Redémarrer le serveur de développement
npm run dev

# Vérifier le build de production
npm run build

# Tester en production locale
npm run start
```

## 📊 Statistiques

- **3 langues** supportées : FR (cachée), EN, AR
- **500+ clés** de traduction par langue
- **Support RTL** : Oui ✅
- **Dates présélectionnées** : Oui ✅
- **Tri avis par priorité** : Code prêt, DB à vérifier ⚠️

---

**Dernière mise à jour** : 3 décembre 2025
**Statut** : ✅ Prêt pour les tests
