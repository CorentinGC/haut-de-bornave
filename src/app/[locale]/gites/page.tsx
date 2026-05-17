/**
 * Page « gites » du site.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { bookingHref, href } from "@/lib/nav";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { media, KEY_MEDIA, gitePhotos } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import {
  Btn,
  CtaBlock,
  FeatureGrid,
  GiteCard,
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
          { name: c.nav.home, path: "" },
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
          { name: c.nav.home, href: href(lc) },
          { name: c.nav.gites },
        ]}
      />

      {c.gites.map((g, i) => {
        const photos = gitePhotos(g.mediaPrefix, g.name);
        return (
          <Section key={g.slug} alt={i % 2 === 1} id={g.slug}>
            <GiteCard
              photos={photos}
              kicker={g.kicker}
              name={g.name}
              lead={g.tagline}
              facts={[
                { value: g.facts.surface, label: lc === "fr" ? "Surface" : "Area" },
                { value: g.facts.capacity.replace(/\D/g, ""), label: lc === "fr" ? "Personnes" : "People" },
                { value: g.facts.bedrooms.replace(/\D/g, ""), label: lc === "fr" ? "Chambres" : "Bedrooms" },
                { value: g.facts.privatePool ? "✓" : "—", label: lc === "fr" ? "Piscine privée" : "Private pool" },
              ]}
              equipment={g.equipment.slice(0, 8)}
              price={{
                amount: g.pricePerNight,
                perNightLabel: c.common.perNight,
                cleaningFee: g.cleaningFee,
                cleaningLabel: c.common.cleaningFee.toLowerCase(),
              }}
              reverse={i % 2 !== 0}
              actions={
                <>
                  <Btn href={href(lc, `gites/${g.slug}`)} variant="primary">
                    {c.common.discover}
                  </Btn>
                  <Btn href={bookingHref(lc)} variant="ghost" arrow={false}>
                    {c.common.bookNow}
                  </Btn>
                </>
              }
            />
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
        cta={{ href: bookingHref(lc), label: c.common.requestQuote }}
        bg={media(KEY_MEDIA.coucherDeshaies, c.cta.genericTitle)}
      />
    </>
  );
}
