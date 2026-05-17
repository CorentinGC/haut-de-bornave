"use client";

/**
 * Composant UI Carousel.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import type { Media } from "@/lib/media";
import styles from "./Carousel.module.scss";

/**
 * Carrousel photo d'un gîte — clavier (←/→), swipe tactile, pastilles,
 * compteur. Composant client autonome (état local, pas de lib externe).
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
    <div className={styles.media}>
      <span className={styles.counter}>
        <span data-testid="current">{index + 1}</span> /{" "}
        <span data-testid="total">{count}</span>
      </span>
      <div
        className={styles.carousel}
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
          className={styles.track}
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: "transform .55s cubic-bezier(.22,1,.36,1)",
            display: "flex",
          }}
        >
          {photos.map((p, i) => (
            <div
              className={styles.slide}
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
          className={clsx(styles.btn, styles.prev)}
          aria-label="Image précédente"
          onClick={() => go(index - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          className={clsx(styles.btn, styles.next)}
          aria-label="Image suivante"
          onClick={() => go(index + 1)}
        >
          ›
        </button>
        <div className={styles.dots}>
          {photos.map((p, i) => (
            <button
              type="button"
              key={p.src}
              className={clsx(styles.dot, i === index && styles.active)}
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
