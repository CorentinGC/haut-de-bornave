/**
 * Page « avis » du site.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, SITE, type Locale } from "@/lib/site";
import { bookingHref, href } from "@/lib/nav";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { media, KEY_MEDIA } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import { CtaBlock, PageHero, Section, Testimonials } from "@/components/ui";

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
    path: "avis",
    seo: getContent(locale).avis.seo,
  });
}

export default async function AvisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);

  const reviewLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: SITE.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating.value,
      bestRating: SITE.rating.best,
      ratingCount: SITE.rating.count,
    },
    review: c.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 10,
      },
      reviewBody: r.text,
      ...(r.date ? { datePublished: r.date } : {}),
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          reviewLd,
          breadcrumbLd(lc, [
            { name: c.nav.home, path: "" },
            { name: c.nav.avis, path: "avis" },
          ]),
        ]}
      />

      <PageHero
        eyebrow={c.avis.eyebrow}
        title={c.avis.title}
        lead={c.avis.intro}
        media={media(KEY_MEDIA.coucherGrandeAnse, c.avis.title)}
        breadcrumb={[
          { name: c.nav.home, href: href(lc) },
          { name: c.nav.avis },
        ]}
      />

      <Section>
        <Testimonials reviews={c.reviews} />
      </Section>

      <CtaBlock
        eyebrow={c.contact.eyebrow}
        title={c.cta.homeTitle}
        text={c.cta.homeText}
        cta={{ href: bookingHref(lc), label: c.common.bookNow }}
        bg={media(KEY_MEDIA.coucherTainos, c.avis.title)}
      />
    </>
  );
}
