/**
 * Composant Testimonials — grille d'avis clients.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { clsx } from "clsx";
import styles from "./Testimonials.module.scss";

/**
 * Grille de témoignages 3 colonnes avec note, étoiles et auteur.
 * @param reviews - Liste des avis à afficher
 */
export function Testimonials({
  reviews,
}: {
  reviews: {
    author: string;
    rating: number;
    text: string;
    detail?: string;
  }[];
}) {
  return (
    <div className={styles.quotes}>
      {reviews.map((r, i) => (
        <div
          key={r.author + i}
          className={clsx(styles.quote, "reveal", i % 3 ? `reveal--delay-${i % 3}` : undefined)}
        >
          <span className={styles.quotemark} aria-hidden="true">&quot;</span>
          <div className={styles.stars}>
            ★★★★★{" "}
            <span>{r.rating}/10</span>
          </div>
          <p>{r.text}</p>
          <div className={styles.author}>
            <span className={styles.avatar}>{r.author.charAt(0)}</span>
            <div>
              <strong>{r.author}</strong>
              {r.detail ? ` ${r.detail}` : ""}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
