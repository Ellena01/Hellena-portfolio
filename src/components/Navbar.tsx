"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { EASE } from "@/lib/motion";

const NAV_ITEMS = [
  { label: "Hello", href: "#hello" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Thinking", href: "#thinking" },
  { label: "Now", href: "#now" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <>
      <motion.header
        initial={reduced ? false : { y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink/80 py-3 backdrop-blur-md border-b border-paper/8"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <nav
          className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 md:px-10"
          aria-label="Primary"
        >
          <button
            onClick={() => go("#hello")}
            className="flex items-baseline gap-1.5 group"
            aria-label="Back to top"
          >
            <span className="font-display text-lg font-bold tracking-tight">
              {profile.shortName}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold group-hover:scale-125 transition-transform" />
          </button>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => go(item.href)}
                  className="link-sweep font-mono text-[11px] uppercase tracking-[0.25em] text-paper-dim hover:text-paper transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile trigger */}
          <button
            className="md:hidden p-2 -mr-2 text-paper"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] bg-ink flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-paper/8">
              <span className="font-mono text-[11px] tracking-[0.3em] text-paper-faint uppercase">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 text-paper"
                aria-label="Close menu"
                autoFocus
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-8" aria-label="Mobile">
              <ul className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: EASE }}
                  >
                    <button
                      onClick={() => go(item.href)}
                      className="group flex w-full items-baseline gap-4 py-3 text-left"
                    >
                      <span className="font-mono text-[10px] text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-4xl font-bold tracking-tight text-paper group-hover:text-gold transition-colors">
                        {item.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="px-8 pb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper-faint">
                {profile.narrative}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
