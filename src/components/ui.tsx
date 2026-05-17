/**
 * Composant UI ui — bibliothèque de composants de page.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Media } from "@/lib/media";

// Composants extraits vers leurs propres fichiers — re-exportés ici pour compatibilité.
export { HeroSplit } from "./HeroSplit";
export { PageHero } from "./PageHero";
export { UniverseGrid } from "./UniverseGrid";
export { SplitFeature } from "./SplitFeature";
export { LocationBlock } from "./LocationBlock";
export { GiteCard, Facts } from "./GiteCard";
export { Testimonials } from "./Testimonials";
export { FeatureGrid } from "./FeatureGrid";
export { Marquee } from "./Marquee";
export { CtaBlock } from "./CtaBlock";
export { SecHead } from "./SecHead";

/* ============================================================================
   Bibliothèque de composants UI — markup & classes BEM repris du site .fr.
   Images servies via next/image (CWV/SEO).
   ========================================================================== */

// Primitives atomiques — re-exportées pour compatibilité des imports existants.
export { Btn } from "@/ui/atoms/Btn";
export { Chip, ChipRow } from "@/ui/atoms/Chip";
export { Kicker } from "@/ui/atoms/Kicker";

/** Image plein cadre (object-fit cover) pour conteneurs positionnés.
 *  quality 72 par défaut : ces visuels sont en couverture (souvent sous
 *  un dégradé/overlay) — gain de poids notable, perte visuelle nulle. */
export function Cover({
  media,
  sizes = "100vw",
  priority,
  className,
  quality = 72,
}: {
  media: Media;
  sizes?: string;
  priority?: boolean;
  className?: string;
  quality?: number;
}) {
  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
      style={{ objectFit: "cover" }}
    />
  );
}

/** Image dimensionnée (ratio intrinsèque, anti-CLS). */
export function Pic({
  media,
  sizes,
  priority,
  className,
}: {
  media: Media;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

export function Eyebrow({
  children,
  gold,
  center,
}: {
  children: ReactNode;
  gold?: boolean;
  center?: boolean;
}) {
  return (
    <span
      className="eyebrow"
      style={{
        ...(gold ? { color: "var(--c-gold)" } : {}),
        ...(center ? { justifyContent: "center" } : {}),
      }}
    >
      {children}
    </span>
  );
}


export function Section({
  children,
  alt,
  tight,
  id,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  alt?: boolean;
  tight?: boolean;
  id?: string;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`${tight ? "section-tight" : "section"}${
        alt ? " bg-alt" : ""
      } ${className}`.trim()}
    >
      <div className="container">{children}</div>
    </section>
  );
}

/** Rend un titre pouvant contenir <em> (accent typographique .fr). */
export function RichTitle({
  html,
  className = "h-hero",
  as: As = "h1",
}: {
  html: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return <As className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}


/** FAQ accessible (details/summary natif clavier). Le schéma FAQPage
 *  JSON-LD est injecté séparément par la page. */
export function FaqList({
  items,
  title,
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <div className="faq-list">
      {title && <h2 className="h-lg reveal">{title}</h2>}
      {items.map((f) => (
        <details key={f.q} className="faq-item reveal">
          <summary>
            <h3>{f.q}</h3>
            <span className="faq-item__plus" aria-hidden="true" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Breadcrumbs({
  trail,
}: {
  trail: { name: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label="Fil d'Ariane">
      <ol>
        {trail.map((t, i) => (
          <li key={`${i}-${t.name}`}>
            {t.href && i < trail.length - 1 ? (
              <Link href={t.href}>{t.name}</Link>
            ) : (
              <span aria-current="page">{t.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
