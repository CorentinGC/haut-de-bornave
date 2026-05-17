# Architecture

## Vue d'ensemble

Site vitrine **statique** (SSG) bilingue, Next.js 16 App Router. Toutes les
pages de contenu sont prérendues au build (~62 pages = ~13 routes × 2 locales,
+ gîtes + 10 articles ; +2 pages par nouvel article). Seule la route
`/api/contact` est une fonction serverless.

## Flux de rendu

```
Requête /  ──▶ src/proxy.ts ──▶ redirige /fr (ou /en selon Accept-Language)
Requête /fr/x ──▶ app/[locale]/layout.tsx (valide locale, html lang, Header/
                  Footer/MobileBottomNav, Organization JSON-LD)
              ──▶ app/[locale]/x/page.tsx (RSC, force-static)
                  · generateMetadata → src/lib/seo.ts (title, canonical,
                    hreflang, OG)
                  · contenu via getContent(locale) (src/content)
                  · <JsonLd> via src/lib/jsonld.ts
```

`dynamicParams = false` + `generateStaticParams` (locales, slugs de gîtes,
slugs d'articles) ⇒ génération statique exhaustive, 404 hors paramètres connus.

## Couches

| Couche | Fichiers | Rôle |
|--------|----------|------|
| Données site | `src/lib/site.ts` | NAP, geo, réseaux, paiements (source unique) |
| Contenu | `src/content/*` | Textes FR/EN verbatim, typés (`types.ts`) |
| Articles | `src/content/articles/*.json` + `index.ts` | 1 JSON bilingue/article, loader typé (barrel) |
| Médias | `src/lib/media.ts` + `media-dimensions.json` ; `scripts/media.json` | Accès typé + dimensions (anti-CLS) ; manifeste de fetch unique |
| SEO | `src/lib/seo.ts`, `src/lib/jsonld.ts` | Metadata + JSON-LD réutilisables |
| Nav/i18n | `src/lib/nav.ts`, `src/proxy.ts` | Liens localisés, routing |
| UI | `src/components/*` | Composants (server + client minimal) |
| Design | `src/styles/lhdb.css` | Charte `.fr` portée (vérité visuelle) |

## Conventions composants

- **Server par défaut.** Client uniquement : `Header`, `MobileBottomNav`,
  `Carousel`, `ScrollReveal`, `Typewriter`, `ContactForm`.
- `ui.tsx` regroupe les primitives server (Btn, Section, SecHead, HeroSplit,
  PageHero, Cover/Pic, FeatureGrid, Testimonials, FaqList, CtaBlock…).
- Classes BEM = celles de `lhdb.css` (fidélité). Les classes additionnelles
  (cartes, formulaire, bottom-nav…) sont dans `globals.css`, section
  « Compléments app ».

## Design system

`globals.css` : `@import "tailwindcss"` → `@theme` (tokens repris des variables
`:root` du `.fr`) → `@import "../styles/lhdb.css"` (charte) → compléments app +
a11y (focus visible, `prefers-reduced-motion`). Tailwind sert aux utilitaires ;
le rendu fidèle vient de `lhdb.css`.

## Pourquoi i18n natif (et pas next-intl)

Next.js 16 est récent ; l'approche native documentée (`app/[locale]` +
`proxy.ts` + `getContent`) évite toute dépendance i18n, reste 100 % statique et
typée, et donne un contrôle total sur hreflang/canonical. Détails : `i18n.md`.
