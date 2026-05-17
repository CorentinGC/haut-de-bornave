import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { href } from "@/lib/nav";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { media, KEY_MEDIA } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import {
  CtaBlock,
  FeatureGrid,
  PageHero,
  Section,
  SecHead,
} from "@/components/ui";

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
    path: "evenements",
    seo: getContent(locale).evenements.seo,
  });
}

export default async function EvenementsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);
  const e = c.evenements;

  return (
    <>
      <JsonLd
        data={breadcrumbLd(lc, [
          { name: c.nav.home, path: "" },
          { name: c.nav.evenements, path: "evenements" },
        ])}
      />

      <PageHero
        eyebrow={e.eyebrow}
        title={e.title}
        lead={e.intro}
        media={media(KEY_MEDIA.coucherTainos, e.title)}
        breadcrumb={[
          { name: c.nav.home, href: href(lc) },
          { name: c.nav.evenements },
        ]}
      />

      <Section>
        <div className="grid grid-3">
          {e.blocks.map((b, i) => (
            <article
              key={b.title}
              className={`info-card reveal${i % 3 ? ` reveal--delay-${i % 3}` : ""}`}
            >
              <h2 className="h-md">{b.title}</h2>
              <p>{b.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section alt>
        <SecHead eyebrow={e.eyebrow} title={e.equipmentTitle} />
        <FeatureGrid
          items={e.equipment.map((eq) => ({ title: eq, text: "" }))}
        />
      </Section>

      <Section>
        <SecHead
          eyebrow={e.eyebrow}
          title={lc === "fr" ? "Tarifs & conditions" : "Rates & terms"}
        />
        <div className="grid grid-2">
          {e.pricing.map((pr) => (
            <div key={pr.label} className="price-card reveal">
              <span className="eyebrow">{pr.label}</span>
              <strong className="price-card__amount">{pr.price}</strong>
              <p>{pr.detail}</p>
            </div>
          ))}
        </div>
        <p className="lead reveal" style={{ marginTop: "2rem" }}>
          {e.philosophy}
        </p>
      </Section>

      <CtaBlock
        eyebrow={c.contact.eyebrow}
        title={lc === "fr" ? "Un projet d'événement ?" : "An event project?"}
        text={c.contact.intro}
        cta={{ href: href(lc, "contact"), label: c.common.requestQuote }}
        bg={media(KEY_MEDIA.coucherGrandeAnse, e.title)}
      />
    </>
  );
}
