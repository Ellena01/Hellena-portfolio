"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { rise, viewport } from "@/lib/motion";
import ScrambleText from "@/components/ScrambleText";

/**
 * SectionShell
 * ─────────────────────────────────────────────────────
 * The shared cinematic wrapper for every section:
 *  - kicker line  ("01 — WHAT I'M BUILDING")
 *  - generous vertical rhythm
 *  - tiny editorial progress index ("02 / 06") at the foot
 */

export default function SectionShell({
  id,
  kicker,
  index,
  children,
  className = "",
  tight = false,
}: {
  id?: string;
  kicker: string;
  /** Editorial phase index, e.g. "02 / 06". */
  index: string;
  children: ReactNode;
  className?: string;
  tight?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <section
      id={id}
      className={`relative ${tight ? "py-16 md:py-24" : "py-24 md:py-40"} ${className}`}
      aria-label={kicker.replace(/^\d+\s[—-]\s/, "")}
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        {/* Kicker */}
        <motion.div
          className="mb-14 md:mb-20 flex items-center gap-5"
          initial={reduced ? undefined : "hidden"}
          whileInView="show"
          viewport={viewport}
          variants={rise}
        >
          <span className="font-mono text-[11px] tracking-[0.35em] text-gold uppercase">
            <ScrambleText text={kicker} />
          </span>
          <span className="hairline flex-1" aria-hidden="true" />
        </motion.div>

        {children}

        {/* Editorial index */}
        <div
          className="mt-16 md:mt-24 flex items-center justify-end gap-3 font-mono text-[10px] tracking-[0.3em] text-paper-faint"
          aria-hidden="true"
        >
          <span className="leader-dots max-w-24" />
          <span>{index}</span>
        </div>
      </div>
    </section>
  );
}
