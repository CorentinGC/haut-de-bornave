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

## 2. Choisir la photo de couverture

- Réutiliser une image **déjà présente** dans `public/media/` ET listée dans
  `src/lib/media-dimensions.json` (sinon `next/image` casse / CLS). Lieux
  pertinents : `/media/lieux/*`, `/media/domaine/*`, `/media/galerie/*`.
- Si une nouvelle image est requise : suivre `docs/medias.md` (ajouter l'URL à
  `scripts/media-com-urls.txt` → `bash scripts/fetch-media.sh` → régénérer le
  manifeste), `alt` géolocalisé. Aucun hotlink externe.

## 3. Rédiger l'article (FR **et** EN)

Ajouter UN objet `Article` (type : `src/content/types.ts`) :
- dans `src/content/articles.fr.ts` (`articlesFr`) — FR,
- dans `src/content/articles.en.ts` (`articlesEn`) — traduction pro (pas auto),
- **au MÊME index dans les deux tableaux** (⚠️ critique : `src/lib/nav.ts`
  `ARTICLE_SLUG` mappe `fr[i] ↔ en[i]` pour le sélecteur de langue ; un
  décalage = 404 au changement de langue + test e2e rouge).

Champs : `slug` (kebab-case, **localisé/différent par locale** pour le SEO,
ex. `randonnee-cascade-acomat` / `acomat-waterfall-hike`), `cover`, `category`,
`title`, `excerpt` (1 phrase), `readingTime` (« 3 min »), `distance`
(optionnel, depuis le domaine), `sections[]` (`heading?` + `paragraphs[]`,
1 idée/section, paragraphes courts), `relatedGites` (slugs valides parmi
`gran-kaz, kaz-an-nou, ti-kaz-la, rayon-jaune, rayon-bleu`), `seo`
(`title` unique géolocalisé `… | Bornave`, `description` **50–165 caractères**
— un test échoue au-delà).

Style : éditorial, fidèle aux faits, mots-clés naturels, **maillage interne**
pertinent (ne pas mettre tous les gîtes systématiquement).

> Aucune autre modification nécessaire : sitemap (`app/sitemap.ts`), pages
> `/que-visiter` + `[slug]`, JSON-LD `Article`, `generateStaticParams`,
> hreflang se mettent à jour automatiquement à partir des tableaux.

## 4. Tester ET reviewer (obligatoire — CLAUDE.md §0)

1. `npm run verify` (lint + Vitest + build 52→54 pages SSG) — **0 échec**.
   Le test d'intégrité contenu vérifie parité FR/EN, `relatedGites` valides,
   `description ≤ 165`.
2. `npm run test:e2e` (Playwright desktop+mobile) — **0 échec** (les nouvelles
   routes `/fr|/en/que-visiter/<slug>` sont auto-couvertes : ajouter le slug
   dans `tests/e2e/site.spec.ts` `ARTICLE`/`COMMON` si on veut le tester
   explicitement, sinon la liste générique suffit).
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
