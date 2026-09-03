"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ChapterRail — fixed right-edge scroll-spy.
 * Shows the six chapters, the live scroll progress,
 * and highlights where you are in the story.
 */

const CHAPTERS = [
  { id: "hello", label: "Hello", index: "01" },
  { id: "work", label: "Work", index: "02" },
  { id: "journey", label: "Journey", index: "03" },
  { id: "thinking", label: "Thinking", index: "04" },
  { id: "now", label: "Now", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;

export default function ChapterRail() {
  const [active, setActive] = useState<string>("hello");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      const y = window.scrollY + window.innerHeight * 0.45;
      let current: string = CHAPTERS[0].id;
      for (const ch of CHAPTERS) {
        const el = document.getElementById(ch.id);
        if (el && el.offsetTop <= y) current = ch.id;
      }
      setActive(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeChapter = CHAPTERS.find((c) => c.id === active) ?? CHAPTERS[0];

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="flex flex-col items-end gap-5">
        {/* progress spine */}
        <div className="absolute -left-4 top-0 h-full w-px bg-paper/10" aria-hidden="true">
          <motion.div
            className="w-px origin-top bg-gold"
            style={{ scaleY: progress, height: "100%" }}
          />
        </div>

        {CHAPTERS.map((ch) => {
          const isActive = ch.id === active;
          return (
            <button
              key={ch.id}
              onClick={() =>
                document.getElementById(ch.id)?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label={`Go to ${ch.label}`}
              aria-current={isActive ? "true" : undefined}
              data-cursor={ch.label}
              className="group flex items-center gap-3"
            >
              <span
                className={`font-mono text-[9px] uppercase tracking-[0.25em] transition-all duration-300 ${
                  isActive
                    ? "translate-x-0 text-paper opacity-100"
                    : "translate-x-1 text-paper-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
                }`}
              >
                {ch.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-2 w-2 bg-gold"
                    : "h-1 w-1 bg-paper/35 group-hover:bg-paper/70"
                }`}
              />
            </button>
          );
        })}

        {/* chapter counter */}
        <div className="mt-3 border-t border-paper/10 pt-3 text-right">
          <span className="font-mono text-[9px] tracking-[0.3em] text-gold">
            {activeChapter.index}
          </span>
          <span className="font-mono text-[9px] tracking-[0.3em] text-paper-faint"> / 06</span>
        </div>
      </div>
    </nav>
  );
}
