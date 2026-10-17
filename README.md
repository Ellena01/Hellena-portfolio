# Helen Oyiza Ozipius — Personal Portfolio

A cinematic, editorial personal website for **Helen Oyiza Ozipius** — Computer Science student at the African University of Science and Technology (AUST), AI builder, and creative technologist.

> **"I'm still becoming, but I'm already building."**

The site is designed around honest trajectory rather than inflated claims: everything featured is real, placeholders are clearly marked, and the reading experience is built to feel like moving through a story.

---

## Tech stack

- **Next.js** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — custom ink/paper/gold design system
- **Framer Motion** — choreography, page presence, reduced-motion aware
- **Lucide** icons (brand glyphs are inline SVGs in `src/components/icons.tsx`)
- Deployed target: **Vercel**

---

## Quick start

```bash
# install dependencies
npm install

# run locally
npm run dev

# production build
npm run build

# start the production server
npm run start
```

The site is fully static and needs **no database and no environment variables** by default.

### Optional environment variable

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Used for `metadataBase` / Open Graph URLs | `https://helen-ozipius.vercel.app` |

### Deploying to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Vercel: **New Project → Import repository**.
3. Framework preset: **Next.js** (auto-detected). No build settings needed.
4. (Optional) Add `NEXT_PUBLIC_SITE_URL` with your production domain.
5. Deploy.

---

## Where to change what (content architecture)

All personal content lives in **`src/data/`** — update the site without touching components.

| File | Controls |
| --- | --- |
| `src/data/profile.ts` | Name, positioning lines, university, microcopy (`STATUS: BUILDING`…), hero copy, easter-egg lines |
| `src/data/socials.ts` | Email / LinkedIn / GitHub links. Entries with `placeholder: true` are visibly marked on the site until replaced |
| `src/data/projects.ts` | The CogniFlow / Hunuko project object (problem, idea, explored features, stack, learnings, roadmap, links, imagery). Add more projects to the same array |
| `src/data/journey.ts` | The interactive **learning graph** nodes (positions + learned/built/next) and the vertical **timeline** entries |
| `src/data/skills.ts` | The honest skill ledger ("Building with" / "Learning" / "Exploring" / "Everyday") |
| `src/data/now.ts` | The **NOW** board (currently building / learning / curious about) and the **opportunities** cards |

The NOW board is designed to be edited regularly — it's the easiest way to keep the site feeling alive.

### Adding a project

Append to the `projects` array in `src/data/projects.ts`, set `featured: true` (and optionally flip older ones to `false`). Use `github: null` / `liveUrl: null` when a link isn't public yet — the UI labels it honestly.

### Replacing the GitHub / repo links

In `src/data/projects.ts`, set `github: "https://github.com/…"` — the placeholder-style button automatically becomes a real link.

### Replacing the profile photo

The "human behind the screen" section ships with a deliberately labelled **placeholder plate** (`src/components/sections/HumanSection.tsx`, inner `PortraitPlate` component). To use a real editorial portrait:

1. Add the photo to `public/images/` (a 3:4 portrait works best, e.g. `portrait.jpg`).
2. In `HumanSection.tsx`, replace the `PortraitPlate` component's output with a `next/image` block referencing the photo.
3. Prefer a monochrome-editorial treatment (the site is built around that look).

### The photographs

Two editorial photographs frame the story:

| Image | Used in | Notes |
| --- | --- | --- |
| `public/images/opening.jpg` | Hero — "Fig. 00 — the beginning" | The opening plate (right side, desktop) |
| `public/images/closing.jpg` | End of Contact — "Fig. 06 — the end, for now" | The closing plate |

### Swapping artwork

| Image | Used in | Notes |
| --- | --- | --- |
| `public/images/cogniflow.jpg` | CogniFlow project poster | Abstract concept artwork — replace with real screenshots when available |
| `public/images/nigeria-celebrates.jpg` | Nigeria Celebrates project poster | Abstract warm artwork — replace with real screenshots when available |
| `public/images/contours.jpg` | Africa section backdrop | Kept at low opacity; any dark textured image works |

---

## Design system notes

- **Palette**: deep-navy blues (`ink` scale) on a fixed cinematic blue gradient, warm off-white (`paper`), restrained accents — warm **gold** (primary), muted electric **blue** and **violet** (levels/legends only). Defined in `src/app/globals.css` under `@theme`.
- **Typography**: Space Grotesk (display) + Inter (body) + JetBrains Mono (labels/microcopy), loaded via `next/font`.
- **Motion vocabulary**: one shared set of primitives in `src/lib/motion.ts`. Heavy choreography lives in the hero and project sections; body copy is subtle.
- **Accessibility**: semantic headings, keyboard-operable navigation, visible focus states, `aria` labelling, an accessible mobile menu and case-study dialog, a skip link, alt text, and `prefers-reduced-motion` support across animations, the canvas constellation, orbits, and the film grain.
- **Performance**: no WebGL, no background video, capped-DPR canvas, lazy-loaded images, three font files, static generation.

## The honesty rule

This project intentionally avoids fabricated metrics: no invented users, clients, awards, dates, or employment. The Udara AI Build Challenge (team Animatrix, 4th place) is the only competitive result shown, and it is framed around learning. Keep it that way when editing — the site is impressive because it's true.

---

## Structure

```
src/
├── app/                 # layout, page, template, icon, global styles
├── components/
│   ├── Navbar.tsx       # floating nav (desktop) + full-screen overlay (mobile)
│   ├── SectionShell.tsx # shared section chrome (kicker + editorial index)
│   ├── RiseOnScroll.tsx # standard reveal helper
│   ├── icons.tsx        # GitHub / LinkedIn brand glyphs
│   └── sections/        # one file per story beat
├── data/                # ALL editable content (see table above)
└── lib/motion.ts        # shared Framer Motion primitives
```
