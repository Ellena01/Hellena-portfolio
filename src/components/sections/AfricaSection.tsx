import Image from "next/image";
import SectionShell from "@/components/SectionShell";
import RiseOnScroll from "@/components/RiseOnScroll";

/**
 * AFRICA — "Built from Africa. Thinking beyond it."
 * ─────────────────────────────────────────────────────
 * Personal, not slogans. Real constraints that shape the
 * EdTech vision: affordability, connectivity, language,
 * offline access. Contour artwork sits behind the text.
 */

const CONSTRAINTS = [
  {
    title: "Affordability",
    detail: "The best tool is the one a student can actually afford to run.",
  },
  {
    title: "Connectivity",
    detail: "If it dies on weak signal, it dies for the student who needed it most.",
  },
  {
    title: "Multilingual reality",
    detail: "Explanations should travel across languages, not stop at one.",
  },
  {
    title: "Offline-first thinking",
    detail: "Learning should survive the gaps — treat them as design input, not edge cases.",
  },
] as const;

export default function AfricaSection() {
  return (
    <section aria-label="Built from Africa" className="relative overflow-hidden">
      {/* Contour artwork backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/contours.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.16]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      </div>

      <SectionShell kicker="04 — Built from Africa. Thinking beyond it." index="04 / 06" className="relative">
        <RiseOnScroll>
          <h2 className="font-display max-w-4xl text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            I don&apos;t want to build technology that assumes everyone has the{" "}
            <span className="text-gold-soft">same resources, infrastructure,
            language, or learning environment.</span>
          </h2>
        </RiseOnScroll>

        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <RiseOnScroll delay={1} className="md:col-span-5">
            <div className="flex max-w-md flex-col gap-5 text-sm leading-relaxed text-paper-dim md:text-base">
              <p>
                Learning technology in Nigeria teaches you things no course
                syllabus covers: what it costs to be online, how tools feel
                when the connection stutters, how many good ideas quietly die
                behind a login screen that never loads.
              </p>
              <p>
                That&apos;s not a hardship story — it&apos;s a specification. The
                constraints here are precisely what will make the next
                generation of learning tools honest, if someone builds them
                that way.
              </p>
            </div>
          </RiseOnScroll>

          <div className="md:col-span-7">
            <ul className="grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2" aria-label="Design constraints">
              {CONSTRAINTS.map((c, i) => (
                <RiseOnScroll key={c.title} delay={i} className="bg-ink">
                  <li className="flex h-full flex-col gap-3 p-6 md:p-7">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/90">
                      {c.title}
                    </span>
                    <span className="text-sm leading-relaxed text-paper-dim">{c.detail}</span>
                  </li>
                </RiseOnScroll>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
