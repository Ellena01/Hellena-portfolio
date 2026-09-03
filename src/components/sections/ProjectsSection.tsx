"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  Atom,
  BookOpenText,
  BrainCircuit,
  ChevronDown,
  FolderKanban,
  GraduationCap,
  Layers,
  Mic2,
  Plus,
  Route,
  Sparkles,
  X,
} from "lucide-react";
import SectionShell from "@/components/SectionShell";
import RiseOnScroll from "@/components/RiseOnScroll";
import Magnetic from "@/components/MagneticButton";
import { GithubIcon } from "@/components/icons";
import { projects, type Project } from "@/data/projects";
import { EASE } from "@/lib/motion";

const FEATURE_ICONS = [BrainCircuit, BookOpenText, GraduationCap, Mic2, Layers, Sparkles, Atom];

/**
 * WORK — "What I'm building."
 * ─────────────────────────────────────────────────────
 * A 3D-tilting editorial poster with parallax depth that
 * opens into a full immersive case study — now with
 * clickable "explored" cards and an animated roadmap.
 */

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);

  const featured = projects.filter((p) => p.featured);

  return (
    <SectionShell id="work" kicker="02 — What I'm building" index="02 / 06">
      <RiseOnScroll>
        <h2 className="font-display max-w-3xl text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl">
          Two projects, two different lessons:{" "}
          <span className="text-paper-faint">
            one still becoming, one already live.
          </span>
        </h2>
      </RiseOnScroll>

      <div className="mt-14 flex flex-col gap-10 md:mt-20">
        {featured.map((project, i) => (
          <ProjectPoster
            key={project.id}
            project={project}
            index={i + 1}
            onOpen={() => setActive(project)}
          />
        ))}
      </div>

      <RiseOnScroll delay={2}>
        <p className="mt-12 max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-paper-faint">
          More experiments in progress. Added here only when they&apos;re real.
        </p>
      </RiseOnScroll>

      <AnimatePresence>
        {active && <CaseStudy project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </SectionShell>
  );
}

/* ─── 3D tilt wrapper ────────────────────────────────── */
function Tilt({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 140, damping: 18, mass: 0.4 });

  if (reduced) return <div>{children}</div>;

  const onMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 4.5);
    rx.set(-(py - 0.5) * 4.5);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── The poster card ────────────────────────────────── */
function ProjectPoster({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sprx = useSpring(px, { stiffness: 90, damping: 20 });
  const spry = useSpring(py, { stiffness: 90, damping: 20 });

  const onMove = (e: ReactMouseEvent) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 12);
  };

  return (
    <RiseOnScroll delay={1}>
      <Tilt>
        <article
          className="group relative grid overflow-hidden border border-paper/10 transition-colors hover:border-paper/20 md:grid-cols-2"
          onMouseMove={onMove}
          onMouseLeave={() => {
            px.set(0);
            py.set(0);
          }}
          data-cursor="open"
        >
          {/* Visual with parallax */}
          <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[440px]">
            <motion.div className="absolute inset-[-4%]" style={{ x: sprx, y: spry }}>
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            </motion.div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"
            />
            {/* Cursor-following glint */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute h-56 w-56 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                x: sprx,
                y: spry,
                left: "30%",
                top: "30%",
                background:
                  "radial-gradient(circle, rgba(201,162,39,0.14), transparent 65%)",
              }}
            />
            <p className="absolute bottom-4 left-5 font-mono text-[9px] uppercase tracking-[0.3em] text-paper/60">
              FIG. 01 — {project.title} concept
            </p>
          </div>

          {/* Copy */}
          <div className="flex flex-col p-7 md:p-12">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                {project.status}
              </p>
              <p className="font-display text-5xl font-bold text-paper/8">
                {String(index).padStart(2, "0")}
              </p>
            </div>

            <h3 className="font-display mt-6 text-4xl font-bold tracking-tight text-paper md:text-5xl">
              {project.title}
              <span className="ml-3 align-top font-mono text-xs font-normal uppercase tracking-[0.25em] text-paper-faint">
                / {project.altTitle}
              </span>
            </h3>

            <p className="mt-3 font-display text-base text-paper-dim md:text-lg">
              {project.subtitle}
            </p>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-paper-dim">
              {project.description}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
              {project.technologies.slice(0, 5).map((t) => (
                <li
                  key={t}
                  className="border border-paper/12 px-2.5 py-1 font-mono text-[10px] tracking-wider text-paper-dim"
                >
                  {t}
                </li>
              ))}
              <li className="px-2.5 py-1 font-mono text-[10px] tracking-wider text-paper-faint">
                +{project.technologies.length - 5} more
              </li>
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-4 pt-10">
              <Magnetic strength={0.2}>
                <button
                  onClick={onOpen}
                  data-cursor="read"
                  className="group/btn inline-flex items-center gap-3 bg-paper px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
                >
                  Open the case study
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </button>
              </Magnetic>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="live"
                  className="inline-flex items-center gap-2 border border-gold/50 bg-gold/10 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-soft transition-colors hover:bg-gold/20"
                >
                  Live demo
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-paper/20 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:border-gold hover:text-gold"
                >
                  <GithubIcon size={14} /> GitHub
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 border border-dashed border-paper/15 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
                  <GithubIcon size={14} /> GitHub — link coming
                </span>
              )}
            </div>
          </div>
        </article>
      </Tilt>
    </RiseOnScroll>
  );
}

/* ─── The immersive case study ───────────────────────── */
function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [openFeature, setOpenFeature] = useState<number>(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      className="fixed inset-0 z-[120] bg-ink"
      initial={{ opacity: 0, y: reduced ? 0 : 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : 40 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="h-full overflow-y-auto overscroll-contain">
        <div className="mx-auto max-w-5xl px-6 py-8 md:px-10 md:py-12">
          {/* Header */}
          <div className="sticky top-0 z-10 -mx-6 flex items-center justify-between bg-ink/85 px-6 py-4 backdrop-blur-md md:-mx-10 md:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper-faint">
              Case study — {project.title} / {project.altTitle}
            </p>
            <button
              ref={closeRef}
              onClick={onClose}
              data-cursor="close"
              className="flex items-center gap-2 border border-paper/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper transition-colors hover:border-gold hover:text-gold"
            >
              Close <X size={13} aria-hidden="true" />
            </button>
          </div>

          {/* Title */}
          <header className="pt-14 md:pt-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">
              {project.status}
            </p>
            <h2 className="font-display mt-5 text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
              {project.title}
              <span className="ml-3 align-top font-mono text-sm font-normal uppercase tracking-[0.2em] text-paper-faint">
                / {project.altTitle}
              </span>
            </h2>
            <p className="font-display mt-4 max-w-2xl text-lg text-paper-dim md:text-2xl">
              {project.subtitle}
            </p>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="live"
                className="mt-8 inline-flex items-center gap-2 border border-gold/50 bg-gold/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-soft transition-colors hover:bg-gold/20"
              >
                Open the live platform
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            )}
          </header>

          <CaseBlock icon={<FolderKanban size={15} aria-hidden />} label="The problem">
            <p className="max-w-3xl text-base leading-relaxed text-paper-dim md:text-lg">
              {project.problem}
            </p>
          </CaseBlock>

          <CaseBlock icon={<Sparkles size={15} aria-hidden />} label="The idea">
            <p className="font-display max-w-3xl text-xl leading-relaxed text-paper md:text-2xl">
              {project.idea}
            </p>
          </CaseBlock>

          {/* What I explored — interactive accordion */}
          <CaseBlock icon={<Atom size={15} aria-hidden />} label="What I explored">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-paper-faint">
              Select a card to unfold it
            </p>
            <div className="grid items-start gap-2 sm:grid-cols-2">
              {project.explored.map((f, i) => {
                const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
                const isOpen = openFeature === i;
                return (
                  <div
                    key={f.title}
                    className={`border transition-colors ${
                      isOpen ? "border-gold/40 bg-gold/[0.03]" : "border-paper/10 hover:border-paper/25"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFeature(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-3 p-5 text-left"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 items-center justify-center border transition-colors ${
                            isOpen ? "border-gold/60 text-gold" : "border-paper/20 text-paper-dim"
                          }`}
                        >
                          <Icon size={14} aria-hidden="true" />
                        </span>
                        <span className="font-display text-sm font-bold tracking-wide text-paper">
                          {f.title}
                        </span>
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className={isOpen ? "text-gold" : "text-paper-faint"}
                      >
                        <Plus size={14} aria-hidden="true" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 pl-[60px] text-sm leading-relaxed text-paper-dim">
                            {f.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </CaseBlock>

          <CaseBlock icon={<Layers size={15} aria-hidden />} label="The stack">
            <ul className="flex flex-wrap gap-2" aria-label="Full technology list">
              {project.technologies.map((t) => (
                <li
                  key={t}
                  className="border border-paper/12 px-3 py-1.5 font-mono text-xs tracking-wider text-paper-dim transition-colors hover:border-gold/50 hover:text-paper"
                >
                  {t}
                </li>
              ))}
            </ul>
          </CaseBlock>

          <CaseBlock icon={<GraduationCap size={15} aria-hidden />} label="What I learned">
            <ul className="grid max-w-3xl gap-x-10 gap-y-4 sm:grid-cols-2">
              {project.learnings.map((l, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-paper-dim">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
                  {l}
                </li>
              ))}
            </ul>
          </CaseBlock>

          {/* Future roadmap */}
          <CaseBlock icon={<Route size={15} aria-hidden />} label="What's next">
            <ol className="relative ml-2 max-w-2xl border-l border-paper/12 pl-8">
              {project.future.map((step, i) => (
                <motion.li
                  key={step.step}
                  initial={reduced ? undefined : { opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                  className="relative pb-8 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[38.5px] top-1 flex h-[13px] w-[13px] items-center justify-center rounded-full border border-gold bg-ink"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold" />
                  </span>
                  <h4 className="font-display text-base font-bold text-paper">{step.step}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-paper-dim">{step.detail}</p>
                </motion.li>
              ))}
            </ol>
          </CaseBlock>

          <div className="hairline my-14" aria-hidden="true" />
          <p className="pb-16 text-center font-mono text-[10px] uppercase leading-loose tracking-[0.25em] text-paper-faint">
            A prototype, honestly labelled.
            <br />
            Built to learn — and still teaching.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CaseBlock({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 md:mt-24" aria-label={label}>
      <div className="mb-8 flex items-center gap-3">
        <span className="text-gold">{icon}</span>
        <h3 className="font-mono text-[11px] uppercase tracking-[0.35em] text-paper">
          {label}
        </h3>
        <span className="hairline flex-1" aria-hidden="true" />
        <ChevronDown size={12} className="text-paper-faint" aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}
