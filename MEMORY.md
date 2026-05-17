# MEMORY — Les Hauts de Bornave

> Mémoire projet committable. Lue en début de session. État, conventions et
> **demandes permanentes du client** à ne jamais perdre.

## Projet

Site vitrine SEO-first, mobile-first, bilingue FR/EN — 5 gîtes à Deshaies
(Guadeloupe). Next.js 16 (App Router, RSC, TS strict, React 19, Tailwind v4),
déployé sur Vercel. Design repris de `leshautsdebornave.fr`, contenu de `.com`.

## Stack & architecture

- Next 16 `app/[locale]` (fr défaut / en), i18n natif (`src/proxy.ts`), 52 pages SSG.
- Charte `.fr` portée : `src/styles/lhdb.css` = **vérité visuelle** (+ tokens Tailwind `@theme`).
- Contenu typé `src/content/{fr,en}.ts` + `articles.{fr,en}.ts` (verbatim `.com`).
- Infos vendeur : **`/config.json`** (racine, source unique) → lu par `src/lib/site.ts`.
- Médias auto-hébergés `public/media` (108) + `src/lib/media-dimensions.json` (anti-CLS).
- SEO : `src/lib/seo.ts` (metadata/hreflang) + `src/lib/jsonld.ts` (JSON-LD).
- Nav mobile = **bottom nav app-style** (`MobileBottomNav`), jamais de burger.
- Interactions = **React moderne** (Carousel, Typewriter, ScrollReveal, ContactForm) — aucun JS brut/lib ancienne.
- Tests : **tout sous `/tests`** — `tests/unit/{lib,content,components}` (Vitest), `tests/e2e` (Playwright desktop+mobile Chromium), `tests/setup.ts`, `tests/helpers`.
- MCP projet : `.mcp.json` (chrome-devtools + context7).

## Demandes permanentes du client (RÈGLES)

1. **À chaque modification : tester ET reviewer.** Logique = `npm run test`
   (unit) + `npm run test:e2e` (e2e). Visuel = review via **chrome MCP**
   (screenshots full-page **desktop ET mobile**, toutes pages) : aucun bug
   visuel, aucun média manquant, hovers vérifiés. Cf. CLAUDE.md §Workflow.
2. **Mobile = bottom navbar** (4 liens + « Plus » → panel slide-in). Pas de burger.
3. **Pas de JS brut / lib ancienne** — conversion React moderne complète.
4. **Infos vendeur uniquement dans `/config.json`** (jamais en dur ailleurs).
5. **Tous les tests sous `/tests`** (sous-dossiers). « Tout à sa place ».
6. **Optimisation images** : chargement rapide en gardant la qualité (mandat de l'agent UI/UX).
7. **Finition ultra-pro** : review design page par page par l'agent UI/UX expert
   (`.claude/agents/ui-ux-reviewer`), niveau pro +10 ans.
8. Déploiement : push sur `git@github.com:CorentinGC/haut-de-bornave.git` (Vercel ensuite).

## Vérification « terminé »

`npm run verify` (lint + unit + build) ✅ · `npm run test:e2e` ✅ ·
review visuelle chrome MCP desktop+mobile ✅ · 52 pages SSG, 0 warning.

## À fournir par l'exploitant (cf. docs/contenu-decisions.md)

GPS exact du domaine (`config.json` geo) · mentions légales réelles · email pro +
domaine Resend · note/volume d'avis officiels (`config.json` rating).
