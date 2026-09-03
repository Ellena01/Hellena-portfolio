/**
 * Shared Framer Motion primitives.
 * ─────────────────────────────────────────────────────
 * One animation vocabulary for the whole site, so motion
 * stays tasteful and consistent:
 *
 *   rise       — the standard fade-up reveal
 *   stagger    — parent orchestration for groups
 *   maskUp     — line reveal from behind overflow masks
 *   draw       — SVG line / path draw-in
 *
 * Every animated component pairs these with
 * `useReducedMotion()` from framer-motion, and disables
 * heavy choreography when the user prefers less motion.
 */

import type { Variants, Transition } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transition = (delay = 0, duration = 0.8): Transition => ({
  duration,
  delay,
  ease: EASE,
});

export const rise: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: transition(i * 0.08, 0.85),
  }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: transition(i * 0.08, 0.9),
  }),
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const maskUp: Variants = {
  hidden: { y: "110%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: transition(i * 0.09 + 0.1, 0.9),
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: transition(0, 0.8),
  },
};

/** Standard viewport config: reveal once, slightly early. */
export const viewport = { once: true, margin: "-12% 0px -12% 0px" } as const;
