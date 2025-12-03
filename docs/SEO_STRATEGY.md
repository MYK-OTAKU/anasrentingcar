# Guide SEO - YR Car Location

## 🎯 Stratégie SEO pour référencement naturel de haut niveau

### Mots-clés principaux ciblés

#### Mots-clés primaires (volume élevé)
1. **location voiture Maroc** (1000-10K recherches/mois)
2. **location voiture Casablanca** (500-1K recherches/mois)
3. **rental car Morocco** (1K-10K recherches/mois)
4. **car hire Casablanca** (500-1K recherches/mois)
5. **location voiture pas cher Maroc** (500-1K recherches/mois)

#### Mots-clés secondaires (longue traîne)
- location voiture aéroport Mohammed V
- location voiture Marrakech pas cher
- voiture de location qualité Maroc
- location auto longue durée Casablanca
- car rental Rabat airport
- cheap car rental Morocco
- luxury car rental Casablanca
- location utilitaire Maroc
- rent a car Casablanca city center

#### Mots-clés en arabe
- تأجير سيارات المغرب (location voitures Maroc)
- تأجير سيارات الدار البيضاء (location voitures Casablanca)
- تأجير سيارات رخيصة (location voitures pas cher)
- استئجار سيارة المطار (location voiture aéroport)

### 📄 Optimisations effectuées

#### 1. Meta tags (app/layout.tsx)
✅ **Title optimisé** : "YR Car Location - Location de voitures au Maroc | Prix compétitifs"
✅ **Description** : 155 caractères avec mots-clés principaux
✅ **Keywords** : 10 mots-clés stratégiques
✅ **Open Graph** pour partage social
✅ **Favicon** et icônes adaptatives

#### 2. Structure HTML sémantique
- Utilisation correcte des balises `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Hiérarchie H1 > H2 > H3 respectée
- Alt text sur toutes les images

### 🚀 Prochaines étapes SEO

#### A. Créer des pages de destination (Landing Pages)

**1. Page par ville majeure**
```
/location-voiture-casablanca
/location-voiture-rabat
/location-voiture-marrakech
/car-rental-casablanca
```

**2. Page par type de véhicule**
```
/location-voiture-economique
/location-suv-maroc
/location-utilitaire
/luxury-car-rental
```

**3. Page par usage**
```
/location-voiture-aeroport
/location-longue-duree
/location-voiture-mariage
/location-voiture-entreprise
```

#### B. Contenu SEO

**Blog/Articles** (créer `/blog`)
1. "Guide complet : Louer une voiture au Maroc en 2025"
2. "Top 10 des meilleures voitures de location pour visiter le Maroc"
3. "Location de voiture à l'aéroport : tout ce qu'il faut savoir"
4. "Prix location voiture Maroc : comparatif et conseils"
5. Articles en arabe pour le public local

**FAQ enrichie**
- Ajouter 20+ questions répondant aux requêtes courantes
- Utiliser Schema.org FAQPage markup

#### C. Technical SEO

**1. Créer sitemap.xml**
```xml
/sitemap.xml
  /sitemap-pages.xml (pages statiques)
  /sitemap-cars.xml (véhicules dynamiques)
  /sitemap-blog.xml (articles)
```

**2. Créer robots.txt**
```
/robots.txt
```

**3. Ajouter Schema.org markup**
```typescript
// LocalBusiness Schema
{
  "@context": "https://schema.org",
  "@type": "CarRental",
  "name": "YR Car Location",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bd Yacoub El Mansour",
    "addressLocality": "Casablanca",
    "addressCountry": "MA"
  },
  "telephone": "+212 6 00 00 00 00",
  "priceRange": "300-900 DH",
  "openingHours": "Mo-Sa 08:00-19:00, Su 09:00-17:00"
}
```

**4. Optimisation images**
```typescript
// Dans next.config.mjs
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
}
```

#### D. Multilangue SEO

**1. Ajouter hreflang tags**
```html
<link rel="alternate" hreflang="en" href="https://yrcar.ma/en" />
<link rel="alternate" hreflang="ar" href="https://yrcar.ma/ar" />
<link rel="alternate" hreflang="fr" href="https://yrcar.ma/fr" />
<link rel="alternate" hreflang="x-default" href="https://yrcar.ma" />
```

**2. Structure URL multilingue**
```
https://yrcar.ma/en/services
https://yrcar.ma/ar/خدمات
https://yrcar.ma/fr/services
```

**3. Metadata par langue**
- Titre, description, keywords adaptés à chaque langue
- Open Graph locale spécifique

#### E. Performance (Core Web Vitals)

**1. Optimisations Next.js**
- ✅ Image optimization avec next/image
- ✅ Code splitting automatique
- ⏳ Lazy loading des composants lourds
- ⏳ Préchargement des liens critiques

**2. Caching**
```typescript
// next.config.mjs
headers: async () => [{
  source: '/:all*(svg|jpg|png|webp|avif)',
  headers: [{
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable',
  }],
}]
```

**3. Compression**
- Activer Brotli/Gzip sur Vercel
- Minification CSS/JS automatique

#### F. Link Building (Netlinking)

**1. Annuaires locaux**
- Google My Business (Google Maps)
- Bing Places
- TripAdvisor
- Booking.com partners
- Annuaires marocains (Avito, Jumia Travel)

**2. Backlinks qualité**
- Partenariats avec hôtels au Maroc
- Agences de voyage
- Blogs de tourisme au Maroc
- Office du Tourisme

**3. Réseaux sociaux**
- Facebook Business
- Instagram avec géolocalisation
- LinkedIn pour B2B
- WhatsApp Business

### 📊 Tracking et Analytics

#### Google Analytics 4
```typescript
// app/layout.tsx - Ajouter
import { GoogleAnalytics } from '@next/third-parties/google'

<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

#### Google Search Console
1. Soumettre sitemap.xml
2. Surveiller indexation
3. Analyser requêtes de recherche
4. Corriger erreurs crawl

#### Suivi des conversions
- Réservations (formulaire soumis)
- Appels téléphoniques (via tracking)
- Clics WhatsApp
- Téléchargements PDF

### 🏆 Objectifs de ranking

**Mois 1-3** : Indexation et fondations
- Indexation 100% des pages
- Position moyenne < 50 sur mots-clés principaux
- 500+ visiteurs organiques/mois

**Mois 4-6** : Croissance
- Position < 20 sur 5 mots-clés principaux
- 2000+ visiteurs organiques/mois
- 50+ réservations organiques/mois

**Mois 7-12** : Leadership
- Position < 10 sur mots-clés principaux
- Position 1-3 sur longue traîne
- 5000+ visiteurs organiques/mois
- 150+ réservations organiques/mois

### ✅ Checklist SEO avant lancement

- [x] Meta title optimisé (< 60 caractères)
- [x] Meta description optimisée (< 160 caractères)
- [x] Keywords stratégiques définis
- [x] Favicon et icônes configurés
- [x] Structure HTML sémantique
- [ ] Sitemap.xml créé
- [ ] Robots.txt créé
- [ ] Schema.org markup ajouté
- [ ] Hreflang tags multilingues
- [ ] Google Analytics installé
- [ ] Google Search Console configuré
- [ ] Images optimisées (WebP/AVIF)
- [ ] Performance optimisée (> 90 Lighthouse)
- [ ] Mobile-friendly (100%)
- [ ] HTTPS activé
- [ ] Temps de chargement < 2s

### 📝 Contenu à créer (priorité)

1. **Landing page principale** : "Location voiture Maroc" (EN/AR)
2. **Pages villes** : Casablanca, Rabat, Marrakech
3. **FAQ enrichie** : 30+ questions
4. **Blog post 1** : "Guide location voiture Maroc 2025"
5. **Page témoignages** : Avis clients détaillés

### 🔗 Ressources utiles

- Google Keyword Planner : https://ads.google.com/keyword_planner
- Google Search Console : https://search.google.com/search-console
- Schema.org : https://schema.org/CarRental
- PageSpeed Insights : https://pagespeed.web.dev/
- Screaming Frog SEO Spider : https://www.screamingfrogseoseo.co.uk/

---

**Dernière mise à jour** : 3 décembre 2025
**Statut** : ✅ Fondations SEO prêtes | ⏳ Contenu à créer
