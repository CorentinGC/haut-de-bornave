/**
 * Composant CtaBlock — section d'appel à l'action avec image de fond.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Media } from "@/lib/media";
import { Btn } from "@/ui/atoms/Btn";
import { Eyebrow } from "@/components/ui";
import { Cover } from "@/components/ui";
import styles from "./CtaBlock.module.scss";

/**
 * Bloc CTA centré avec image de fond assombrie, eyebrow doré et bouton clair.
 * @param eyebrow - Libellé court au-dessus du titre
 * @param title - Titre principal
 * @param text - Accroche sous le titre
 * @param cta - Lien et libellé du bouton
 * @param bg - Image de fond (overlay gradient appliqué)
 */
export function CtaBlock({
  eyebrow,
  title,
  text,
  cta,
  bg,
}: {
  eyebrow: string;
  title: string;
  text: string;
  cta: { href: string; label: string };
  bg: Media;
}) {
  return (
    <section className="section">
      <div className="container">
        <div className={`${styles.block} reveal`}>
          <div className={styles.bg}>
            {/* Fond fortement assombri (overlay) → quality basse invisible. */}
            <Cover media={bg} sizes="100vw" quality={60} />
          </div>
          <Eyebrow gold center>{eyebrow}</Eyebrow>
          <h2 className="h-xl">{title}</h2>
          <p>{text}</p>
          <Btn href={cta.href} variant="light">
            {cta.label}
          </Btn>
        </div>
      </div>
    </section>
  );
}
