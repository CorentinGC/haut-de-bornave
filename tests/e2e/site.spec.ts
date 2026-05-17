/**
 * Tests — site.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { test, expect, type Page } from "@playwright/test";
import { articleRoutes } from "../helpers/articles";

/** Routes communes aux deux locales (slugs identiques). */
const COMMON = [
  "",
  "domaine",
  "gites",
  "gites/gran-kaz",
  "gites/kaz-an-nou",
  "gites/ti-kaz-la",
  "gites/rayon-jaune",
  "gites/rayon-bleu",
  "rayons-de-soleil",
  "evenements",
  "bien-etre",
  "que-visiter",
  "deshaies",
  "avis",
  "faq",
  "contact",
  "mentions-legales",
];

/** Tous les articles « Que visiter » (slugs localisés, dérivés des JSON). */
const routesFor = (locale: "fr" | "en") => [
  ...COMMON,
  ...articleRoutes(locale),
];

/** Vrai pour une page article (que-visiter/<slug>), pas la liste. */
const isArticle = (route: string) =>
  route.startsWith("que-visiter/") && route !== "que-visiter";

/** Collecte erreurs console + médias/images en échec pendant la navigation. */
function watch(page: Page) {
  const errors: string[] = [];
  const brokenMedia: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("response", (r) => {
    const u = r.url();
    if ((u.includes("/media/") || u.includes("/_next/image")) && r.status() >= 400) {
      brokenMedia.push(`${r.status()} ${u}`);
    }
  });
  return { errors, brokenMedia };
}

test("la racine redirige vers une locale (détection Accept-Language)", async ({
  page,
}) => {
  const res = await page.goto("/");
  expect(res?.status()).toBeLessThan(400);
  expect(page.url()).toMatch(/\/(fr|en)(\/|$)/);
});

for (const locale of ["fr", "en"] as const) {
  for (const route of routesFor(locale)) {
    test(`/${locale}/${route} — rendu, SEO, médias, console`, async ({ page }) => {
      const { errors, brokenMedia } = watch(page);
      const resp = await page.goto(`/${locale}/${route}`, {
        waitUntil: "load",
      });
      expect(resp?.status(), "HTTP OK").toBeLessThan(400);

      // Exactement un <h1>
      await expect(page.locator("h1")).toHaveCount(1);

      // Title + meta description non vides
      await expect(page).toHaveTitle(/.+/);
      const desc = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(desc && desc.length).toBeGreaterThan(30);

      // Canonical + hreflang réciproques
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(
        page.locator('link[rel="alternate"][hreflang="fr"]'),
      ).toHaveCount(1);
      await expect(
        page.locator('link[rel="alternate"][hreflang="en"]'),
      ).toHaveCount(1);
      await expect(
        page.locator('link[rel="alternate"][hreflang="x-default"]'),
      ).toHaveCount(1);

      // <html lang> correct
      await expect(page.locator("html")).toHaveAttribute("lang", locale);

      // JSON-LD présent et valide
      const ld = await page
        .locator('script[type="application/ld+json"]')
        .first()
        .textContent();
      expect(() => JSON.parse(ld!)).not.toThrow();

      // Page article : ≥ 1 image dans le corps + bloc FAQ rendu
      if (isArticle(route)) {
        expect(
          await page.locator(".article-figure img").count(),
          "image de corps d'article",
        ).toBeGreaterThan(0);
        expect(
          await page.locator(".faq-item").count(),
          "bloc FAQ article",
        ).toBeGreaterThanOrEqual(3);
      }

      // Aucune image cassée, aucune erreur console
      expect(brokenMedia, "médias manquants").toEqual([]);
      expect(errors, "erreurs console").toEqual([]);
    });
  }
}

test("navigation : desktop vs bottom-nav mobile", async ({ page }, info) => {
  await page.goto("/fr");
  if (info.project.name === "mobile") {
    await expect(page.locator(".mobile-nav")).toBeVisible();
    await page.locator(".mobile-nav__more").click();
    await expect(page.locator(".mobile-nav-panel.is-open")).toBeVisible();
    await expect(page.locator(".nav__links")).toBeHidden();
  } else {
    await expect(page.locator(".nav__links")).toBeVisible();
    await expect(page.locator(".mobile-nav")).toBeHidden();
  }
});

test("bascule de langue FR → EN en conservant la page", async ({
  page,
}, info) => {
  await page.goto("/fr/gites");
  if (info.project.name === "mobile") {
    await page.locator(".mobile-nav__more").click();
    await page.locator('.mobile-nav-panel a[hreflang="en"]').click();
  } else {
    await page.locator('.nav__lang[hreflang="en"]').click();
  }
  await expect(page).toHaveURL(/\/en\/gites/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("formulaire de contact : validation puis succès", async ({ page }) => {
  await page.goto("/fr/contact");
  await page.getByRole("button", { name: "Envoyer" }).click();
  await expect(page.getByText("Ce champ est obligatoire.")).toBeVisible();

  await page.getByLabel(/Nom/).fill("Test E2E");
  await page.getByLabel(/Email/).fill("test@example.com");
  await page.getByLabel(/Message/).fill("Demande de séjour test e2e.");
  await page.getByRole("button", { name: "Envoyer" }).click();
  await expect(page.locator(".form-success")).toBeVisible({ timeout: 10_000 });
});

test("sitemap.xml et robots.txt", async ({ request }) => {
  const sm = await request.get("/sitemap.xml");
  expect(sm.status()).toBe(200);
  const xml = await sm.text();
  expect(xml).toContain("/fr/gites/gran-kaz");
  expect(xml).toContain("/en/que-visiter");
  expect(xml).toContain("hreflang");

  const rb = await request.get("/robots.txt");
  expect(rb.status()).toBe(200);
  expect(await rb.text()).toContain("Sitemap:");
});
