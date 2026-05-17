/**
 * Composant SecHead — en-tête de section (eyebrow + titre + lead optionnel).
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui";
import styles from "./SecHead.module.scss";

/**
 * En-tête de section avec eyebrow, titre h2 et lead optionnel.
 * @param eyebrow - Libellé court au-dessus du titre
 * @param title - Titre principal (peut contenir du JSX)
 * @param lead - Texte d'accroche optionnel
 * @param center - Centrage horizontal (défaut : false)
 */
export function SecHead({
  eyebrow,
  title,
  lead,
  center,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div
      className={`${styles.head} reveal`}
      style={center ? { textAlign: "center", margin: "0 auto" } : undefined}
    >
      <Eyebrow center={center}>{eyebrow}</Eyebrow>
      <h2 className="h-xl">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}
