/**
 * PROFILE DATA
 * ─────────────────────────────────────────────────────
 * Helen's core identity, positioning and microcopy.
 * Update this file to change the hero headline, bio
 * details, and the small status labels across the site.
 */

export const profile = {
  name: "Helen Oyiza Ozipius",
  shortName: "Helen",
  initials: "HO",

  /** The big line everyone meets first. */
  greeting: "Hello, I'm Helen.",

  /** One-sentence positioning shown in the hero. */
  positioning:
    "I build, learn, and experiment at the intersection of computer science, AI, and human curiosity.",

  /** Compact role line used across the site. */
  roleLine: "Computer Science Student. AI Builder. Creative Technologist.",

  /** Supporting positioning statement. */
  mission: "Building technology that makes learning more human, visual, and accessible.",

  university: "African University of Science and Technology",
  universityShort: "AUST",
  field: "Computer Science",
  location: "Nigeria",

  /** Tiny status labels shown in the hero + footer. */
  status: {
    status: "BUILDING",
    location: "NIGERIA",
    field: "COMPUTER SCIENCE",
    currentMode: "LEARNING",
    next: "UNKNOWN",
  },

  /** Honest summary used in meta copy + footers. */
  summary:
    "Computer Science student at AUST. AI builder. Creative technologist. Community-minded learner.",

  /**
   * The central narrative thread of the whole site.
   * Do not inflate this. It is strong because it is true.
   */
  narrative: "I'm still becoming, but I'm already building.",

  /** Easter egg copy — revealed by clicking the name in the hero. */
  curious: {
    trigger: "You found the curious corner.",
    line: "I'm probably learning something new right now.",
  },
} as const;

export type Profile = typeof profile;
