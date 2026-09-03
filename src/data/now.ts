/**
 * NOW DATA
 * ─────────────────────────────────────────────────────
 * The "What I'm learning right now" board plus the
 * opportunities cards. Edit this file freely — it is
 * meant to change as Helen's current season changes.
 */

export const nowBoard = {
  updatedLabel: "NOW",
  building: {
    title: "Currently building",
    items: [
      "Iterating on the CogniFlow / Hunuko prototype",
      "Sharper, smaller demos that answer real questions",
      "This website — an honest record of the becoming",
    ],
  },
  learning: {
    title: "Currently learning",
    items: [
      "Python — a deliberate second pass, deeper this time",
      "Machine learning fundamentals",
      "Backend engineering and systems thinking",
      "Product design and human-computer interaction",
    ],
  },
  curious: {
    title: "Currently curious about",
    items: [
      "Speech as an interface for learning",
      "Multilingual and offline-first education tools",
      "How AI tutors should (and shouldn't) remember",
      "What makes students trust a tool enough to return",
    ],
  },
} as const;

export type Opportunity = {
  title: string;
  detail: string;
};

export const opportunities: Opportunity[] = [
  {
    title: "AI / Technology",
    detail:
      "AI communities, education technology and projects that treat intelligence as a tool for people, not a spectacle.",
  },
  {
    title: "Campus / Community",
    detail:
      "Ambassador programs, student communities and workshops — spaces where students discover what they can build.",
  },
  {
    title: "Product / Engineering",
    detail:
      "Software and AI products where the craft matters: thoughtful interfaces, honest systems, real users.",
  },
  {
    title: "Collaboration",
    detail:
      "Working with ambitious students, builders and creators who take the beginning of something seriously.",
  },
  {
    title: "Speaking / Events",
    detail:
      "Relevant student and technology opportunities — learning to communicate ideas, not just build them.",
  },
];
