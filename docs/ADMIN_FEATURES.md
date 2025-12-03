# Fonctionnalités Admin - Guide d'utilisation

## 📋 Résumé des fonctionnalités implémentées

### 🚗 Gestion des véhicules

#### Ajout de véhicule
1. Cliquer sur "Nouveau véhicule" dans la page `/admin/cars`
2. Remplir le formulaire :
   - **Informations de base** : Marque, Modèle, Catégorie
   - **Caractéristiques** : Nombre de places, Transmission, Carburant
   - **Prix** : Prix par jour en euros
   - **Image** : Upload depuis téléphone ou ordinateur
   - **Description** : Description détaillée du véhicule
   - **Disponibilité** : Toggle pour activer/désactiver

3. **Upload d'image** :
   - Cliquer sur "Choisir une image"
   - Sélectionner une photo depuis votre appareil
   - Formats acceptés : JPG, PNG, WebP, GIF, HEIC, HEIF
   - Taille maximale : 50 MB
   - Aperçu en temps réel
   - Bouton X pour supprimer et choisir une autre image

#### Modification de véhicule
1. Dans la liste des véhicules, cliquer sur l'icône crayon ✏️
2. Modifier les informations souhaitées
3. Changer l'image si nécessaire
4. Cliquer sur "Mettre à jour"

#### Suppression de véhicule
1. Dans la liste des véhicules, cliquer sur l'icône corbeille 🗑️
2. Confirmer la suppression dans la boîte de dialogue
3. ⚠️ **Attention** : La suppression est irréversible et supprime aussi l'image associée

#### Bouton retour
- Présent en haut de chaque formulaire
- Permet de revenir à la liste sans enregistrer

---

### ⭐ Gestion des avis clients

#### Approbation d'avis
1. Les nouveaux avis apparaissent avec le statut "En attente"
2. Cliquer sur l'icône ✓ pour approuver et publier l'avis
3. L'avis devient visible sur le site public

#### Suppression d'avis
1. Cliquer sur l'icône corbeille 🗑️
2. Confirmer la suppression
3. ⚠️ **Attention** : La suppression est irréversible

---

## 🔧 Configuration technique requise

### Étape 1 : Créer le bucket Supabase Storage

Vous **DEVEZ** exécuter le script SQL suivant dans votre console Supabase :

```sql
-- Fichier : scripts/006_create_storage_bucket.sql
```

1. Allez sur [Supabase Dashboard](https://app.supabase.com)
2. Sélectionnez votre projet
3. Allez dans **SQL Editor**
4. Copiez-collez le contenu de `scripts/006_create_storage_bucket.sql`
5. Cliquez sur **Run**

### Étape 2 : Vérifier la table admins

Assurez-vous que la table `admins` est créée en exécutant :

```sql
-- Fichier : scripts/005_create_admins_table.sql
```

---

## 📁 Structure des fichiers

### Server Actions (app/actions/)
- **cars.ts** : Actions CRUD pour les véhicules
  - `uploadCarImage()` : Upload d'image vers Supabase Storage
  - `createCar()` : Création d'un véhicule
  - `updateCar()` : Modification d'un véhicule
  - `deleteCar()` : Suppression d'un véhicule + image

- **reviews.ts** : Actions pour les avis
  - `approveReview()` : Approuver et publier un avis
  - `deleteReview()` : Supprimer un avis

### Composants Admin (components/admin/)
- **car-form.tsx** : Formulaire avec upload d'images
- **cars-table.tsx** : Table de gestion des véhicules
- **reviews-table.tsx** : Table de gestion des avis

---

## 🎨 Fonctionnalités UI

### Upload d'images
- ✅ Bouton d'upload responsive
- ✅ Aperçu en temps réel de l'image
- ✅ Support du téléphone (attribut `capture`)
- ✅ Indicateur de chargement pendant l'upload
- ✅ Bouton pour supprimer et changer l'image
- ✅ Validation : le bouton submit est désactivé sans image

### Boutons retour
- Présents dans tous les formulaires de modification
- Icône flèche + texte "Retour à la liste"
- Style outline pour différencier du bouton principal

### Indicateurs de chargement
- Spinner sur tous les boutons pendant les actions
- État disabled pendant le traitement
- Messages d'erreur clairs en cas de problème

---

## 🔒 Sécurité

### Vérifications côté serveur
Toutes les actions vérifient :
1. Authentification de l'utilisateur
2. Présence dans la table `admins`
3. Permissions sur le bucket Storage

### Policies RLS
- Les admins peuvent lire/écrire/supprimer dans le bucket `car-images`
- Les utilisateurs publics peuvent lire les images

---

## 📱 Compatibilité mobile

### Upload depuis téléphone
- L'attribut `capture="environment"` ouvre directement la caméra
- Sélection depuis la galerie aussi disponible
- Interface tactile optimisée

### Table responsive
- Défilement horizontal sur petits écrans
- Colonnes essentielles visibles
- Actions accessibles

---

## ⚙️ Limites configurées

### Images
- **Taille maximale** : 50 MB
- **Formats acceptés** : 
  - JPG/JPEG
  - PNG
  - WebP
  - GIF
  - HEIC/HEIF (formats iPhone)

### Bucket Storage
- Nom : `car-images`
- Public : Oui (images visibles sur le site)
- Dossier : `cars/`

---

## 🐛 Dépannage

### "Erreur lors de l'upload de l'image"
- Vérifiez que le bucket `car-images` existe
- Vérifiez les policies RLS sur `storage.objects`
- Vérifiez que vous êtes bien dans la table `admins`

### "Non autorisé"
- Vérifiez que votre email est dans `public.admins`
- Déconnectez-vous et reconnectez-vous

### Les images ne s'affichent pas
- Vérifiez que le bucket est public
- Vérifiez l'URL retournée par `getPublicUrl()`

---

## 📊 Prochaines améliorations possibles

- [ ] Édition d'image (crop, resize)
- [ ] Upload multiple (galerie de photos)
- [ ] Drag & drop pour l'upload
- [ ] Historique des modifications
- [ ] Export des données en CSV

---

**Date de création** : 2 décembre 2025
**Version** : 1.0
