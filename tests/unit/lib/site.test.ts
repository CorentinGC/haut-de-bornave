/**
 * Utilitaires site.test.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { describe, it, expect } from "vitest";
import { isLocale, absoluteUrl, SITE, LOCALES, DEFAULT_LOCALE } from "@/lib/site";

describe("site", () => {
  it("valide les locales supportées", () => {
    expect(isLocale("fr")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(isLocale("")).toBe(false);
  });

  it("expose fr par défaut et 2 locales", () => {
    expect(DEFAULT_LOCALE).toBe("fr");
    expect(LOCALES).toEqual(["fr", "en"]);
  });

  it("construit des URLs absolues correctes par locale", () => {
    expect(absoluteUrl("fr")).toBe(`${SITE.url}/fr`);
    expect(absoluteUrl("en", "gites/gran-kaz")).toBe(
      `${SITE.url}/en/gites/gran-kaz`,
    );
    expect(absoluteUrl("fr", "/contact")).toBe(`${SITE.url}/fr/contact`);
  });

  it("a un NAP cohérent et complet", () => {
    expect(SITE.phone.e164).toMatch(/^\+\d+$/);
    expect(SITE.address.locality).toBe("Deshaies");
    expect(SITE.address.country).toBe("GP");
    expect(SITE.geo.lat).toBeTypeOf("number");
    expect(SITE.geo.lng).toBeTypeOf("number");
    expect(SITE.email).toMatch(/@/);
  });
});
