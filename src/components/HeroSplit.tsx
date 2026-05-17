/**
 * Composant UI HeroSplit — hero d'accueil en deux colonnes.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import Image from "next/image";
import type { Media } from "@/lib/media";
import { Btn } from "@/ui/atoms/Btn";
import { Kicker } from "@/ui/atoms/Kicker";
import { Cover } from "./ui";
import styles from "./HeroSplit.module.scss";

/**
 * Hero d'accueil bicolonne : contenu émeraude (gauche) + image (droite).
 * Kicker/CTA/stats inclus. Variantes de bouton héros via variant="heroPrimary|heroGhost".
 */
export function HeroSplit({
  kicker,
  titleHtml,
  intro,
  ctas,
  stats,
  media,
  badge,
  rating,
  inset,
}: {
  kicker: string;
  titleHtml: string;
  intro: string;
  ctas: { href: string; label: string; variant?: "primary" | "ghost" }[];
  stats: { value: string; label: string }[];
  media: Media;
  badge: string;
  rating?: { score: string; text: string };
  inset?: Media;
}) {
  return (
    <section className={styles.heroSplit}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.content}>
            <Kicker variant="hero">{kicker}</Kicker>
            <h1 dangerouslySetInnerHTML={{ __html: titleHtml }} />
            <p>{intro}</p>
            <div className={styles.ctaRow}>
              {ctas.map((c) => (
                <Btn
                  key={c.href}
                  href={c.href}
                  variant={c.variant === "ghost" ? "heroGhost" : "heroPrimary"}
                >
                  {c.label}
                </Btn>
              ))}
            </div>
            <div className={styles.stats}>
              {stats.map((s) => (
                <div className={styles.stat} key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.media}>
            <span className={styles.deco} />
            <div className={styles.frame}>
              <Cover media={media} sizes="(max-width: 900px) 100vw, 50vw" priority />
              <div className={styles.chip}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {badge}
              </div>
              {rating && (
                <div className={styles.rating}>
                  <span className={styles.ratingScore}>{rating.score}</span>
                  <div className={styles.ratingText}>
                    <strong>★★★★★</strong>
                    {rating.text}
                  </div>
                </div>
              )}
            </div>
            {inset && (
              <div className={styles.inset}>
                <Image
                  src={inset.src}
                  alt={inset.alt}
                  fill
                  sizes="240px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
