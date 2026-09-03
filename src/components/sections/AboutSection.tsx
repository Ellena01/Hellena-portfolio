import SectionShell from "@/components/SectionShell";
import RiseOnScroll from "@/components/RiseOnScroll";
import { profile } from "@/data/profile";

/**
 * ABOUT — "A little about me."
 * ─────────────────────────────────────────────────────
 * Written like a personal editorial, not a CV.
 * Asymmetric composition: giant intro line, then a
 * two-column essay with an honest interests ledger.
 */

const INTERESTS = [
  "Artificial intelligence",
  "Software engineering",
  "Frontend development",
  "Backend systems",
  "Education technology",
  "Human-centered technology",
  "Entrepreneurship",
  "Creative technology",
] as const;

export default function AboutSection() {
  return (
    <SectionShell id="about" kicker="01 — A little about me" index="01 / 06">
      <RiseOnScroll>
        <h2 className="font-display max-w-4xl text-3xl font-bold leading-[1.08] tracking-tight text-paper md:text-5xl">
          I became fascinated by what happens when technology stops being just{" "}
          <span className="text-paper-faint">code</span> — and starts becoming an{" "}
          <span className="text-gold-soft">experience</span>.
        </h2>
      </RiseOnScroll>

      <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12">
        {/* Essay */}
        <div className="md:col-span-7">
          <RiseOnScroll delay={1}>
            <p className="max-w-xl text-base leading-relaxed text-paper-dim md:text-lg">
              I&apos;m a Computer Science student at{" "}
              <span className="text-paper">
                {profile.university} ({profile.universityShort})
              </span>
              . I like understanding how things work — breaking them apart,
              rebuilding them, and asking a slightly annoying question:
            </p>
          </RiseOnScroll>
          <RiseOnScroll delay={2}>
            <p className="font-display mt-8 text-xl font-medium leading-snug text-paper md:text-2xl">
              <span className="mr-3 inline-block h-px w-8 -translate-y-1.5 bg-gold" aria-hidden="true" />
              Could this be better?
            </p>
          </RiseOnScroll>
          <RiseOnScroll delay={3}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-paper-dim md:text-lg">
              That question has taken me from learning Python and software
              engineering to experimenting with AI, building educational
              products, entering hackathons, exploring communities — and
              constantly looking for the next thing I don&apos;t know yet.
              I&apos;m especially drawn to technology that makes complicated
              things easier to understand.
            </p>
          </RiseOnScroll>
        </div>

        {/* Interests ledger */}
        <RiseOnScroll delay={2} className="md:col-span-5">
          <div className="border border-paper/10 p-7 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper-faint">
              Areas of interest
            </p>
            <ul className="mt-6 flex flex-col">
              {INTERESTS.map((interest, i) => (
                <li
                  key={interest}
                  className="flex items-baseline gap-4 border-b border-paper/8 py-3 last:border-none"
                >
                  <span className="font-mono text-[10px] text-gold/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-paper-dim">{interest}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-paper/8 pt-5 text-sm leading-relaxed text-paper-faint">
              The thread through all of it:{" "}
              <span className="text-paper-dim">{profile.mission}</span>
            </p>
          </div>
        </RiseOnScroll>
      </div>
    </SectionShell>
  );
}
