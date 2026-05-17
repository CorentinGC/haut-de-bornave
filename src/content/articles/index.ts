/**
 * Loader des articles du guide local « Que visiter ». Chaque article est un
 * fichier JSON bilingue (src/content/articles/<slug>.json, forme `ArticleFile`)
 * importé explicitement ci-dessous (barrel typé — pas de glob, compatible SSG
 * strict). Le couplage FR/EN est intrinsèque au fichier : on en dérive deux
 * tableaux `Article` (un par locale), triés par `order`, consommés par
 * src/content/index.ts, src/lib/nav.ts, src/app/sitemap.ts et la page
 * que-visiter/[slug]. Garde-fou de schéma (parité FR/EN, médias au manifeste,
 * dates ISO…) : tests/unit/content/content.test.ts.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Article, ArticleFile } from "../types";

import plusBellesPlages from "./plus-belles-plages.json";
import jardinBotanique from "./jardin-botanique.json";
import reserveCousteau from "./reserve-cousteau.json";
import pointeNoire from "./pointe-noire.json";
import commentVenirAeroport from "./comment-venir-aeroport.json";
import quandVenir from "./quand-venir.json";

/**
 * Tous les fichiers d'articles. Le cast `as unknown as ArticleFile[]` est
 * nécessaire car l'inférence JSON élargit les unions (`relatedGites` devient
 * `string[]`) ; la validité réelle est vérifiée par le test d'intégrité.
 */
const FILES = [
  plusBellesPlages,
  jardinBotanique,
  reserveCousteau,
  pointeNoire,
  commentVenirAeroport,
  quandVenir,
] as unknown as ArticleFile[];

/** Articles ordonnés par `order` croissant (liste + sitemap + parité FR/EN). */
export const articleFiles: ArticleFile[] = [...FILES].sort(
  (a, b) => a.order - b.order,
);

/** Dérive un `Article` (forme consommée par les pages) pour une locale. */
function toArticle(f: ArticleFile, locale: "fr" | "en"): Article {
  const l = f[locale];
  return {
    slug: l.slug,
    cover: f.cover,
    category: l.category,
    title: l.title,
    excerpt: l.excerpt,
    readingTime: l.readingTime,
    distance: l.distance,
    datePublished: f.datePublished,
    dateModified: f.dateModified,
    sections: l.sections,
    faq: l.faq,
    relatedGites: f.relatedGites,
    seo: l.seo,
  };
}

/** Articles FR (ordre = `order`). */
export const articlesFr: Article[] = articleFiles.map((f) =>
  toArticle(f, "fr"),
);

/** Articles EN (même ordre que `articlesFr` → couplage fr[i] ↔ en[i]). */
export const articlesEn: Article[] = articleFiles.map((f) =>
  toArticle(f, "en"),
);
