"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Hammer, NotebookPen, Orbit } from "lucide-react";
import SectionShell from "@/components/SectionShell";
import RiseOnScroll from "@/components/RiseOnScroll";
import { nowBoard } from "@/data/now";

/**
 * NOW — "What I'm learning right now."
 * ─────────────────────────────────────────────────────
 * A living board with a typewriter cycling through the
 * current obsessions. Edit content in src/data/now.ts.
 */

const COLUMNS = [
  { key: "building", icon: Hammer, data: nowBoard.building },
  { key: "learning", icon: NotebookPen, data: nowBoard.learning },
  { key: "curious", icon: Orbit, data: nowBoard.curious },
] as const;

const PHRASES = [
  "python, again — deeper this time.",
  "machine learning fundamentals.",
  "backend systems that stay up.",
  "interfaces that feel like scenes.",
  "speech as a learning interface.",
];

export default function NowSection() {
  return (
    <SectionShell id="now" kicker="05 — Right now" index="05 / 06" tight>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <RiseOnScroll>
          <h2 className="font-display max-w-2xl text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl">
            What I&apos;m learning right now<span className="text-gold">.</span>
          </h2>
          <p className="mt-5 h-5 font-mono text-[11px] tracking-[0.2em] text-gold-soft/90">
            <TypeCycle phrases={[...PHRASES]} />
          </p>
        </RiseOnScroll>
        <RiseOnScroll delay={1}>
          <p className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-paper-faint">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/50"
                style={{ animationDuration: "2.2s" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            Live board — updated as I go
          </p>
        </RiseOnScroll>
      </div>

      <div className="mt-12 grid gap-px border border-paper/10 bg-paper/10 md:grid-cols-3">
        {COLUMNS.map(({ key, icon: Icon, data }, i) => (
          <RiseOnScroll key={key} delay={i} className="bg-ink">
            <div className="group flex h-full flex-col p-7 transition-colors hover:bg-ink-2 md:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center border border-gold/40 text-gold transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <Icon size={15} aria-hidden="true" />
                </span>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper">
                  {data.title}
                </h3>
              </div>
              <ul className="mt-6 flex flex-col gap-4">
                {data.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-paper-dim"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/70" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RiseOnScroll>
        ))}
      </div>
    </SectionShell>
  );
}

/* ─── Typewriter cycle ───────────────────────────────── */
function TypeCycle({ phrases }: { phrases: string[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const full = phrases[index];

    let delay = deleting ? 22 : 55;
    let nextLength = length;
    let nextDeleting = deleting;
    let nextIndex = index;

    if (!deleting && length === full.length) {
      nextDeleting = true;
      // linger at full phrase
      const t = window.setTimeout(() => setDeleting(true), 1600);
      return () => window.clearTimeout(t);
    }
    if (deleting && length === 0) {
      nextDeleting = false;
      nextIndex = (index + 1) % phrases.length;
    } else {
      nextLength = length + (deleting ? -1 : 1);
    }

    void delay;
    const t = window.setTimeout(() => {
      setIndex(nextIndex);
      setLength(nextLength);
      setDeleting(nextDeleting);
    }, delay);
    return () => window.clearTimeout(t);
  }, [index, length, deleting, phrases, reduced]);

  if (reduced) return <span>{phrases[0]}</span>;

  return (
    <span aria-label={`Currently focused on: ${phrases[index]}`}>
      <span aria-hidden="true">
        {phrases[index].slice(0, length)}
        <span className="animate-pulse text-gold">_</span>
      </span>
    </span>
  );
}
