/**
 * Structure de page (App Router).
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import Link from "next/link";

/** Page 404 (bilingue neutre — la locale n'est pas disponible ici). */
export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Erreur 404
        </span>
        <h1 className="h-xl" style={{ margin: "1rem 0" }}>
          Page introuvable · Page not found
        </h1>
        <p className="lead" style={{ margin: "0 auto 2rem" }}>
          Cette page n&apos;existe pas ou a été déplacée. — This page does not
          exist or has moved.
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/fr" className="btn btn--primary">
            <span className="btn__inner">Accueil</span>
          </Link>
          <Link href="/en" className="btn btn--ghost">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
