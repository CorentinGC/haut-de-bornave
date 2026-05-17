/**
 * Utilitaires jsonld.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { SITE, absoluteUrl, type Locale } from "./site";
import type { Article, GiteContent, SiteContent } from "@/content/types";

/**
 * Constructeurs de données structurées JSON-LD (schema.org) — clés du SEO :
 * LodgingBusiness, VacationRental (par gîte), FAQPage, BreadcrumbList,
 * Organization, Article. Validés via Rich Results Test (voir seo/structured-data.md).
 */

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  postalCode: SITE.address.postalCode,
  addressLocality: SITE.address.locality,
  addressRegion: SITE.address.region,
  addressCountry: SITE.address.country,
};

const geo = {
  "@type": "GeoCoordinates",
  latitude: SITE.geo.lat,
  longitude: SITE.geo.lng,
};

const sameAs = [SITE.social.facebook, SITE.social.instagram];

function abs(path: string): string {
  return path.startsWith("http") ? path : `${SITE.url}${path}`;
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: abs("/media/brand/logo-hauts-bornave.webp"),
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone.e164,
      contactType: "reservations",
      availableLanguage: ["fr", "en"],
    },
  };
}

export function lodgingBusinessLd(locale: Locale, c: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE.url}/#lodging`,
    name: SITE.name,
    description: c.home.seo.description,
    url: absoluteUrl(locale),
    telephone: SITE.phone.e164,
    email: SITE.email,
    address: postalAddress,
    geo,
    sameAs,
    priceRange: SITE.priceRange,
    image: [
      abs("/media/lieux/coucher-de-soleil-sur-deshaies.webp"),
      abs("/media/domaine/le-domaine-les-hauts-de-bornave-deshaies-guadeloupe-5.webp"),
      abs("/media/lieux/plage-de-grande-anse-a-deshaies-guadeloupe-6.webp"),
    ],
    amenityFeature: [
      "Piscine à débordement vue mer",
      "Piscines privatives",
      "Jardin tropical",
      "Climatisation",
      "Parking gratuit sur place",
      "Vue mer",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    numberOfRooms: 11,
    petsAllowed: false,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating.value,
      bestRating: SITE.rating.best,
      ratingCount: SITE.rating.count,
    },
    review: c.reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 10,
      },
      reviewBody: r.text,
      ...(r.date ? { datePublished: r.date } : {}),
    })),
  };
}

export function vacationRentalLd(
  locale: Locale,
  gite: GiteContent,
  images: string[],
) {
  const rating = SITE.rating;
  const capacity = parseInt(gite.facts.capacity.replace(/\D/g, ""), 10) || 2;
  const bedrooms = parseInt(gite.facts.bedrooms, 10) || 1;
  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `${absoluteUrl(locale, `gites/${gite.slug}`)}#rental`,
    name: `${gite.name} — ${SITE.name}`,
    description: gite.seo.description,
    url: absoluteUrl(locale, `gites/${gite.slug}`),
    identifier: gite.slug,
    image: images.slice(0, 12).map(abs),
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
    address: postalAddress,
    brand: { "@type": "Brand", name: SITE.name },
    containsPlace: {
      "@type": "Accommodation",
      additionalType: "EntirePlace",
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: capacity,
        unitText: "person",
      },
      numberOfBedrooms: bedrooms,
      numberOfBathroomsTotal: 1,
      floorSize: {
        "@type": "QuantitativeValue",
        value: parseInt(gite.facts.surface.replace(/\D/g, ""), 10) || undefined,
        unitCode: "MTK",
      },
      amenityFeature: gite.equipment.map((name) => ({
        "@type": "LocationFeatureSpecification",
        name,
        value: true,
      })),
    },
    offers: {
      "@type": "Offer",
      price: gite.pricePerNight,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(locale, "contact"),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      bestRating: rating.best,
      ratingCount: rating.count,
    },
  };
}

export function faqPageLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(
  locale: Locale,
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absoluteUrl(locale, t.path),
    })),
  };
}

export function articleLd(locale: Locale, a: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    image: abs(a.cover),
    articleSection: a.category,
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: abs("/media/brand/logo-hauts-bornave.webp"),
      },
    },
    mainEntityOfPage: absoluteUrl(locale, `que-visiter/${a.slug}`),
  };
}
