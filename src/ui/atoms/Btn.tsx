/**
 * Composant atomique Btn — bouton/lien CTA.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./Btn.module.scss";

export type BtnVariant =
  | "primary"
  | "ghost"
  | "light"
  | "heroPrimary"   // Fond sombre émeraude — bouton doré
  | "heroGhost";    // Fond sombre émeraude — bouton contour blanc

const ArrowSvg = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/**
 * Bouton/lien CTA avec variantes et flèche optionnelle.
 * Sans `href` : rendu en `<button>` (formulaires, actions).
 * Avec `href` : rendu en `<Link>` (nav interne) ou `<a>` (external).
 * @param href - URL de destination ; absent → bouton natif
 * @param variant - Palette visuelle
 * @param external - Si vrai, rendu en <a target="_blank">
 * @param arrow - Affiche la flèche animée (défaut : true)
 * @param type - Type du bouton natif (défaut : "button")
 * @param disabled - Désactivation du bouton natif
 */
export function Btn({
  href,
  children,
  variant = "primary",
  external,
  arrow = true,
  className,
  type = "button",
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: BtnVariant;
  external?: boolean;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  const cls = clsx(styles.btn, styles[variant], className);
  const inner = (
    <span className={styles.inner}>
      {children}
      {arrow && <ArrowSvg className={styles.arrow} />}
    </span>
  );

  if (!href) {
    return (
      <button type={type} className={cls} disabled={disabled}>
        {inner}
      </button>
    );
  }
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
