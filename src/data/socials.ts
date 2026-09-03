/**
 * SOCIAL LINKS
 * ─────────────────────────────────────────────────────
 * Replace the placeholder values below with real URLs.
 * Any link with `placeholder: true` is clearly marked
 * on the site until a real value is supplied.
 */

export type Social = {
  id: string;
  label: string;
  href: string;
  /** When true, the site marks this as a placeholder link. */
  placeholder: boolean;
  /** Short hint shown next to the link. */
  hint: string;
};

export const socials: Social[] = [
  {
    id: "email",
    label: "Email me",
    href: "mailto:Oyizaellena@gmail.com",
    placeholder: false,
    hint: "Oyizaellena@gmail.com",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/helenoyiza",
    placeholder: false,
    hint: "linkedin.com/in/helenoyiza",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Ellena01",
    placeholder: false,
    hint: "github.com/Ellena01",
  },
];
