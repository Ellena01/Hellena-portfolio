"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, CornerDownLeft, X } from "lucide-react";
import { socials } from "@/data/socials";
import { EASE } from "@/lib/motion";
import { useFocusTrap } from "@/lib/useFocusTrap";

/**
 * CommandPalette — press K (or click the chip) to open
 * a keyboard-first jump menu. Arrow keys + Enter to move,
 * ESC to close. Includes real social actions when they
 * exist, and chapter destinations otherwise.
 */

type Item = {
  label: string;
  hint: string;
  run: () => void;
};

const CHAPTERS = [
  ["Hello", "#hello", "Back to the opening frame"],
  ["Work", "#work", "CogniFlow / Hunuko and the case study"],
  ["Journey", "#journey", "The learning graph and timeline"],
  ["Thinking", "#thinking", "Beyond code, AI, Africa"],
  ["Now", "#now", "What Helen is learning right now"],
  ["Contact", "#contact", "Say hello"],
] as const;

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, open);

  const goTo = useCallback((sel: string) => {
    setOpen(false);
    document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const items: Item[] = [
    ...CHAPTERS.map(([label, href, hint]) => ({
      label,
      hint,
      run: () => goTo(href),
    })),
    ...socials
      .filter((s) => !s.placeholder)
      .map((s) => ({
        label: s.label,
        hint: s.href,
        run: () => {
          setOpen(false);
          window.open(s.href, s.id === "email" ? "_self" : "_blank", "noopener");
        },
      })),
    {
      label: "Back to top",
      hint: "FN 00 — rewind the reel",
      run: () => {
        setOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
  ];

  /* Open/close + item execution */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLElement &&
        (e.target.tagName === "INPUT" ||
          e.target.tagName === "TEXTAREA" ||
          e.target.isContentEditable);

      if (!open && e.key.toLowerCase() === "k" && !e.metaKey && !e.ctrlKey && !e.altKey && !typing) {
        e.preventDefault();
        setIndex(0);
        setOpen(true);
        return;
      }

      if (!open) return;

      if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => (i + 1) % items.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => (i - 1 + items.length) % items.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        items[index]?.run();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, items.length]);

  /* Scroll active item into view */
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-i="${index}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [index]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Discovery chip */}
      <button
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        data-cursor="open"
        className="fixed bottom-5 right-5 z-40 hidden items-center gap-2.5 border border-paper/12 bg-ink/80 px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] text-paper-faint backdrop-blur-md transition-colors hover:border-gold/50 hover:text-paper md:flex"
        aria-label="Open navigation palette (press K)"
      >
        <span className="border border-paper/25 px-1.5 py-0.5 text-[9px] text-paper">K</span>
        NAVIGATE
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-start justify-center px-4 pt-24 md:pt-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation palette"
          >
            {/* Backdrop */}
            <button
              aria-label="Close palette"
              className="absolute inset-0 cursor-default bg-ink/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              tabIndex={-1}
            />

            <motion.div
              ref={dialogRef}
              tabIndex={-1}
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="relative w-full max-w-xl border border-paper/15 bg-ink-2 shadow-2xl shadow-black/60 focus:outline-none"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-paper/10 px-5 py-3.5">
                <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper-faint">
                  <ArrowUpRight size={12} className="text-gold" aria-hidden="true" />
                  Jump to
                </p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close palette"
                  className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-paper-faint transition-colors hover:text-paper"
                >
                  ESC <X size={12} aria-hidden="true" />
                </button>
              </div>

              {/* Items */}
              <ul ref={listRef} role="listbox" className="max-h-80 overflow-y-auto py-2">
                {items.map((item, i) => {
                  const isActive = i === index;
                  const isAction = item.label === "Back to top";
                  return (
                    <li key={`${item.label}-${i}`} data-i={i} role="option" aria-selected={isActive}>
                      <button
                        onClick={item.run}
                        onMouseEnter={() => setIndex(i)}
                        className={`flex w-full items-center justify-between gap-4 px-5 py-3 text-left transition-colors ${
                          isActive ? "bg-paper/6" : "bg-transparent"
                        }`}
                      >
                        <span className="flex items-center gap-4">
                          <span
                            className={`font-mono text-[9px] ${
                              isActive ? "text-gold" : "text-paper-faint"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>
                            <span className="block font-display text-sm font-bold text-paper">
                              {item.label}
                            </span>
                            <span className="block font-mono text-[9px] tracking-wider text-paper-faint">
                              {item.hint}
                            </span>
                          </span>
                        </span>
                        {isActive &&
                          (isAction ? (
                            <ArrowUp size={13} className="text-gold" aria-hidden="true" />
                          ) : (
                            <CornerDownLeft size={13} className="text-gold" aria-hidden="true" />
                          ))}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Footer */}
              <div className="flex items-center gap-5 border-t border-paper/10 px-5 py-2.5 font-mono text-[9px] tracking-widest text-paper-faint">
                <span>↑↓ MOVE</span>
                <span>↵ GO</span>
                <span>ESC CLOSE</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
