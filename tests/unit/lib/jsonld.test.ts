/**
 * Utilitaires jsonld.test.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { describe, it, expect } from "vitest";
import {
  organizationLd,
  lodgingBusinessLd,
  vacationRentalLd,
  faqPageLd,
  breadcrumbLd,
  articleLd,
} from "@/lib/jsonld";
import { getContent } from "@/content";

const c = getContent("fr");

describe("JSON-LD", () => {
  it("Organization valide", () => {
    const o = organizationLd() as Record<string, unknown>;
    expect(o["@type"]).toBe("Organization");
    expect(o.sameAs).toBeInstanceOf(Array);
  });

  it("LodgingBusiness : adresse, geo, rating, reviews", () => {
    const l = lodgingBusinessLd("fr", c) as Record<string, unknown>;
    expect(l["@type"]).toBe("LodgingBusiness");
    expect(l.address).toMatchObject({ addressLocality: "Deshaies" });
    expect(l.geo).toHaveProperty("latitude");
    expect(l.aggregateRating).toHaveProperty("ratingValue");
    expect((l.review as unknown[]).length).toBeGreaterThan(0);
  });

  it("VacationRental : occupancy, images >= 8, offer", () => {
    const g = c.gites[0];
    const imgs = Array.from({ length: 10 }, (_, i) => `/media/x-${i}.webp`);
    const v = vacationRentalLd("fr", g, imgs) as Record<string, any>;
    expect(v["@type"]).toBe("VacationRental");
    expect(v.image.length).toBeGreaterThanOrEqual(8);
    expect(v.containsPlace.occupancy.maxValue).toBeGreaterThan(0);
    expect(v.offers.priceCurrency).toBe("EUR");
  });

  it("FAQPage mappe questions/réponses", () => {
    const f = faqPageLd(c.globalFaq) as Record<string, any>;
    expect(f["@type"]).toBe("FAQPage");
    expect(f.mainEntity[0]["@type"]).toBe("Question");
    expect(f.mainEntity[0].acceptedAnswer.text.length).toBeGreaterThan(0);
  });

  it("BreadcrumbList numérote les positions", () => {
    const b = breadcrumbLd("fr", [
      { name: "A", path: "" },
      { name: "B", path: "gites" },
    ]) as Record<string, any>;
    expect(b.itemListElement[0].position).toBe(1);
    expect(b.itemListElement[1].position).toBe(2);
  });

  it("Article référence la bonne langue", () => {
    const a = articleLd("en", getContent("en").articles[0]) as Record<
      string,
      unknown
    >;
    expect(a["@type"]).toBe("Article");
    expect(a.inLanguage).toBe("en");
  });
});
