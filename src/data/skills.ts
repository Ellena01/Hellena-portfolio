/**
 * SKILLS DATA
 * ─────────────────────────────────────────────────────
 * Honest levels only. Nothing here claims mastery.
 *
 *   "Building with" — used in real projects
 *   "Learning"      — actively studying now
 *   "Exploring"     — early, curious, unfinished
 */

export type SkillLevel = "Building with" | "Learning" | "Exploring" | "Everyday";

export type SkillGroup = {
  id: string;
  title: string;
  note: string;
  skills: { name: string; level: SkillLevel }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    note: "The grammar underneath everything else.",
    skills: [
      { name: "Python", level: "Building with" },
      { name: "JavaScript", level: "Building with" },
      { name: "TypeScript", level: "Building with" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    note: "Where ideas become something you can touch.",
    skills: [
      { name: "React", level: "Building with" },
      { name: "Next.js", level: "Building with" },
      { name: "Tailwind CSS", level: "Building with" },
      { name: "Framer Motion", level: "Exploring" },
    ],
  },
  {
    id: "backend",
    title: "Backend / Infrastructure",
    note: "The parts nobody sees until they fail.",
    skills: [
      { name: "Firebase", level: "Building with" },
      { name: "Firestore", level: "Building with" },
      { name: "Firebase Storage", level: "Building with" },
      { name: "FastAPI", level: "Exploring" },
    ],
  },
  {
    id: "ai",
    title: "AI",
    note: "Treated as an interface to knowledge, not a party trick.",
    skills: [
      { name: "Google Gemini API", level: "Building with" },
      { name: "Prompt engineering", level: "Exploring" },
      { name: "AI product experimentation", level: "Exploring" },
      { name: "AI-assisted learning", level: "Exploring" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    note: "The daily workbench.",
    skills: [
      { name: "GitHub", level: "Everyday" },
      { name: "VS Code", level: "Everyday" },
      { name: "Figma", level: "Everyday" },
      { name: "StackBlitz", level: "Everyday" },
    ],
  },
  {
    id: "learning",
    title: "Currently learning",
    note: "In progress — said plainly, on purpose.",
    skills: [
      { name: "Python (deeper)", level: "Learning" },
      { name: "Machine learning", level: "Learning" },
      { name: "Backend engineering", level: "Learning" },
      { name: "Systems thinking", level: "Learning" },
      { name: "Advanced software development", level: "Learning" },
    ],
  },
];
