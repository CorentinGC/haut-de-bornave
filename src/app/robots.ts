/**
 * Métadonnées SEO (App Router).
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/fr/mentions-legales", "/en/mentions-legales"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
