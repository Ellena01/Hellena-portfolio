import {
  Compass,
  Globe,
  Lightbulb,
  MessageSquare,
  Presentation,
  Sprout,
  Users,
} from "lucide-react";
import SectionShell from "@/components/SectionShell";
import RiseOnScroll from "@/components/RiseOnScroll";

/**
 * THINKING — part one.
 * ─────────────────────────────────────────────────────
 * "Beyond code" (what Helen cares about outside syntax)
 * and "Technology should travel" (campus & community
 * ambition, phrased as honest aspiration).
 */

const INTERESTS = [
  {
    icon: Compass,
    title: "Entrepreneurship",
    detail: "Building is a team sport. I'm drawn to rooms where ideas get pressure-tested.",
  },
  {
    icon: Users,
    title: "Community",
    detail: "Technology spreads through people first. Communities are where that starts.",
  },
  {
    icon: MessageSquare,
    title: "Communication",
    detail: "An idea that can't be explained simply hasn't been understood deeply enough.",
  },
  {
    icon: Lightbulb,
    title: "Creativity",
    detail: "Interfaces, stories, visuals — the craft that makes people want to stay.",
  },
  {
    icon: Sprout,
    title: "Personal development",
    detail: "The hardest system to engineer is myself. I take that project seriously too.",
  },
  {
    icon: Presentation,
    title: "Technology advocacy",
    detail: "Helping other students discover tools — and realise they can build things too.",
  },
] as const;

export default function BeyondCodeSection() {
  return (
    <>
      <SectionShell id="thinking" kicker="04 — Beyond code" index="04 / 06">
        <RiseOnScroll>
          <h2 className="font-display max-w-3xl text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl">
            Technology is not only an engineering discipline.
            <br />
            <span className="text-paper-faint">
              It changes how people learn, work, communicate and create.
            </span>
          </h2>
        </RiseOnScroll>

        <div className="mt-14 grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
          {INTERESTS.map(({ icon: Icon, title, detail }, i) => (
            <RiseOnScroll key={title} delay={i} className="bg-ink">
              <div className="group flex h-full flex-col gap-4 p-7 transition-colors hover:bg-ink-2 md:p-8">
                <span className="flex h-10 w-10 items-center justify-center border border-paper/15 text-paper-dim transition-colors group-hover:border-gold/50 group-hover:text-gold">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-bold tracking-tight text-paper">{title}</h3>
                <p className="text-sm leading-relaxed text-paper-dim">{detail}</p>
              </div>
            </RiseOnScroll>
          ))}
        </div>
      </SectionShell>

      {/* Technology should travel */}
      <SectionShell kicker="04 — Technology should travel" index="04 / 06" tight>
        <div className="grid gap-12 md:grid-cols-12">
          <RiseOnScroll className="md:col-span-5">
            <div className="flex items-center gap-3 text-gold">
              <Globe size={20} aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em]">
                A travelling thesis
              </span>
            </div>
            <h2 className="font-display mt-6 text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl">
              Useful technology should reach students far beyond the major
              technology hubs.
            </h2>
          </RiseOnScroll>

          <RiseOnScroll delay={1} className="md:col-span-7">
            <div className="flex max-w-xl flex-col gap-5 text-sm leading-relaxed text-paper-dim md:text-base">
              <p>
                My perspective is shaped by being a young African Computer
                Science student: navigating university, learning new
                technologies, building projects, and discovering — sometimes
                late — the opportunities that exist.
              </p>
              <p>
                I&apos;m interested in student communities, campus technology
                programs, AI education, workshops, peer learning, ambassador
                programs and hackathons — because those are the roads by
                which tools actually travel.
              </p>
              <p className="border-l border-gold/50 pl-5 text-paper">
                What I want to help create: spaces where students can
                discover tools, experiment with them, and realise they can
                build things too.
              </p>
            </div>
          </RiseOnScroll>
        </div>
      </SectionShell>
    </>
  );
}
