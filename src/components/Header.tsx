"use client";

/**
 * Composant UI Header.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import type { Locale } from "@/lib/site";
import type { SiteContent } from "@/content/types";
import { bookingHref, href, mainNav, switchLocaleHref } from "@/lib/nav";
import styles from "./Header.module.scss";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/**
 * En-tête fidèle au site .fr : nav fixe transparente → opaque au scroll.
 * Desktop : liens horizontaux + bascule FR/EN + CTA. Mobile : barre épurée
 * (la navigation passe par <MobileBottomNav/>, pas de burger).
 */
export function Header({
  locale,
  content,
}: {
  locale: Locale;
  content: SiteContent;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const pathNoLocale = pathname.replace(/^\/(fr|en)(?=\/|$)/, "") || "";
  const items = mainNav(content);
  const other: Locale = locale === "fr" ? "en" : "fr";
  const otherHref = switchLocaleHref(other, pathNoLocale, locale);

  // Les pages sans héros sombre plein cadre laissent le fond clair affleurer
  // sous la nav : la nav transparente (texte blanc) y serait illisible. On
  // force alors l'état opaque dès le haut. Dérivé du chemin (synchrone, pas
  // d'effet, pas de flash d'hydratation). Seule `mentions-legales` n'a pas
  // de PageHero/HeroSplit (toutes les autres routes en ont un).
  const HERO_LESS_ROUTES = ["/mentions-legales"];
  const solidTop = HERO_LESS_ROUTES.includes(pathNoLocale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (p: string) =>
    pathNoLocale === `/${p}` || pathNoLocale.startsWith(`/${p}/`);

  return (
    <nav
      className={clsx(styles.nav, { [styles.scrolled]: scrolled || solidTop })}
      aria-label="Navigation principale"
    >
      <div className={`container ${styles.inner}`}>
        <Link href={href(locale)} className={styles.brand} aria-label={content.nav.domaine}>
          <span className={styles.logo} aria-hidden="true" />
          <span className={styles.brandText}>
            Les Hauts De Bornave
            <small>Deshaies · Guadeloupe</small>
          </span>
        </Link>

        <ul className={styles.links} data-testid="nav-links">
          {items.map((item, i) => (
            <li key={item.path}>
              <Link
                href={href(locale, item.path)}
                className={isActive(item.path) ? styles.active : undefined}
                aria-current={isActive(item.path) ? "page" : undefined}
              >
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.lbl}>
                  <strong>{item.label}</strong>
                  <em>{item.sub}</em>
                </span>
                <span className={styles.arrow}>
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.end}>
          <Link
            href={otherHref}
            className={styles.lang}
            hrefLang={other}
            aria-label={other === "en" ? "Switch to English" : "Passer en français"}
          >
            {content.common.langSwitch}
          </Link>
          <Link href={bookingHref(locale)} className={styles.cta}>
            {content.nav.reserve}
          </Link>
        </div>
      </div>
    </nav>
  );
}
