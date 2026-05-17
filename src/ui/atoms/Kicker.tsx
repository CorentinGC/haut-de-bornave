/**
 * Composant atomique Kicker — badge de section pulsant.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./Kicker.module.scss";

type KickerVariant = "default" | "light" | "gold" | "hero";

/**
 * Badge pulsant en tête de section.
 * @param variant - Palette : default (vert), light (blanc transparent), gold, hero (fond sombre)
 */
export function Kicker({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: KickerVariant;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        styles.kicker,
        variant !== "default" && styles[variant],
        className,
      )}
    >
      <span className={styles.dot} />
      {children}
    </span>
  );
}
