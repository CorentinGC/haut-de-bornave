import type { Locale } from "./site";
import type { SiteContent } from "@/content/types";

/** Lien interne préfixé par la locale. `path` sans slash initial. */
export function href(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return `/${locale}${clean ? `/${clean}` : ""}`;
}

/** Bascule de locale en conservant le chemin courant (sans préfixe). */
export function switchLocaleHref(target: Locale, pathnameNoLocale: string) {
  return href(target, pathnameNoLocale);
}

export interface NavItem {
  path: string;
  label: string;
  sub: string;
}

/** Items du menu principal (libellés localisés + sous-titres mobile .fr). */
export function mainNav(c: SiteContent): NavItem[] {
  return [
    { path: "domaine", label: c.nav.domaine, sub: c.home.domaineEyebrow },
    { path: "gites", label: c.nav.gites, sub: c.gitesPage.eyebrow },
    { path: "rayons-de-soleil", label: c.nav.rayons, sub: c.rayons.eyebrow },
    { path: "evenements", label: c.nav.evenements, sub: c.evenements.eyebrow },
    { path: "que-visiter", label: c.nav.queVisiter, sub: c.queVisiter.eyebrow },
    { path: "deshaies", label: c.nav.deshaies, sub: c.deshaies.eyebrow },
  ];
}
