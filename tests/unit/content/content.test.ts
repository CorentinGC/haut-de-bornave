import { describe, it, expect } from "vitest";
import { getContent, getGite, getArticle } from "@/content";

const fr = getContent("fr");
const en = getContent("en");

describe("intégrité du contenu FR/EN", () => {
  it("mêmes 5 gîtes (slugs identiques entre locales)", () => {
    const frSlugs = fr.gites.map((g) => g.slug).sort();
    const enSlugs = en.gites.map((g) => g.slug).sort();
    expect(frSlugs).toEqual(enSlugs);
    expect(frSlugs).toHaveLength(5);
  });

  it("chaque gîte a SEO, tarif, équipements, FAQ non vides", () => {
    for (const loc of [fr, en]) {
      for (const g of loc.gites) {
        expect(g.seo.title.length, g.slug).toBeGreaterThan(10);
        expect(g.seo.description.length).toBeGreaterThan(50);
        expect(g.pricePerNight).toBeGreaterThan(0);
        expect(g.equipment.length).toBeGreaterThan(0);
        expect(g.faq.length).toBeGreaterThan(0);
      }
    }
  });

  it("même nombre d'articles guide local FR/EN, slugs distincts par locale", () => {
    expect(fr.articles.length).toBe(en.articles.length);
    expect(fr.articles.length).toBeGreaterThanOrEqual(6);
    for (const a of [...fr.articles, ...en.articles]) {
      expect(a.cover).toMatch(/^\/media\//);
      expect(a.seo.description.length).toBeGreaterThan(50);
      expect(a.relatedGites.length).toBeGreaterThan(0);
      for (const slug of a.relatedGites) {
        expect(fr.gites.some((g) => g.slug === slug)).toBe(true);
      }
    }
  });

  it("descriptions SEO ≤ 165 caractères (limite SERP)", () => {
    const metas = [
      fr.home.seo,
      en.home.seo,
      ...fr.gites.map((g) => g.seo),
      ...fr.articles.map((a) => a.seo),
    ];
    for (const m of metas) {
      expect(m.description.length, m.title).toBeLessThanOrEqual(165);
    }
  });

  it("getGite / getArticle retournent undefined si inconnu", () => {
    expect(getGite("fr", "gran-kaz")?.name).toBe("Gran Kaz");
    expect(getGite("fr", "inexistant")).toBeUndefined();
    expect(getArticle("fr", "inexistant")).toBeUndefined();
  });

  it("FAQ globale et avis présents (FR & EN)", () => {
    for (const loc of [fr, en]) {
      expect(loc.globalFaq.length).toBeGreaterThanOrEqual(5);
      expect(loc.reviews.length).toBeGreaterThanOrEqual(3);
    }
  });
});
