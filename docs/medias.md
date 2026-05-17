# Pipeline médias

Toutes les photos d'illustration sont **identiques aux sites source** et
**auto-hébergées** (aucun hotlink — meilleure perf/SEO et indépendance).

## Source & téléchargement

- `scripts/media-com-urls.txt` : URLs des photos du CDN `leshautsdebornave.com`
  (extraites du HTML `.fr` qui est la référence design).
- `scripts/fetch-media.sh` : télécharge (idempotent — ignore les fichiers déjà
  présents) vers `public/media/` en sous-dossiers :
  `gites/ domaine/ lieux/ galerie/ brand/ partenaires/`. Noms en kebab-case
  minuscule (déjà géolocalisés et sémantiques côté source).

```bash
bash scripts/fetch-media.sh        # ~108 fichiers, ~21 Mo
```

Une seule image source est absente côté `.com` (Gran Kaz #7, 404) — sans
impact (12 photos Gran Kaz, ≥ 8 requis pour le JSON-LD).

## Manifeste de dimensions (anti-CLS)

`src/lib/media-dimensions.json` mappe chaque `/media/...` vers `[width,height]`.
Indispensable pour `next/image` (dimensions explicites → CLS ≈ 0, facteur SEO).
Régénérer après ajout de médias :

```bash
node -e '
const {imageSize}=require("image-size");const fs=require("fs"),p=require("path");
const out={};(function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){
const f=p.join(d,e.name);if(e.isDirectory())w(f);
else if(/\.(webp|jpe?g|png)$/i.test(e.name)){const{width,height}=imageSize(fs.readFileSync(f));
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

## Ajouter un média

1. Le déposer dans le bon sous-dossier de `public/media/` (ou ajouter son URL
   à `media-com-urls.txt` puis relancer `fetch-media.sh`).
2. Régénérer le manifeste (commande ci-dessus).
3. Le référencer via `media("/media/.../fichier.webp", "alt géolocalisé")`.
