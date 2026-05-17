/**
 * Composant FeatureGrid — grille de fonctionnalités / équipements.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { clsx } from "clsx";
import { FeatureIcon } from "@/components/icons";
import styles from "./FeatureGrid.module.scss";

/**
 * Grille 3 colonnes d'encarts feature avec icône, titre et texte.
 * @param items - Liste des fonctionnalités à afficher
 */
export function FeatureGrid({
  items,
}: {
  items: { icon?: string; title: string; text: string }[];
}) {
  return (
    <div className={styles.grid}>
      {items.map((f, i) => (
        <div
          key={f.title}
          className={clsx(styles.feature, "reveal", i % 3 ? `reveal--delay-${i % 3}` : undefined)}
        >
          <span className={styles.icon} aria-hidden="true">
            <FeatureIcon name={f.icon} />
          </span>
          <h3>{f.title}</h3>
          <p>{f.text}</p>
        </div>
      ))}
    </div>
  );
}
