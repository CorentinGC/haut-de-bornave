/**
 * Constantes globales du site — NAP (Name / Address / Phone), coordonnées,
 * réseaux, paiements. Source unique de vérité (cohérence SEO local + JSON-LD).
 * Données issues de leshautsdebornave.com (voir docs/contenu-decisions.md).
 */

export const SITE = {
  name: "Les Hauts de Bornave",
  legalName: "Les Hauts de Bornave",
  shortName: "Bornave",
  /** URL canonique de production — surchargée par NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://leshautsdebornave.fr",
  host: { name: "Serge", alias: "Sergio" },
  phone: { display: "+590 690 00 37 30", e164: "+590690003730" },
  whatsapp: "https://wa.me/590690003730",
  email: "contact@leshautsdebornave.fr",
  address: {
    street: "Chemin Bornave, Quartier Ferry",
    postalCode: "97126",
    locality: "Deshaies",
    region: "Guadeloupe",
    country: "GP",
  },
  /** Coordonnées approximatives du quartier Ferry/Leroux, Deshaies — à
   *  affiner avec la position GPS exacte du domaine (voir docs). */
  geo: { lat: 16.298, lng: -61.787 },
  social: {
    facebook: "https://www.facebook.com/bornave971/",
    instagram: "https://www.instagram.com/les_hauts_de_bornave",
  },
  partner: { name: "ECOUTE TOI", url: "https://www.ecoute-toi.fr/" },
  payments: [
    "Revolut Business",
    "PayPal Business",
    "Cryptomonnaies · RedotPay",
    "Carte bancaire",
    "Virement bancaire",
  ],
  priceRange: "€€",
  /** Note agrégée affichée sur le .fr (avis voyageurs). */
  rating: { value: 9.6, count: 5, best: 10 },
} as const;

export type Locale = "fr" | "en";
export const LOCALES: Locale[] = ["fr", "en"];
export const DEFAULT_LOCALE: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}

/** URL absolue pour une route donnée et une locale (canonical / hreflang). */
export function absoluteUrl(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return `${SITE.url}/${locale}${clean ? `/${clean}` : ""}`;
}
