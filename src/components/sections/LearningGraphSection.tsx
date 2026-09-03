"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CircleDot, Sprout, Telescope } from "lucide-react";
import SectionShell from "@/components/SectionShell";
import RiseOnScroll from "@/components/RiseOnScroll";
import { learningGraph, type GraphNode } from "@/data/journey";
import { EASE } from "@/lib/motion";

/**
 * LEARNING GRAPH — the constellation.
 * ─────────────────────────────────────────────────────
 * Nodes connect in journey order; a gold path draws
 * itself up to the selected node. Hover previews the
 * node's first lesson; click reveals the full panel:
 * learned / built / next.
 */

export default function LearningGraphSection() {
  const [active, setActive] = useState<GraphNode>(learningGraph[learningGraph.length - 1]);
  const [hovered, setHovered] = useState<GraphNode | null>(null);
  const reduced = useReducedMotion();

  const activeIndex = learningGraph.findIndex((n) => n.id === active.id);

  return (
    <SectionShell id="journey" kicker="03 — My learning graph" index="03 / 06">
      <RiseOnScroll>
        <h2 className="font-display max-w-3xl text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl">
          I&apos;m not collecting technologies.{" "}
          <span className="text-gold-soft">I&apos;m building understanding.</span>
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-paper-dim md:text-base">
          Every node connects to the one before it. Hover to preview, select
          to see what it actually taught me — the gold path tracks how far
          the thread runs.
        </p>
      </RiseOnScroll>

      {/* ── Desktop constellation ── */}
      <div className="relative mt-14 hidden md:block" role="group" aria-label="Learning constellation">
        <div className="relative h-[460px] border border-paper/10">
          {/* Links — base path + gold progress */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.polyline
              points={learningGraph.map((n) => `${n.x},${n.y}`).join(" ")}
              fill="none"
              stroke="rgba(244,241,234,0.14)"
              strokeWidth="0.25"
              initial={reduced ? undefined : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              vectorEffect="non-scaling-stroke"
            />
            <motion.polyline
              points={learningGraph
                .slice(0, Math.max(1, activeIndex + 1))
                .map((n) => `${n.x},${n.y}`)
                .join(" ")}
              fill="none"
              stroke="rgba(201,162,39,0.65)"
              strokeWidth="0.35"
              initial={false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              vectorEffect="non-scaling-stroke"
              key={active.id}
            />
          </svg>

          {/* Hover preview tooltip */}
          <AnimatePresence>
            {hovered && hovered.id !== active.id && (
              <motion.div
                key="tip"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute z-20 max-w-[220px] border border-paper/15 bg-ink px-3.5 py-2.5"
                style={{
                  left: `${Math.min(Math.max(hovered.x, 14), 78)}%`,
                  top: `${hovered.y > 50 ? hovered.y - 24 : hovered.y + 10}%`,
                }}
                aria-hidden="true"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                  {hovered.label}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-paper-dim">
                  {hovered.learned.slice(0, 72)}…
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nodes */}
          {learningGraph.map((node, i) => {
            const isActive = active.id === node.id;
            const isPassed = i <= activeIndex;
            return (
              <motion.div
                key={node.id}
                className="absolute"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={reduced ? undefined : { opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: EASE }}
              >
                <button
                  onClick={() => setActive(node)}
                  onMouseEnter={() => setHovered(node)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(node)}
                  onBlur={() => setHovered(null)}
                  aria-pressed={isActive}
                  aria-label={`${node.label} — show details`}
                  data-cursor="view"
                  className="group relative -translate-x-1/2 -translate-y-1/2"
                >
                  {/* Active pulse */}
                  {isActive && !reduced && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/50"
                      animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <span
                    className={`relative block rounded-full transition-all duration-300 ${
                      isActive
                        ? "h-4 w-4 bg-gold"
                        : isPassed
                          ? "h-2.5 w-2.5 bg-gold/45 group-hover:bg-gold"
                          : "h-2.5 w-2.5 bg-paper/50 group-hover:bg-gold-soft"
                    }`}
                  />
                  <span
                    className={`absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                      isActive ? "text-gold-soft" : "text-paper-faint group-hover:text-paper-dim"
                    }`}
                  >
                    {node.label}
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Path counter */}
        <p className="mt-3 text-right font-mono text-[9px] uppercase tracking-[0.3em] text-paper-faint">
          thread {activeIndex + 1} / {learningGraph.length}
        </p>
      </div>

      {/* ── Mobile list ── */}
      <ol className="mt-12 flex flex-col gap-2 md:hidden" aria-label="Learning path">
        {learningGraph.map((node, i) => {
          const isActive = active.id === node.id;
          return (
            <li key={node.id} className="flex items-stretch gap-4">
              <span className="flex flex-col items-center" aria-hidden="true">
                <span
                  className={`mt-1.5 h-2 w-2 rounded-full ${
                    isActive ? "bg-gold" : i <= activeIndex ? "bg-gold/40" : "bg-paper/30"
                  }`}
                />
                {i < learningGraph.length - 1 && (
                  <span className={`w-px flex-1 ${i < activeIndex ? "bg-gold/35" : "bg-paper/15"}`} />
                )}
              </span>
              <button
                onClick={() => setActive(node)}
                aria-pressed={isActive}
                className={`pb-5 text-left font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                  isActive ? "text-gold-soft" : "text-paper-dim"
                }`}
              >
                {node.label}
              </button>
            </li>
          );
        })}
      </ol>

      {/* ── Detail panel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-10 grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-3 md:mt-16"
          aria-live="polite"
        >
          {[
            { icon: CircleDot, label: "What it taught me", body: active.learned },
            { icon: Sprout, label: "What I built on it", body: active.built },
            { icon: Telescope, label: "What I want next", body: active.next },
          ].map(({ icon: Icon, label, body }) => (
            <div key={label} className="bg-ink p-7">
              <div className="flex items-center gap-2.5">
                <Icon size={14} className="text-gold" aria-hidden="true" />
                <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper-faint">
                  {label}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-paper-dim">{body}</p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionShell>
  );
}
