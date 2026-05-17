/**
 * Schéma de contenu du site (FR + EN). Le contenu textuel est repris
 * fidèlement de leshautsdebornave.com (verbatim côté FR). Voir
 * docs/contenu-decisions.md pour les arbitrages d'incohérences source.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

export interface SeoMeta {
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Review {
  author: string;
  origin?: string;
  rating: number; // sur 10
  text: string;
  detail?: string;
  date?: string; // ISO
}

export interface GiteContent {
  slug:
    | "gran-kaz"
    | "kaz-an-nou"
    | "ti-kaz-la"
    | "rayon-jaune"
    | "rayon-bleu";
  /** Préfixe des fichiers média dans /public/media/gites/. */
  mediaPrefix: string;
  name: string;
  /** Sous-titre court (capacité / ambiance) affiché sur les cartes. */
  kicker: string;
  tagline: string;
  intro: string;
  /** Paragraphes additionnels de présentation. */
  body: string[];
  facts: {
    surface: string;
    capacity: string;
    bedrooms: string;
    beds: string;
    bathrooms: string;
    privatePool: boolean;
  };
  pricePerNight: number;
  cleaningFee: number;
  equipment: string[];
  idealFor: string[];
  faq: FaqItem[];
  seo: SeoMeta;
}

export interface ArticleImage {
  /** Chemin /media/... auto-hébergé (jamais de hotlink). */
  src: string;
  /** Texte alternatif géolocalisé (« … Deshaies, Guadeloupe »). */
  alt: string;
  /** Légende affichée sous l'image (optionnel). */
  caption?: string;
  /** Crédit/licence si image libre de droits (obligatoire pour celles-ci). */
  credit?: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  /** Illustration optionnelle de la section (anti-CLS via le manifeste). */
  image?: ArticleImage;
}

export interface Article {
  slug: string;
  /** Photo de couverture (/media/...). */
  cover: string;
  category: string;
  title: string;
  excerpt: string;
  /** Temps de lecture estimé, ex. "4 min". */
  readingTime: string;
  /** Distance / temps depuis le domaine (SEO local). */
  distance?: string;
  /** Date de publication ISO (JSON-LD Article). */
  datePublished: string;
  /** Date de dernière révision ISO (JSON-LD Article). */
  dateModified?: string;
  sections: ArticleSection[];
  /** Questions fréquentes (JSON-LD FAQPage + accordéon). */
  faq: FaqItem[];
  /** Slugs de gîtes vers lesquels mailler en interne. */
  relatedGites: GiteContent["slug"][];
  seo: SeoMeta;
}

/** Partie d'un article spécifique à une locale (dans le fichier JSON). */
export interface ArticleLocale {
  slug: string;
  title: string;
  excerpt: string;
  /** Catégorie affichée, localisée (« Plages » / « Beaches »…). */
  category: string;
  readingTime: string;
  distance?: string;
  sections: ArticleSection[];
  faq: FaqItem[];
  seo: SeoMeta;
}

/**
 * Forme d'un fichier src/content/articles/<slug>.json : champs communs aux
 * deux langues + charges FR/EN. Le loader le dérive en deux `Article` (un par
 * locale) — voir src/content/articles/index.ts.
 */
export interface ArticleFile {
  /** Ordre d'affichage (liste + sitemap). */
  order: number;
  /** Photo de couverture (/media/...). */
  cover: string;
  /** Date de publication ISO (JSON-LD Article). */
  datePublished: string;
  /** Date de dernière révision ISO (JSON-LD Article). */
  dateModified?: string;
  /** Slugs de gîtes vers lesquels mailler en interne. */
  relatedGites: GiteContent["slug"][];
  fr: ArticleLocale;
  en: ArticleLocale;
}

export interface SiteContent {
  /** Libellés de navigation (header / footer). */
  nav: {
    home: string;
    domaine: string;
    gites: string;
    rayons: string;
    evenements: string;
    bienEtre: string;
    queVisiter: string;
    deshaies: string;
    avis: string;
    faq: string;
    contact: string;
    reserve: string; // CTA
  };
  common: {
    discover: string;
    bookNow: string;
    requestQuote: string;
    contactUs: string;
    whatsappSerge: string;
    callUs: string;
    seeAllGites: string;
    backToGites: string;
    perNight: string;
    cleaningFee: string;
    upTo: string;
    nights: string;
    readArticle: string;
    allArticles: string;
    langSwitch: string; // libellé du sélecteur
    skipToContent: string;
  };
  home: {
    seo: SeoMeta;
    heroEyebrow: string;
    heroTitle: string; // peut contenir <em> pour l'accent typographique .fr
    heroLead: string;
    heroIntro: string;
    stats: { value: string; label: string }[];
    domaineEyebrow: string;
    domaineTitle: string;
    domaineText: string;
    gitesEyebrow: string;
    gitesTitle: string;
    gitesIntro: string;
    features: { title: string; text: string }[];
    eventsEyebrow: string;
    eventsTitle: string;
    eventsText: string;
    eventsList: string[];
    eventsIdealFor: string[];
    bienEtreEyebrow: string;
    bienEtreTitle: string;
    bienEtreText: string;
    deshaiesEyebrow: string;
    deshaiesTitle: string;
    deshaiesText: string;
    location: {
      mapChip: string;
      panelTitle: string; // peut contenir <em>
      panelText: string;
      items: { label: string; value: string; detail: string }[];
      cta: string;
    };
    espritEyebrow: string;
    espritTitle: string;
    espritText: string;
    marquee: string[];
  };
  domaine: {
    seo: SeoMeta;
    eyebrow: string;
    title: string;
    intro: string;
    presentationTitle: string;
    presentation: string;
    viewTitle: string;
    viewText: string;
    spacesTitle: string;
    spaces: { icon: string; title: string; text: string }[];
    spacesNote: string;
    missionTitle: string;
    mission: string;
    beaches: { name: string; text: string }[];
  };
  gitesPage: {
    seo: SeoMeta;
    eyebrow: string;
    title: string;
    intro: string;
    includedTitle: string;
    included: { title: string; text: string }[];
  };
  rayons: {
    seo: SeoMeta;
    eyebrow: string;
    title: string;
    subtitle: string;
    intro: string;
    modulableTitle: string;
    modulableText: string;
    useCases: string[];
    twinPricingNote: string;
    faq: FaqItem[];
  };
  evenements: {
    seo: SeoMeta;
    eyebrow: string;
    title: string;
    intro: string;
    blocks: { title: string; text: string }[];
    equipmentTitle: string;
    equipment: string[];
    pricing: { label: string; price: string; detail: string }[];
    philosophy: string;
  };
  bienEtre: {
    seo: SeoMeta;
    eyebrow: string;
    title: string;
    text: string;
    partnerNote: string;
  };
  deshaies: {
    seo: SeoMeta;
    eyebrow: string;
    title: string;
    intro: string;
    sections: { title: string; text: string }[];
    conclusion: string;
  };
  queVisiter: {
    seo: SeoMeta;
    eyebrow: string;
    title: string;
    intro: string;
  };
  avis: {
    seo: SeoMeta;
    eyebrow: string;
    title: string;
    intro: string;
  };
  faqPage: {
    seo: SeoMeta;
    eyebrow: string;
    title: string;
    intro: string;
  };
  contact: {
    seo: SeoMeta;
    eyebrow: string;
    title: string;
    intro: string;
    wa: {
      eyebrow: string;
      leadPre: string;
      hint: string;
      telAlt: string;
    };
    form: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      dates: string;
      datesPlaceholder: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
      required: string;
      invalidEmail: string;
    };
    modalitiesTitle: string;
    modalitiesText: string;
    paymentsTitle: string;
  };
  mentions: {
    seo: SeoMeta;
    title: string;
    updated: string;
    blocks: { heading: string; paragraphs: string[] }[];
  };
  footer: {
    tagline: string;
    discover: string;
    contactCol: string;
    followCol: string;
    paymentsCol: string;
    legal: string;
    rights: string;
    madeBy: string;
  };
  cta: {
    homeTitle: string;
    homeText: string;
    domaineTitle: string;
    giteTitle: string;
    genericTitle: string;
  };
  reviews: Review[];
  globalFaq: FaqItem[];
  gites: GiteContent[];
  articles: Article[];
}
