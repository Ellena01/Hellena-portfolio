"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { rise, fade, viewport } from "@/lib/motion";

/**
 * RiseOnScroll
 * ─────────────────────────────────────────────────────
 * Small helper for the standard fade-up reveal used
 * across editorial sections. `as` allows semantic tags.
 */
export default function RiseOnScroll({
  children,
  delay = 0,
  className = "",
  variant = "rise",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "rise" | "fade";
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={variant === "rise" ? rise : fade}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
