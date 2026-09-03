/**
 * PROJECT DATA
 * ─────────────────────────────────────────────────────
 * CogniFlow / Hunuko is Helen's primary project.
 * Additional projects can be appended to `projects`
 * later — the UI renders every featured item in order.
 *
 * Honesty rule: links, dates, users and metrics are
 * only included when they are real. Placeholders are
 * explicitly flagged as null.
 */

export type ProjectFeature = {
  title: string;
  detail: string;
};

export type Project = {
  id: string;
  title: string;
  altTitle: string;
  subtitle: string;
  status: string;
  /** Short editorial description for the card. */
  description: string;
  /** Case study: the problem. */
  problem: string;
  /** Case study: the idea. */
  idea: string;
  /** Case study: what she explored. */
  explored: ProjectFeature[];
  /** Technologies actually used or explored. */
  technologies: string[];
  /** What the project is teaching her. */
  learnings: string[];
  /** Animated future roadmap. */
  future: { step: string; detail: string }[];
  /** Real links only. null = placeholder, shown honestly. */
  github: string | null;
  liveUrl: string | null;
  image: string;
  imageAlt: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "cogniflow",
    title: "CogniFlow",
    altTitle: "Hunuko",
    subtitle: "An AI-powered cinematic learning experience.",
    status: "Evolving prototype",
    description:
      "An EdTech experiment that started with a simple frustration: learning should not always look like reading a wall of text. CogniFlow explores what happens when notes, PDFs and learning materials become conversations, quizzes, visual explanations and even oral examinations — instead of static pages.",
    problem:
      "So much of learning is passive. You read, you highlight, you forget. Complex ideas stay abstract because nobody renders them. For many students — especially those learning across connectivity, language and resource constraints — a dense wall of text is where curiosity quietly gives up.",
    idea:
      "Take the material a student already has — notes, PDFs, lecture slides — and turn it into a living learning environment. Something that can explain the same concept five different ways, quiz you on it, test you out loud, draw it as a picture, and meet you at whatever depth you are actually at.",
    explored: [
      {
        title: "AI tutors",
        detail:
          "Conversation-first explanations that adapt to what a student is stuck on, instead of replaying the same textbook paragraph.",
      },
      {
        title: "Document understanding",
        detail:
          "Uploading notes and PDFs so the material itself becomes the tutor's syllabus.",
      },
      {
        title: "Quizzes",
        detail:
          "Generated checks for understanding — small loops of attempt, feedback, retry.",
      },
      {
        title: "Oral examinations",
        detail:
          "Answering out loud like a real exam, with speech as the interface rather than the keyboard.",
      },
      {
        title: "Flashcards",
        detail:
          "Turning fragile first-pass understanding into durable memory through spaced exposure.",
      },
      {
        title: "Visual explanations",
        detail:
          "Abstract concepts rendered as diagrams and animated sequences instead of paragraphs.",
      },
      {
        title: "Animated concepts",
        detail:
          "Using motion design and interfaces that feel closer to a scene than a slideshow.",
      },
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "Firestore",
      "Firebase Storage",
      "FastAPI",
      "Google Gemini API",
      "Framer Motion",
      "Rive",
    ],
    learnings: [
      "Designing AI experiences is mostly designing trust: helpful, honest, and clear about limits.",
      "Product thinking — every feature has to answer a real confusion, not just a demo slot.",
      "Frontend architecture that can survive being rebuilt twice in the same month.",
      "API integration reality: latency, errors and fallbacks are part of the interface.",
      "Interaction design details decide whether a prototype feels like a product.",
      "Turning an idea into something working under constraint is a skill of its own.",
    ],
    future: [
      {
        step: "Deepen the tutor",
        detail: "Better memory of what a student has already struggled with — teaching that compounds.",
      },
      {
        step: "Multilingual learning",
        detail: "Explanations that travel across languages, not just across pages.",
      },
      {
        step: "Offline accessibility",
        detail: "Learning that survives a Nigerian afternoon of weak connectivity.",
      },
      {
        step: "Interactive mascots",
        detail: "Character-driven guides that make hard topics feel less like an exam hall.",
      },
      {
        step: "Sharpen the core loop",
        detail: "Fewer features, better ones. The honest work of deciding what CogniFlow actually is.",
      },
    ],
    github: null,
    liveUrl: null,
    image: "/images/cogniflow.jpg",
    imageAlt:
      "Abstract constellation of connected ideas above an open page of notes — CogniFlow artwork.",
    featured: true,
  },
  {
    id: "nigeria-celebrates",
    title: "Nigeria Celebrates",
    altTitle: "Live Platform",
    subtitle: "A live platform for youths — built in public, deployed for real.",
    status: "Live",
    description:
      "A platform for Nigerian youth, built and deployed for real — live on Vercel today. Live quizzes, interactive voting, and the kind of real-time component architecture that only gets built when strangers actually use it.",
    problem:
      "Youth platforms usually end up as static pages — announcements, galleries, forms. They don't create a moment. And a moment is what young people are actually looking for: to be part of something live, together.",
    idea:
      "Build the opposite of a brochure: a live surface where participants compete, vote and react in real time — where the interface itself keeps the energy of the room.",
    explored: [
      {
        title: "Live quiz mechanics",
        detail:
          "Question flows, timers, scoring and instant feedback — the loop that keeps a room paying attention.",
      },
      {
        title: "Interactive voting systems",
        detail:
          "Participants vote in real time and watch results move, so the crowd becomes part of the event.",
      },
      {
        title: "Component architecture",
        detail:
          "Real-time state that stays smooth under actual usage — because a live platform has no second chances.",
      },
    ],
    technologies: ["React", "TypeScript", "Next.js", "Vercel"],
    learnings: [
      "Building for a real audience — the difference between a demo and a platform people return to.",
      "Designing live interaction: the interface has to hold the energy of a room, not just a screen.",
      "Shipping on a public URL: the discipline of what you're willing to put your name on.",
    ],
    future: [
      {
        step: "Wider participation",
        detail: "More events, more youth — and more reason to keep it running.",
      },
      {
        step: "Richer live features",
        detail: "Polling, reactions and real-time leaderboards, added as the community grows.",
      },
      {
        step: "Offline resilience",
        detail: "Because the people using it are not all in the same connectivity class as the people judging it.",
      },
    ],
    github: "https://github.com/Ellena01",
    liveUrl: "https://frontend-five-phi-30.vercel.app",
    image: "/images/nigeria-celebrates.jpg",
    imageAlt:
      "Abstract warm artwork — light trails over a dark field, evoking a crowd in motion at a live youth event.",
    featured: true,
  },
];
