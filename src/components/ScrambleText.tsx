"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const GLYPHS = "!<>-_\\/[]{}=+*^?#";

/**
 * ScrambleText — decodes into place, character by
 * character, when it first enters the viewport.
 * Used on chapter kickers and hero words.
 */
export default function ScrambleText({
  text,
  className = "",
  delay = 0,
  charStep = 2,
}: {
  text: string;
  className?: string;
  /** Frames to wait before starting. */
  delay?: number;
  /** Frames between each character locking in. */
  charStep?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [scrambled, setScrambled] = useState(text);

  useEffect(() => {
    if (reduced || !inView) {
      return;
    }

    let frame = -delay;
    const total = text.length * charStep + 12;

    const id = window.setInterval(() => {
      frame++;
      if (frame < 0) return;

      const out = text
        .split("")
        .map((c, i) => {
          if (c === " ") return " ";
          const lockAt = i * charStep + 8;
          if (frame >= lockAt) return c;
          if (frame > lockAt - 12) {
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          return "\u00A0";
        })
        .join("");

      setScrambled(out);
      if (frame >= total) {
        setScrambled(text);
        window.clearInterval(id);
      }
    }, 28);

    return () => window.clearInterval(id);
  }, [inView, text, delay, charStep, reduced]);

  /* Reduced motion or not yet in view: show the final text directly. */
  const display = reduced || !inView ? text : scrambled;

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
