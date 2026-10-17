"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Custom cursor — a dot with a trailing ring.
 * Grows and shows a contextual label over any element with
 * [data-cursor], links and buttons. Hidden on touch devices
 * and when the user prefers reduced motion.
 */
export default function Cursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useSpring(mx, { stiffness: 350, damping: 32, mass: 0.4 });
  const ry = useSpring(my, { stiffness: 350, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor], a, button, [role='button']",
      );
      if (el) {
        setHovering(true);
        setLabel(el.dataset.cursor ?? null);
      } else {
        setHovering(false);
        setLabel(null);
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;

  const expanded = label !== null;
  const size = expanded ? 76 : hovering ? 48 : 14;

  return (
    <>
      {/* Trailing ring / label bubble */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center rounded-full border"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          scale: pressed ? 0.85 : 1,
          backgroundColor: expanded ? "rgba(244,241,234,0.96)" : "rgba(244,241,234,0)",
          borderColor: expanded ? "rgba(244,241,234,0)" : "rgba(201,162,39,0.6)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {expanded && (
          <span className="select-none font-mono text-[9px] uppercase tracking-[0.2em] text-ink">
            {label}
          </span>
        )}
      </motion.div>

      {/* Center dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full bg-paper"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%", mixBlendMode: "difference" }}
        animate={{ scale: expanded ? 0 : 1 }}
      >
        <span className="block h-1.5 w-1.5 rounded-full" />
      </motion.div>
    </>
  );
}
