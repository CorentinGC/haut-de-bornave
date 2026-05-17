import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, SITE, type Locale } from "@/lib/site";
import { href } from "@/lib/nav";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { media, KEY_MEDIA } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import { Btn, CtaBlock, PageHero, Section } from "@/components/ui";

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
    path: "bien-etre",
    seo: getContent(locale).bienEtre.seo,
  });
}

export default async function BienEtrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);
  const b = c.bienEtre;

  return (
    <>
      <JsonLd
        data={breadcrumbLd(lc, [
          { name: c.nav.domaine, path: "" },
          { name: c.nav.bienEtre, path: "bien-etre" },
        ])}
      />

      <PageHero
        eyebrow={b.eyebrow}
        title={b.title}
        media={media(KEY_MEDIA.coucherGrandeAnse, b.title)}
        breadcrumb={[
          { name: c.nav.domaine, href: href(lc) },
          { name: c.nav.bienEtre },
        ]}
      />

      <Section>
        <div className="prose reveal" style={{ maxWidth: "70ch" }}>
          <p className="lead">{b.text}</p>
          <p style={{ marginTop: "1.5rem", color: "var(--c-muted)" }}>
            {b.partnerNote}
          </p>
          <p style={{ marginTop: "2rem" }}>
            <Btn href={SITE.partner.url} variant="ghost" external>
              {SITE.partner.name}
            </Btn>
          </p>
        </div>
      </Section>

      <CtaBlock
        eyebrow={c.contact.eyebrow}
        title={c.cta.genericTitle}
        text={c.contact.intro}
        cta={{ href: href(lc, "contact"), label: c.common.contactUs }}
        bg={media(KEY_MEDIA.coucherTainos, b.title)}
      />
    </>
  );
}
