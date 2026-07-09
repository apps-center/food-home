# Images des grandes catégories (écran Liste de courses)

Ce dossier contient les 4 illustrations affichées sur les cartes des grandes
catégories dans `courses.html` (écran « FOOD HOME — Listes de courses »).

## Fichiers attendus

Déposer ici **4 images**, une par carte, nommées exactement :

| Fichier             | Carte              | Emoji de secours |
|---------------------|--------------------|------------------|
| `alimentaire.jpg`   | Alimentaire        | 🍎               |
| `hygiene.jpg`       | Hygiène            | 🧴               |
| `menage.jpg`        | Produits ménagers  | 🧹               |
| `autre.jpg`         | Autre              | 📦               |

## Mécanisme

Chaque carte (`courses.html`) contient un `<img>` pointant vers le fichier
ci-dessus, plus un **emoji de secours** :

```html
<span class="main-category-media">
  <img src="img/categories/alimentaire.jpg" alt="" loading="lazy"
    onload="this.parentElement.classList.add('has-img')" onerror="this.remove()">
  <span class="main-category-emoji">🍎</span>
</span>
```

- **Image présente** → elle s'affiche (recadrée en `object-fit: cover`) et
  l'emoji est masqué (`.has-img`).
- **Image absente / erreur de chargement** → l'`<img>` se retire tout seul
  (`onerror`) et l'emoji de secours reste visible.

Aucun code JS à modifier pour activer les images : il suffit de déposer les
4 fichiers dans ce dossier.

## Recommandations pour les images (à générer, ex. ChatGPT)

- **Format** : `.jpg` (ou `.png` / `.webp` — dans ce cas, adapter l'extension
  dans les 4 `src` de `courses.html`).
- **Ratio** : paysage, ~4:3 ou 16:9 (les cartes recadrent en hauteur ~96 px).
- **Taille** : viser < 150 Ko par image (app statique, pas de build).
- **Style** : cohérent entre les 4 (même palette / rendu) pour un ensemble
  homogène.
