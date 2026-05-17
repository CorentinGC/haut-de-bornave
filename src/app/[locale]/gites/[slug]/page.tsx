import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "@/lib/site";
import { href } from "@/lib/nav";
import { getContent, getGite } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { gitePhotos, media, KEY_MEDIA } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { vacationRentalLd, faqPageLd, breadcrumbLd } from "@/lib/jsonld";
import {
  Btn,
  CtaBlock,
  Facts,
  FaqList,
  PageHero,
  Section,
  SecHead,
} from "@/components/ui";
import { Carousel } from "@/components/Carousel";

export const dynamic = "force-static";

const SLUGS = ["gran-kaz", "kaz-an-nou", "ti-kaz-la", "rayon-jaune", "rayon-bleu"];

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const g = getGite(locale, slug);
  if (!g) return {};
  return pageMetadata({
    locale,
    path: `gites/${slug}`,
    seo: g.seo,
    image: gitePhotos(g.mediaPrefix, g.name)[0]?.src,
  });
}

export default async function GitePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);
  const g = getGite(lc, slug);
  if (!g) notFound();

  const photos = gitePhotos(g.mediaPrefix, g.name);
  const others = c.gites.filter((x) => x.slug !== g.slug);

  return (
    <>
      <JsonLd
        data={[
          vacationRentalLd(
            lc,
            g,
            photos.map((p) => p.src),
          ),
          faqPageLd(g.faq),
          breadcrumbLd(lc, [
            { name: c.nav.domaine, path: "" },
            { name: c.nav.gites, path: "gites" },
            { name: g.name, path: `gites/${g.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={g.kicker}
        title={g.name}
        lead={g.tagline}
        media={photos[0] ?? media(KEY_MEDIA.domaineHero, g.name)}
        breadcrumb={[
          { name: c.nav.domaine, href: href(lc) },
          { name: c.nav.gites, href: href(lc, "gites") },
          { name: g.name },
        ]}
      />

      <Section>
        <article className="gite-card reveal">
          <div className="gite-card__inner">
            <Carousel photos={photos} />
            <div className="gite-card__content">
              <span className="gite-card__tag">{g.kicker}</span>
              <h2>{g.name}</h2>
              <p className="gite-card__lead">{g.intro}</p>
              <Facts
                facts={[
                  { value: g.facts.surface, label: lc === "fr" ? "Surface" : "Area" },
                  {
                    value: g.facts.capacity.replace(/\D/g, ""),
                    label: lc === "fr" ? "Personnes" : "People",
                  },
                  {
                    value: g.facts.bedrooms.replace(/\D/g, "") || "1",
                    label: lc === "fr" ? "Chambres" : "Bedrooms",
                  },
                  {
                    value: g.facts.privatePool ? "✓" : "—",
                    label: lc === "fr" ? "Piscine privée" : "Private pool",
                  },
                ]}
              />
              <div className="gite-card__price">
                <strong>{g.pricePerNight} €</strong>
                <small>{c.common.perNight}</small>
                <span style={{ color: "var(--c-line)" }}>·</span>
                <span>
                  + {g.cleaningFee} € {c.common.cleaningFee.toLowerCase()}
                </span>
              </div>
              <div className="gite-card__actions">
                <Btn href={href(lc, "contact")} variant="primary">
                  {c.common.bookNow} — {g.name}
                </Btn>
                <Btn
                  href="https://wa.me/590690003730"
                  variant="ghost"
                  external
                  arrow={false}
                >
                  WhatsApp
                </Btn>
              </div>
            </div>
          </div>
        </article>
      </Section>

      <Section alt>
        <div className="prose reveal">
          {g.body.map((p, i) => (
            <p key={i} className="lead">
              {p}
            </p>
          ))}
        </div>
        <div className="grid grid-2" style={{ marginTop: "2.5rem" }}>
          <div className="info-card reveal">
            <h3 className="h-md">{lc === "fr" ? "Équipements" : "Amenities"}</h3>
            <ul className="check-grid">
              {g.equipment.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <div className="info-card reveal">
            <h3 className="h-md">{lc === "fr" ? "Idéal pour" : "Ideal for"}</h3>
            <ul className="check-grid">
              {g.idealFor.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SecHead eyebrow={c.faqPage.eyebrow} title={c.faqPage.title} />
        <FaqList items={g.faq} />
      </Section>

      <Section alt>
        <SecHead
          eyebrow={c.gitesPage.eyebrow}
          title={lc === "fr" ? "Découvrez les autres gîtes" : "Discover the other gîtes"}
        />
        <div className="grid grid-4">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={href(lc, `gites/${o.slug}`)}
              className="mini-card reveal"
            >
              <strong>{o.name}</strong>
              <span>{o.kicker}</span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBlock
        eyebrow={c.contact.eyebrow}
        title={`${c.cta.giteTitle} — ${g.name}`}
        text={c.contact.intro}
        cta={{ href: href(lc, "contact"), label: c.common.bookNow }}
        bg={media(KEY_MEDIA.coucherGrandeAnse, g.name)}
      />
    </>
  );
}
