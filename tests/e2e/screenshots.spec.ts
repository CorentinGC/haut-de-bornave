import { test } from "@playwright/test";

/**
 * Captures plein écran de chaque page (desktop & mobile selon le projet
 * Playwright) → tests/e2e/__screenshots__/<project>/<locale>__<route>.png.
 * Support de la review visuelle (npm run screenshots).
 */
const COMMON = [
  "",
  "domaine",
  "gites",
  "gites/gran-kaz",
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
const ARTICLE = {
  fr: "que-visiter/plus-belles-plages-deshaies",
  en: "que-visiter/best-beaches-deshaies",
} as const;

for (const locale of ["fr", "en"] as const) {
  for (const route of [...COMMON, ARTICLE[locale]]) {
    test(`screenshot ${locale}/${route}`, async ({ page }, info) => {
      await page.goto(`/${locale}/${route}`, { waitUntil: "load" });
      // Laisse jouer les animations reveal/Ken Burns.
      await page.waitForTimeout(900);
      const name = `${locale}__${route.replace(/\//g, "_") || "accueil"}.png`;
      await page.screenshot({
        path: `tests/e2e/__screenshots__/${info.project.name}/${name}`,
        fullPage: true,
      });
    });
  }
}
