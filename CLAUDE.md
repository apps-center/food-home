# CLAUDE.md — FOOD HOME

Guide pour travailler sur ce dépôt. Application familiale de planning de repas
et de liste de courses. PWA statique, sans build, déployée sur Vercel.

## Vue d'ensemble

FOOD HOME est une app 100 % front-end (HTML + CSS + JS vanilla, aucun bundler,
aucune dépendance npm). Elle sert deux usages :

1. **Trouver des idées de plats** (`eat.html`) — recherche/filtre dans un
   catalogue de recettes, tirage au sort, génération d'un planning famille sur
   5 jours, et envoi des ingrédients vers la liste de courses.
2. **Établir la liste de courses** (`courses.html`) — items rangés par rayon de
   supermarché, cases à cocher, catégories hygiène/ménage/etc.

## Architecture

Chaque page est un fichier HTML autonome (CSS + JS inline, sauf `home.html` qui
utilise `css/`).

| Fichier         | Rôle                                                                 |
|-----------------|----------------------------------------------------------------------|
| `index.html`    | Écran de connexion par code PIN (4 chiffres).                        |
| `home.html`     | Shell de l'app. Deux `<iframe>` (`eat` / `courses`) dans un « flipper » 3D ; bascule via un bouton. |
| `eat.html`      | Planificateur de repas (catalogue + planning + « au hasard »).       |
| `courses.html`  | Liste de courses par rayons.                                         |
| `recipes.json`  | Catalogue de recettes (source de données des recettes).             |
| `css/`          | `tokens.css` (variables du thème — source unique), `common.css` (base), `eat.css`, `courses.css`, `home.css`, `login.css`. |
| `vercel.json`   | En-têtes `Content-Type` + `cleanUrls`.                               |
| `_redirects`    | Réécritures `/eat` → `/eat.html`, etc. (fallback style Netlify).     |

**Navigation.** `index.html` → (PIN OK) → `home.html`. `home.html` charge `eat`
et `courses` en iframes et les fait communiquer par `postMessage`
(`SHOPPING_LIST_UPDATED`, `REFRESH_DATA`, `SHOW_SHOPPING_LIST`). Les URLs propres
(`/eat`, `/courses`) viennent de `cleanUrls` (Vercel) et de `_redirects`.

**Authentification.** PIN côté client uniquement. PIN par défaut `2504`
(constante `DEFAULT_PIN` dans `index.html`), surchargée par
`localStorage['food_home_pin']`. Session valide 24 h via
`food_home_logged_in` + `food_home_login_time`. ⚠️ Purement cosmétique : aucune
sécurité réelle (tout est public dans un dépôt public). Ne pas y stocker de
données sensibles.

## Modèle de données

### Recettes (`recipes.json`)

Tableau JSON d'objets. Une recette = un objet avec ces clés (toutes des
chaînes) :

```json
{
  "id": "p1",
  "nom": "Flan aux œufs",
  "type_repas": "plat",            // "entree" | "plat" | "dessert"
  "saisons": "toute",              // "toute" | "printemps" | "ete" | "automne" | "hiver"
  "diets": "equilibre|vegetarien", // valeurs séparées par « | »
  "proteine": "laitier",           // viande | poisson | oeuf | laitier | vegetal | ...
  "kidsFriendly": "Oui",           // "Oui" | "Non" (hérité, peu fiable — voir `public`)
  "temps": "50",                   // minutes (chaîne)
  "budget": "budget",              // "budget" | "moyen" | "eleve"
  "categorie_jour": "",            // "" | "semaine" (hérité, non utilisé par le planning)
  "moment": "semaine",             // "semaine" | "we" | "tous" — quand servir la recette
  "public": "kids",                // "kids" | "adultes" | "tous" — pour qui
  "ingredients": "Lait (1 L)|Œufs (5)|Sucre (100 g)", // items séparés par « | », quantité entre ( )
  "instructions": "Préchauffer le four à 180°C. …"    // texte libre
}
```

Convention **ingrédients** : `Nom (quantité)` séparés par `|`. La quantité entre
parenthèses est la donnée que l'utilisateur a récemment ajoutée à tout le
catalogue.

**Étiquettes `moment` / `public`** (présentes sur les 167 recettes). Ce sont les
axes qui pilotent le générateur de planning et les badges des cartes
(`public: kids` → 👶, `adultes` → 🍷, `moment: we` → 🗓️). `kidsFriendly` et
`categorie_jour` restent dans le JSON pour compatibilité mais ne sont plus la
source de vérité — utiliser `moment`/`public`.

### Planning famille (`generateWeeklyPlanning` dans `eat.html`)

Le planning couvre **9 repas**, définis dans la constante `PLANNING_SLOTS` :
dîners Lun→Ven + déjeuner du mercredi (créneaux `kind:"semaine"`), puis samedi
dîner + dimanche déjeuner & dîner (`kind:"we"`). Les midis d'école
(Lun/Mar/Jeu/Ven) sont volontairement absents.

- Créneaux **semaine** : plats tirés de `moment ∈ {semaine, tous}` **et**
  `public ∈ {kids, tous}`, en privilégiant les plats rapides au déjeuner.
- Créneaux **we** : plats de `moment ∈ {we, tous}` (tous publics), en
  privilégiant les plus qualitatifs (budget `moyen`/`eleve` ou temps > 45 min).
- Variété assurée par déduplication des `id` et plafond de 2 par `proteine`.

### Liste de courses

Stockée en `localStorage['food_home_shopping_list']` sous forme d'un tableau de
chaînes (noms d'items). Clé exposée dans le code via la constante
`SHOPPING_KEY` (définie dans `eat.html` et `courses.html`).

Dans `courses.html`, les items sont rangés par rayon via l'objet `CATEGORIES`
(clé → `{ name, icon, items[] | groups{} }`) et `findCategoryForItem()`.
Sauvegarde/restauration manuelle vers un fichier JSON via `backupList()` /
`restoreList()` (boutons « 💾 Sauvegarder » / « ♻️ Restaurer »). La restauration
**fusionne** avec la liste existante (dédup), elle n'écrase jamais.

## Architecture de stockage — 100 % statique (plus de Supabase)

**Historique.** Le backend Supabase du projet avait été mis en pause par
inactivité (offre gratuite : pause après ~1 semaine, suppression du dashboard
après 90 j), rendant les recettes inaccessibles.

**État actuel (migration effectuée).** Supabase a été entièrement retiré. L'app
est désormais purement front-end :

- **Recettes** : `eat.html > loadRecipes()` fait `fetch('recipes.json')`. Le
  fichier est déjà au format interne (`nom`, `type_repas`, …), aucun mapping.
  `recipes.json` est **l'unique source de vérité** des recettes — éditer ce
  fichier suffit à mettre à jour l'app.
- **Liste de courses** : `localStorage` seul, dans `eat.html` (ajout d'items) et
  `courses.html` (`loadFromAPI` / `saveToAPI`). Plus aucun appel réseau.
- Le `<script src="…supabase-js…">` et les `createClient(...)` ont été supprimés
  des deux pages.

**Conséquences.** Plus aucun backend à réveiller/payer, jamais de nouvelle mise
en pause, déploiement gratuit et durable sur Vercel. Contrepartie : la liste de
courses n'est plus synchronisée automatiquement entre appareils — utiliser
« 💾 Sauvegarder » / « ♻️ Restaurer » pour la transférer manuellement.

Si un jour une vraie synchronisation multi-appareils devient nécessaire,
préférer un service pensé pour les apps statiques peu actives (ex. un simple
gist/KV, ou Supabase avec un cron de « keep-alive ») plutôt que de dépendre d'un
backend qui se remet en pause.

## Qualité des données `recipes.json`

- 167 recettes, `id` uniques (`p1`…`p175`).
- **2 enregistrements corrompus** : `p3` (Lasagnes bolognaises) et `p55` (Darne
  de saumon aux asperges). Leur texte d'`instructions` a débordé dans le champ
  `type_repas` (colonnes décalées à l'export, probablement une virgule/point
  interprété comme séparateur). Correctif attendu : `type_repas` = `"plat"` et
  ré-concaténer le texte dans `instructions`. À vérifier lors de la reprise.
- Validation utile avant déploiement : `type_repas ∈ {entree, plat, dessert}`,
  `budget ∈ {budget, moyen, eleve}`, aucun champ requis vide.

## Développement & déploiement

- **Aucun build.** Ouvrir les fichiers via un serveur statique local
  (ex. `python3 -m http.server`) — `fetch('recipes.json')` et les iframes
  nécessitent `http://`, pas `file://`.
- **Déploiement** : Vercel, push sur `main` → déploiement auto. Site :
  `food-home-ten.vercel.app`.
- Éditer une page = éditer son HTML (CSS/JS inline). Garder le style existant
  (variables CSS `--gradient-primary`, `--radius-*`, police Inter, emojis dans
  l'UI, commentaires FR).

## Thème & couleurs (re-thémage)

Toutes les variables du thème vivent dans **`css/tokens.css`** (`:root`) — source
unique, importée par `common.css` (`@import`) et liée directement par les pages.
Pour changer l'apparence, éditer ces variables — **pas** les valeurs dans les
pages.

- **Accent bleu** (couleur d'action : boutons, liens, focus, tags, cartes) :
  `--accent` et `--accent-strong` pilotent l'essentiel ; les fonds clairs
  (`--accent-bg`, `--accent-bg-soft`, `--accent-bg-2…5`) et les bordures/ombres
  translucides en découlent. Les variantes translucides utilisent la *relative
  color syntax* `rgb(from var(--accent-strong) r g b / α)`, donc elles suivent
  automatiquement le changement de teinte (Safari 16.4+ / navigateurs récents).
- **Accent secondaire violet** (bouton « Générer planning », `.btn-accent`) :
  `--accent-2` / `--accent-2-strong`.
- **Marque violette** (écran PIN) : `--brand-primary` / `--brand-secondary` /
  `--gradient-primary`.
- **Sémantiques** : `--success`, `--warning`, `--error`, `--info`.
- **Statut** : tout l'accent (bleu + violet) est tokenisé sur **les 3 pages**
  (`index.html`, `eat.html`, `courses.html`) et leurs CSS. Éditer `tokens.css`
  re-thème toute l'app. Restent volontairement **littérales** (couleurs
  sémantiques, ne suivent pas l'accent) : les rayons de courses
  (orange/jaune/rose/vert/gris), les cartes de la pyramide nutritionnelle, et les
  états d'erreur (rouge).
- **Dark mode** : **actif**, en automatique (suit le réglage système via
  `@media (prefers-color-scheme: dark)` dans `tokens.css` — seules des variables
  y sont redéfinies, le mode clair reste intact). Les surfaces claires passent
  par `--surface` / `--surface-2` (basculées en sombre). Note : les `<button>`
  n'héritent pas de la couleur du `body` → ceux à fond neutre portent un
  `color: var(--text-primary)` explicite (sinon texte noir illisible en sombre).
  Les couleurs sémantiques (rayons, pyramide, erreurs) ne basculent pas.

## Conventions

- Tout en **français** (UI, commentaires, noms de variables métier).
- JS vanilla, pas de framework, pas de dépendance à installer.
- Ne pas committer de secret réel : le PIN et la clé anon Supabase présents dans
  l'historique sont publics/cosmétiques ; ne pas ajouter de vraie clé privée.
