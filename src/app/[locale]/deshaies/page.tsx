/**
 * Page « deshaies » du site.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { href } from "@/lib/nav";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { media, KEY_MEDIA } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import {
  Btn,
  Cover,
  CtaBlock,
  PageHero,
  Section,
  SecHead,
  SplitFeature,
} from "@/components/ui";

export const dynamic = "force-static";

/** Visuel associé à chaque section destination (médias lieux existants). */
const SECTION_MEDIA = [
  KEY_MEDIA.port,
  KEY_MEDIA.grandeAnse,
  KEY_MEDIA.leroux,
  KEY_MEDIA.coucherTainos,
];

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
  const articles = c.articles.slice(0, 6);

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

      {/* Sections destination : image + texte alternés (riche, vivant) */}
      {d.sections.map((s, i) => (
        <Section key={s.title} alt={i % 2 === 1}>
          <SplitFeature
            reverse={i % 2 === 1}
            eyebrow={d.eyebrow}
            title={s.title}
            paragraphs={[s.text]}
            media={media(
              SECTION_MEDIA[i] ?? KEY_MEDIA.grandeAnse,
              `${s.title} — Deshaies, Guadeloupe`,
            )}
          />
        </Section>
      ))}

      {/* Guide local : cartes d'articles (visuel + maillage interne SEO) */}
      <Section>
        <SecHead
          eyebrow={c.queVisiter.eyebrow}
          title={c.queVisiter.title}
          lead={c.queVisiter.intro}
        />
        <div className="article-grid">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={href(lc, `que-visiter/${a.slug}`)}
              className="article-card reveal"
            >
              <div className="article-card__media">
                <Cover
                  media={media(a.cover, a.title)}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </div>
              <div className="article-card__body">
                <span className="eyebrow" style={{ color: "var(--c-gold)" }}>
                  {a.category}
                  {a.distance ? ` · ${a.distance}` : ""}
                </span>
                <h3 className="h-md">{a.title}</h3>
                <p>{a.excerpt}</p>
                <span className="more">
                  {c.common.readArticle} · <small>{a.readingTime}</small>
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Btn href={href(lc, "que-visiter")} variant="ghost">
            {c.common.allArticles}
          </Btn>
        </p>
      </Section>

      {/* Conclusion mise en valeur */}
      <Section alt>
        <blockquote className="pull-quote reveal">{d.conclusion}</blockquote>
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
