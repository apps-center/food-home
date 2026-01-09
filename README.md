# 🏠 FOOD HOME - Application de Gestion de Repas et Courses

Application web pour planifier vos repas et gérer votre liste de courses.

## ✨ Fonctionnalités

- 📋 **Liste de courses** avec catégories nutritionnelles
- 🍽️ **Planificateur de repas** avec 150 recettes
- 👨‍👩‍👧‍👦 **Générateur de planning familial** (5 jours)
- 💾 **Stockage local** (données privées dans votre navigateur)
- 🎨 **Interface moderne** et responsive

## 🚀 Déploiement sur Vercel

### Prérequis
- Compte GitHub
- Compte Vercel

### Étapes

1. **Créer un nouveau repository sur GitHub**
   - Aller sur https://github.com/new
   - Nom: `food-home` (ou ce que tu veux)
   - Public ou Private
   - Ne pas initialiser avec README

2. **Uploader les fichiers**
   - Clique sur "uploading an existing file"
   - Glisse-dépose TOUS les fichiers de ce dossier
   - Commit changes

3. **Connecter à Vercel**
   - Aller sur https://vercel.com
   - "Add New" → "Project"
   - "Import Git Repository"
   - Sélectionner ton repository `food-home`
   - Cliquer sur "Deploy"

4. **C'est terminé !** 🎉
   - Vercel génère automatiquement une URL
   - Exemple: `food-home.vercel.app`

## 🔐 Connexion

**Code PIN par défaut:** 1234

Pour changer le PIN, modifie la constante `DEFAULT_PIN` dans `index.html`

## 📱 Utilisation

### Page de Login
- Entre ton code PIN (4 chiffres)
- Session valide 24h

### Page Principale
- Toggle entre "Repas" et "Courses"
- Les données sont synchronisées automatiquement

### Recettes
- Filtres: type, saison, régime, protéine
- Planning familial automatique (5 jours)
- Ajout direct à la liste de courses

### Liste de Courses
- Catégories avec couleurs nutritionnelles
- Export en texte (copie dans presse-papier)
- Sauvegarde automatique

## 💾 Stockage des Données

Toutes les données sont stockées dans **localStorage** (navigateur) :
- `food_home_pin` : Code PIN personnalisé
- `food_home_logged_in` : Statut de connexion
- `food_home_selections` : Sélections dans les catégories
- `food_home_shopping_list` : Liste complète de courses

⚠️ **Important:** Les données sont stockées localement sur chaque appareil. Si tu changes d'appareil, les données ne seront pas synchronisées.

## 🎨 Personnalisation

### Modifier le code PIN
Dans `index.html`, ligne ~180:
```javascript
const DEFAULT_PIN = '1234'; // Change ici
```

### Ajouter des recettes
Modifie `recipes.json` avec tes propres recettes.

### Changer les couleurs
Modifie les variables CSS dans `css/common.css`

## 🔄 Mises à jour

Pour mettre à jour ton app:
1. Modifie les fichiers localement
2. Commit & Push sur GitHub
3. Vercel redéploie automatiquement !

## 📄 Structure des Fichiers

```
food-home/
├── index.html          # Page de login
├── home.html           # Page principale (toggle)
├── courses.html        # Liste de courses
├── eat.html            # Recettes
├── recipes.json        # Base de données recettes
├── css/
│   ├── common.css      # Styles communs
│   ├── courses.css     # Styles liste courses
│   ├── eat.css         # Styles recettes
│   ├── home.css        # Styles page principale
│   └── login.css       # Styles login
├── vercel.json         # Config Vercel
└── README.md           # Ce fichier

```

## ⚙️ Technologies

- HTML5 / CSS3
- JavaScript (Vanilla)
- localStorage API
- Vercel (hébergement)

## 🆘 Support

En cas de problème:
1. Vide le cache du navigateur
2. Vérifie la console (F12)
3. Vérifie que tous les fichiers sont bien uploadés sur GitHub

## 📝 Licence

Projet personnel - Usage libre

---

Créé avec ❤️ pour une gestion facile des repas en famille
