/**
 * Composant Marquee — bandeau défilant en boucle.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import styles from "./Marquee.module.scss";

/**
 * Bandeau texte défilant infini (animation CSS, pas de JS).
 * @param items - Éléments à afficher en boucle
 */
export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {loop.map((it, i) => (
          <span key={i}>
            {it}
            <span className={styles.dot} aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
