import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description:
      "Cinq gîtes avec piscine et vue mer sur les hauteurs de Deshaies, Guadeloupe.",
    start_url: "/fr",
    display: "standalone",
    background_color: "#f6f1e7",
    theme_color: "#14342b",
    icons: [
      {
        src: "/media/brand/logo-hauts-bornave.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
