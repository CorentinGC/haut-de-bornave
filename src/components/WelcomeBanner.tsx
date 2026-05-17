/**
 * Composant WelcomeBanner — bandeau machine à écrire d'accueil.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { ReactNode } from "react";
import styles from "./WelcomeBanner.module.scss";

/**
 * Bandeau central avec effet machine à écrire (Typewriter).
 * @param children - Contenu du titre (span Typewriter)
 * @param titleId - id du h2 pour aria-labelledby
 */
export function WelcomeBanner({
  children,
  titleId,
}: {
  children: ReactNode;
  titleId?: string;
}) {
  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className="container">
        <div className={`${styles.card} reveal`}>
          <h2 id={titleId} className={styles.title}>
            {children}
          </h2>
        </div>
      </div>
    </section>
  );
}
