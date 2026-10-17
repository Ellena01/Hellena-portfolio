"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, Terminal } from "lucide-react";
import SectionShell from "@/components/SectionShell";
import RiseOnScroll from "@/components/RiseOnScroll";
import Magnetic from "@/components/MagneticButton";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { EASE } from "@/lib/motion";

/**
 * CONTACT — "If you're building something interesting, say hello."
 * ─────────────────────────────────────────────────────
 * Magnetic social buttons, one-click email copy with
 * feedback, and the terminal easter egg in the footer.
 */

const ICONS: Record<string, (size: number) => React.ReactNode> = {
  email: (s) => <Mail size={s} aria-hidden="true" />,
  linkedin: (s) => <LinkedinIcon size={s} />,
  github: (s) => <GithubIcon size={s} />,
};

const TERMINAL_LINES = [
  "$ hello --world",
  "currently compiling: one very determined student…",
  "status: still learning. always.",
  "thank you for scrolling this far. genuinely.",
];

export default function ContactSection() {
  const reduced = useReducedMotion();
  const [termLine, setTermLine] = useState(0);
  const [copied, setCopied] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const emailSocial = socials.find((s) => s.id === "email");
  const emailValue = emailSocial?.href.replace("mailto:", "") ?? "";
  const hasPlaceholder = socials.some((s) => s.placeholder);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailValue);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — stay quiet */
    }
  };

  const toTop = () => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  return (
    <>
      <SectionShell id="contact" kicker="06 — Say hello" index="06 / 06">
        <RiseOnScroll>
          <h2 className="font-display max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            If you&apos;re building something{" "}
            <span className="text-gold-soft">interesting</span>, say hello.
          </h2>
        </RiseOnScroll>

        <RiseOnScroll delay={1}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-paper-dim md:text-lg">
            Programs, internships, hackathons, collaborations, or just a good
            conversation about learning and AI — my inbox is open and my
            curiosity is cheap to feed.
          </p>
        </RiseOnScroll>

        <RiseOnScroll delay={2}>
          <div className="mt-12 flex flex-wrap items-stretch gap-4">
            {socials.map((social) => (
              <div key={social.id} className="flex items-stretch">
                <Magnetic strength={0.18}>
                  <a
                    href={social.href}
                    target={social.id === "email" ? undefined : "_blank"}
                    rel={social.id === "email" ? undefined : "noopener noreferrer"}
                    data-cursor="go"
                    onMouseEnter={() => setHoveredLink(social.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="group inline-flex items-center gap-3 border border-paper/20 px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-gold hover:text-gold"
                    aria-label={`${social.label}${social.placeholder ? " (placeholder link)" : ""}`}
                  >
                    <span className="relative h-[14px] w-[14px] overflow-hidden" aria-hidden="true">
                      <span
                        className={`absolute inset-0 transition-transform duration-300 ${
                          hoveredLink === social.id ? "-translate-y-full" : ""
                        }`}
                      >
                        {ICONS[social.id]?.(14) ?? <ArrowUpRight size={14} />}
                      </span>
                      <span
                        className={`absolute inset-0 translate-y-full transition-transform duration-300 ${
                          hoveredLink === social.id ? "translate-y-0" : ""
                        }`}
                      >
                        {ICONS[social.id]?.(14) ?? <ArrowUpRight size={14} />}
                      </span>
                    </span>
                    {social.label}
                    {social.placeholder && (
                      <span className="font-normal tracking-normal text-paper-faint">*</span>
                    )}
                  </a>
                </Magnetic>

                {/* Copy email affordance */}
                {social.id === "email" && (
                  <button
                    onClick={copyEmail}
                    data-cursor={copied ? "copied" : "copy"}
                    aria-live="polite"
                    aria-label={copied ? "Copied to clipboard" : `Copy email address ${emailValue}`}
                    className="ml-2 flex items-center gap-2 border border-dashed border-paper/20 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-faint transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-gold" aria-hidden="true" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} aria-hidden="true" />
                        <span className="hidden sm:inline">{emailValue}</span>
                        <span className="sm:hidden">Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
          {hasPlaceholder && (
            <p className="mt-5 font-mono text-[10px] leading-relaxed tracking-wider text-paper-faint">
              * Placeholder links — real addresses live in{" "}
              <code className="text-paper-dim">src/data/socials.ts</code> until socials are confirmed.
            </p>
          )}
        </RiseOnScroll>
      </SectionShell>

      {/* ── Footer ── */}
      <footer className="border-t border-paper/8 bg-ink-2/60">
        <div className="mx-auto w-full max-w-6xl px-6 py-10 md:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-lg font-bold tracking-tight text-paper">
                {profile.name}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-paper-faint">
                Computer Science • AI • Building
              </p>
              <p className="mt-4 max-w-sm text-xs leading-relaxed text-paper-faint">
                {profile.narrative}
              </p>
            </div>

            {/* Terminal easter egg */}
            <button
              onClick={() => setTermLine((n) => (n + 1) % TERMINAL_LINES.length)}
              data-cursor="run"
              className="group flex items-center gap-3 self-start border border-paper/10 px-4 py-3 text-left transition-colors hover:border-gold/40 md:self-auto"
              aria-label="A small terminal. Click to advance the message."
            >
              <Terminal size={13} className="shrink-0 text-gold/80" aria-hidden="true" />
              <span className="relative h-4 overflow-hidden font-mono text-[10px] tracking-wider text-paper-dim">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={termLine}
                    initial={reduced ? undefined : { y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduced ? undefined : { y: -8, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="block"
                  >
                    {TERMINAL_LINES[termLine]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </button>

            <button
              onClick={toTop}
              data-cursor="rewind"
              className="group inline-flex items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.25em] text-paper-faint transition-colors hover:text-gold md:self-auto"
              aria-label="Back to top"
            >
              Top
              <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>
          </div>

          <div className="hairline-solid my-8" aria-hidden="true" />
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.25em] text-paper-faint">
            <span>© {new Date().getFullYear()} {profile.name}</span>
            <span aria-hidden="true">FIN — end of reel</span>
          </div>
        </div>
      </footer>

      {/* Closing frame — the last photograph of the story */}
      <ClosingFrame />
    </>
  );
}

/* ─── Closing photograph (editorial plate) ────────── */
function ClosingFrame() {
  const reduced = useReducedMotion();

  return (
    <motion.figure
      aria-label="Closing photograph"
      initial={reduced ? undefined : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative mx-auto w-full max-w-6xl px-6 pb-20 md:px-10"
    >
      <div className="border border-paper/15 bg-ink-2/60 p-3">
        <div className="relative aspect-[3/4] w-full overflow-hidden md:mx-auto md:max-w-xl">
          <Image
            src="/images/closing.jpg"
            alt="Closing photograph — Helen Oyiza Ozipius"
            fill
            sizes="(min-width: 768px) 36vw, 100vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <figcaption className="mt-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-paper-faint">
        <span className="leader-dots" aria-hidden="true" />
        Fig. 06 — the end, for now
      </figcaption>
    </motion.figure>
  );
}
