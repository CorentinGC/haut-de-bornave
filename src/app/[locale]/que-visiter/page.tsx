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
import { CtaBlock, Cover, PageHero, Section } from "@/components/ui";

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
    path: "que-visiter",
    seo: getContent(locale).queVisiter.seo,
  });
}

export default async function QueVisiterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: c.articles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${href(lc, `que-visiter/${a.slug}`)}`,
      name: a.title,
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          itemListLd,
          breadcrumbLd(lc, [
            { name: c.nav.home, path: "" },
            { name: c.nav.queVisiter, path: "que-visiter" },
          ]),
        ]}
      />

      <PageHero
        eyebrow={c.queVisiter.eyebrow}
        title={c.queVisiter.title}
        lead={c.queVisiter.intro}
        media={media(KEY_MEDIA.grandeAnse, c.queVisiter.title)}
        breadcrumb={[
          { name: c.nav.home, href: href(lc) },
          { name: c.nav.queVisiter },
        ]}
      />

      <Section>
        <div className="article-grid">
          {c.articles.map((a) => (
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
                <h2 className="h-md">{a.title}</h2>
                <p>{a.excerpt}</p>
                <span className="more">
                  {c.common.readArticle} ·{" "}
                  <small>{a.readingTime}</small>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBlock
        eyebrow={c.contact.eyebrow}
        title={c.cta.genericTitle}
        text={c.contact.intro}
        cta={{ href: href(lc, "contact"), label: c.common.contactUs }}
        bg={media(KEY_MEDIA.coucherDeshaies, c.queVisiter.title)}
      />
    </>
  );
}
