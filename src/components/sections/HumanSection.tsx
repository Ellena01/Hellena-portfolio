import SectionShell from "@/components/SectionShell";
import RiseOnScroll from "@/components/RiseOnScroll";
import { profile } from "@/data/profile";

/**
 * THE HUMAN BEHIND THE SCREEN
 * ─────────────────────────────────────────────────────
 * Personal without oversharing. The portrait frame is a
 * deliberate, labelled placeholder — swap in a real
 * editorial portrait by replacing the <PortraitPlate>
 * output with <Image .../> (see README).
 */

const THEMES = [
  "Curiosity",
  "Ambition",
  "Resilience",
  "Learning",
  "Creativity",
  "Building",
  "Community",
] as const;

export default function HumanSection() {
  return (
    <SectionShell kicker="03 — The human behind the screen" index="03 / 06">
      <div className="grid items-start gap-14 md:grid-cols-12">
        {/* Copy */}
        <div className="md:col-span-7">
          <RiseOnScroll>
            <h2 className="font-display max-w-xl text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              I&apos;m still early in the journey.
              <br />
              <span className="text-paper-faint">There is a lot I don&apos;t know yet.</span>
              <br />
              <span className="text-gold-soft">That&apos;s exactly why I&apos;m excited.</span>
            </h2>
          </RiseOnScroll>

          <RiseOnScroll delay={1}>
            <div className="mt-10 flex max-w-xl flex-col gap-5 text-sm leading-relaxed text-paper-dim md:text-base">
              <p>
                Every project gives me another question. Every difficult bug
                gives me another piece of understanding. Every new room I
                enter shows me something I didn&apos;t know existed.
              </p>
              <p>
                I&apos;m trying to build a life where curiosity doesn&apos;t stay
                an idea — it becomes something I make. The ambition is simple
                to say and hard to do: keep becoming someone who can learn
                almost anything, and use it where it matters.
              </p>
            </div>
          </RiseOnScroll>

          <RiseOnScroll delay={2}>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Themes">
              {THEMES.map((theme) => (
                <li
                  key={theme}
                  className="border border-paper/12 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim"
                >
                  {theme}
                </li>
              ))}
            </ul>
          </RiseOnScroll>
        </div>

        {/* Portrait placeholder */}
        <RiseOnScroll delay={1} className="md:col-span-5">
          <PortraitPlate />
        </RiseOnScroll>
      </div>
    </SectionShell>
  );
}

/**
 * Replace this component's output with a real portrait:
 *
 *   <Image src={profile.portrait} alt={`Portrait of ${profile.name}`} fill ... />
 *
 * See README → "Replacing the profile photo".
 */
function PortraitPlate() {
  return (
    <figure
      className="relative border border-paper/15 p-3"
      aria-label={`Portrait placeholder for ${profile.name}`}
    >
      {/* Corner registration marks */}
      {["left-1 top-1", "right-1 top-1", "left-1 bottom-1", "right-1 bottom-1"].map((pos) => (
        <span key={pos} aria-hidden="true" className={`absolute ${pos} h-3 w-3`}>
          <span className="absolute left-0 top-1/2 h-px w-full bg-gold/60" />
          <span className="absolute left-1/2 top-0 h-full w-px bg-gold/60" />
        </span>
      ))}

      <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-ink-2">
        {/* Soft radial light */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 38%, rgba(244,241,234,0.07), transparent 70%)",
          }}
        />
        <div className="relative flex flex-col items-center gap-4 text-center">
          <span className="font-display text-7xl font-bold tracking-tight text-paper/12">
            {profile.initials}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-paper-faint">
            Frame 00 — portrait pending
          </span>
        </div>
      </div>

      <figcaption className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-paper-faint">
        <span>{profile.shortName} — editorial portrait</span>
        <span>to be shot</span>
      </figcaption>
    </figure>
  );
}
