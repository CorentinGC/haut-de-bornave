"use client";

/**
 * Composant UI ScrollReveal.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Révèle les éléments `.reveal` à l'entrée dans le viewport (IntersectionObserver,
 * API native — aucune lib). Réinitialisé à chaque navigation App Router.
 * Respecte prefers-reduced-motion (CSS gère la transition réduite).
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
