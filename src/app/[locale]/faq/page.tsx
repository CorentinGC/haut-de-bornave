import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { href } from "@/lib/nav";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { media, KEY_MEDIA } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, faqPageLd } from "@/lib/jsonld";
import { CtaBlock, FaqList, PageHero, Section } from "@/components/ui";

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
    path: "faq",
    seo: getContent(locale).faqPage.seo,
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);
  const all = [
    ...c.globalFaq,
    ...c.rayons.faq,
    ...c.gites.flatMap((g) => g.faq),
  ];

  return (
    <>
      <JsonLd
        data={[
          faqPageLd(all),
          breadcrumbLd(lc, [
            { name: c.nav.home, path: "" },
            { name: c.nav.faq, path: "faq" },
          ]),
        ]}
      />

      <PageHero
        eyebrow={c.faqPage.eyebrow}
        title={c.faqPage.title}
        lead={c.faqPage.intro}
        media={media(KEY_MEDIA.domaineWide, c.faqPage.title)}
        breadcrumb={[
          { name: c.nav.home, href: href(lc) },
          { name: c.nav.faq },
        ]}
      />

      <Section>
        <FaqList items={c.globalFaq} />
      </Section>

      <Section alt>
        <FaqList
          title={c.nav.rayons}
          items={c.rayons.faq}
        />
      </Section>

      <CtaBlock
        eyebrow={c.contact.eyebrow}
        title={c.cta.genericTitle}
        text={c.contact.intro}
        cta={{ href: href(lc, "contact"), label: c.common.contactUs }}
        bg={media(KEY_MEDIA.coucherDeshaies, c.faqPage.title)}
      />
    </>
  );
}
