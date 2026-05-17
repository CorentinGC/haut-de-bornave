/**
 * Composant UI UniverseGrid — mosaïque d'hébergements.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import Link from "next/link";
import { clsx } from "clsx";
import type { Media } from "@/lib/media";
import { Cover } from "./ui";
import styles from "./UniverseGrid.module.scss";

/** Mosaïque des hébergements (page d'accueil) en grille 12 colonnes. */
export function UniverseGrid({
  cards,
}: {
  cards: {
    href: string;
    media: Media;
    badge: string;
    title: string;
    text: string;
    size: "xl" | "md" | "sm";
    cta: string;
  }[];
}) {
  return (
    <div className={styles.universe}>
      {cards.map((c, i) => (
        <Link
          key={c.href + i}
          href={c.href}
          className={clsx(
            styles.card,
            styles[c.size],
            "reveal",
            i % 3 ? `reveal--delay-${i % 3}` : undefined,
          )}
        >
          <Cover
            media={c.media}
            sizes={c.size === "xl" ? "(max-width:900px) 100vw, 66vw" : "(max-width:900px) 100vw, 33vw"}
          />
          <span className={styles.badge}>{c.badge}</span>
          <h3>{c.title}</h3>
          <p>{c.text}</p>
          <span className={styles.more}>
            {c.cta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}
