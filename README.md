# 🍽️ FOOD HOME

**Application web de gestion alimentaire familiale**

Une application moderne pour gérer vos repas, recettes et listes de courses en famille.

---

## ✨ Fonctionnalités

### 🍳 Planificateur de Repas
- Catalogue de recettes avec filtres avancés (saison, régime, protéine)
- Générateur de planning hebdomadaire (5 jours)
- Recettes adaptées aux enfants
- Ajout automatique des ingrédients à la liste de courses

### 🛒 Liste de Courses
- Organisation par catégories de supermarché
- Indicateurs nutritionnels (pyramide alimentaire)
- Stock de base pour éviter les doublons
- Export en texte brut
- Items en stock affichés en orange

### 🎯 Interface Moderne
- Design glassmorphisme avec gradients
- Responsive mobile-first
- Navigation fluide entre modules
- Icône Apple Touch pour iOS et 1

---

## 🚀 Technologies

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Stockage:** LocalStorage (client-side)
- **Déploiement:** Vercel
- **Version Control:** Git / GitHub

---

## 📦 Structure du Projet

```
food-home/
├── index.html              # Page de login (PIN: 1234)
├── home.html               # Container principal avec toggle
├── eat.html                # Module recettes & planning
├── courses.html            # Module liste de courses
├── css/
│   ├── common.css          # Styles partagés
│   ├── home.css            # Styles page d'accueil
│   ├── eat.css             # Styles module recettes
│   ├── courses.css         # Styles module courses
│   └── login.css           # Styles page de connexion
├── data/
│   └── recipes.csv         # Base de données des recettes
└── apple-touch-icon.png    # Icône iOS
```

---

## 🔐 Connexion

**Code PIN par défaut:** `1234`

Pour modifier le PIN, éditez le fichier `data/users.json`

---

## 🎨 Design System

### Couleurs Nutritionnelles
- 🔵 **Bleu** - Base (boissons, céréales)
- 🟢 **Vert** - Priorité (fruits & légumes, 5/jour)
- 🟡 **Jaune** - Modération (laitiers, protéines)
- 🔴 **Rose** - Occasionnel (graisses, sucreries)
- ⚪ **Gris** - Hors pyramide (hygiène, ménage)

### Gradients
- Primary: `#667eea → #764ba2` (violet)
- Secondary: `#0ea5e9 → #3b82f6` (bleu)
- Accent: `#8b5cf6 → #6366f1` (violet clair)

---

## 📱 Progressive Web App (PWA)

L'application peut être installée sur l'écran d'accueil iOS :
1. Ouvrir Safari
2. Appuyer sur "Partager"
3. Sélectionner "Sur l'écran d'accueil"
4. Icône personnalisée automatique

---

## 🔄 Workflow Git

### Branches
- `main` - Production (https://food-home-ten.vercel.app/)
- `dev` - Staging
- `feature/*` - Développement de fonctionnalités

### Pull Requests
1. Créer une branche depuis `dev`
2. Développer la fonctionnalité
3. PR vers `dev` → test preview Vercel
4. PR `dev` → `main` → déploiement production

---

## 🚀 Déploiement

### Vercel (automatique)
- **Production:** Push sur `main`
- **Preview:** Push sur n'importe quelle branche
- **URL Preview:** `food-home-git-[branch]-[user].vercel.app`

### Configuration Vercel
```
Production Branch: main
Preview Deployments: All branches
Automatic Deployments: Enabled
```

---

## 🛠️ Développement Local (optionnel)

```bash
# Cloner le repo
git clone https://github.com/apps-center/food-home.git
cd food-home

# Ouvrir avec un serveur HTTP simple
python -m http.server 8000
# ou
npx serve

# Ouvrir dans le navigateur
http://localhost:8000
```

---

## 📋 Roadmap

### Version 1.0 (Actuelle) ✅
- [x] Authentification par PIN
- [x] Catalogue de recettes avec filtres
- [x] Générateur de planning hebdomadaire
- [x] Liste de courses par catégories
- [x] Stock de base
- [x] Export texte
- [x] Design responsive

### Version 1.1 (Prochaine)
- [ ] Intégration Supabase (auth + BDD)
- [ ] Multi-utilisateurs
- [ ] Synchronisation cloud
- [ ] Recettes favorites
- [ ] Historique des plannings

### Version 2.0 (Future)
- [ ] Mode hors-ligne (Service Worker)
- [ ] Partage de recettes
- [ ] Scanner de codes-barres
- [ ] Suggestions IA
- [ ] Export PDF/image

---

## 🐛 Bugs Connus

Aucun bug critique connu en v1.0

Pour signaler un bug : [Issues GitHub](https://github.com/apps-center/food-home/issues)

---

## 📄 Licence

Projet personnel - Tous droits réservés

---

## 👨‍💻 Auteur

**Rick Hunter Stack**

- GitHub: [@apps-center](https://github.com/apps-center)
- Projet: [food-home](https://github.com/apps-center/food-home)
- Production: [food-home-ten.vercel.app](https://food-home-ten.vercel.app/)

---

## 🙏 Remerciements

- Design inspiré par les tendances glassmorphisme 2024
- Pyramide alimentaire basée sur les recommandations nutritionnelles françaises
- Icônes emoji natives pour un rendu universel

---

**Version:** 1.0.0  
**Dernière mise à jour:** Janvier 2026  
**Status:** 🟢 Production Stable
