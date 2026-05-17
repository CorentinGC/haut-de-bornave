import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { href } from "@/lib/nav";
import { getContent, getGite } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { gitePhotos, media, KEY_MEDIA } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, faqPageLd } from "@/lib/jsonld";
import {
  Btn,
  CtaBlock,
  FaqList,
  PageHero,
  Section,
  SecHead,
} from "@/components/ui";
import { Carousel } from "@/components/Carousel";

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
    path: "rayons-de-soleil",
    seo: getContent(locale).rayons.seo,
  });
}

export default async function RayonsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);
  const r = c.rayons;
  const jaune = getGite(lc, "rayon-jaune")!;
  const bleu = getGite(lc, "rayon-bleu")!;

  return (
    <>
      <JsonLd
        data={[
          faqPageLd(r.faq),
          breadcrumbLd(lc, [
            { name: c.nav.home, path: "" },
            { name: c.nav.rayons, path: "rayons-de-soleil" },
          ]),
        ]}
      />

      <PageHero
        eyebrow={r.eyebrow}
        title={r.title}
        lead={r.subtitle}
        media={media(
          gitePhotos("le-rayon-jaune", jaune.name)[0]?.src ??
            KEY_MEDIA.coucherGrandeAnse,
          r.title,
        )}
        breadcrumb={[
          { name: c.nav.home, href: href(lc) },
          { name: c.nav.rayons },
        ]}
      />

      <Section>
        <p className="lead reveal" style={{ maxWidth: "70ch" }}>
          {r.intro}
        </p>
      </Section>

      {[jaune, bleu].map((g, i) => {
        const photos = gitePhotos(g.mediaPrefix, g.name);
        const theme = g.slug === "rayon-jaune" ? "jaune" : "bleu";
        return (
          <Section key={g.slug} alt={i % 2 === 1} id={g.slug}>
            <article
              className={`gite-card reveal${
                i % 2 ? " gite-card--reverse" : ""
              }`}
              data-rayon={theme}
            >
              <div className="gite-card__inner">
                <Carousel photos={photos} />
                <div className="gite-card__content">
                  <span className="gite-card__tag">{g.kicker}</span>
                  <h2>{g.name}</h2>
                  <p className="gite-card__lead">{g.intro}</p>
                  <ul className="gite-card__equip">
                    {g.equipment.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                  <div className="gite-card__price">
                    <strong>{g.pricePerNight} €</strong>
                    <small>{c.common.perNight}</small>
                    <span style={{ color: "var(--c-line)" }}>·</span>
                    <span>
                      + {g.cleaningFee} € {c.common.cleaningFee.toLowerCase()}
                    </span>
                  </div>
                  <Btn href={href(lc, "contact")} variant="primary">
                    {c.common.bookNow} — {g.name}
                  </Btn>
                </div>
              </div>
            </article>
          </Section>
        );
      })}

      <Section>
        <SecHead
          eyebrow={r.eyebrow}
          title={r.modulableTitle}
          lead={r.modulableText}
        />
        <ul className="check-grid reveal">
          {r.useCases.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
        <p className="lead reveal" style={{ marginTop: "1.5rem" }}>
          {r.twinPricingNote}
        </p>
      </Section>

      <Section alt>
        <SecHead eyebrow={c.faqPage.eyebrow} title={c.faqPage.title} />
        <FaqList items={r.faq} />
      </Section>

      <CtaBlock
        eyebrow={c.contact.eyebrow}
        title={lc === "fr" ? "Une escapade à deux ?" : "A getaway for two?"}
        text={c.contact.intro}
        cta={{ href: href(lc, "contact"), label: c.common.bookNow }}
        bg={media(KEY_MEDIA.coucherTainos, r.title)}
      />
    </>
  );
}
