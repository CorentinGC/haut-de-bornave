/**
 * Accès typé aux médias auto-hébergés (/public/media). Toutes les photos
 * proviennent des sites source (voir scripts/fetch-media.sh, docs/medias.md).
 * Les dimensions réelles (media-dimensions.json, généré au build) sont
 * fournies à next/image pour éliminer le CLS (Core Web Vitals → SEO).
 * @author Eden Solutions <contact@eden-solutions.pro>
 */
import dims from "./media-dimensions.json";

export type Media = { src: string; width: number; height: number; alt: string };

const DIMS = dims as unknown as Record<string, [number, number]>;

/** Résout un chemin /media/... en objet Media (avec dimensions + alt). */
export function media(src: string, alt: string): Media {
  const d = DIMS[src];
  if (!d) {
    // Filet de sécurité : ratio paysage par défaut (ne devrait pas arriver).
    return { src, width: 1600, height: 1067, alt };
  }
  return { src, width: d[0], height: d[1], alt };
}

/** Toutes les clés d'un dossier, triées (ordre stable et déterministe). */
function inDir(prefix: string): string[] {
  return Object.keys(DIMS)
    .filter((k) => k.startsWith(prefix))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

/** Galerie d'un gîte, triée. `altBase` sert d'alt SEO géolocalisé. */
export function gitePhotos(filePrefix: string, altBase: string): Media[] {
  return inDir(`/media/gites/${filePrefix}`).map((src, i) =>
    media(src, `${altBase} — photo ${i + 1} (Deshaies, Guadeloupe)`),
  );
}

export function domainePhotos(altBase: string): Media[] {
  return inDir("/media/domaine/les-hauts-de-bornave-deshaies").map((src, i) =>
    media(src, `${altBase} ${i + 1} — Les Hauts de Bornave, Deshaies`),
  );
}

export function lieuPhotos(filePrefix: string, alt: string): Media[] {
  return inDir(`/media/lieux/${filePrefix}`).map((src, i) =>
    media(src, `${alt} ${i + 1}`),
  );
}

export function galeriePhotos(altBase: string): Media[] {
  return inDir("/media/galerie/").map((src, i) =>
    media(src, `${altBase} ${i + 1} — Deshaies, Guadeloupe`),
  );
}

/** Visuels clés réutilisés (hero, OG, CTA). */
export const KEY_MEDIA = {
  logoSvg: "/media/brand/logo-les-hauts-de-bornave.svg",
  logoRaster: "/media/brand/logo-hauts-bornave.webp",
  ecouteToiLogo: "/media/partenaires/ecoute-toi-logo.png",
  vueAerienne: "/media/domaine/vue-aerienne-deshaies.png",
  coucherDeshaies: "/media/lieux/coucher-de-soleil-sur-deshaies.webp",
  coucherGrandeAnse:
    "/media/lieux/coucher-de-soleil-sur-grande-anse-deshaies-en-guadeloupe-4-2.webp",
  coucherTainos:
    "/media/lieux/coucher-de-soleil-depuis-tainos-cottage-a-deshaies-en-guadeloupe-9-scaled.webp",
  domaineHero:
    "/media/domaine/le-domaine-les-hauts-de-bornave-deshaies-guadeloupe-5.webp",
  domaineWide:
    "/media/domaine/les-hauts-de-bornave-deshaies-guadeloupe-1-3-scaled.webp",
  grandeAnse: "/media/lieux/plage-de-grande-anse-a-deshaies-guadeloupe-6.webp",
  leroux: "/media/lieux/plage-de-ferry-leroux-2.webp",
  port: "/media/lieux/le-port-deshaies-en-guadeloupe-3.webp",
} as const;
