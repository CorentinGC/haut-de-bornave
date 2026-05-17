/**
 * Métadonnées SEO (App Router).
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { MetadataRoute } from "next";
import { LOCALES, absoluteUrl } from "@/lib/site";
import { articlesFr } from "@/content/articles";

/** Sitemap FR + EN avec alternates hreflang (réciproques + x-default). */
export default function sitemap(): MetadataRoute.Sitemap {
  const giteSlugs = [
    "gran-kaz",
    "kaz-an-nou",
    "ti-kaz-la",
    "rayon-jaune",
    "rayon-bleu",
  ];

  const staticPaths = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "domaine", priority: 0.9, freq: "monthly" as const },
    { path: "gites", priority: 0.9, freq: "monthly" as const },
    { path: "rayons-de-soleil", priority: 0.8, freq: "monthly" as const },
    { path: "evenements", priority: 0.8, freq: "monthly" as const },
    { path: "bien-etre", priority: 0.6, freq: "yearly" as const },
    { path: "que-visiter", priority: 0.8, freq: "weekly" as const },
    { path: "deshaies", priority: 0.7, freq: "monthly" as const },
    { path: "avis", priority: 0.6, freq: "monthly" as const },
    { path: "faq", priority: 0.6, freq: "monthly" as const },
    { path: "contact", priority: 0.7, freq: "yearly" as const },
  ];

  const allPaths = [
    ...staticPaths.map((p) => ({ ...p })),
    ...giteSlugs.map((s) => ({
      path: `gites/${s}`,
      priority: 0.85,
      freq: "monthly" as const,
    })),
    ...articlesFr.map((a) => ({
      path: `que-visiter/${a.slug}`,
      priority: 0.7,
      freq: "monthly" as const,
    })),
  ];

  const now = new Date();

  return allPaths.flatMap((p) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(locale, p.path),
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
      alternates: {
        languages: {
          fr: absoluteUrl("fr", p.path),
          en: absoluteUrl("en", p.path),
          "x-default": absoluteUrl("fr", p.path),
        },
      },
    })),
  );
}
