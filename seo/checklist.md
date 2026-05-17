# Feuille de route SEO

## ✅ Déjà en place (dans le code)

- [x] Title + meta description uniques par page (FR/EN)
- [x] Canonical + hreflang `fr`/`en`/`x-default` réciproques
- [x] Open Graph + Twitter Card (image par page/gîte)
- [x] JSON-LD : Organization, LodgingBusiness, VacationRental×5, FAQPage,
      BreadcrumbList, Article, ItemList
- [x] `sitemap.xml` (FR+EN, alternates) + `robots.txt` + `manifest`
- [x] 1 `<h1>` par page, `alt` géolocalisés, noms de fichiers sémantiques
- [x] Images WebP/AVIF via `next/image` + dimensions (CLS≈0)
- [x] Fonts self-host (next/font), pages statiques SSG (CDN)
- [x] Guide local `/que-visiter` (6 articles FR+EN) + maillage interne
- [x] Bilingue FR/EN complet, mobile-first

## Phase 1 — Mise en ligne (semaine 1‑2)

- [ ] Renseigner `NEXT_PUBLIC_SITE_URL` (domaine final) + `RESEND_*`
- [ ] **Corriger `SITE.geo`** avec la position GPS réelle du domaine
- [ ] Aligner `SITE.rating` sur les vraies données (Booking/Google)
- [ ] Déployer (Vercel) → soumettre `sitemap.xml` à **Search Console**
- [ ] Valider toutes les pages clés au **Rich Results Test**
- [ ] Créer/optimiser le **Google Business Profile** (NAP = `src/lib/site.ts`,
      catégorie « Location de vacances », 8+ photos, description kw locale)
- [ ] Compléter les **mentions légales** réelles (cf. contenu-decisions.md)

## Phase 2 — Structurel (mois 1‑2)

- [ ] Audit Lighthouse/PageSpeed mobile (objectif Perf/SEO/A11y/BP ≥ 95,
      LCP < 2,5 s, INP < 200 ms, CLS < 0,1)
- [ ] Enrichir le guide local (nouveaux articles — backlog `blog-que-visiter.md`)
- [ ] Stratégie d'avis : sollicitation post‑séjour systématique + réponses
- [ ] Citations/annuaires : Gîtes de France, Atout France, OT Guadeloupe,
      lesilesdeguadeloupe.com (NAP strictement identique)

## Phase 3 — Expansion (mois 2‑3+)

- [ ] Articles saisonniers réguliers (2‑4 / trimestre) + FAQ par page (AEO)
- [ ] Backlinks locaux (offices de tourisme, blogs voyage Guadeloupe)
- [ ] Suivi positions (P1/P2/P3 de `keywords.md`) + « mention rate » IA
- [ ] Optionnel : 3ᵉ langue (DE) — marché non couvert par les concurrents

## À étudier en continu

Requêtes réelles (Search Console) → réordonner `keywords.md` · pages à créer
selon la demande · performances images/CWV · couverture d'indexation.
