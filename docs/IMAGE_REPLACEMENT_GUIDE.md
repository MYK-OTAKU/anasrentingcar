# Guide de Remplacement des Images Chevrolet

## 📸 Images à Remplacer

Dans le Hero Section, il y a actuellement deux images de Camaro jaune :

1. **Image de fond** : `/yellow-chevrolet-camaro-with-black-racing-stripes.jpg`
2. **Image latérale (sans fond)** : `/yellow-camaro-side-view-no-background.jpg`

## 🔄 Comment Remplacer

### Étape 1 : Préparer votre nouvelle image

1. Trouvez une image de Chevrolet jaune de votre choix
2. Assurez-vous d'avoir :
   - Une version **avec fond** pour l'arrière-plan (format paysage recommandé)
   - Une version **sans fond (PNG transparent)** pour la vue latérale

### Étape 2 : Nommer vos fichiers

Renommez vos images comme ceci :
- Version avec fond : `yellow-chevrolet-hero-background.jpg`
- Version sans fond : `yellow-chevrolet-side-no-bg.png`

### Étape 3 : Placer les images

Copiez vos images dans le dossier `/public` du projet :
```
/home/myk/Bureau/v0-car-rental-website/public/
```

### Étape 4 : Mettre à jour le code

Les chemins sont déjà dans `components/sections/hero-section.tsx` :
- Ligne 16 : Image de fond
- Ligne 72 : Image latérale sans fond

Remplacez simplement les anciennes images par vos nouvelles.

## 🎨 Alternative : Utiliser une Autre Voiture

Si vous voulez utiliser une des voitures déjà dans `/public`, voici les options disponibles :

### Voitures Disponibles
- `modern-orange-sports-car-showroom.jpg` - Voiture de sport orange moderne
- `tesla-model-3-white-electric-sedan.jpg` - Tesla blanche
- `mercedes-c-class-black-sedan-luxury.jpg` - Mercedes noire
- `peugeot-3008-suv-gray.jpg` - SUV Peugeot gris
- `renault-clio-white-compact-car.jpg` - Renault Clio blanche

### Pour Utiliser une Voiture Existante

Par exemple, pour utiliser la voiture orange :

```tsx
// Dans hero-section.tsx, ligne 16
src="/modern-orange-sports-car-showroom.jpg"

// Et ligne 72 (vous auriez besoin d'une version sans fond)
src="/modern-orange-sports-car-no-bg.png"
```

## 🛠️ Outils Recommandés pour Retirer l'Arrière-plan

Si vous avez une image mais pas de version sans fond :

1. **Remove.bg** : https://www.remove.bg/ (gratuit, automatique)
2. **Photopea** : https://www.photopea.com/ (gratuit, manuel)
3. **Canva** : https://www.canva.com/ (gratuit avec compte)

## 📝 Après le Remplacement

Une fois vos images en place, le site les utilisera automatiquement au prochain rafraîchissement de la page.

N'oubliez pas d'optimiser vos images pour le web :
- Format WebP si possible
- Résolution : 1920x1080 pour le fond, 800x600 pour la vue latérale
- Compression : 70-85% de qualité
