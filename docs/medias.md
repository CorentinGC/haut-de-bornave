# Pipeline médias

Toutes les photos d'illustration sont **identiques aux sites source** et
**auto-hébergées** (aucun hotlink — meilleure perf/SEO et indépendance).

## Source & téléchargement

- **`scripts/media.json`** : manifeste **unique** de tous les médias à
  récupérer. Tableau d'entrées `{ url, dir, file, source, credit?, optimize? }` :
  - `dir` : sous-dossier cible (`gites|domaine|lieux|galerie|brand|partenaires`).
  - `file` : nom final kebab-case minuscule, **géolocalisé** et sémantique.
  - `source` : `com` (CDN `leshautsdebornave.com`), `fr` (assets `.fr`),
    `wikimedia`, `unsplash`.
  - `credit` : **obligatoire** si image libre de droits (Wikimedia/Unsplash) —
    « Auteur / Source — Licence » ; vide/absent pour `com`/`fr`.
  - `optimize: true` : source lourde (originaux Wikimedia…) → normalisée en
    WebP ≤ 2000 px via `scripts/optimize-image.cjs` (sharp). Le `file` doit
    alors être en `.webp`.
- `scripts/fetch-media.sh` : télécharge (idempotent — ignore les fichiers déjà
  présents) en consommant `scripts/media.json`, et optimise les entrées
  `optimize: true`.

```bash
bash scripts/fetch-media.sh        # ~133 fichiers
```

Une seule image source est absente côté `.com` (Gran Kaz #7, 404) — sans
impact (12 photos Gran Kaz, ≥ 8 requis pour le JSON-LD).

## Images libres de droits & crédits

Quand le site source ne couvre pas un sujet (ex. fonds de la Réserve Cousteau,
Chutes du Carbet, marché créole), utiliser des images **libres pour usage
commercial** uniquement : domaine public, CC0, CC BY, CC BY-SA (Wikimedia
Commons) ou licence Unsplash. **Jamais** : non-free, CC BY-NC, CC BY-ND.
Le `credit` (« Auteur / Wikimedia Commons — CC BY-SA 4.0 ») est reporté dans
`scripts/media.json` **et** dans le champ `image.credit` de l'article
(`src/content/articles/<slug>.json`) — il s'affiche en légende
(`<figcaption>`). Une image créditée ne sert pas de `cover` sans apparaître
aussi en image de section (l'attribution doit être visible sur la page).

## Manifeste de dimensions (anti-CLS)

`src/lib/media-dimensions.json` mappe chaque `/media/...` vers `[width,height]`.
Indispensable pour `next/image` (dimensions explicites → CLS ≈ 0, facteur SEO).
Régénérer après ajout de médias :

```bash
node -e '
const {imageSize}=require("image-size");const fs=require("fs"),p=require("path");
const out={};(function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){
const f=p.join(d,e.name);if(e.isDirectory())w(f);
else if(/\.(webp|jpe?g|png|avif)$/i.test(e.name)){const{width,height}=imageSize(fs.readFileSync(f));
out["/"+f.replace(/^public\//,"")]=[width,height];}}})("public/media");
const s={};for(const k of Object.keys(out).sort())s[k]=out[k];
fs.writeFileSync("src/lib/media-dimensions.json",JSON.stringify(s));'
```

(`image-size` est une devDependency.)

## Utilisation dans le code

`src/lib/media.ts` :

- `media(src, alt)` → `{ src, width, height, alt }` (dimensions depuis le
  manifeste). `alt` doit être **géolocalisé** (« … Deshaies, Guadeloupe »).
- `gitePhotos(prefix, altBase)`, `domainePhotos(...)`, `lieuPhotos(...)`,
  `galeriePhotos(...)` → collections triées.
- `KEY_MEDIA` → visuels clés réutilisés (hero, OG, CTA).

Toujours rendre via `<Cover>` (plein cadre, `fill`) ou `<Pic>` (dimensionné)
de `src/components/ui.tsx` — jamais de `<img>` brut.

## Optimisation qualité (poids transféré)

`next.config.ts` → `images.qualities: [60, 62, 72, 75]` (Next 16 exige
d'autoriser explicitement les qualités ≠ 75). Stratégie (perte visuelle
nulle, gain de poids réel — mandat client) :

| Contexte | Composant | `quality` | Pourquoi |
|----------|-----------|-----------|----------|
| Fond CTA (`cta-block__bg`) | `Cover` | **60** | Fortement assombri par overlay |
| Héros pages internes (`page-hero__bg`, LCP) | `Cover` | **62** | Dégradé sombre dessus → LCP plus léger |
| Couvertures décoratives (universe, split, frame) | `Cover` | **72** (défaut) | Décor / souvent partiellement masqué |
| Photos détaillées (carrousels gîtes, `Pic`) | `Image`/`Pic` | **75** (défaut) | Détail intérieur — qualité préservée |

`<Cover>` accepte une prop `quality` (défaut 72). Le `sizes` reste contextuel
(`100vw` héros, `33/66vw` cartes…) pour ne pas servir de variante trop large.

## Ajouter un média

1. Ajouter une entrée à **`scripts/media.json`** (`url`, `dir`, `file`,
   `source`, `credit` si libre de droits, `optimize: true` si source lourde)
   puis `bash scripts/fetch-media.sh` (idempotent).
2. Régénérer le manifeste de dimensions (commande ci-dessus).
3. Le référencer via `media("/media/.../fichier.webp", "alt géolocalisé")`
   (et `image.credit` dans l'article si libre de droits).
