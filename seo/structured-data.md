# Données structurées JSON-LD

Builders : `src/lib/jsonld.ts`. Injection : `<JsonLd>` (échappe `<`,
recommandation Next.js). Valider après toute modif :
[Rich Results Test](https://search.google.com/test/rich-results) +
[Schema Validator](https://validator.schema.org/).

## Schémas par page

| Page | Schémas |
|------|---------|
| Layout (toutes) | `Organization` (logo, sameAs, contactPoint) |
| Accueil `/` | `LodgingBusiness` (adresse, geo, téléphone, priceRange, amenityFeature, aggregateRating + reviews datés) + `FAQPage` |
| `/gites/[slug]` | `VacationRental` (image ≥ 8, lat/long, `containsPlace`→`Accommodation`: occupancy, numberOfBedrooms, floorSize, amenityFeature ; `Offer` prix EUR) + `FAQPage` + `BreadcrumbList` |
| `/domaine`, `/evenements`, `/bien-etre`, `/deshaies`, `/contact` | `BreadcrumbList` |
| `/rayons-de-soleil`, `/faq` | `FAQPage` + `BreadcrumbList` |
| `/avis` | `LodgingBusiness` (aggregateRating + `Review[]`) + `BreadcrumbList` |
| `/que-visiter` | `ItemList` + `BreadcrumbList` |
| `/que-visiter/[slug]` | `Article` + `BreadcrumbList` |

## Données critiques (source unique)

- NAP, `geo` (lat/long), `priceRange`, `aggregateRating` → `src/lib/site.ts`.
- ⚠️ `SITE.geo` est **approximatif** — remplacer par la position GPS réelle
  (impact direct sur `VacationRental.latitude/longitude` et le SEO local).
  Voir `docs/contenu-decisions.md`.
- `aggregateRating` à aligner sur les vraies données (Booking/Google).

## Règles

- Respecter les *Vacation Rental structured data policies* de Google (sinon
  action manuelle) : images réelles ≥ 8, données exactes, pas de prix trompeur.
- Lat/long ≥ 5 décimales recommandé.
- Reviews avec `datePublished` quand connu.
- Re-valider l'accueil + une page gîte + un article à chaque évolution du
  schéma ou des données.
