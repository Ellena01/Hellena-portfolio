import { ArrowUpRight } from "lucide-react";
import SectionShell from "@/components/SectionShell";
import RiseOnScroll from "@/components/RiseOnScroll";
import { opportunities } from "@/data/now";

/**
 * OPPORTUNITIES — "Let's build something."
 * ─────────────────────────────────────────────────────
 * For the people this site exists for: programs,
 * recruiters, founders, collaborators. Honest interest,
 * no invented availability claims.
 */

export default function OpportunitiesSection() {
  return (
    <SectionShell kicker="06 — Let's build something" index="06 / 06">
      <RiseOnScroll>
        <h2 className="font-display max-w-3xl text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl">
          Rooms I&apos;d love to be in —{" "}
          <span className="text-paper-faint">and what I&apos;d bring to them.</span>
        </h2>
      </RiseOnScroll>

      <ul className="mt-14 flex flex-col border-t border-paper/10" aria-label="Opportunities">
        {opportunities.map((op, i) => (
          <RiseOnScroll key={op.title} delay={i}>
            <li className="group border-b border-paper/10 py-7 transition-colors hover:bg-ink-2 md:py-8">
              <a href="#contact" className="flex items-baseline justify-between gap-6">
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-[10px] text-gold/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-paper transition-colors group-hover:text-gold-soft md:text-2xl">
                      {op.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper-dim">
                      {op.detail}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-paper-faint transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold"
                />
              </a>
            </li>
          </RiseOnScroll>
        ))}
      </ul>

      <RiseOnScroll delay={3}>
        <p className="mt-10 max-w-xl text-sm leading-relaxed text-paper-faint">
          I won&apos;t pretend to have decades of experience. What I bring is
          trajectory, curiosity with discipline, and the habit of finishing
          things. If that&apos;s what you&apos;re looking for, the next section is
          one click away.
        </p>
      </RiseOnScroll>
    </SectionShell>
  );
}
