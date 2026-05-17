/**
 * Composant GiteCard — fiche gîte avec carrousel et détails.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { ReactNode } from "react";
import { clsx } from "clsx";
import type { Media } from "@/lib/media";
import { Carousel } from "@/components/Carousel";
import styles from "./GiteCard.module.scss";

/**
 * Grille de chiffres clés d'un gîte (surface, capacité, etc.).
 * Sous-composant de GiteCard, exporté pour usage inline dans les pages.
 */
export function Facts({
  facts,
}: {
  facts: { value: string; label: string }[];
}) {
  return (
    <div className={styles.facts}>
      {facts.map((f) => (
        <div className={styles.fact} key={f.label}>
          <strong>{f.value}</strong>
          <span>{f.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Fiche gîte : carrousel + bloc contenu (tag, nom, lead, chiffres, équipements, prix, actions).
 * @param photos - Photos du carrousel
 * @param kicker - Étiquette catégorie (ex: « Gîte de prestige »)
 * @param name - Nom du gîte (h2)
 * @param lead - Description courte
 * @param facts - Chiffres clés (surface, capacité…), optionnel
 * @param equipment - Liste équipements, optionnel
 * @param price - Prix par nuit + frais de ménage
 * @param actions - Boutons CTA (slot ReactNode)
 * @param reverse - Inverse la disposition grille
 * @param dataAttributes - Attributs data-* arbitraires (ex: data-rayon)
 */
export function GiteCard({
  photos,
  kicker,
  name,
  lead,
  facts,
  equipment,
  price,
  actions,
  reverse,
  dataAttributes,
}: {
  photos: Media[];
  kicker: string;
  name: string;
  lead: string;
  facts?: { value: string; label: string }[];
  equipment?: string[];
  price: {
    amount: string | number;
    perNightLabel: string;
    cleaningFee: string | number;
    cleaningLabel: string;
  };
  actions: ReactNode;
  reverse?: boolean;
  dataAttributes?: Record<string, string>;
}) {
  return (
    <article
      className={clsx(styles.card, reverse && styles.reverse, "reveal")}
      {...(dataAttributes ?? {})}
    >
      <div className={styles.inner}>
        <Carousel photos={photos} />
        <div className={styles.content}>
          <span className={styles.tag}>{kicker}</span>
          <h2>{name}</h2>
          <p className={styles.lead}>{lead}</p>
          {facts && <Facts facts={facts} />}
          {equipment && (
            <ul className={styles.equip}>
              {equipment.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
          <div className={styles.price}>
            <strong>{price.amount} €</strong>
            <small>{price.perNightLabel}</small>
            <span aria-hidden="true" style={{ color: "var(--c-line)" }}>·</span>
            <span>+ {price.cleaningFee} € {price.cleaningLabel}</span>
          </div>
          <div className={styles.actions}>{actions}</div>
        </div>
      </div>
    </article>
  );
}
