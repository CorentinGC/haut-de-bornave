import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright — tests e2e (logique : routing, SEO, i18n, nav, formulaire,
 * sitemap) + captures plein écran desktop & mobile (review visuelle).
 * Le serveur de prod est build puis démarré automatiquement.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    // Pixel 5 = moteur Chromium (mobile) — pas de WebKit à installer.
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
