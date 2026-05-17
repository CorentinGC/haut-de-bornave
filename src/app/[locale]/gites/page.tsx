import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { href } from "@/lib/nav";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { media, KEY_MEDIA, gitePhotos } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import {
  Btn,
  CtaBlock,
  Facts,
  FeatureGrid,
  PageHero,
  Section,
  SecHead,
} from "@/components/ui";
import { Carousel } from "@/components/Carousel";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "gites",
    seo: getContent(locale).gitesPage.seo,
  });
}

export default async function GitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);
  const p = c.gitesPage;

  return (
    <>
      <JsonLd
        data={breadcrumbLd(lc, [
          { name: c.nav.domaine, path: "" },
          { name: c.nav.gites, path: "gites" },
        ])}
      />

      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        lead={p.intro}
        media={media(
          gitePhotos("gran-kaz", c.gites[0].name)[4]?.src ?? KEY_MEDIA.domaineHero,
          p.title,
        )}
        breadcrumb={[
          { name: c.nav.domaine, href: href(lc) },
          { name: c.nav.gites },
        ]}
      />

      {c.gites.map((g, i) => {
        const photos = gitePhotos(g.mediaPrefix, g.name);
        return (
          <Section key={g.slug} alt={i % 2 === 1} id={g.slug}>
            <article
              className={`gite-card reveal${i % 2 ? " gite-card--reverse" : ""}`}
            >
              <div className="gite-card__inner">
                <Carousel photos={photos} />
                <div className="gite-card__content">
                  <span className="gite-card__tag">{g.kicker}</span>
                  <h2>{g.name}</h2>
                  <p className="gite-card__lead">{g.tagline}</p>
                  <Facts
                    facts={[
                      { value: g.facts.surface, label: c.common.discover === "Discover" ? "Area" : "Surface" },
                      { value: g.facts.capacity.replace(/\D/g, ""), label: c.common.upTo === "up to" ? "People" : "Personnes" },
                      { value: g.facts.bedrooms.replace(/\D/g, ""), label: lc === "fr" ? "Chambres" : "Bedrooms" },
                      {
                        value: g.facts.privatePool ? "✓" : "—",
                        label: lc === "fr" ? "Piscine privée" : "Private pool",
                      },
                    ]}
                  />
                  <ul className="gite-card__equip">
                    {g.equipment.slice(0, 8).map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                  <div className="gite-card__price">
                    <strong>{g.pricePerNight} €</strong>
                    <small>{c.common.perNight}</small>
                    <span style={{ color: "var(--c-line)" }}>·</span>
                    <span>
                      + {g.cleaningFee} € {c.common.cleaningFee.toLowerCase()}
                    </span>
                  </div>
                  <div className="gite-card__actions">
                    <Btn href={href(lc, `gites/${g.slug}`)} variant="primary">
                      {c.common.discover}
                    </Btn>
                    <Btn
                      href={href(lc, "contact")}
                      variant="ghost"
                      arrow={false}
                    >
                      {c.common.bookNow}
                    </Btn>
                  </div>
                </div>
              </div>
            </article>
          </Section>
        );
      })}

      <Section>
        <SecHead eyebrow={c.gitesPage.eyebrow} title={p.includedTitle} />
        <FeatureGrid items={p.included} />
      </Section>

      <CtaBlock
        eyebrow={c.contact.eyebrow}
        title={c.cta.genericTitle}
        text={c.contact.intro}
        cta={{ href: href(lc, "contact"), label: c.common.requestQuote }}
        bg={media(KEY_MEDIA.coucherDeshaies, c.cta.genericTitle)}
      />
    </>
  );
}
