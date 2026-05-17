/**
 * Données de contenu (content.test).
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { describe, it, expect } from "vitest";
import { getContent, getGite, getArticle } from "@/content";
import { articleFiles, articlesFr, articlesEn } from "@/content/articles";
import dimsJson from "@/lib/media-dimensions.json";

const fr = getContent("fr");
const en = getContent("en");

const dims = dimsJson as unknown as Record<string, [number, number]>;
/** Préfixes des images libres de droits (crédit obligatoire en légende). */
const FREE_IMAGE_RE =
  /reserve-cousteau-malendure|pointe-malendure-ilets-pigeon|chutes-du-carbet|saut-de-l-acomat|foret-tropicale-parc-national|marche-creole-epices|marche-poisson-creole/;

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

describe("schéma des fichiers JSON d'articles (garde-fou)", () => {
  it("au moins 10 articles, `order` uniques et couverts par le barrel", () => {
    expect(articleFiles.length).toBeGreaterThanOrEqual(10);
    expect(articleFiles.length).toBe(fr.articles.length);
    const orders = articleFiles.map((f) => f.order);
    expect(new Set(orders).size, "orders dupliqués").toBe(orders.length);
    // Le barrel est trié par `order` croissant.
    expect([...orders]).toEqual([...orders].sort((a, b) => a - b));
  });

  it("cover + images de section présentes dans media-dimensions.json", () => {
    for (const f of articleFiles) {
      expect(dims[f.cover], `cover ${f.cover}`).toBeDefined();
      for (const loc of ["fr", "en"] as const) {
        for (const s of f[loc].sections) {
          if (s.image) {
            expect(
              dims[s.image.src],
              `${f.fr.slug}/${loc} image ${s.image.src}`,
            ).toBeDefined();
          }
        }
      }
    }
  });

  it("datePublished/dateModified au format ISO valide et cohérent", () => {
    for (const f of articleFiles) {
      expect(f.datePublished, f.fr.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(f.datePublished))).toBe(false);
      if (f.dateModified) {
        expect(f.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(
          Date.parse(f.dateModified) >= Date.parse(f.datePublished),
          `${f.fr.slug}: dateModified < datePublished`,
        ).toBe(true);
      }
    }
  });

  it("parité FR/EN par article (sections, faq, nombre d'images)", () => {
    for (const f of articleFiles) {
      expect(f.fr.sections.length, f.fr.slug).toBe(f.en.sections.length);
      expect(f.fr.faq.length, f.fr.slug).toBe(f.en.faq.length);
      const imgFr = f.fr.sections.filter((s) => s.image).length;
      const imgEn = f.en.sections.filter((s) => s.image).length;
      expect(imgFr, `${f.fr.slug}: nb images FR/EN`).toBe(imgEn);
      // Slugs localisés : distincts entre FR et EN.
      expect(f.fr.slug).not.toBe(f.en.slug);
    }
  });

  it("chaque article : ≥ 3 FAQ non vides, ≥ 1 image, alt géolocalisé", () => {
    for (const f of articleFiles) {
      for (const loc of ["fr", "en"] as const) {
        const L = f[loc];
        expect(L.faq.length, `${f.fr.slug}/${loc}`).toBeGreaterThanOrEqual(3);
        for (const q of L.faq) {
          expect(q.q.trim().length).toBeGreaterThan(0);
          expect(q.a.trim().length).toBeGreaterThan(0);
        }
        const imgs = L.sections.filter((s) => s.image);
        expect(imgs.length, `${f.fr.slug}/${loc} sans image`).toBeGreaterThan(0);
        for (const s of imgs) {
          expect(s.image!.alt).toMatch(
            /deshaies|guadeloupe|basse-terre|malendure/i,
          );
        }
      }
    }
  });

  it("images libres de droits : crédit obligatoire", () => {
    for (const f of articleFiles) {
      for (const loc of ["fr", "en"] as const) {
        for (const s of f[loc].sections) {
          if (s.image && FREE_IMAGE_RE.test(s.image.src)) {
            expect(
              s.image.credit && /CC|domaine public|public domain/i.test(
                s.image.credit,
              ),
              `${f.fr.slug}/${loc}: crédit manquant pour ${s.image.src}`,
            ).toBeTruthy();
          }
        }
      }
    }
  });

  it("slugs uniques au sein de chaque locale", () => {
    for (const list of [articlesFr, articlesEn]) {
      const slugs = list.map((a) => a.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});
