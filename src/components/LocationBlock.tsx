/**
 * Composant UI LocationBlock — carte + panneau d'infos NAP.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { SITE } from "@/lib/site";
import { Btn } from "@/ui/atoms/Btn";
import styles from "./LocationBlock.module.scss";

/**
 * Bloc localisation : carte Google Maps + panneau d'infos (NAP + accès).
 * Données vendeur via /config.json → SITE.
 */
export function LocationBlock({
  data,
  rating,
  ctaHref,
}: {
  data: {
    mapChip: string;
    panelTitle: string;
    panelText: string;
    items: { label: string; value: string; detail: string }[];
    cta: string;
  };
  rating?: { score: string; text: string };
  ctaHref: string;
}) {
  const q = encodeURIComponent(
    `${SITE.name}, ${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region}`,
  );
  return (
    <div className={`${styles.wrap} reveal`}>
      <div className={styles.map}>
        <span className={styles.chip}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {data.mapChip}
        </span>
        {rating && (
          <div className={styles.rating}>
            <span className={styles.ratingScore}>{rating.score}</span>
            <div className={styles.ratingText}>
              <strong>★★★★★</strong>
              {rating.text}
            </div>
          </div>
        )}
        <iframe
          src={`https://maps.google.com/maps?q=${q}&t=k&z=14&ie=UTF8&iwloc=&output=embed`}
          title={`Carte — ${SITE.name} à ${SITE.address.locality}, ${SITE.address.region}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className={styles.info}>
        <div className={styles.infoHead}>
          <h3 dangerouslySetInnerHTML={{ __html: data.panelTitle }} />
          <p>{data.panelText}</p>
        </div>
        {data.items.map((it) => (
          <div className={styles.item} key={it.label}>
            <span className={styles.itemIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <span className={styles.itemText}>
              <strong>{it.label}</strong>
              <span>{it.value}</span>
              <small>{it.detail}</small>
            </span>
          </div>
        ))}
        <div className={styles.cta}>
          <Btn href={ctaHref} variant="primary">
            {data.cta}
          </Btn>
        </div>
      </div>
    </div>
  );
}
