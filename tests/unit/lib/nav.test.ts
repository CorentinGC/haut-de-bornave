import { describe, it, expect } from "vitest";
import { href, switchLocaleHref, mainNav } from "@/lib/nav";
import { getContent } from "@/content";

describe("nav", () => {
  it("préfixe les liens internes par la locale", () => {
    expect(href("fr")).toBe("/fr");
    expect(href("en", "gites")).toBe("/en/gites");
    expect(href("fr", "/que-visiter/abc")).toBe("/fr/que-visiter/abc");
  });

  it("bascule de locale en conservant le chemin", () => {
    expect(switchLocaleHref("en", "/gites/gran-kaz", "fr")).toBe(
      "/en/gites/gran-kaz",
    );
    expect(switchLocaleHref("fr", "", "en")).toBe("/fr");
  });

  it("traduit le slug d'article entre locales (anti-404 i18n)", () => {
    // fr → en : le slug localisé doit être traduit, pas recopié
    expect(
      switchLocaleHref("en", "/que-visiter/plus-belles-plages-deshaies", "fr"),
    ).toBe("/en/que-visiter/best-beaches-deshaies");
    // en → fr : sens inverse
    expect(
      switchLocaleHref("fr", "/que-visiter/best-beaches-deshaies", "en"),
    ).toBe("/fr/que-visiter/plus-belles-plages-deshaies");
    // slug inconnu : fallback sans casser
    expect(
      switchLocaleHref("en", "/que-visiter/inexistant", "fr"),
    ).toBe("/en/que-visiter/inexistant");
  });

  it("expose un menu principal cohérent (6 entrées, chemins valides)", () => {
    const items = mainNav(getContent("fr"));
    expect(items).toHaveLength(6);
    for (const it of items) {
      expect(it.label.length).toBeGreaterThan(0);
      expect(it.path).toMatch(/^[a-z-]+$/);
    }
    expect(items.map((i) => i.path)).toContain("que-visiter");
  });
});
