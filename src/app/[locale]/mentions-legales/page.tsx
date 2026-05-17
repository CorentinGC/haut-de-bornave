/**
 * Page « mentions-legales » du site.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { href } from "@/lib/nav";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs, Section } from "@/components/ui";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    ...pageMetadata({
      locale,
      path: "mentions-legales",
      seo: getContent(locale).mentions.seo,
    }),
    robots: { index: false, follow: true },
  };
}

export default async function MentionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const c = getContent(lc);
  const m = c.mentions;

  return (
    <Section className="legal-page">
      <Breadcrumbs
        trail={[
          { name: c.nav.home, href: href(lc) },
          { name: m.title },
        ]}
      />
      <h1 className="h-xl" style={{ margin: "1.5rem 0 0.5rem" }}>
        {m.title}
      </h1>
      <p style={{ color: "var(--c-muted)" }}>{m.updated}</p>
      <div className="prose" style={{ maxWidth: "72ch", marginTop: "2.5rem" }}>
        {m.blocks.map((b) => (
          <section key={b.heading} style={{ marginBottom: "2.5rem" }}>
            <h2 className="h-md">{b.heading}</h2>
            {b.paragraphs.map((p, i) => (
              <p key={i} style={{ marginTop: "0.75rem" }}>
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </Section>
  );
}
