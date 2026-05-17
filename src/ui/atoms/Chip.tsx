/**
 * Composant atomique Chip — badge compact en ligne.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./Chip.module.scss";

type ChipVariant = "default" | "accent" | "gold" | "emerald";

/**
 * Badge compact (équipements, labels, filtres).
 * @param variant - Palette : default (blanc), accent (terracotta), gold, emerald
 */
export function Chip({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: ChipVariant;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        styles.chip,
        variant !== "default" && styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Rangée de chips flexbox. */
export function ChipRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx(styles.chipRow, className)}>{children}</div>;
}
