@AGENTS.md

# Les Hauts de Bornave — Guide projet

Site vitrine **SEO-first, mobile-first, bilingue FR/EN** pour un domaine de
5 gîtes à **Deshaies, Guadeloupe**. Next.js 16 (App Router, RSC, TypeScript),
déployé sur Vercel. Design repris du site `leshautsdebornave.fr`, contenu repris
de `leshautsdebornave.com`.

> Opérationnel (commandes, env, CI) : voir **AGENTS.md** (importé ci-dessus).
> Cas d'usage détaillés : voir **/docs**. Stratégie de référencement : **/seo**.
> État & demandes permanentes du client : voir **MEMORY.md**.

## 0. Workflow OBLIGATOIRE — tester ET reviewer à chaque modification

Toute modification (code, contenu, style) DOIT être suivie de :

1. **Tests logiques** : `npm run test` (Vitest unitaires) **et**
   `npm run test:e2e` (Playwright e2e desktop + mobile). 0 échec.
   Un test qui échoue révèle un bug → corriger le **code**, pas le test
   (sauf si le test est faux). Toute nouvelle fonctionnalité = nouveaux tests
   dans **`/tests`** (`tests/unit/**` ou `tests/e2e/**`).
2. **Review visuelle** via le **MCP chrome-devtools** (`.mcp.json`) : pour
   CHAQUE page modifiée, screenshots **plein écran en desktop ET mobile**,
   vérifier : aucun bug visuel, aucun média manquant (console + réseau),
   **tous les états hover**, contrastes, parité vs `leshautsdebornave.fr`.
   Corriger puis re-screenshoter.
3. Raccourci : `npm run verify` (lint + unit + build). e2e + review visuelle
   restent à lancer explicitement.

> **SERVEUR — RÈGLE STRICTE** : le serveur (`npm run dev` / `npm run start`)
> est lancé et contrôlé **uniquement par l'utilisateur**. L'agent ne démarre
> jamais le serveur de lui-même et **doit demander la permission avant de
> redémarrer ou couper** un serveur en cours. Pour build/typecheck, utiliser
> `npm run build` / `npx tsc --noEmit` (ne nécessitent pas de serveur). Pour
> la review visuelle, demander à l'utilisateur de (re)lancer le serveur.

> Ne jamais considérer une tâche « terminée » sans tests verts **et** review
> visuelle desktop+mobile. La review design fine est déléguée à l'agent
> **`.claude/agents/ui-ux-reviewer`** (finition ultra-pro, perf/images) —
> raccourci : skill **`/ui-review`** (lance l'agent, périmètre optionnel).

## 1. Priorités produit (dans l'ordre)

1. **SEO** — c'est l'objectif n°1. Toute page DOIT avoir : `generateMetadata`
   (title/description uniques), canonical, hreflang FR↔EN + x-default, JSON-LD
   adapté, entrée sitemap, 1 seul `<h1>`, `alt` géolocalisés.
2. **Mobile-first** — concevoir mobile d'abord ; navigation mobile = **bottom
   nav app-style** (`MobileBottomNav`), jamais de burger.
3. **Performance / Core Web Vitals** — facteur SEO. Images `next/image` avec
   dimensions (anti-CLS), fonts self-host, JS minimal, pages statiques.
4. **Fidélité visuelle** au site `.fr` — `src/styles/lhdb.css` est la **source
   de vérité du design** (charte portée). Ne pas diverger sans raison.
5. **Fidélité du contenu** au site `.com` — verbatim FR. Ne **rien inventer** ;
   incohérences source tranchées dans `docs/contenu-decisions.md`.

## 2. Règles de code (obligatoires)

- **Next.js 16** : lire `node_modules/next/dist/docs/` avant d'utiliser une API
  (breaking changes — cf. AGENTS.md). `params` est une **Promise** (`await`).
- **Server Components par défaut** ; `"use client"` uniquement si interactivité
  réelle (état, écouteurs). Composants client actuels : `Header`,
  `MobileBottomNav`, `Carousel`, `ScrollReveal`, `Typewriter`, `ContactForm`.
- **Pas de JS brut ni de lib ancienne** (jQuery, etc.). Toute interaction =
  composant/hook React typé. Aucun fichier `*-reference.js*` dans `src/`.
- **TypeScript strict**, pas de `any`, pas d'export inutilisé (le build lint
  échoue dessus). `react-hooks/set-state-in-effect` est une **erreur** : ne pas
  appeler `setState` sync dans un corps d'effet.
- **Pages statiques** : `export const dynamic = "force-static"` sur chaque page ;
  routes dynamiques (`[slug]`) → `generateStaticParams`. Seule exception
  serveur : `src/app/api/contact/route.ts`.
- **i18n** : tout texte vient de `src/content/{fr,en}.ts` via `getContent(locale)`
  (jamais de chaîne en dur dans une page). Liens internes via `href(locale, …)`.
- **Infos vendeur** : exclusivement dans **`/config.json`** (racine, éditable
  par l'exploitant) → lu par `src/lib/site.ts`. Jamais de tel/email/adresse en
  dur ailleurs.
- **Tests** : tout sous **`/tests`** (`tests/unit/{lib,content,components}`,
  `tests/e2e`, `tests/setup.ts`, `tests/helpers`). Pas de test colocalisé.
- **Médias** : toujours `next/image` + helper `src/lib/media.ts` (dimensions
  réelles fournies, anti-CLS). Aucun hotlink vers `.com`/`.fr`.
- **Clean code** : SRP, fonctions courtes, noms explicites, early returns, DRY,
  pas de dead code, colocation. Fichiers < ~500 lignes (sauf données de contenu).
- **Accessibilité** : HTML sémantique, `alt`, focus visible, navigation clavier,
  `prefers-reduced-motion`, contrastes (skill a11y).
- **JSDoc Eden Solutions** (skill `jsdoc`, OBLIGATOIRE sur tout fichier créé
  ou modifié) : header fichier en 1ʳᵉ position (après `"use client"` le cas
  échéant) — description FR concise + `@author Eden Solutions
  <contact@eden-solutions.pro>` ; fonctions/constantes exportées documentées
  (`@param nom - …`, `@returns …`, sans type entre accolades) ; composants
  React = description seule. Minimaliste, en français.
- **Crédit agence** : pied de page « Site réalisé par **Eden Solutions** » →
  lien `https://eden-solutions.pro` (composant `Footer`, libellé
  `content.footer.madeBy`). Ne pas retirer.
- **Commits** : conventionnels (`feat:`, `fix:`, `docs:`…), atomiques.

## 3. Ajouter / modifier — réflexes

- **Nouvelle page** → créer `src/app/[locale]/<route>/page.tsx` avec
  `generateMetadata` (via `pageMetadata`), JSON-LD (`src/lib/jsonld.ts`),
  `dynamic="force-static"`, contenu dans `content/{fr,en}.ts`, ajout au
  **sitemap** (`src/app/sitemap.ts`) et à la nav si nécessaire (`src/lib/nav.ts`).
- **Nouvel article guide local** → `docs/blog-que-visiter.md`.
- **Nouveau média** → `docs/medias.md` (script + manifeste de dimensions).
- **Texte source incohérent** → trancher et documenter dans
  `docs/contenu-decisions.md` ; ne jamais inventer.
- **i18n** → `docs/i18n.md`. **Formulaire** → `docs/contact-form.md`.

## 4. Sitemap des dossiers

```
haut-de-bornave/
├ CLAUDE.md ............ ce fichier (règles + sitemap, importe AGENTS.md)
├ AGENTS.md ............ commandes, env, CI, règles agent (Next.js 16)
├ MEMORY.md ............ état projet + demandes permanentes du client
├ config.json ......... infos vendeur (NAP, tel, email, geo, réseaux…) — éditable
├ .mcp.json ........... MCP projet : chrome-devtools (review) + context7
├ .claude/agents/ ..... ui-ux-reviewer.md (agent finition design/perf)
├ tests/ ............... TOUS les tests
│  ├ unit/{lib,content,components}/  Vitest (libs, contenu, composants client)
│  ├ e2e/ ............. Playwright (site.spec, screenshots.spec) desktop+mobile
│  ├ setup.ts ......... setup Vitest (jest-dom, mock next/font)
│  └ helpers/empty.ts . stub server-only
├ vitest.config.mts | playwright.config.ts
├ docs/ ................ cas d'usage spécifiques
│  ├ architecture.md ... structure repo, conventions, flux de rendu
│  ├ i18n.md ........... routing fr/en, ajouter/traduire une page
│  ├ medias.md ........ pipeline médias (fetch-media + manifeste)
│  ├ contact-form.md ... flux Resend, variables d'env, anti-spam
│  ├ contenu-decisions.md  incohérences .com tranchées (à valider client)
│  └ blog-que-visiter.md  publier un article du guide local
├ seo/ ................. stratégie de référencement (versionnée)
│  ├ keywords.md ....... 25 mots-clés priorisés (P1/P2/P3)
│  ├ strategie.md ...... diagnostic, concurrents, USP, plan i18n
│  ├ structured-data.md  schémas JSON-LD par type + checklist
│  ├ checklist.md ...... feuille de route 3 phases + à étudier
│  └ local-poi.md ...... POI locaux + distances (SEO local)
├ scripts/
│  ├ fetch-media.sh .... télécharge tous les médias → public/media
│  ├ media.json ....... manifeste unique des médias (url/dir/file/source/credit)
│  └ optimize-image.cjs  normalise les sources lourdes en WebP (sharp)
├ public/media/ ........ ~133 médias auto-hébergés (gites, domaine, lieux,
│                         galerie, brand, partenaires)
└ src/
   ├ proxy.ts ........... i18n : redirige vers /fr|/en (ex-middleware)
   ├ app/
   │  ├ [locale]/ ....... layout racine + 1 page par route (FR & EN)
   │  │  ├ layout.tsx ... html lang, fonts, Header/Footer/Nav, Org JSON-LD
   │  │  ├ page.tsx ..... accueil
   │  │  ├ domaine|gites|gites/[slug]|rayons-de-soleil|evenements|
   │  │  │  bien-etre|deshaies|que-visiter|que-visiter/[slug]|avis|
   │  │  │  faq|contact|mentions-legales/page.tsx
   │  │  └ not-found.tsx
   │  ├ api/contact/route.ts  formulaire → Resend (seule fonction serveur)
   │  ├ sitemap.ts | robots.ts | manifest.ts | globals.css | favicon.ico
   ├ components/ ........ Header, Footer, MobileBottomNav, Carousel,
   │                      ScrollReveal, Typewriter, ContactForm, JsonLd,
   │                      ui.tsx (primitives : Btn, Section, Hero, Cover…)
   ├ content/ ........... types.ts, fr.ts, en.ts, index.ts (getContent/
   │                      getGite/getArticle, server-only) ; articles/
   │                      <slug>.json (1 JSON bilingue/article) + index.ts loader
   ├ lib/ ............... site.ts (lit /config.json), nav.ts, seo.ts, jsonld.ts,
   │                      media.ts (+ media-dimensions.json), fonts.ts
   └ styles/lhdb.css .... CHARTE .fr portée — source de vérité visuelle
```

## 5. Recommandations SEO (rappel — détail dans /seo)

- **Mots-clés cœur** : « location gîte/villa Deshaies », « hébergement
  Deshaies », « … Guadeloupe vue mer », longue traîne géolocalisée + EN.
- **JSON-LD** : `LodgingBusiness` (accueil), `VacationRental` (chaque gîte),
  `FAQPage`, `BreadcrumbList`, `Organization`, `Article` (guide). Valider via
  Rich Results Test après toute modif de données structurées.
- **Maillage interne** : guide local → gîtes pertinents (`relatedGites`),
  ancres riches en mots-clés (pas « cliquez ici »).
- **NAP unique** : `/config.json` → `src/lib/site.ts` (cohérence site / GBP / annuaires).
  Coordonnées GPS du domaine à affiner (cf. `docs/contenu-decisions.md`).
- **Hors-code** : Google Business Profile, Search Console + sitemap, avis
  post-séjour, annuaires (Gîtes de France, Atout France) — voir `seo/checklist.md`.

## 6. Vérifications avant livraison

`npm run build` (52 pages SSG, 0 warning) · `npm run lint` (0 erreur) ·
parité visuelle mobile/desktop vs `leshautsdebornave.fr` · Rich Results Test OK ·
hreflang réciproques · Lighthouse mobile (Perf/SEO/A11y/BP ≥ 95).
