# 🚀 GUIDE DE DÉPLOIEMENT - FOOD HOME

## 📦 Ce que tu as dans ce dossier

Tous les fichiers sont prêts pour le déploiement :
- ✅ index.html (login avec localStorage)
- ✅ home.html (modifié avec vérification de session)
- ✅ courses.html (modifié avec localStorage)
- ✅ eat.html (modifié avec localStorage)
- ✅ recipes.json (150 recettes converties)
- ✅ css/ (tous les styles)
- ✅ vercel.json (configuration Vercel)
- ✅ README.md (documentation)

---

## 🎯 ÉTAPE 1 : Uploader sur GitHub

### 1.1 Créer un nouveau repository

1. Va sur https://github.com
2. Clique sur le bouton **"+"** en haut à droite
3. Sélectionne **"New repository"**

### 1.2 Configurer le repository

- **Repository name:** `food-home` (ou le nom que tu veux)
- **Description:** (optionnel) "Application de gestion de repas et courses"
- **Public** ou **Private** (ton choix)
- ⚠️ **NE PAS** cocher "Add a README file"
- ⚠️ **NE PAS** ajouter .gitignore ou license pour l'instant
- Clique sur **"Create repository"**

### 1.3 Uploader les fichiers

Tu as 2 options :

#### **Option A : Via l'interface web (FACILE)** ⭐ Recommandé

1. Sur la page de ton nouveau repository, tu verras :
   ```
   Quick setup — if you've done this kind of thing before
   ```

2. Clique sur le lien **"uploading an existing file"**

3. **Glisse-dépose TOUS les fichiers de ce dossier** :
   - index.html
   - home.html
   - courses.html
   - eat.html
   - recipes.json
   - vercel.json
   - README.md
   - Le dossier **css/** complet

4. Écris un message de commit, par exemple :
   ```
   Initial commit - FOOD HOME app ready for deployment
   ```

5. Clique sur **"Commit changes"**

#### **Option B : Via Git en ligne de commande** (avancé)

Si tu préfères utiliser Git :

```bash
cd /path/to/food-home-deploy
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TON-USERNAME/food-home.git
git push -u origin main
```

---

## 🎯 ÉTAPE 2 : Déployer sur Vercel

### 2.1 Se connecter à Vercel

1. Va sur https://vercel.com
2. Clique sur **"Sign Up"** ou **"Log In"**
3. Connecte-toi avec ton compte GitHub (recommandé)
4. Autorise Vercel à accéder à GitHub si demandé

### 2.2 Créer un nouveau projet

1. Une fois connecté, clique sur **"Add New..."**
2. Sélectionne **"Project"**
3. Tu verras la liste de tes repositories GitHub

### 2.3 Importer le repository

1. Cherche ton repository **"food-home"** dans la liste
2. Clique sur **"Import"** à côté du nom

### 2.4 Configurer le projet

Sur l'écran de configuration :

- **Project Name:** `food-home` (ou change si tu veux)
- **Framework Preset:** Laisse sur **"Other"** (pas de framework)
- **Root Directory:** `.` (laisser par défaut)
- **Build and Output Settings:** 
  - Build Command : Laisser vide
  - Output Directory : Laisser vide
- **Environment Variables:** Aucune nécessaire

⚠️ **NE CHANGE RIEN** dans les paramètres, tout est déjà configuré !

### 2.5 Déployer

1. Clique sur **"Deploy"**
2. Attends 1-2 minutes pendant le déploiement
3. 🎉 **C'est terminé !**

---

## 🌐 ÉTAPE 3 : Accéder à ton application

### 3.1 Obtenir l'URL

Après le déploiement, Vercel affiche :

```
🎉 Congratulations!
Your project has been deployed to:
https://food-home-XXXX.vercel.app
```

📱 **Cette URL est maintenant ton application !**

### 3.2 Tester l'application

1. Clique sur l'URL ou copie-la dans ton navigateur
2. Tu devrais voir la page de login
3. Entre le code PIN : **1234**
4. Tu arrives sur la page d'accueil !

### 3.3 Partager l'URL

Tu peux maintenant partager cette URL avec :
- Ta famille
- Tes amis
- Tes collègues

⚠️ **Important:** Chaque personne aura ses propres données (localStorage = données locales dans le navigateur)

---

## 🎨 ÉTAPE 4 : Personnaliser (optionnel)

### Changer le code PIN par défaut

1. Sur GitHub, ouvre le fichier `index.html`
2. Clique sur l'icône crayon (Edit)
3. Trouve la ligne (~180) :
   ```javascript
   const DEFAULT_PIN = '1234';
   ```
4. Change `'1234'` par ton code
5. Commit changes

**Vercel redéploie automatiquement en 1 minute !**

### Personnaliser l'URL

Par défaut: `food-home-XXXX.vercel.app`

Pour avoir ton propre domaine :
1. Va dans **Settings** du projet sur Vercel
2. **Domains** → **Add**
3. Entre ton domaine personnalisé (ex: `monfoodhome.com`)
4. Suis les instructions DNS

Ou utilise un sous-domaine Vercel :
1. **Domains** → **Edit**
2. Change `food-home-XXXX` en `monfoodhome`
3. Tu obtiens : `monfoodhome.vercel.app`

---

## 🔄 ÉTAPE 5 : Mettre à jour l'application

### Quand tu veux modifier quelque chose :

1. Va sur GitHub
2. Ouvre le fichier à modifier
3. Clique sur l'icône crayon (Edit)
4. Fais tes modifications
5. Clique sur **"Commit changes"**

**Vercel redéploie automatiquement en 1-2 minutes !** 🚀

---

## ✅ CHECKLIST FINALE

Avant de partager ton app, vérifie :

- [ ] L'URL fonctionne dans ton navigateur
- [ ] Le login avec PIN 1234 fonctionne
- [ ] Tu peux basculer entre Repas et Courses
- [ ] Les recettes se chargent correctement
- [ ] Tu peux ajouter des ingrédients à la liste
- [ ] La liste de courses fonctionne
- [ ] Les données persistent après rafraîchissement
- [ ] Ça fonctionne sur mobile

---

## 🆘 PROBLÈMES COURANTS

### "Page not found" sur Vercel
→ Vérifie que tous les fichiers sont bien sur GitHub, surtout `index.html`

### Les styles ne s'affichent pas
→ Vérifie que le dossier `css/` est bien uploadé sur GitHub avec tous les fichiers

### Les recettes ne se chargent pas
→ Vérifie que `recipes.json` est bien sur GitHub

### Le login ne fonctionne pas
→ Ouvre la console du navigateur (F12) et regarde les erreurs

### Les données ne se sauvegardent pas
→ Vérifie que ton navigateur autorise localStorage (mode privé = NON)

---

## 📱 INSTALLER COMME APPLICATION

### Sur smartphone (PWA)

**iOS (Safari) :**
1. Ouvre l'URL dans Safari
2. Appuie sur le bouton de partage
3. "Ajouter à l'écran d'accueil"
4. Nomme l'app "FOOD HOME"

**Android (Chrome) :**
1. Ouvre l'URL dans Chrome
2. Menu (⋮) → "Installer l'application"
3. Confirme

**Sur PC :**
- Chrome : Icône + dans la barre d'adresse
- Edge : Idem

L'app fonctionne maintenant comme une vraie application !

---

## 🎉 FÉLICITATIONS !

Ton application FOOD HOME est maintenant **en ligne et accessible partout !**

Tu as maintenant :
- ✅ Une URL publique
- ✅ Mises à jour automatiques via GitHub
- ✅ Hébergement gratuit
- ✅ Application responsive (PC + mobile)
- ✅ Données privées (localStorage)

**Profite bien de ton app !** 🚀

---

Des questions ? Vérifie le README.md ou relis ce guide.
