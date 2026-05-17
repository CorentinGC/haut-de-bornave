/**
 * proxy.ts.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/site";

/**
 * Proxy (ex-middleware, Next.js 16) — routage i18n.
 * Préfixe toutes les routes par la locale (/fr, /en). Une requête sans
 * préfixe est redirigée vers la locale détectée via Accept-Language
 * (sinon fr). SEO : URLs canoniques explicites + hreflang (voir docs/i18n.md).
 */
function detectLocale(req: NextRequest): Locale {
  const header = req.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().slice(0, 2).toLowerCase());
  for (const code of preferred) {
    if (code && (LOCALES as string[]).includes(code)) return code as Locale;
  }
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Exclut API, assets internes, médias et fichiers SEO racine.
  matcher: [
    "/((?!_next/|api/|media/|favicon|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.[\\w]+$).*)",
  ],
};
