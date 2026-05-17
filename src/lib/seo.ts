/**
 * Utilitaires seo.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Metadata } from "next";
import { SITE, absoluteUrl, type Locale } from "./site";
import type { SeoMeta } from "@/content/types";

/** Image Open Graph par défaut (coucher de soleil sur Grande Anse, paysage). */
export const OG_IMAGE = {
  url: "/media/lieux/coucher-de-soleil-sur-grande-anse-deshaies-en-guadeloupe-4-2.webp",
  width: 1200,
  height: 630,
};

/**
 * Construit les Metadata Next.js d'une page : title/description, canonical,
 * alternates hreflang réciproques (fr / en / x-default), Open Graph + Twitter.
 * Utilisé par tous les `generateMetadata` (cohérence SEO — voir seo/checklist.md).
 */
export function pageMetadata(opts: {
  locale: Locale;
  /** Chemin SANS locale ni slash initial, ex. "gites/gran-kaz". "" = accueil. */
  path?: string;
  seo: SeoMeta;
  /** Image OG spécifique (chemin /media/...). */
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const { locale, path = "", seo, image, type = "website" } = opts;
  const canonical = absoluteUrl(locale, path);
  const ogImage = `${SITE.url}${image ?? OG_IMAGE.url}`;

  return {
    title: seo.title,
    description: seo.description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical,
      languages: {
        fr: absoluteUrl("fr", path),
        en: absoluteUrl("en", path),
        "x-default": absoluteUrl("fr", path),
      },
    },
    openGraph: {
      type,
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: SITE.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: ogImage,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}
