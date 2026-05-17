import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { href } from "@/lib/nav";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { media, KEY_MEDIA } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import { Btn, CtaBlock, PageHero, Section, SecHead } from "@/components/ui";

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
    path: "deshaies",
    seo: getContent(locale).deshaies.seo,
  });
}

export default async function DeshaiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);
  const d = c.deshaies;

  return (
    <>
      <JsonLd
        data={breadcrumbLd(lc, [
          { name: c.nav.home, path: "" },
          { name: c.nav.deshaies, path: "deshaies" },
        ])}
      />

      <PageHero
        eyebrow={d.eyebrow}
        title={d.title}
        lead={d.intro}
        media={media(KEY_MEDIA.grandeAnse, d.title)}
        breadcrumb={[
          { name: c.nav.home, href: href(lc) },
          { name: c.nav.deshaies },
        ]}
      />

      {d.sections.map((s, i) => (
        <Section key={s.title} alt={i % 2 === 1}>
          <div className="prose reveal" style={{ maxWidth: "72ch" }}>
            <h2 className="h-lg">{s.title}</h2>
            <p className="lead">{s.text}</p>
          </div>
        </Section>
      ))}

      <Section>
        <SecHead
          eyebrow={c.queVisiter.eyebrow}
          title={c.queVisiter.title}
          lead={c.queVisiter.intro}
        />
        <p>
          <Btn href={href(lc, "que-visiter")} variant="primary">
            {c.common.allArticles}
          </Btn>
        </p>
      </Section>

      <Section alt>
        <p className="lead reveal" style={{ maxWidth: "72ch" }}>
          {d.conclusion}
        </p>
      </Section>

      <CtaBlock
        eyebrow={c.contact.eyebrow}
        title={c.cta.genericTitle}
        text={c.contact.intro}
        cta={{ href: href(lc, "contact"), label: c.common.contactUs }}
        bg={media(KEY_MEDIA.coucherDeshaies, d.title)}
      />
    </>
  );
}
