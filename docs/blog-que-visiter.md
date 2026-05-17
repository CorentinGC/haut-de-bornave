# Guide local « Que visiter » (blog SEO)

`/que-visiter` est un **hub éditorial** (levier SEO longue traîne / top-of-funnel)
maillé en interne vers les gîtes. Chaque article cible des requêtes
informationnelles (« que faire à Deshaies », « plus belles plages », « comment
venir », « quand partir »…) — cf. `seo/keywords.md` (P3) et `seo/local-poi.md`.

> **Raccourci** : invoquer le skill **`/que-visiter-article`**
> (`.claude/skills/que-visiter-article/`) pour publier un nouvel article en
> suivant la procédure (FR+EN, SEO, tests+review). À relancer ≈ 1×/mois.

## Où vivent les articles

- `src/content/articles.fr.ts` et `src/content/articles.en.ts` — tableau
  d'objets typés `Article` (`src/content/types.ts`).
- Rendus par `app/[locale]/que-visiter/page.tsx` (liste) et
  `que-visiter/[slug]/page.tsx` (article, `generateStaticParams` par locale).

## Ajouter un article

1. Ajouter un objet `Article` dans **`articles.fr.ts` ET `articles.en.ts`** :

```ts
{
  slug: "randonnee-cascade-acomat",          // kebab-case, peut différer FR/EN
  cover: "/media/lieux/....webp",             // doit exister + dans le manifeste
  category: "Activités",
  title: "…",
  excerpt: "…",                                // 1 phrase (carte + meta)
  readingTime: "3 min",
  distance: "≈ 20 min en voiture",             // optionnel (SEO local)
  sections: [{ heading?: "…", paragraphs: ["…","…"] }],
  relatedGites: ["gran-kaz","ti-kaz-la"],      // maillage interne
  seo: { title: "… | Bornave", description: "… (140-160 car.)" },
}
```

2. Vérifier que `cover` est présent dans `public/media/` et dans
   `media-dimensions.json` (sinon : `docs/medias.md`).
3. `npm run build` — l'article est automatiquement prérendu (FR+EN), ajouté
   au `sitemap.xml` (les articles FR alimentent la liste sitemap) et reçoit
   son JSON-LD `Article` + `BreadcrumbList`.

## Bonnes pratiques SEO d'un article

- `title` unique géolocalisé, `description` 140–160 car. avec bénéfice.
- 1 idée par section, paragraphes courts, **distances/temps réels** depuis le
  domaine (Google associe le domaine à l'écosystème touristique).
- Toujours `relatedGites` pertinents (ancre vers le bon hébergement).
- FR verbatim/fidèle aux faits ; EN = traduction pro (pas auto).
- Pas de contenu dupliqué entre articles ; viser l'intention de recherche.

## Idées d'articles à fort potentiel (backlog)

Plage de la Perle en détail · Bourg & port de Deshaies (« Death in Paradise »)
· Snorkeling famille · Randonnées Basse-Terre · Marché créole & gastronomie ·
Itinéraire 7 jours côte sous le vent. (Voir `seo/checklist.md` phase 3.)
