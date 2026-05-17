"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/site";
import { SITE } from "@/lib/site";
import type { SiteContent } from "@/content/types";
import { href, switchLocaleHref } from "@/lib/nav";

/* Icônes inline (aucune lib) — trait simple, héritent de currentColor. */
const I = {
  domaine: "M3 11l9-7 9 7M5 10v10h14V10",
  gites: "M4 9h16M4 9l1-5h14l1 5M6 20v-7M18 20v-7M10 20v-4h4v4",
  visiter: "M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11z M12 10a2 2 0 100-4 2 2 0 000 4",
  contact:
    "M4 5h16v14H4z M4 7l8 6 8-6",
  plus: "M5 12h14M12 5v14",
} as const;

const Icon = ({ d }: { d: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d.split(" M").map((seg, i) => (
      <path key={i} d={(i === 0 ? seg : `M${seg}`).trim()} />
    ))}
  </svg>
);

/**
 * Navigation mobile façon application : barre fixe en bas (4 liens + "Plus")
 * et panel slide-in pour les liens secondaires. Remplace tout burger menu.
 * Pattern repris de masp-calendar-app (voir mémoire mobile-bottom-nav-pattern).
 * Masquée en desktop via CSS (.mobile-nav, @media min-width:900px).
 */
export function MobileBottomNav({
  locale,
  content,
}: {
  locale: Locale;
  content: SiteContent;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const pathNoLocale = pathname.replace(/^\/(fr|en)(?=\/|$)/, "") || "/";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (p: string) =>
    pathNoLocale === `/${p}` || pathNoLocale.startsWith(`/${p}/`);

  const primary = [
    { path: "domaine", label: content.nav.domaine, d: I.domaine },
    { path: "gites", label: content.nav.gites, d: I.gites },
    { path: "que-visiter", label: content.nav.queVisiter, d: I.visiter },
    { path: "contact", label: content.nav.contact, d: I.contact },
  ];

  const more = [
    { path: "rayons-de-soleil", label: content.nav.rayons },
    { path: "evenements", label: content.nav.evenements },
    { path: "bien-etre", label: content.nav.bienEtre },
    { path: "deshaies", label: content.nav.deshaies },
    { path: "avis", label: content.nav.avis },
    { path: "faq", label: content.nav.faq },
  ];
  const other: Locale = locale === "fr" ? "en" : "fr";
  const otherHref = switchLocaleHref(
    other,
    pathNoLocale === "/" ? "" : pathNoLocale,
    locale,
  );

  return (
    <>
      <nav className="mobile-nav" aria-label="Navigation mobile">
        {primary.map((it) => (
          <Link
            key={it.path}
            href={href(locale, it.path)}
            className={`mobile-nav__item${isActive(it.path) ? " is-active" : ""}`}
            aria-current={isActive(it.path) ? "page" : undefined}
          >
            <Icon d={it.d} />
            <span>{it.label}</span>
          </Link>
        ))}
        <button
          type="button"
          className={`mobile-nav__item mobile-nav__more${open ? " is-active" : ""}`}
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon d={I.plus} />
          <span>{locale === "fr" ? "Plus" : "More"}</span>
        </button>
      </nav>

      <div
        className={`mobile-nav-overlay${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`mobile-nav-panel${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={locale === "fr" ? "Menu" : "Menu"}
        hidden={!open}
      >
        <div className="mobile-nav-panel__handle" aria-hidden="true" />
        <ul className="mobile-nav-panel__links">
          {more.map((it) => (
            <li key={it.path}>
              <Link
                href={href(locale, it.path)}
                className={isActive(it.path) ? "is-active" : undefined}
                onClick={() => setOpen(false)}
              >
                {it.label}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-nav-panel__foot">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener"
            className="btn btn--primary"
          >
            {content.common.whatsappSerge}
          </a>
          <div className="mobile-nav-panel__sub">
            <Link
              href={href(locale, "mentions-legales")}
              onClick={() => setOpen(false)}
            >
              {content.footer.legal}
            </Link>
            <Link href={otherHref} hrefLang={other} onClick={() => setOpen(false)}>
              {content.common.langSwitch}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
