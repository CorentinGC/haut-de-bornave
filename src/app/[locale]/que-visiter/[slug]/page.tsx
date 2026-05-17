import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { href } from "@/lib/nav";
import { getContent, getArticle } from "@/content";
import { articlesFr } from "@/content/articles.fr";
import { articlesEn } from "@/content/articles.en";
import { pageMetadata } from "@/lib/seo";
import { media } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { articleLd, breadcrumbLd } from "@/lib/jsonld";
import { CtaBlock, PageHero, Section, SecHead } from "@/components/ui";

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
          breadcrumbLd(lc, [
            { name: c.nav.domaine, path: "" },
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
          { name: c.nav.domaine, href: href(lc) },
          { name: c.nav.queVisiter, href: href(lc, "que-visiter") },
          { name: a.title },
        ]}
      />

      <Section>
        <article className="prose reveal" style={{ maxWidth: "72ch" }}>
          {a.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: "2rem" }}>
              {s.heading && <h2 className="h-md">{s.heading}</h2>}
              {s.paragraphs.map((p, j) => (
                <p key={j} style={{ marginTop: "0.9rem" }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p style={{ marginTop: "2.5rem" }}>
            <Link href={href(lc, "que-visiter")} className="link-arrow">
              ← {c.common.allArticles}
            </Link>
          </p>
        </article>
      </Section>

      {related.length > 0 && (
        <Section alt>
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
        cta={{ href: href(lc, "contact"), label: c.common.bookNow }}
        bg={media(a.cover, a.title)}
      />
    </>
  );
}
