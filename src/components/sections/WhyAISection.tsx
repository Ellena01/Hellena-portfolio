import SectionShell from "@/components/SectionShell";
import RiseOnScroll from "@/components/RiseOnScroll";

/**
 * WHY AI
 * ─────────────────────────────────────────────────────
 * An editorial section — thoughtful, not marketing.
 * Large pull-quote typography with quiet body copy.
 */

const POTENTIALS = [
  { word: "personalized", detail: "Teaching that adapts to the confused, not the average." },
  { word: "interactive", detail: "Dialogue instead of monologue. Questions are allowed." },
  { word: "visual", detail: "Abstract ideas rendered before they are described." },
  { word: "accessible", detail: "Across connectivity, language and resource constraints." },
  { word: "conversational", detail: "The oldest teaching interface there is: a patient voice." },
] as const;

export default function WhyAISection() {
  return (
    <SectionShell kicker="04 — Why AI matters to me" index="04 / 06" tight>
      <RiseOnScroll>
        <h2 className="font-display max-w-4xl text-3xl font-bold leading-[1.12] tracking-tight md:text-5xl">
          AI isn&apos;t interesting to me because it&apos;s trendy.{" "}
          <span className="text-paper-faint">
            It&apos;s interesting because it changes the interface between
            people and knowledge.
          </span>
        </h2>
      </RiseOnScroll>

      <div className="mt-14 grid gap-12 md:grid-cols-12">
        <RiseOnScroll delay={1} className="md:col-span-6">
          <p className="max-w-lg text-sm leading-relaxed text-paper-dim md:text-base">
            Done carelessly, AI is a shortcut machine. Done thoughtfully, it
            could make education something much closer to a good
            conversation with a patient teacher — the kind who explains the
            same idea five different ways until the right one lands. That
            possibility is the whole reason CogniFlow exists.
          </p>
          <p className="mt-6 max-w-lg border-l border-gold/50 pl-5 text-sm leading-relaxed text-paper md:text-base">
            The question I keep coming back to: how do we build AI that
            makes people more capable, not more dependent?
          </p>
        </RiseOnScroll>

        <div className="md:col-span-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper-faint">
            What thoughtful AI could make education
          </p>
          <ul className="mt-5 flex flex-col">
            {POTENTIALS.map((p, i) => (
              <RiseOnScroll key={p.word} delay={i}>
                <li className="flex items-baseline gap-5 border-b border-paper/8 py-4 last:border-none">
                  <span className="font-display w-40 shrink-0 text-lg font-bold text-gold-soft md:w-48 md:text-xl">
                    {p.word}
                  </span>
                  <span className="text-sm leading-relaxed text-paper-dim">{p.detail}</span>
                </li>
              </RiseOnScroll>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
