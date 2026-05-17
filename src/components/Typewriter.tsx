"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Effet machine à écrire (banner d'accueil) — composant React, état + timers,
 * démarre à l'entrée dans le viewport, respecte prefers-reduced-motion.
 * Reproduit le comportement du site .fr sans manipulation DOM externe.
 */
export function Typewriter({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(text);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || !ref.current) return;
    const node = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.38, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => timers.push(window.setTimeout(res, ms)));

    const run = async () => {
      setShown("");
      while (!cancelled) {
        setDone(false);
        for (let i = 1; i <= text.length; i++) {
          if (cancelled) return;
          setShown(text.slice(0, i));
          await wait(text[i - 1] === " " ? 200 : 110);
        }
        setDone(true);
        await wait(3400);
        setDone(false);
        for (let i = text.length; i >= 0; i--) {
          if (cancelled) return;
          setShown(text.slice(0, i));
          await wait(60);
        }
        await wait(550);
      }
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [started, text]);

  return (
    <span
      className={`welcome-banner-card__wrap ${
        done ? "is-typewriter-done" : "is-typewriting"
      }`}
    >
      <span className="welcome-banner-card__typed" ref={ref}>
        {shown}
      </span>
      <span className="welcome-banner-card__cursor" aria-hidden="true" />
    </span>
  );
}
