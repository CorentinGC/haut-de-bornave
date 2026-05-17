/**
 * Composant UI PageHero — héros des pages internes.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import Link from "next/link";
import type { Media } from "@/lib/media";
import { Cover } from "./ui";
import styles from "./PageHero.module.scss";

/**
 * En-tête de page avec image de fond, dégradé sombre, fil d'Ariane et titre.
 * LCP des pages internes : fond sous dégradé sombre → quality réduite.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  media,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  media: Media;
  breadcrumb: { name: string; href?: string }[];
}) {
  return (
    <header className={styles.pageHero}>
      <div className={styles.bg}>
        <Cover media={media} sizes="100vw" priority quality={62} />
      </div>
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
          {breadcrumb.map((t, i) => (
            <span key={`${i}-${t.name}`}>
              {t.href && i < breadcrumb.length - 1 ? (
                <Link href={t.href}>{t.name}</Link>
              ) : (
                <span aria-current="page">{t.name}</span>
              )}
              {i < breadcrumb.length - 1 && <span aria-hidden="true">/</span>}
            </span>
          ))}
        </nav>
        <span className="eyebrow" style={{ color: "var(--c-gold)" }}>{eyebrow}</span>
        <h1 className="h-hero">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </header>
  );
}
