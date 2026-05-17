/**
 * Utilitaires nav.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Locale } from "./site";
import type { SiteContent } from "@/content/types";
import { articlesFr } from "@/content/articles.fr";
import { articlesEn } from "@/content/articles.en";

/** Lien interne préfixé par la locale. `path` sans slash initial. */
export function href(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return `/${locale}${clean ? `/${clean}` : ""}`;
}

/** Correspondance des slugs d'articles entre locales (slugs localisés SEO).
 *  fr[i] ↔ en[i] (même ordre dans articles.fr.ts / articles.en.ts). */
const ARTICLE_SLUG: Record<Locale, string[]> = {
  fr: articlesFr.map((a) => a.slug),
  en: articlesEn.map((a) => a.slug),
};

/**
 * Bascule de locale en conservant la PAGE courante. Traduit le slug
 * d'article `/que-visiter/<slug>` (slugs localisés ≠ entre fr/en) pour
 * éviter un 404 lors du changement de langue. `from` = locale courante.
 */
export function switchLocaleHref(
  target: Locale,
  pathNoLocale: string,
  from: Locale,
): string {
  const m = pathNoLocale.match(/^\/que-visiter\/([^/]+)\/?$/);
  if (m) {
    const i = ARTICLE_SLUG[from].indexOf(m[1]);
    if (i !== -1 && ARTICLE_SLUG[target][i]) {
      return href(target, `que-visiter/${ARTICLE_SLUG[target][i]}`);
    }
  }
  return href(target, pathNoLocale);
}

export interface NavItem {
  path: string;
  label: string;
  sub: string;
}

/** Items du menu principal (libellés localisés + sous-titres mobile .fr). */
export function mainNav(c: SiteContent): NavItem[] {
  return [
    { path: "domaine", label: c.nav.domaine, sub: c.home.domaineEyebrow },
    { path: "gites", label: c.nav.gites, sub: c.gitesPage.eyebrow },
    { path: "rayons-de-soleil", label: c.nav.rayons, sub: c.rayons.eyebrow },
    { path: "evenements", label: c.nav.evenements, sub: c.evenements.eyebrow },
    { path: "que-visiter", label: c.nav.queVisiter, sub: c.queVisiter.eyebrow },
    { path: "deshaies", label: c.nav.deshaies, sub: c.deshaies.eyebrow },
  ];
}
