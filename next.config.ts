import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Next 16 : les qualités non-75 doivent être autorisées explicitement.
    // 60/62 = fonds très assombris (overlay) ; 72 = couvertures ;
    // 75 = défaut (photos détaillées, carrousels).
    qualities: [60, 62, 72, 75],
  },
  experimental: {
    // Layout racine = segment dynamique [locale] → un app/not-found.js ne
    // peut pas être composé. global-not-found.js gère les URLs non
    // matchées sur tout le site (404 brandée au lieu du 404 Next brut).
    globalNotFound: true,
  },
};

export default nextConfig;
