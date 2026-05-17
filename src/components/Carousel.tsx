"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Media } from "@/lib/media";

/**
 * Carrousel photo d'un gîte — composant React autonome (état local, pas de
 * manipulation DOM ni de lib). Clavier (←/→), swipe tactile, pastilles,
 * compteur. Markup/classes fidèles au site .fr (stylé par lhdb.css).
 */
export function Carousel({ photos }: { photos: Media[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = photos.length;

  const go = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => window.clearInterval(id);
  }, [count]);

  if (!count) return null;

  return (
    <div className="gite-card__media">
      <span className="gite-card__counter">
        <span className="current">{index + 1}</span> /{" "}
        <span className="total">{count}</span>
      </span>
      <div
        className="carousel"
        role="region"
        aria-roledescription="carrousel"
        aria-label="Photos du gîte"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            go(index - 1);
            e.preventDefault();
          }
          if (e.key === "ArrowRight") {
            go(index + 1);
            e.preventDefault();
          }
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        <div
          className="carousel__track"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: "transform .55s cubic-bezier(.22,1,.36,1)",
            display: "flex",
          }}
        >
          {photos.map((p, i) => (
            <div
              className="carousel__slide"
              key={p.src}
              aria-hidden={i !== index}
              style={{ flex: "0 0 100%" }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                priority={i === 0}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="carousel__btn carousel__btn--prev"
          aria-label="Image précédente"
          onClick={() => go(index - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="carousel__btn carousel__btn--next"
          aria-label="Image suivante"
          onClick={() => go(index + 1)}
        >
          ›
        </button>
        <div className="carousel__dots">
          {photos.map((p, i) => (
            <button
              type="button"
              key={p.src}
              className={`carousel__dot${i === index ? " is-active" : ""}`}
              aria-label={`Image ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
