# Images des recettes

Photos des cartes de recettes affichées dans `eat.html`.

## Convention de nommage

Une image par recette, **nommée d'après son `id`** dans `recipes.json` :

```
images/recipes/<id>.webp        ex. images/recipes/p1.webp, p2.webp, … p175.webp
```

Le chemin est **déduit de l'id** côté code (`getRecipeImage()` dans `eat.html`) —
il ne faut **pas** ajouter de champ image dans `recipes.json`.

## Spécifications des fichiers

| Paramètre      | Valeur                                             |
|----------------|----------------------------------------------------|
| Format         | WebP                                               |
| Ratio          | 3:2 (paysage)                                       |
| Dimensions     | ~800 × 533 px (cible ; les cartes affichent en 3/2)|
| Qualité        | 78–82 (bon compromis netteté / poids)              |
| Poids indicatif| < 60–80 Ko par image                               |
| Cadrage        | Plat centré, marge respirable (l'affichage rogne en `object-fit: cover`) |

Les attributs `width="800"` / `height="533"` sont posés sur chaque `<img>` pour
réserver l'espace et éviter le CLS (layout shift) — garder ce ratio 3:2.

## Absence d'image

Les images peuvent être ajoutées **progressivement**. Tant qu'un `<id>.webp`
n'existe pas :

- la carte affiche le **placeholder inline** (SVG data-URI, défini dans
  `eat.html`) — aucune icône « image cassée », aucun layout shift ;
- la carte reçoit la classe `.recipe-card--no-image` pour un style différencié ;
- `placeholder.svg` (ce dossier) est la version autonome du même visuel, utile
  pour prévisualiser ou générer un placeholder.webp si besoin.

## Génération future (hors de ce ticket)

Les scripts d'aide (`tools/generate-image-prompts.js`, `tools/optimize-images.js`)
seront ajoutés séparément. Pour convertir/optimiser manuellement une image en
respectant les specs ci-dessus :

```sh
# Exemple avec cwebp (libwebp) : redimensionne à 800px de large et qualité 80
cwebp -q 80 -resize 800 0 source.jpg -o images/recipes/p1.webp
```
