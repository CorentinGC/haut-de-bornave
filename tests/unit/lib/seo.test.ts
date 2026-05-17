/**
 * Utilitaires seo.test.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { describe, it, expect } from "vitest";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

describe("pageMetadata", () => {
  const seo = { title: "Titre test", description: "Description test" };

  it("pose canonical + hreflang réciproques (fr/en/x-default)", () => {
    const m = pageMetadata({ locale: "fr", path: "gites", seo });
    expect(m.alternates?.canonical).toBe(`${SITE.url}/fr/gites`);
    const langs = m.alternates?.languages as Record<string, string>;
    expect(langs.fr).toBe(`${SITE.url}/fr/gites`);
    expect(langs.en).toBe(`${SITE.url}/en/gites`);
    expect(langs["x-default"]).toBe(`${SITE.url}/fr/gites`);
  });

  it("génère Open Graph + Twitter avec image absolue", () => {
    const m = pageMetadata({ locale: "en", seo });
    expect(m.openGraph?.locale).toBe("en_US");
    const og = m.openGraph as { images: { url: string }[] };
    expect(og.images[0].url).toMatch(/^https?:\/\//);
    const tw = m.twitter as { card?: string } | null;
    expect(tw?.card).toBe("summary_large_image");
  });

  it("indexable par défaut", () => {
    const m = pageMetadata({ locale: "fr", seo });
    expect(m.robots).toMatchObject({ index: true, follow: true });
  });
});
