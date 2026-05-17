/**
 * Page « locale » du site.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { href } from "@/lib/nav";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { media, KEY_MEDIA, gitePhotos } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { lodgingBusinessLd, faqPageLd } from "@/lib/jsonld";
import {
  Btn,
  CtaBlock,
  HeroSplit,
  LocationBlock,
  Marquee,
  Section,
  SecHead,
  SplitFeature,
  Testimonials,
  UniverseGrid,
} from "@/components/ui";
import { Typewriter } from "@/components/Typewriter";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ locale, seo: getContent(locale).home.seo });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);

  const universe = c.gites.slice(0, 5).map((g, i) => ({
    href: href(lc, `gites/${g.slug}`),
    media: gitePhotos(g.mediaPrefix, g.name)[i === 0 ? 1 : 0] ?? gitePhotos(g.mediaPrefix, g.name)[0],
    badge: g.kicker,
    title: g.name,
    text: g.tagline,
    size: (i === 0 ? "xl" : i === 1 ? "md" : "sm") as "xl" | "md" | "sm",
    cta: c.common.discover,
  }));

  return (
    <>
      <JsonLd data={[lodgingBusinessLd(lc, c), faqPageLd(c.globalFaq)]} />

      <HeroSplit
        kicker={c.home.heroEyebrow}
        titleHtml={c.home.heroTitle}
        intro={c.home.heroIntro}
        ctas={[
          { href: href(lc, "gites"), label: c.common.seeAllGites },
          { href: href(lc, "evenements"), label: c.cta.domaineTitle, variant: "ghost" },
        ]}
        stats={c.home.stats}
        media={media(KEY_MEDIA.coucherDeshaies, `${c.home.heroLead} — ${c.home.domaineTitle}`)}
        badge="Les Hauts De Bornave"
        rating={{ score: "9.6", text: c.avis.eyebrow }}
        inset={media(KEY_MEDIA.domaineHero, c.domaine.presentationTitle)}
      />

      {/* Localisation */}
      <Section ariaLabel={c.home.deshaiesEyebrow}>
        <SecHead
          eyebrow={c.home.deshaiesEyebrow}
          title={c.home.deshaiesTitle}
          lead={c.home.deshaiesText}
        />
        <LocationBlock
          data={c.home.location}
          rating={{ score: "9.6", text: c.avis.eyebrow }}
          ctaHref={href(lc, "contact")}
        />
      </Section>

      {/* Le Domaine */}
      <Section alt>
        <SplitFeature
          eyebrow={c.home.domaineEyebrow}
          title={c.home.domaineTitle}
          paragraphs={[c.home.domaineText]}
          media={media(KEY_MEDIA.domaineWide, c.domaine.title)}
          cta={{ href: href(lc, "domaine"), label: c.common.discover }}
        />
      </Section>

      {/* Nos hébergements */}
      <Section>
        <SecHead
          eyebrow={c.home.gitesEyebrow}
          title={c.home.gitesTitle}
          lead={c.home.gitesIntro}
        />
        <UniverseGrid cards={universe} />
        <p style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Btn href={href(lc, "gites")} variant="ghost">
            {c.common.seeAllGites}
          </Btn>
        </p>
      </Section>

      <Marquee items={c.home.marquee} />

      {/* Banner machine à écrire */}
      <section
        className="welcome-banner-section section-tight"
        aria-labelledby="welcome-bornave-title"
      >
        <div className="container">
          <div className="welcome-banner-card reveal">
            <h2
              id="welcome-bornave-title"
              className="welcome-banner-card__hero-title"
            >
              <Typewriter text="Les Hauts De Bornave" />
            </h2>
          </div>
        </div>
      </section>

      {/* Privatisation / événements */}
      <Section alt>
        <SplitFeature
          reverse
          eyebrow={c.home.eventsEyebrow}
          title={c.home.eventsTitle}
          paragraphs={[c.home.eventsText]}
          media={media(KEY_MEDIA.coucherTainos, c.evenements.title)}
          cta={{ href: href(lc, "evenements"), label: c.common.discover }}
        />
      </Section>

      {/* Avis */}
      <Section>
        <SecHead
          eyebrow={c.avis.eyebrow}
          title={c.avis.title}
          lead={c.avis.intro}
        />
        <Testimonials reviews={c.reviews} />
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href={href(lc, "avis")} className="link-arrow">
            {c.common.discover} · {c.nav.avis}
          </Link>
        </p>
      </Section>

      {/* Bien-être */}
      <Section alt>
        <SplitFeature
          eyebrow={c.home.bienEtreEyebrow}
          title={c.home.bienEtreTitle}
          paragraphs={[c.home.bienEtreText]}
          media={media(
            KEY_MEDIA.coucherGrandeAnse,
            c.bienEtre.title,
          )}
          cta={{ href: href(lc, "bien-etre"), label: c.common.discover }}
        />
      </Section>

      <CtaBlock
        eyebrow={c.contact.eyebrow}
        title={c.cta.homeTitle}
        text={c.cta.homeText}
        cta={{ href: href(lc, "contact"), label: c.common.contactUs }}
        bg={media(KEY_MEDIA.coucherGrandeAnse, c.cta.homeTitle)}
      />
    </>
  );
}
