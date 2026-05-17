<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS — Les Hauts de Bornave

Guide opérationnel pour agents/contributeurs. Règles produit & sitemap : voir
**CLAUDE.md**.

## Stack

- **Next.js 16.2** App Router, **React 19**, **TypeScript strict**, React Compiler activé.
- **Tailwind v4** (`@theme` dans `src/app/globals.css`) + charte portée
  `src/styles/lhdb.css` (source de vérité visuelle).
- **i18n natif** (`src/proxy.ts` + segment `app/[locale]`), locales `fr` (défaut)
  et `en`. Pas de lib i18n.
- **Resend** pour le formulaire de contact (seule route serveur).
- Polices self-host via `next/font` (Fraunces + Inter).

## Commandes

| But | Commande |
|-----|----------|
| Dev | `npm run dev` (http://localhost:3000 → redirige vers `/fr`) |
| Build prod (52 pages SSG) | `npm run build` |
| Servir le build | `npm run start` |
| Lint (doit être 0 erreur) | `npm run lint` |
| Type-check rapide | `npx tsc --noEmit` |
| Tests unitaires (Vitest) | `npm run test` (watch : `npm run test:watch`) |
| Tests e2e (Playwright desktop+mobile) | `npm run test:e2e` |
| Screenshots review (desktop+mobile) | `npm run screenshots` |
| Tout vérifier (lint+unit+build) | `npm run verify` |
| (Re)télécharger les médias | `bash scripts/fetch-media.sh` (idempotent) |
| Régénérer le manifeste dimensions | voir `docs/medias.md` |

> Tests sous **`/tests`** (`tests/unit`, `tests/e2e`). Infos vendeur dans
> **`/config.json`**. Review visuelle = MCP `chrome-devtools` (`.mcp.json`).

## Variables d'environnement

| Variable | Rôle | Requis |
|----------|------|--------|
| `NEXT_PUBLIC_SITE_URL` | URL canonique (sitemap, hreflang, JSON-LD) | Prod (défaut `https://leshautsdebornave.fr`) |
| `RESEND_API_KEY` | Envoi email du formulaire | Prod (sinon log + `delivered:false`, UX OK) |
| `CONTACT_TO` | Destinataire des demandes (Serge) | Recommandé |
| `CONTACT_FROM` | Expéditeur vérifié Resend | Recommandé |

Gérer via `vercel env` (preview + production). Le site reste démontrable sans
`RESEND_API_KEY` (le formulaire renvoie `ok` sans envoyer — voir
`docs/contact-form.md`).

## Déploiement (Vercel)

- Build standard Next.js (pas d'`output: export` : route `/api/contact`).
- Pages prérendues statiques (CDN) + 1 fonction serverless `/api/contact`.
- Après déploiement : soumettre `sitemap.xml` à Google Search Console,
  valider le JSON-LD (Rich Results Test), créer/optimiser le Google Business
  Profile (voir `seo/checklist.md`).

## Définition de « terminé »

1. `npm run verify` ✅ (lint + unit Vitest + build : 52 pages `●` SSG,
   `ƒ` uniquement `/api/contact`, 0 warning).
2. `npm run test:e2e` ✅ (Playwright desktop + mobile, 0 échec).
3. **Review visuelle MCP chrome-devtools** ✅ : screenshots plein écran
   desktop + mobile de chaque page touchée, 0 bug visuel, 0 média manquant,
   hovers OK, parité vs `.fr`.
4. Nouvelle page → metadata + JSON-LD + i18n FR/EN + entrée sitemap + nav
   + tests (`/tests`).
5. Aucune chaîne en dur (contenu via `src/content`, vendeur via
   `/config.json`), aucun hotlink média.

## Conventions

- Server Components par défaut ; `"use client"` minimal.
- Pas de JS brut/lib ancienne ; interactions = composants React typés.
- `params` est une `Promise` (Next 16) → toujours `await params`.
- Commits conventionnels, atomiques.
