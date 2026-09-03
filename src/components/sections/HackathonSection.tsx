"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { MoveHorizontal, Trophy } from "lucide-react";
import SectionShell from "@/components/SectionShell";
import RiseOnScroll from "@/components/RiseOnScroll";

/**
 * HACKATHON — "Built under pressure."
 * ─────────────────────────────────────────────────────
 * A draggable filmstrip of the Udara AI Build Challenge.
 * Drag (or use the dots) to move through the stages;
 * the strip snaps to the nearest frame. Ends on the
 * one real result: 4th place — and what it taught.
 */

const STAGES = [
  {
    stage: "IDEA",
    index: "01",
    detail:
      "A problem worth caring about: learning that stays stuck on the page. The idea had to survive contact with a countdown timer.",
  },
  {
    stage: "PROTOTYPE",
    index: "02",
    detail:
      "Sleep-optional hours turning concept into something clickable. Scope shrank; the core idea sharpened.",
  },
  {
    stage: "ITERATION",
    index: "03",
    detail:
      "Feedback from mentors and teammates — some of it uncomfortable, all of it useful. Rebuilt, trimmed, rebuilt again.",
  },
  {
    stage: "DEMO",
    index: "04",
    detail:
      "Standing in front of judges with a live product and a team that had become fluent in each other's thinking.",
  },
] as const;

const LESSONS = [
  "Collaborating when nobody can be an expert at everything at once.",
  "Working under time constraints without the idea becoming disposable.",
  "Turning an idea into a demo people can actually touch.",
  "Receiving mentorship as raw material, not verdict.",
  "Deciding what to cut is a skill of its own.",
  "The story around the work is part of the work.",
] as const;

export default function HackathonSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [minX, setMinX] = useState(0);
  const [active, setActive] = useState(0);

  /* Measure drag bounds */
  useEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      const track = trackRef.current;
      if (!vp || !track) return;
      setMinX(Math.min(0, vp.clientWidth - track.scrollWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const progress = useTransform(x, (v) =>
    minX ? `${Math.min(100, Math.max(0, (v / minX) * 100))}%` : "0%"
  );

  const snapTo = (index: number) => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;
    const card = track.children[0] as HTMLElement | undefined;
    if (!card) return;
    const gap = 20; // gap-5
    const step = card.offsetWidth + gap;
    const target = Math.max(minX, Math.min(0, -index * step));
    animate(x, target, { type: "spring", stiffness: 160, damping: 24 });
  };

  const onDragEnd = () => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;
    const card = track.children[0] as HTMLElement | undefined;
    if (!card) return;
    const gap = 20;
    const step = card.offsetWidth + gap;
    const current = x.get();
    const idx = Math.round(-current / step);
    const clamped = Math.max(0, Math.min(STAGES.length, idx));
    setActive(clamped);
    snapTo(clamped);
  };

  const totalFrames = STAGES.length + 1;

  return (
    <SectionShell kicker="02 — Built under pressure" index="02 / 06">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <RiseOnScroll>
          <h2 className="font-display max-w-2xl text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl">
            Udara AI Build Challenge<span className="text-gold">.</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper-dim md:text-base">
            Team Animatrix · CogniFlow · a hackathon compresses months of
            doubt into days.
          </p>
        </RiseOnScroll>
        <RiseOnScroll delay={1}>
          <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-paper-faint">
            <MoveHorizontal size={14} className="text-gold" aria-hidden="true" />
            Drag the strip
          </p>
        </RiseOnScroll>
      </div>

      {/* ── Draggable strip ── */}
      <div
        ref={viewportRef}
        className="relative mt-12 overflow-hidden border-y border-paper/10 py-8"
        data-cursor="drag"
      >
        {/* Fade edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent"
        />

        <motion.div
          ref={trackRef}
          className="flex w-max cursor-grab gap-5 pl-2 active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: minX, right: 0 }}
          dragElastic={0.06}
          onDragEnd={onDragEnd}
        >
          {STAGES.map((s) => (
            <article
              key={s.stage}
              className="flex w-[min(80vw,430px)] shrink-0 select-none flex-col border border-paper/10 bg-ink-2/60 p-7 md:p-9"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl font-bold text-paper/10">
                  {s.index}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-paper-faint">
                  frame {s.index} / 05
                </span>
              </div>
              <h3 className="font-display mt-6 text-2xl font-bold tracking-tight text-paper md:text-3xl">
                {s.stage}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-paper-dim">{s.detail}</p>
              <span className="mt-auto pt-8" aria-hidden="true">
                <span className="block h-px w-full bg-paper/8" />
                <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.25em] text-paper-faint">
                  animatrix · cogniflow
                </span>
              </span>
            </article>
          ))}

          {/* The result card */}
          <article className="relative flex w-[min(80vw,430px)] shrink-0 select-none flex-col overflow-hidden border border-gold/40 bg-gold/[0.04] p-7 md:p-9">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(201,162,39,0.16), transparent 65%)" }}
            />
            <div className="flex items-baseline justify-between">
              <Trophy size={26} className="text-gold" aria-hidden="true" />
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold/80">
                final frame
              </span>
            </div>
            <h3 className="font-display mt-6 text-3xl font-bold tracking-tight text-gold-soft md:text-4xl">
              4th place
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-paper-dim">
              The ranking mattered less than the realising: under real
              constraints, we could ship. That fact travels.
            </p>
            <span className="mt-auto pt-8" aria-hidden="true">
              <span className="block h-px w-full bg-gold/20" />
              <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.25em] text-gold/70">
                udara ai build challenge
              </span>
            </span>
          </article>
        </motion.div>
      </div>

      {/* Progress + dots */}
      <div className="mt-6 flex items-center gap-6">
        <div className="h-px flex-1 bg-paper/10" aria-hidden="true">
          <motion.div className="h-px bg-gold" style={{ width: progress }} />
        </div>
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Frames">
          {Array.from({ length: totalFrames }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={active === i}
              aria-label={i < STAGES.length ? `Go to ${STAGES[i].stage}` : "Go to result"}
              onClick={() => {
                setActive(i);
                snapTo(i);
              }}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                active === i ? "scale-110 bg-gold" : "bg-paper/25 hover:bg-paper/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* What mattered */}
      <RiseOnScroll delay={1}>
        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <h3 className="font-display text-2xl font-bold leading-snug tracking-tight text-paper md:col-span-4 md:text-3xl">
            What stayed with me
            <br />
            <span className="text-paper-faint">wasn&apos;t the placement.</span>
          </h3>
          <ul className="grid gap-x-10 gap-y-3.5 sm:grid-cols-2 md:col-span-8">
            {LESSONS.map((lesson) => (
              <li key={lesson} className="flex items-start gap-3 text-sm leading-relaxed text-paper-dim">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                {lesson}
              </li>
            ))}
          </ul>
        </div>
      </RiseOnScroll>
    </SectionShell>
  );
}
