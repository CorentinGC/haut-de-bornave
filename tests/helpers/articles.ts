/**
 * Helper e2e : dérive les slugs d'articles « Que visiter » directement des
 * fichiers JSON (src/content/articles/*.json), pour que les specs couvrent
 * automatiquement tout nouvel article sans duplication de liste.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import fs from "node:fs";
import path from "node:path";

const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");

/** Slugs d'articles pour une locale, ordonnés par `order` croissant. */
export function articleSlugs(locale: "fr" | "en"): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) =>
      JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), "utf8")),
    )
    .sort((a, b) => a.order - b.order)
    .map((j) => j[locale].slug as string);
}

/** Routes d'articles (`que-visiter/<slug>`) pour une locale. */
export function articleRoutes(locale: "fr" | "en"): string[] {
  return articleSlugs(locale).map((s) => `que-visiter/${s}`);
}
