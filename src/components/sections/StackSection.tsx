"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import RiseOnScroll from "@/components/RiseOnScroll";
import { skillGroups, type SkillLevel } from "@/data/skills";

/**
 * STACK — "The stack is still growing."
 * ─────────────────────────────────────────────────────
 * Interactive: use the level pills to filter the whole
 * ledger. Honest labels stay the point — filtering just
 * makes the honesty explorable.
 */

const LEVELS: (SkillLevel | "All")[] = [
  "All",
  "Building with",
  "Learning",
  "Exploring",
  "Everyday",
];

const LEVEL_STYLES: Record<SkillLevel, string> = {
  "Building with": "text-gold-soft border-gold/40",
  Learning: "text-blue border-blue/40",
  Exploring: "text-violet border-violet/40",
  Everyday: "text-paper-dim border-paper/20",
};

export default function StackSection() {
  const [filter, setFilter] = useState<SkillLevel | "All">("All");

  return (
    <SectionShell kicker="02 — The stack is still growing" index="02 / 06">
      <RiseOnScroll>
        <h2 className="font-display max-w-3xl text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl">
          Tools I reach for —{" "}
          <span className="text-paper-faint">labelled honestly.</span>
        </h2>
      </RiseOnScroll>

      {/* Level filter */}
      <RiseOnScroll delay={1}>
        <div
          className="mt-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter skills by level"
        >
          {LEVELS.map((level) => {
            const isActive = filter === level;
            const style =
              level === "All"
                ? "text-paper border-paper/30"
                : LEVEL_STYLES[level as SkillLevel];
            return (
              <button
                key={level}
                onClick={() => setFilter(level)}
                aria-pressed={isActive}
                className={`border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${style} ${
                  isActive ? "bg-paper/5 scale-[1.03]" : "opacity-50 hover:opacity-100"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </RiseOnScroll>

      <div className="mt-12 grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <RiseOnScroll key={group.id} delay={gi} className="bg-ink">
            <div className="flex h-full flex-col p-7 md:p-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper">
                {group.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-paper-faint">{group.note}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {group.skills.map((skill) => {
                  const match = filter === "All" || skill.level === filter;
                  return (
                    <motion.li
                      key={skill.name}
                      animate={{
                        opacity: match ? 1 : 0.22,
                        scale: match ? 1 : 0.98,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-baseline justify-between gap-4 border-b border-paper/8 pb-2.5 last:border-none"
                    >
                      <span className={`text-sm ${match ? "text-paper" : "text-paper-dim"}`}>
                        {skill.name}
                      </span>
                      <span
                        className={`shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] ${
                          LEVEL_STYLES[skill.level].split(" ")[0]
                        }`}
                      >
                        {skill.level}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </RiseOnScroll>
        ))}
      </div>

      <RiseOnScroll delay={2}>
        <p className="mt-10 max-w-lg text-sm leading-relaxed text-paper-faint">
          Nothing on this page pretends to be finished. The labels change as I
          do — that&apos;s the point of keeping them honest.
        </p>
      </RiseOnScroll>
    </SectionShell>
  );
}
