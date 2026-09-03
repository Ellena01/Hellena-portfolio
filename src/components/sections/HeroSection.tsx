"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight, LockKeyhole, MousePointerClick } from "lucide-react";
import Magnetic from "@/components/MagneticButton";
import ScrambleText from "@/components/ScrambleText";
import { profile } from "@/data/profile";
import { EASE } from "@/lib/motion";

/**
 * HERO — "Hello, I'm Helen."
 * ─────────────────────────────────────────────────────
 * Scramble-decoded typography, magnetic CTAs, and an
 * abstract thought-field: particles that bend toward the
 * cursor and burst outward when clicked. The name itself
 * is an easter egg — click it three times.
 */

const ORBIT_WORDS = [
  "learn",
  "build",
  "question",
  "iterate",
  "imagine",
  "ship",
  "teach",
  "wonder",
];

const STATUS_ITEMS = [
  ["STATUS", profile.status.status],
  ["LOCATION", profile.status.location],
  ["FIELD", profile.status.field],
  ["CURRENT MODE", profile.status.currentMode],
  ["NEXT", profile.status.next],
] as const;

export default function HeroSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [nameClicks, setNameClicks] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.65], [1, reduced ? 1 : 0]);

  const scrollTo = (sel: string) =>
    document.querySelector(sel)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });

  return (
    <section
      id="hello"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* Atmospheric background — restrained, not neon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 18%, rgba(94,124,226,0.09), transparent 55%)," +
            "radial-gradient(80% 60% at 12% 88%, rgba(201,162,39,0.05), transparent 60%)," +
            "linear-gradient(to bottom, rgba(11,11,14,0) 60%, #0b0b0e 100%)",
        }}
      />

      {/* Interactive thought field (right side) */}
      <ThoughtSystem reduced={!!reduced} />

      {/* Fine corner marks — film frame feeling */}
      <CornerMarks />

      <motion.div
        style={{ y: titleY, opacity: fadeOut }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-28 pt-36 md:px-10 md:pt-40"
      >
        {/* Eyebrow */}
        <motion.p
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.4em] text-paper-faint"
        >
          {profile.roleLine}
        </motion.p>

        {/* The statement */}
        <h1 className="font-display font-bold leading-[0.95] tracking-tight">
          <MaskedLine delay={0.15} reduced={!!reduced}>
            <span className="text-[clamp(2.6rem,8vw,6.5rem)] text-paper">
              <ScrambleText text="Hello," delay={14} />
            </span>
          </MaskedLine>
          <MaskedLine delay={0.3} reduced={!!reduced}>
            <span className="text-[clamp(2.6rem,8vw,6.5rem)] text-paper">
              <ScrambleText text="I'm " delay={22} />
            </span>
            <button
              onClick={() => setNameClicks((c) => c + 1)}
              aria-label="Helen — click three times"
              data-cursor="×3"
              className="relative text-gold-soft transition-colors hover:text-gold text-[clamp(2.6rem,8vw,6.5rem)]"
            >
              <ScrambleText text="HELEN" delay={30} />
              <span className="text-paper">.</span>
              {/* subtly scratch out as curiosity accumulates */}
              <span aria-hidden="true" className="absolute -right-5 top-1 flex flex-col gap-1">
                {Array.from({ length: Math.min(nameClicks, 3) }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    className="block h-3 w-px bg-gold/70"
                  />
                ))}
              </span>
            </button>
          </MaskedLine>
        </h1>

        {/* Easter egg */}
        <AnimatePresence>
          {nameClicks >= 3 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-6 flex items-start gap-3 border-l border-gold/50 pl-4">
                <LockKeyhole size={14} className="mt-1 text-gold" aria-hidden="true" />
                <p className="max-w-md font-mono text-xs leading-relaxed text-paper-dim">
                  {profile.curious.trigger}
                  <br />
                  <span className="text-paper">{profile.curious.line}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Positioning */}
        <motion.p
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9, ease: EASE }}
          className="mt-10 max-w-xl text-base leading-relaxed text-paper-dim md:text-lg"
        >
          {profile.positioning}
        </motion.p>

        <motion.p
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-paper-faint"
        >
          Currently learning. Currently building. Currently becoming.
        </motion.p>

        {/* CTAs — magnetic */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8, ease: EASE }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <button
              onClick={() => scrollTo("#work")}
              data-cursor="work"
              className="group inline-flex items-center gap-3 bg-paper px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
            >
              Explore my work
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => scrollTo("#contact")}
              data-cursor="hello"
              className="inline-flex items-center gap-3 border border-paper/20 px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-gold hover:text-gold"
            >
              Let&apos;s connect
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Status strip + scroll cue */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-8 md:px-10"
      >
        <div className="hairline-solid mb-5" aria-hidden="true" />
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <dl className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Status">
            {STATUS_ITEMS.map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-2">
                <dt className="font-mono text-[9px] uppercase tracking-[0.25em] text-paper-faint">
                  {k}:
                </dt>
                <dd className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper-dim">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex items-center gap-6">
            <span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-paper-faint md:flex">
              <MousePointerClick size={11} aria-hidden="true" />
              click the field
            </span>
            <button
              onClick={() => scrollTo("#about")}
              aria-label="Scroll to the next section"
              data-cursor="scroll"
              className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-paper-faint transition-colors hover:text-gold"
            >
              Scroll
              <motion.span
                animate={reduced ? undefined : { y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={12} aria-hidden="true" />
              </motion.span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Masked line reveal ─────────────────────────────── */
function MaskedLine({
  children,
  delay,
  reduced,
}: {
  children: React.ReactNode;
  delay: number;
  reduced: boolean;
}) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="inline-flex items-baseline"
        initial={reduced ? undefined : { y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 1, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ─── Film frame corner marks ────────────────────────── */
function CornerMarks() {
  const cls = "absolute h-5 w-5 opacity-25";
  const pos = [
    "left-5 top-24 md:top-28 border-l border-t",
    "right-5 top-24 md:top-28 border-r border-t",
    "left-5 bottom-5 border-l border-b",
    "right-5 bottom-5 border-r border-b",
  ];
  return (
    <>
      {pos.map((p) => (
        <span key={p} aria-hidden="true" className={`${cls} ${p} border-paper`} />
      ))}
    </>
  );
}

/* ─── The interactive thought field ──────────────────── */
function ThoughtSystem({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const burst = useRef<{ x: number; y: number } | null>(null);
  const ptsRef = useRef<
    { x: number; y: number; vx: number; vy: number; r: number; gold: boolean }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * DPR;
      canvas.height = rect.height * DPR;
    };
    size();
    window.addEventListener("resize", size);

    const N = 46;
    if (ptsRef.current.length === 0) {
      ptsRef.current = Array.from({ length: N }, () => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.00045,
        vy: (Math.random() - 0.5) * 0.00045,
        r: Math.random() * 1.6 + 0.5,
        gold: Math.random() < 0.16,
      }));
    }
    const pts = ptsRef.current;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    /* Click → burst emanating from the click point */
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const bx = (e.clientX - rect.left) / rect.width;
      const by = (e.clientY - rect.top) / rect.height;
      if (bx < 0 || bx > 1 || by < 0 || by > 1) return;
      burst.current = { x: bx, y: by };
      for (const p of pts) {
        const dx = p.x - bx;
        const dy = p.y - by;
        const d = Math.hypot(dx, dy) || 0.001;
        if (d < 0.35) {
          const f = (1 - d / 0.35) * 0.02;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
      window.setTimeout(() => (burst.current = null), 350);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);

    const onVis = () => {
      running = !document.hidden;
      if (running && !reduced) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      /* Rendered positions: slow drift + gentle pull toward cursor */
      const m = mouse.current;
      const rx = new Float32Array(pts.length);
      const ry = new Float32Array(pts.length);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        /* Dampen burst velocity back to ambience */
        p.vx *= 0.985;
        p.vy *= 0.985;
        if (Math.abs(p.vx) < 0.00045) p.vx += (Math.random() - 0.5) * 0.00008;
        if (Math.abs(p.vy) < 0.00045) p.vy += (Math.random() - 0.5) * 0.00008;

        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.y > 1.05) p.y = -0.05;

        const dx = m.x - p.x;
        const dy = m.y - p.y;
        const d = Math.hypot(dx, dy);
        const fall = Math.max(0, 1 - d / 0.4);
        rx[i] = p.x + dx * 0.09 * fall;
        ry[i] = p.y + dy * 0.09 * fall;
      }

      /* Links */
      ctx.lineWidth = DPR * 0.6;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = (rx[i] - rx[j]) * w;
          const dy = (ry[i] - ry[j]) * h;
          const d = Math.hypot(dx, dy);
          const max = w * 0.16;
          if (d < max) {
            const alpha = (1 - d / max) * 0.14;
            ctx.strokeStyle = `rgba(244,241,234,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(rx[i] * w, ry[i] * h);
            ctx.lineTo(rx[j] * w, ry[j] * h);
            ctx.stroke();
          }
        }
      }

      /* Nodes */
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        ctx.beginPath();
        ctx.arc(rx[i] * w, ry[i] * h, p.r * DPR, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? "rgba(201,162,39,0.8)" : "rgba(244,241,234,0.35)";
        ctx.fill();
      }

      /* Burst flash ring */
      if (burst.current) {
        ctx.beginPath();
        ctx.arc(burst.current.x * w, burst.current.y * h, 60 * DPR, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(201,162,39,0.18)";
        ctx.lineWidth = DPR;
        ctx.stroke();
      }

      if (!reduced && running) raf = requestAnimationFrame(draw);
    };

    draw();
    if (reduced) cancelAnimationFrame(raf); // one static frame

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-70 md:w-[46%] md:opacity-100"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Orbiting idea words */}
      <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <div className="orbit-rotate relative h-[380px] w-[380px] rounded-full border border-paper/6">
          {ORBIT_WORDS.map((word, i) => {
            const angle = (i / ORBIT_WORDS.length) * 360;
            return (
              <span
                key={word}
                className="absolute left-1/2 top-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-paper-faint"
                style={{
                  transform: `rotate(${angle}deg) translateX(190px) rotate(-${angle}deg)`,
                  transformOrigin: "0 0",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
        <div className="orbit-rotate-reverse absolute inset-8 rounded-full border border-paper/5" />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
      </div>
    </div>
  );
}
