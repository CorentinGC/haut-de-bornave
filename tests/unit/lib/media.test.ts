/**
 * Utilitaires media.test.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { describe, it, expect } from "vitest";
import { media, gitePhotos, galeriePhotos, KEY_MEDIA } from "@/lib/media";

describe("media", () => {
  it("résout dimensions réelles depuis le manifeste (anti-CLS)", () => {
    const m = media(KEY_MEDIA.coucherDeshaies, "alt");
    expect(m.width).toBeGreaterThan(0);
    expect(m.height).toBeGreaterThan(0);
    expect(m.alt).toBe("alt");
  });

  it("tous les KEY_MEDIA existent dans le manifeste", () => {
    for (const [key, src] of Object.entries(KEY_MEDIA)) {
      if (src.endsWith(".svg")) continue; // SVG non raster, non dimensionné
      const m = media(src, key);
      expect(m.width, `${key} dimensionné`).toBeGreaterThan(0);
    }
  });

  it("gitePhotos triés, alt géolocalisé, >= 6 photos par gîte", () => {
    const p = gitePhotos("gran-kaz", "Gran Kaz");
    expect(p.length).toBeGreaterThanOrEqual(6);
    expect(p[0].alt).toContain("Deshaies");
    expect(p[0].src < p[1].src || p.length === 1).toBe(true);
  });

  it("galerie = 36 photos", () => {
    expect(galeriePhotos("Domaine")).toHaveLength(36);
  });
});
