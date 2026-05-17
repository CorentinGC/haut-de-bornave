# Stratégie SEO

## Objectif

Être trouvé facilement sur **hébergement / location / Deshaies / Guadeloupe**
et capter le trafic « réservation directe » (vs Booking/Airbnb) grâce à un site
vitrine techniquement supérieur aux concurrents locaux.

## Diagnostic du marché

Concurrents directs analysés (villas/gîtes Deshaies & alentours) :

| Site | Forces | Faiblesses (= opportunité) |
|------|--------|----------------------------|
| villapalma.fr | title très optimisé, page loisirs | monolingue, **aucun schema**, pas de blog, mobile faible |
| lemorneauxfous.com | title ciblé, nav claire | monolingue, pas de schema, pas de blog |
| aujardindescolibris.com | bilingue, preuve sociale, USP éco | pas de vrai blog, images mal nommées, pas de schema |
| villas-grande-anse.com | **bilingue + blog + images optimisées** | la référence à dépasser |

**Conclusion** : aucun concurrent direct ne combine **JSON-LD complet +
bilingue FR/EN + blog local + Core Web Vitals**. C'est exactement ce que livre
ce site → quick win décisif sur le micro-marché Deshaies.

## Piliers de la stratégie (implémentés)

1. **Données structurées exhaustives** — `LodgingBusiness`, `VacationRental`
   par gîte, `FAQPage`, `BreadcrumbList`, `Organization`, `Article`.
2. **Bilingue FR/EN** — hreflang réciproques + x-default, contenu EN traduit
   (pas auto), schema localisé.
3. **Guide local `/que-visiter`** — captation longue traîne + AEO (citations
   moteurs IA via FAQ).
4. **Performance** — SSG + CDN, `next/image` (WebP/AVIF, anti-CLS), fonts
   self-host, JS minimal → Core Web Vitals (facteur de classement).
5. **Mobile-first** — concurrents faibles sur mobile ; bottom-nav app-style.

## USP à exploiter dans le contenu

« Entre **mer ET forêt**, sur les **hauteurs** de Deshaies » · gamme de 5 gîtes
(du couple aux 12 pers.) · privatisation/événementiel · accueil direct par
Serge (« réservation sans intermédiaire ») · proximité Death in Paradise /
Jardin Botanique / Grande Anse.

## Hors-code (à piloter par l'exploitant)

Google Business Profile optimisé (NAP = `src/lib/site.ts`), Search Console +
sitemap, sollicitation d'avis post-séjour, annuaires (Gîtes de France, Atout
France, OT Guadeloupe, lesilesdeguadeloupe.com). Détail : `checklist.md`.
