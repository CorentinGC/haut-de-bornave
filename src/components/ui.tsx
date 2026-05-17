import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Media } from "@/lib/media";

/* ============================================================================
   Bibliothèque de composants UI — markup & classes BEM repris du site .fr
   (stylés par src/styles/lhdb.css). Images servies via next/image (CWV/SEO).
   ========================================================================== */

const ArrowSvg = ({ className = "btn__arrow" }: { className?: string }) => (
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

export function Btn({
  href,
  children,
  variant = "primary",
  external,
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  external?: boolean;
  arrow?: boolean;
}) {
  const cls = `btn btn--${variant}`;
  // Contenu enveloppé dans un <span> : `.btn--primary > *` le remonte
  // au-dessus du calque ::before (sinon texte masqué au survol).
  const inner = (
    <span className="btn__inner">
      {children}
      {arrow && <ArrowSvg />}
    </span>
  );
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

/** Image plein cadre (object-fit cover) pour conteneurs positionnés. */
export function Cover({
  media,
  sizes = "100vw",
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
      fill
      sizes={sizes}
      priority={priority}
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
      className="sec-head reveal"
      style={center ? { textAlign: "center", margin: "0 auto" } : undefined}
    >
      <Eyebrow center={center}>{eyebrow}</Eyebrow>
      <h2 className="h-xl">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
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
        <div className="cta-block reveal">
          <div className="cta-block__bg">
            <Cover media={bg} sizes="100vw" />
          </div>
          <Eyebrow gold center>
            {eyebrow}
          </Eyebrow>
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

export function FeatureGrid({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  return (
    <div className="feature-grid">
      {items.map((f, i) => (
        <div
          key={f.title}
          className={`feature reveal${i % 3 ? ` reveal--delay-${i % 3}` : ""}`}
        >
          <span className="feature__icon" aria-hidden="true">
            ✦
          </span>
          <h3 className="feature__title">{f.title}</h3>
          <p>{f.text}</p>
        </div>
      ))}
    </div>
  );
}

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
    <div className="quotes">
      {reviews.map((r, i) => (
        <div
          key={r.author + i}
          className={`quote reveal${i % 3 ? ` reveal--delay-${i % 3}` : ""}`}
        >
          <span className="quote__quotemark" aria-hidden="true">
            &quot;
          </span>
          <div className="quote__stars">
            ★★★★★{" "}
            <span style={{ color: "var(--c-muted)", fontSize: ".78rem" }}>
              {r.rating}/10
            </span>
          </div>
          <p>{r.text}</p>
          <div className="quote__author">
            <span className="quote__avatar">{r.author.charAt(0)}</span>
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

export function HeroSplit({
  kicker,
  titleHtml,
  intro,
  ctas,
  stats,
  media,
  badge,
  rating,
  inset,
}: {
  kicker: string;
  titleHtml: string;
  intro: string;
  ctas: { href: string; label: string; variant?: "primary" | "ghost" }[];
  stats: { value: string; label: string }[];
  media: Media;
  badge: string;
  rating?: { score: string; text: string };
  inset?: Media;
}) {
  return (
    <section className="hero-split">
      <div className="container">
        <div className="hero-split__grid">
          <div className="hero-split__content">
            <span className="kicker">
              <span className="kicker__dot" />
              {kicker}
            </span>
            <h1
              className="h-hero"
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
            <p>{intro}</p>
            <div className="hero-split__cta">
              {ctas.map((c) => (
                <Btn key={c.href} href={c.href} variant={c.variant ?? "primary"}>
                  {c.label}
                </Btn>
              ))}
            </div>
            <div className="hero-split__stats">
              {stats.map((s) => (
                <div className="hero-split__stat" key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-split__media">
            <span className="hero-split__deco" />
            <div className="hero-split__frame">
              <Cover media={media} sizes="(max-width: 900px) 100vw, 50vw" priority />
              <div className="hero-split__chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {badge}
              </div>
              {rating && (
                <div className="hero-split__rating">
                  <span className="hero-split__rating-score">
                    {rating.score}
                  </span>
                  <div className="hero-split__rating-text">
                    <strong>★★★★★</strong>
                    {rating.text}
                  </div>
                </div>
              )}
            </div>
            {inset && (
              <div className="hero-split__inset">
                <Cover media={inset} sizes="240px" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Hero secondaire (pages internes) avec fil d'Ariane. */
export function PageHero({
  eyebrow,
  title,
  lead,
  media,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  media: Media;
  breadcrumb: { name: string; href?: string }[];
}) {
  return (
    <header className="page-hero">
      <div className="page-hero__bg">
        <Cover media={media} sizes="100vw" priority />
      </div>
      <div className="container">
        <nav className="breadcrumb" aria-label="Fil d'Ariane">
          {breadcrumb.map((t, i) => (
            <span key={`${i}-${t.name}`}>
              {t.href && i < breadcrumb.length - 1 ? (
                <Link href={t.href}>{t.name}</Link>
              ) : (
                <span aria-current="page">{t.name}</span>
              )}
              {i < breadcrumb.length - 1 && <span aria-hidden="true">/</span>}
            </span>
          ))}
        </nav>
        <Eyebrow gold>{eyebrow}</Eyebrow>
        <h1 className="h-hero">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </header>
  );
}

/** Mosaïque des hébergements (page d'accueil). */
export function UniverseGrid({
  cards,
}: {
  cards: {
    href: string;
    media: Media;
    badge: string;
    title: string;
    text: string;
    size: "xl" | "md" | "sm";
    cta: string;
  }[];
}) {
  return (
    <div className="universe">
      {cards.map((c, i) => (
        <Link
          key={c.href + i}
          href={c.href}
          className={`universe__card universe__card--${c.size} reveal${
            i % 3 ? ` reveal--delay-${i % 3}` : ""
          }`}
        >
          <Cover
            media={c.media}
            sizes={c.size === "xl" ? "(max-width:900px) 100vw, 66vw" : "(max-width:900px) 100vw, 33vw"}
          />
          <span className="eyebrow" style={{ color: "var(--c-gold)" }}>
            {c.badge}
          </span>
          <h3>{c.title}</h3>
          <p>{c.text}</p>
          <span className="more">
            {c.cta}
            <ArrowSvg className="" />
          </span>
        </Link>
      ))}
    </div>
  );
}

/** Bloc gîte complet (page Les Gîtes) : carrousel + fiche. */
export function Facts({
  facts,
}: {
  facts: { value: string; label: string }[];
}) {
  return (
    <div className="gite-card__facts">
      {facts.map((f) => (
        <div className="gite-card__fact" key={f.label}>
          <strong>{f.value}</strong>
          <span>{f.label}</span>
        </div>
      ))}
    </div>
  );
}

export function SplitFeature({
  eyebrow,
  title,
  paragraphs,
  media,
  reverse,
  cta,
}: {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  media: Media;
  reverse?: boolean;
  cta?: { href: string; label: string };
}) {
  return (
    <div className={`split${reverse ? " split--reverse" : ""} reveal`}>
      <div className="split__media">
        <Cover media={media} sizes="(max-width: 900px) 100vw, 50vw" />
      </div>
      <div className="split__content">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="h-lg">{title}</h2>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {cta && (
          <Btn href={cta.href} variant="primary">
            {cta.label}
          </Btn>
        )}
      </div>
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="event-marquee" aria-hidden="true">
      <div className="event-marquee__track">
        {loop.map((it, i) => (
          <span key={i}>
            {it}
            <span className="event-marquee__dot">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
