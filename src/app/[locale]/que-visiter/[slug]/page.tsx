/**
 * Page « que-visiter/slug » du site.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { bookingHref, href } from "@/lib/nav";
import { getContent, getArticle } from "@/content";
import { articlesFr, articlesEn } from "@/content/articles";
import { pageMetadata } from "@/lib/seo";
import { media } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { articleLd, breadcrumbLd, faqPageLd } from "@/lib/jsonld";
import {
  CtaBlock,
  FaqList,
  PageHero,
  Pic,
  Section,
  SecHead,
} from "@/components/ui";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    ...articlesFr.map((a) => ({ locale: "fr", slug: a.slug })),
    ...articlesEn.map((a) => ({ locale: "en", slug: a.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const a = getArticle(locale, slug);
  if (!a) return {};
  return pageMetadata({
    locale,
    path: `que-visiter/${slug}`,
    seo: a.seo,
    image: a.cover,
    type: "article",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);
  const a = getArticle(lc, slug);
  if (!a) notFound();

  const related = c.gites.filter((g) => a.relatedGites.includes(g.slug));

  return (
    <>
      <JsonLd
        data={[
          articleLd(lc, a),
          ...(a.faq.length > 0 ? [faqPageLd(a.faq)] : []),
          breadcrumbLd(lc, [
            { name: c.nav.home, path: "" },
            { name: c.nav.queVisiter, path: "que-visiter" },
            { name: a.title, path: `que-visiter/${a.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`${a.category}${a.distance ? ` · ${a.distance}` : ""}`}
        title={a.title}
        lead={a.excerpt}
        media={media(a.cover, a.title)}
        breadcrumb={[
          { name: c.nav.home, href: href(lc) },
          { name: c.nav.queVisiter, href: href(lc, "que-visiter") },
          { name: a.title },
        ]}
      />

      <Section>
        <article className="prose reveal" style={{ maxWidth: "72ch", marginInline: "auto" }}>
          {a.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: "2rem" }}>
              {s.heading && <h2 className="h-md">{s.heading}</h2>}
              {s.paragraphs.map((p, j) => (
                <p key={j} style={{ marginTop: "0.9rem" }}>
                  {p}
                </p>
              ))}
              {s.image && (
                <figure className="article-figure reveal">
                  <Pic
                    media={media(s.image.src, s.image.alt)}
                    sizes="(max-width: 820px) 100vw, 72ch"
                  />
                  {(s.image.caption || s.image.credit) && (
                    <figcaption>
                      {s.image.caption}
                      {s.image.credit && (
                        <span className="article-figure__credit">
                          {s.image.caption ? " — " : ""}
                          {s.image.credit}
                        </span>
                      )}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          ))}
          <p style={{ marginTop: "2.5rem" }}>
            <Link href={href(lc, "que-visiter")} className="link-arrow">
              ← {c.common.allArticles}
            </Link>
          </p>
        </article>
      </Section>

      {a.faq.length > 0 && (
        <Section alt>
          <FaqList
            title={
              lc === "fr"
                ? "Questions fréquentes"
                : "Frequently asked questions"
            }
            items={a.faq}
          />
        </Section>
      )}

      {related.length > 0 && (
        <Section>
          <SecHead
            eyebrow={c.gitesPage.eyebrow}
            title={
              lc === "fr"
                ? "Où séjourner pour en profiter"
                : "Where to stay to enjoy it"
            }
          />
          <div className="grid grid-3">
            {related.map((g) => (
              <Link
                key={g.slug}
                href={href(lc, `gites/${g.slug}`)}
                className="mini-card reveal"
              >
                <strong>{g.name}</strong>
                <span>{g.kicker}</span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaBlock
        eyebrow={c.contact.eyebrow}
        title={c.cta.homeTitle}
        text={c.cta.homeText}
        cta={{ href: bookingHref(lc), label: c.common.bookNow }}
        bg={media(a.cover, a.title)}
      />
    </>
  );
}
