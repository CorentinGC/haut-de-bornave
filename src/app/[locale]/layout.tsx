import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { fraunces, inter } from "@/lib/fonts";
import { LOCALES, isLocale, type Locale } from "@/lib/site";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ScrollReveal } from "@/components/ScrollReveal";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd } from "@/lib/jsonld";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getContent(locale);
  return {
    ...pageMetadata({ locale, path: "", seo: c.home.seo }),
    title: { default: c.home.seo.title, template: `%s` },
    icons: {
      icon: [{ url: "/media/brand/logo-les-hauts-de-bornave.svg" }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lc = locale as Locale;
  const content = getContent(lc);

  return (
    <html
      lang={lc}
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {/* Active les animations reveal AVANT le 1er paint (comme le site .fr) :
            sans JS, .reveal reste visible (résilient / SEO). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <JsonLd data={organizationLd()} />
        <a href="#main" className="skip-link">
          {content.common.skipToContent}
        </a>
        <Header locale={lc} content={content} />
        <main id="main">{children}</main>
        <Footer locale={lc} content={content} />
        <MobileBottomNav locale={lc} content={content} />
        <ScrollReveal />
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: "#14342b",
  width: "device-width",
  initialScale: 1,
};
