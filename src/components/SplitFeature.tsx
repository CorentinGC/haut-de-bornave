/**
 * Composant UI SplitFeature — bloc feature en deux colonnes.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { clsx } from "clsx";
import type { Media } from "@/lib/media";
import { Btn } from "@/ui/atoms/Btn";
import { Cover, Eyebrow } from "./ui";
import styles from "./SplitFeature.module.scss";

/** Bloc bicolonne texte + image avec variante inversée. */
export function SplitFeature({
  eyebrow,
  title,
  paragraphs,
  media,
  reverse,
  cta,
}: {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  media: Media;
  reverse?: boolean;
  cta?: { href: string; label: string };
}) {
  return (
    <div className={clsx(styles.split, reverse && styles.reverse, "reveal")}>
      <div className={styles.media}>
        <Cover media={media} sizes="(max-width: 900px) 100vw, 50vw" />
      </div>
      <div className={styles.content}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="h-lg">{title}</h2>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {cta && (
          <Btn href={cta.href} variant="primary">
            {cta.label}
          </Btn>
        )}
      </div>
    </div>
  );
}
