/**
 * Structure de page (App Router).
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

/* eslint-disable @next/next/no-html-link-for-pages --
   global-not-found est un document HTML complet rendu HORS de l'arbre du
   routeur Next (bypass). next/link n'y a pas de contexte routeur : la
   navigation doit se faire via <a> (rechargement complet, voulu). */
import type { Metadata } from "next";
import { fraunces, inter } from "@/lib/fonts";
import "./globals.css";

/**
 * 404 globale (URLs non matchées sur tout le site). Le layout racine étant
 * un segment dynamique [locale], Next ne peut pas composer un not-found.js
 * standard : global-not-found.js retourne donc un document HTML complet,
 * brandé dans l'esprit de la charte .fr (sable / émeraude, Fraunces+Inter),
 * bilingue neutre (la locale n'est pas résolvable ici).
 */
export const metadata: Metadata = {
  title: "Page introuvable · Page not found — Les Hauts de Bornave",
  description:
    "Cette page n'existe pas ou a été déplacée. This page does not exist or has moved.",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem 1.5rem",
            background:
              "radial-gradient(ellipse at 80% 8%, rgba(201,166,107,.16), transparent 55%), radial-gradient(ellipse at 12% 95%, rgba(201,123,94,.14), transparent 55%), var(--c-bg)",
            color: "var(--c-ink)",
          }}
        >
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Erreur 404
          </span>
          <h1
            className="h-hero"
            style={{ margin: "1rem 0 0.5rem", maxWidth: "16ch" }}
          >
            Page <em>introuvable</em>
          </h1>
          <p
            className="lead"
            style={{ margin: "0 auto 2.25rem", maxWidth: "44ch" }}
          >
            Cette page n&apos;existe pas ou a été déplacée. — This page does
            not exist or has moved.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="/fr" className="btn btn--primary">
              <span className="btn__inner">Accueil</span>
            </a>
            <a href="/en" className="btn btn--ghost">
              <span className="btn__inner">Home (EN)</span>
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
