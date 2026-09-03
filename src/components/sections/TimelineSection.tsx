import SectionShell from "@/components/SectionShell";
import RiseOnScroll from "@/components/RiseOnScroll";
import { timeline } from "@/data/journey";

/**
 * JOURNEY TIMELINE
 * ─────────────────────────────────────────────────────
 * A vertical cinematic timeline. No invented dates —
 * entries are phases, which is both honest and more
 * editorial. Editable in src/data/journey.ts.
 */

export default function TimelineSection() {
  return (
    <SectionShell kicker="03 — The journey so far" index="03 / 06" tight>
      <div className="grid gap-12 md:grid-cols-12">
        <RiseOnScroll className="md:col-span-4">
          <h2 className="font-display sticky top-28 text-3xl font-bold leading-[1.08] tracking-tight md:text-4xl">
            Early chapters,
            <br />
            <span className="text-paper-faint">written as they happen.</span>
          </h2>
        </RiseOnScroll>

        <ol className="relative ml-3 flex flex-col border-l border-paper/12 pl-9 md:col-span-8 md:ml-8 md:pl-12">
          {timeline.map((entry, i) => (
            <RiseOnScroll key={entry.title} delay={Math.min(i, 3)}>
              <li className="relative pb-12 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute top-2 flex h-3 w-3 items-center justify-center rounded-full bg-ink md:-left-[54px] -left-[42.5px] ${
                    entry.accent ? "border border-gold" : "border border-paper/30"
                  }`}
                >
                  <span className={`h-1 w-1 rounded-full ${entry.accent ? "bg-gold" : "bg-paper/40"}`} />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/90">
                  {entry.phase}
                </p>
                <h3 className="font-display mt-2 text-xl font-bold tracking-tight text-paper md:text-2xl">
                  {entry.title}
                </h3>
                <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-paper-dim">
                  {entry.detail}
                </p>
              </li>
            </RiseOnScroll>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
