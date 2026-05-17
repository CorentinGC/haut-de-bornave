---
name: que-visiter-article
description: Ajoute un nouvel article au guide local « Que visiter » (lieu/activité autour de Deshaies) — levier SEO longue traîne, FR + EN. À lancer régulièrement (≈ 1×/mois) pour nourrir le blog et le référencement. Invoquer avec /que-visiter-article (préciser le sujet, sinon piocher dans le backlog SEO).
---

# Skill — Nouvel article « Que visiter » (guide local SEO)

Objectif : publier **un article** (lieu à visiter ou activité autour de
Deshaies/Pointe-Noire/côte sous le vent) pour capter la **longue traîne SEO**
top-of-funnel et mailler vers les gîtes. À relancer ≈ **1 fois par mois**.

> Auteur des fichiers modifiés : `@author Eden Solutions <contact@eden-solutions.pro>`
> (skill `jsdoc`). Workflow test+review OBLIGATOIRE (cf. CLAUDE.md §0).

## 1. Choisir le sujet

- Si l'utilisateur a donné un sujet → l'utiliser.
- Sinon, piocher **un** sujet non encore couvert dans, par ordre :
  `seo/checklist.md` (backlog d'articles, phase 3), `seo/local-poi.md` (POI +
  distances réelles), `seo/keywords.md` (mots-clés P2/P3 à cibler).
- Vérifier qu'aucun article existant (`src/content/articles.fr.ts`) ne traite
  déjà le sujet. Privilégier les requêtes informationnelles géolocalisées
  (« que faire à… », « visiter… depuis Deshaies », « plage… », « randonnée… »).
- **Ne jamais inventer de faits** (horaires, prix, distances). Si une donnée
  est incertaine, rester général et factuel (cf. `docs/contenu-decisions.md`).
  Les distances/temps proviennent de `seo/local-poi.md` (indicatifs).

## 2. Choisir les images (couverture + sections)

- Réutiliser une image **déjà présente** dans `public/media/` ET listée dans
  `src/lib/media-dimensions.json` (sinon `next/image` casse / CLS). Lieux
  pertinents : `/media/lieux/*`, `/media/domaine/*`, `/media/galerie/*`.
- Nouvelle image requise → `docs/medias.md` : ajouter une entrée à
  **`scripts/media.json`** (manifeste unique) puis `bash scripts/fetch-media.sh`
  puis régénérer le manifeste de dimensions. Priorité aux photos du site source
  `leshautsdebornave.com` (`source: "com"`) ; à défaut images **libres de
  droits** (Wikimedia CC BY/BY-SA, Unsplash) avec `source` + `credit` (et
  `optimize: true` pour les originaux lourds → WebP ≤ 2000 px). Aucun hotlink.
- `alt` géolocalisé (« … Deshaies, Guadeloupe »). Une image libre de droits a
  un `credit` **obligatoire** (affiché en légende) ; jamais en `cover` sans
  qu'elle apparaisse aussi en image de section créditée.

## 3. Rédiger l'article (FR **et** EN) — 1 fichier JSON

Créer **`src/content/articles/<slug>.json`** (forme `ArticleFile`,
`src/content/types.ts`) puis l'enregistrer dans
`src/content/articles/index.ts` (import + tableau `FILES`). FR et EN sont dans
le **même fichier** (plus de couplage par index).

Champs racine : `order` (entier unique, ordre d'affichage), `cover`,
`datePublished` (ISO), `dateModified?` (ISO), `relatedGites` (slugs valides
parmi `gran-kaz, kaz-an-nou, ti-kaz-la, rayon-jaune, rayon-bleu`).
Par locale (`fr`, `en`) : `slug` (kebab-case **localisé/différent par locale**,
ex. `randonnee-cascade-acomat` / `acomat-waterfall-hike`), `title`, `excerpt`
(1 phrase), `category` (localisée), `readingTime`, `distance?`, `sections[]`
(`heading?` + `paragraphs[]` + `image?` `{src, alt, caption?, credit?}`,
1 idée/section), `faq` (**≥ 3** Q/R factuelles → rich result FAQPage), `seo`
(`title` unique géolocalisé, `description` **50–165 caractères** — test échoue
au-delà). Parité FR/EN exigée (mêmes nb de sections, faq, images).

Style : éditorial, fidèle aux faits, mots-clés naturels, **maillage interne**
pertinent (ne pas mettre tous les gîtes systématiquement).

> Aucune autre modification nécessaire : sitemap (`app/sitemap.ts`), pages
> `/que-visiter` + `[slug]`, JSON-LD `Article` (datePublished/author) +
> `FAQPage` + `BreadcrumbList`, `generateStaticParams`, hreflang et le
> sélecteur de langue se mettent à jour automatiquement à partir du barrel.

## 4. Tester ET reviewer (obligatoire — CLAUDE.md §0)

1. `npm run verify` (lint + Vitest + build, ~62 pages SSG et +2 par nouvel
   article) — **0 échec**. Le garde-fou `tests/unit/content/content.test.ts`
   vérifie le schéma JSON : `order` unique, parité FR/EN (sections/faq/images),
   `cover`+images au manifeste, dates ISO, `relatedGites` valides, `≥ 3` FAQ,
   `alt` géolocalisé, crédit des images libres, `description ≤ 165`.
2. `npm run test:e2e` (Playwright desktop+mobile) — **0 échec**. Les routes
   `/fr|/en/que-visiter/<slug>` sont **auto-couvertes** : `tests/helpers/
   articles.ts` dérive les slugs des JSON (rien à ajouter). Chaque page article
   est testée : image de corps + bloc FAQ présents.
3. **Review visuelle MCP chrome-devtools** : `npm run build && npm run start`,
   screenshots **desktop ET mobile** de `/fr/que-visiter` (carte du nouvel
   article) et `/fr/que-visiter/<slug>` (+ version EN) — 0 bug visuel, 0 média
   manquant, image de couverture nette, hovers OK, contrastes AA.

## 5. Livrer

Commit conventionnel atomique :
`feat(content): article guide local « <sujet> » (FR/EN, SEO longue traîne)`
puis `git push`. Mentionner le mot-clé cible visé.

## Lancement mensuel

Manuel : `/que-visiter-article` (≈ 1×/mois). Pour automatiser, utiliser le
skill `schedule` (agent distant cron) ou `loop` — créer une routine mensuelle
qui invoque ce skill. Garder un rythme régulier (1–2 articles/mois) pour la
fraîcheur SEO sans diluer la qualité.
