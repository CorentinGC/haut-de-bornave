# Guide local « Que visiter » (blog SEO)

`/que-visiter` est un **hub éditorial** (levier SEO longue traîne / top-of-funnel)
maillé en interne vers les gîtes. Chaque article cible des requêtes
informationnelles (« que faire à Deshaies », « plus belles plages », « comment
venir », « quand partir »…) — cf. `seo/keywords.md` (P3) et `seo/local-poi.md`.

> **Raccourci** : invoquer le skill **`/que-visiter-article`**
> (`.claude/skills/que-visiter-article/`) pour publier un nouvel article en
> suivant la procédure (1 JSON FR+EN, images, FAQ, SEO, tests+review).
> À relancer ≈ 1×/mois.

## Où vivent les articles

- **Un fichier JSON bilingue par article** dans `src/content/articles/`
  (`<slug>.json`, forme `ArticleFile` — `src/content/types.ts`). FR et EN sont
  dans le même fichier : plus de couplage fragile « même index ».
- `src/content/articles/index.ts` — **loader typé** (barrel explicite) : importe
  chaque JSON, trie par `order`, et dérive `articlesFr` / `articlesEn`.
- Rendus par `app/[locale]/que-visiter/page.tsx` (liste) et
  `que-visiter/[slug]/page.tsx` (article, `generateStaticParams` par locale).
- Le contenu JSON n'étant pas typé à l'édition, le **garde-fou de schéma** est
  `tests/unit/content/content.test.ts` (parité FR/EN, médias au manifeste,
  dates ISO, FAQ, crédits…). Le faire passer après toute modification.

## Ajouter un article

1. Créer `src/content/articles/<slug>.json` :

```jsonc
{
  "order": 11,                                  // ordre d'affichage (unique)
  "cover": "/media/lieux/….webp",               // doit exister + manifeste
  "datePublished": "2026-05-17",                // ISO (JSON-LD)
  "dateModified": "2026-06-01",                 // optionnel si révisé
  "relatedGites": ["gran-kaz", "ti-kaz-la"],    // maillage interne
  "fr": {
    "slug": "randonnee-cascade-acomat",          // kebab-case, LOCALISÉ
    "title": "…",
    "excerpt": "…",                              // 1 phrase (carte + meta)
    "category": "Activités",                     // localisé
    "readingTime": "5 min",
    "distance": "≈ 20 min en voiture",           // optionnel (SEO local)
    "sections": [
      { "heading": "…", "paragraphs": ["…"],
        "image": { "src": "/media/lieux/….webp", "alt": "… Deshaies, Guadeloupe",
                   "caption": "…", "credit": "" } }
    ],
    "faq": [{ "q": "…", "a": "…" }],             // ≥ 3 Q/R factuelles
    "seo": { "title": "…", "description": "… (≤ 165 car.)" }
  },
  "en": { /* mêmes clés, traduction pro (slug EN différent) */ }
}
```

2. L'enregistrer dans `src/content/articles/index.ts` (import + tableau
   `FILES`).
3. **Images** : voir `docs/medias.md`. Priorité aux photos du site source
   `leshautsdebornave.com` ; à défaut, images **libres de droits** (Wikimedia
   CC BY/BY-SA, Unsplash) avec `credit` **obligatoire** rempli (affiché en
   légende). `cover` + chaque `image.src` doivent être dans
   `src/lib/media-dimensions.json`.
4. `npm run verify` puis `npm run test:e2e` — l'article est automatiquement
   prérendu (FR+EN), ajouté au `sitemap.xml`, et reçoit son JSON-LD `Article`
   (avec `datePublished`/`author`) + `FAQPage` + `BreadcrumbList`.

## Bonnes pratiques SEO d'un article

- `title` unique géolocalisé, `description` ≤ 165 car. avec bénéfice.
- 1 idée par section, paragraphes courts, **distances/temps réels** depuis le
  domaine, **FAQ** ciblant les questions « People Also Ask ».
- Toujours `relatedGites` pertinents ; FR fidèle aux faits, EN = traduction pro.
- **Ne jamais inventer** (horaires, prix) : rester général, distances de
  `seo/local-poi.md`, incertitudes → `docs/contenu-decisions.md`.

## Articles publiés (10) & backlog

Publiés : plages de Deshaies · Jardin Botanique · Réserve Cousteau ·
Pointe-Noire/Maison du Cacao · accès aéroport · quand venir · **Plage de la
Perle** · **bourg & port de Deshaies (Death in Paradise)** · **randonnées &
cascades de Basse-Terre** · **marché créole & gastronomie**.

Backlog restant : snorkeling en famille · itinéraire 7 jours côte sous le vent
· Malendure & bains chauds de Bouillante · Zoo des Mamelles (article dédié).
(Voir `seo/checklist.md` phase 3.)
