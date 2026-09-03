"use client";

import { motion, useReducedMotion } from "framer-motion";
import { viewport, rise } from "@/lib/motion";

/**
 * PHILOSOPHY — the quiet pause.
 * ─────────────────────────────────────────────────────
 * Minimal. Enormous type. Nothing else. A breath in the
 * middle of the experience before the contact phase.
 */

export default function PhilosophySection() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Personal philosophy"
      className="relative flex min-h-[70svh] items-center justify-center py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 text-center md:px-10">
        <motion.p
          initial={reduced ? undefined : "hidden"}
          whileInView="show"
          viewport={viewport}
          variants={rise}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-paper-faint"
        >
          A quiet rule I keep
        </motion.p>

        <motion.h2
          initial={reduced ? undefined : "hidden"}
          whileInView="show"
          viewport={viewport}
          variants={rise}
          custom={1}
          className="font-display mx-auto mt-10 max-w-4xl text-3xl font-bold leading-[1.12] tracking-tight text-paper md:text-6xl"
        >
          I don&apos;t want to know everything.
        </motion.h2>

        <motion.h3
          initial={reduced ? undefined : "hidden"}
          whileInView="show"
          viewport={viewport}
          variants={rise}
          custom={3}
          className="font-display mx-auto mt-6 max-w-4xl text-3xl font-bold leading-[1.12] tracking-tight text-gold-soft md:text-6xl"
        >
          I want to become someone who can learn almost anything.
        </motion.h3>

        <motion.div
          initial={reduced ? undefined : "hidden"}
          whileInView="show"
          viewport={viewport}
          variants={rise}
          custom={4}
          className="mx-auto mt-14 flex items-center gap-4"
          aria-hidden="true"
        >
          <span className="hairline flex-1" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
          <span className="hairline flex-1" />
        </motion.div>
      </div>
    </section>
  );
}
