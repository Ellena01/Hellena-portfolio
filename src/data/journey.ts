/**
 * JOURNEY DATA
 * ─────────────────────────────────────────────────────
 * Two things live here:
 *
 * 1. `learningGraph` — the interactive constellation of
 *    Helen's learning path. Positions (x/y) are percentages
 *    of the map canvas, connecting in array order.
 *
 * 2. `timeline` — the vertical cinematic journey. No dates
 *    are invented; entries use honest phases instead.
 */

export type GraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  learned: string;
  built: string;
  next: string;
};

export const learningGraph: GraphNode[] = [
  {
    id: "cs",
    label: "Computer Science",
    x: 8,
    y: 62,
    learned:
      "That computer science is not 'learning to code' — it is learning to think precisely about problems.",
    built: "A foundation: algorithms, logic, and the habit of asking why before how.",
    next: "Deeper theory, and the discipline of finishing what I start.",
  },
  {
    id: "programming",
    label: "Programming",
    x: 18,
    y: 30,
    learned:
      "Programs are conversations between intention and machine — and both sides mishear constantly.",
    built: "My first working programs, and the patience to debug them honestly.",
    next: "Reading other people's code with real understanding.",
  },
  {
    id: "python",
    label: "Python",
    x: 30,
    y: 58,
    learned:
      "A language small enough to think in, large enough to build almost anything with.",
    built: "Scripts, experiments and the backend thinking behind early AI prototypes.",
    next: "Going deeper — this is a deliberate second pass, not a side note.",
  },
  {
    id: "sw-engineering",
    label: "Software Engineering",
    x: 42,
    y: 26,
    learned:
      "The difference between code that works once and systems that keep working.",
    built: "Structure for real projects: components, state, API boundaries, version control habits.",
    next: "Systems thinking — how large, boring, reliable software actually holds together.",
  },
  {
    id: "ai",
    label: "AI",
    x: 55,
    y: 60,
    learned:
      "AI is most interesting as an interface between people and knowledge — not as a magic box.",
    built: "Prompt-driven prototypes and AI-assisted features inside CogniFlow's early experiments.",
    next: "Understanding what's under the abstraction, not just calling it.",
  },
  {
    id: "ml",
    label: "Machine Learning",
    x: 67,
    y: 32,
    learned:
      "Models are statistics with ambition — and the maths underneath is learnable, step by step.",
    built: "First explorations: regression, classification, and honest evaluation.",
    next: "A serious foundation course, in progress now.",
  },
  {
    id: "product",
    label: "Product Development",
    x: 78,
    y: 62,
    learned:
      "A product is a point of view about a problem — features are just its arguments.",
    built: "CogniFlow / Hunuko: concept, interface, prototype, and the discipline of cutting scope.",
    next: "Testing with real students, and listening properly to what they say.",
  },
  {
    id: "edtech",
    label: "Education Technology",
    x: 88,
    y: 30,
    learned:
      "Where learning breaks is rarely the content — it is the format, the access, the assumptions.",
    built: "A visualisation-first learning concept built around materials students already have.",
    next: "Multilingual and offline-first thinking, built in from the start.",
  },
  {
    id: "entrepreneurship",
    label: "Entrepreneurship",
    x: 96,
    y: 58,
    learned:
      "Building is a team sport and courage is a resource you spend carefully.",
    built: "Hackathon collaboration under real deadline pressure, and a product pitched on stage.",
    next: "Rooms I haven't entered yet — and doors worth knocking on.",
  },
];

export type TimelineEntry = {
  phase: string;
  title: string;
  detail: string;
  accent?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    phase: "THE BEGINNING",
    title: "Computer Science at AUST",
    detail:
      "Enrolled at the African University of Science and Technology and started taking the fundamentals seriously — not as a syllabus to finish, but as a toolkit to collect.",
  },
  {
    phase: "FIRST LANGUAGE",
    title: "Learning Python",
    detail:
      "The first lines, the first loops, the first program that did what it was told. Small, unglamorous, and genuinely thrilling.",
  },
  {
    phase: "WIDER LENS",
    title: "Discovering software engineering",
    detail:
      "Moved from 'does it run?' to 'does it hold?' — components, state, APIs, version control, and the habit of leaving code easier to understand than I found it.",
  },
  {
    phase: "THE RABBIT HOLE",
    title: "Exploring AI",
    detail:
      "Started probing what large models actually do well: explanation, adaptation, conversation. Filed away every surprise for later use.",
  },
  {
    phase: "AN IDEA",
    title: "CogniFlow / Hunuko",
    detail:
      "Turned 'learning shouldn't be a wall of text' into a working prototype — AI tutors, quizzes and visual explanations built on materials students already have.",
    accent: true,
  },
  {
    phase: "UNDER PRESSURE",
    title: "Udara AI Build Challenge",
    detail:
      "With team Animatrix: idea to demo under real constraints — collaboration, mentorship, rapid iteration, and a 4th place finish that taught more than it celebrated.",
    accent: true,
  },
  {
    phase: "SHIPPING FOR REAL",
    title: "Nigeria Celebrates — deployed live",
    detail:
      "A live platform for Nigerian youth — quizzes and voting built for actual participants, deployed on Vercel with a public URL and Helen's name on it.",
    accent: true,
  },
  {
    phase: "RIGHT NOW",
    title: "Deepening the stack",
    detail:
      "Python again, properly. Machine learning fundamentals. Backend engineering. Systems thinking. The unglamorous middle where most of the becoming happens.",
  },
  {
    phase: "NEXT",
    title: "Unknown, on purpose",
    detail:
      "Communities to join, rooms to enter, problems worth solving that haven't been met yet. The plan is curiosity with discipline.",
  },
];
