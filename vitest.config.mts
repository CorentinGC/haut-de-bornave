import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Vitest — tests unitaires (libs pures, intégrité du contenu, composants
 * client). Les Server Components async sont couverts par les tests e2e
 * Playwright (non supportés par Vitest, cf. docs Next.js 16).
 */
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.{test,spec}.{ts,tsx}"],
    css: false,
    alias: {
      // `server-only` n'a pas de sens hors runtime serveur Next.
      "server-only": new URL("./tests/helpers/empty.ts", import.meta.url)
        .pathname,
    },
  },
});
