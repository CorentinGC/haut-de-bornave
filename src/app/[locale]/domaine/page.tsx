/**
 * Page « domaine » du site.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { bookingHref, href } from "@/lib/nav";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { media, KEY_MEDIA, domainePhotos } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import {
  Btn,
  CtaBlock,
  FeatureGrid,
  PageHero,
  Section,
  SecHead,
  SplitFeature,
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
    path: "domaine",
    seo: getContent(locale).domaine.seo,
  });
}

export default async function DomainePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);
  const d = c.domaine;
  const gallery = domainePhotos(c.domaine.title);

  return (
    <>
      <JsonLd
        data={breadcrumbLd(lc, [
          { name: c.nav.home, path: "" },
          { name: d.eyebrow, path: "domaine" },
        ])}
      />

      <PageHero
        eyebrow={d.eyebrow}
        title={d.title}
        lead={d.intro}
        media={media(KEY_MEDIA.domaineWide, d.title)}
        breadcrumb={[
          { name: c.nav.home, href: href(lc) },
          { name: d.eyebrow },
        ]}
      />

      <Section>
        <SplitFeature
          eyebrow={d.eyebrow}
          title={d.presentationTitle}
          paragraphs={[d.presentation]}
          media={gallery[0] ?? media(KEY_MEDIA.domaineHero, d.title)}
        />
      </Section>

      <Section alt>
        <SecHead eyebrow={d.eyebrow} title={d.viewTitle} lead={d.viewText} />
      </Section>

      <Section>
        <SecHead eyebrow={d.eyebrow} title={d.spacesTitle} />
        <FeatureGrid items={d.spaces} />
        <p className="spaces-note reveal">{d.spacesNote}</p>
      </Section>

      <Section alt>
        <SplitFeature
          reverse
          eyebrow={d.missionTitle}
          title={d.missionTitle}
          paragraphs={[d.mission]}
          media={
            gallery[3] ?? media(KEY_MEDIA.vueAerienne, "Vue aérienne du domaine")
          }
        />
      </Section>

      <Section>
        <SecHead
          eyebrow={c.deshaies.eyebrow}
          title={c.home.deshaiesTitle}
        />
        <div className="grid grid-2">
          {d.beaches.map((b, i) => {
            const isGrandeAnse = i === 1;
            const article = c.articles.find((a) =>
              /plage|beach/.test(a.slug),
            );
            const target =
              isGrandeAnse && article
                ? href(lc, `que-visiter/${article.slug}`)
                : href(lc, "que-visiter");
            const label = isGrandeAnse
              ? c.common.readArticle
              : c.queVisiter.title;
            return (
              <article key={b.name} className="info-card reveal">
                <h3 className="h-md">{b.name}</h3>
                <p>{b.text}</p>
                <div className="info-card__cta">
                  <Btn href={target} variant="ghost">
                    {label}
                  </Btn>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <CtaBlock
        eyebrow={c.contact.eyebrow}
        title={c.cta.domaineTitle}
        text={c.home.eventsText}
        cta={{ href: bookingHref(lc), label: c.common.requestQuote }}
        bg={media(KEY_MEDIA.coucherTainos, c.cta.domaineTitle)}
      />
    </>
  );
}
