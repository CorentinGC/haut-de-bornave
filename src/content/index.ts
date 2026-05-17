/**
 * Données de contenu (index).
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import "server-only";
import type { Locale } from "@/lib/site";
import type { Article, GiteContent, SiteContent } from "./types";
import { fr } from "./fr";
import { en } from "./en";
import { articlesFr, articlesEn } from "./articles";

const CONTENT: Record<Locale, SiteContent> = {
  fr: { ...fr, articles: articlesFr },
  en: { ...en, articles: articlesEn },
};

/** Contenu complet du site pour une locale (server-only, tree-shakeable). */
export function getContent(locale: Locale): SiteContent {
  return CONTENT[locale];
}

export function getGite(
  locale: Locale,
  slug: string,
): GiteContent | undefined {
  return CONTENT[locale].gites.find((g) => g.slug === slug);
}

export function getArticle(
  locale: Locale,
  slug: string,
): Article | undefined {
  return CONTENT[locale].articles.find((a) => a.slug === slug);
}

export type { Article, GiteContent, SiteContent };
