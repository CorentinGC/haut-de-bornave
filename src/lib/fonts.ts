/**
 * Utilitaires fonts.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { Fraunces, Inter } from "next/font/google";

/**
 * Polices de la charte .fr — Fraunces (titres, italique) + Inter (corps).
 * Self-hostées par next/font (zéro requête Google, zéro CLS). Exposées en
 * variables CSS consommées par src/styles/lhdb.css (--f-display / --f-body).
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  variable: "--font-fraunces",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
