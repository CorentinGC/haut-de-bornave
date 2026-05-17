import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, SITE, type Locale } from "@/lib/site";
import { href } from "@/lib/nav";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { media, KEY_MEDIA } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import { PageHero, Section } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { WhatsappBanner } from "@/components/WhatsappBanner";

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
    path: "contact",
    seo: getContent(locale).contact.seo,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);
  const ct = c.contact;

  return (
    <>
      <JsonLd
        data={breadcrumbLd(lc, [
          { name: c.nav.home, path: "" },
          { name: c.nav.contact, path: "contact" },
        ])}
      />

      <PageHero
        eyebrow={ct.eyebrow}
        title={ct.title}
        lead={ct.intro}
        media={media(KEY_MEDIA.coucherDeshaies, ct.title)}
        breadcrumb={[
          { name: c.nav.home, href: href(lc) },
          { name: c.nav.contact },
        ]}
      />

      <Section>
        <WhatsappBanner wa={ct.wa} />

        <div className="contact-wrap">
          <div className="contact-intro">
            <h2 className="h-lg">{ct.modalitiesTitle}</h2>
            <p>{ct.modalitiesText}</p>

            <div className="contact-quick">
              <a href={`tel:${SITE.phone.e164}`} className="contact-quick__item">
                <strong>{c.common.callUs}</strong>
                <span>{SITE.phone.display}</span>
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener"
                className="contact-quick__item"
              >
                <strong>WhatsApp · {SITE.host.name}</strong>
                <span>{SITE.phone.display}</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="contact-quick__item">
                <strong>Email</strong>
                <span>{SITE.email}</span>
              </a>
              <p className="contact-quick__item" style={{ cursor: "default" }}>
                <strong>{lc === "fr" ? "Adresse" : "Address"}</strong>
                <span>
                  {SITE.address.street}, {SITE.address.postalCode}{" "}
                  {SITE.address.locality}, {SITE.address.region}
                </span>
              </p>
            </div>

            <div className="contact-pay">
              <h3 className="h-md">{ct.paymentsTitle}</h3>
              <div className="contact-pay__chips">
                {SITE.payments.map((p) => (
                  <span className="chip" key={p}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ContactForm form={ct.form} />
        </div>
      </Section>
    </>
  );
}
