/**
 * Constantes globales du site — NAP, coordonnées, réseaux, paiements.
 * Les données vendeur sont éditées dans /config.json (source unique de
 * vérité, modifiable sans toucher au code). Voir docs/contenu-decisions.md.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */
import config from "../../config.json";

type Cfg = Omit<typeof config, "_comment">;
const cfg = config as Cfg;

export const SITE = {
  name: cfg.name,
  legalName: cfg.legalName,
  shortName: cfg.shortName,
  /** URL canonique — surchargée par NEXT_PUBLIC_SITE_URL (déploiement). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? cfg.url,
  host: cfg.host,
  phone: cfg.phone,
  whatsapp: cfg.whatsapp,
  email: cfg.email,
  address: cfg.address,
  geo: { lat: cfg.geo.lat, lng: cfg.geo.lng },
  social: cfg.social,
  partner: cfg.partner,
  payments: cfg.payments,
  priceRange: cfg.priceRange,
  rating: {
    value: cfg.rating.value,
    count: cfg.rating.count,
    best: cfg.rating.best,
  },
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
