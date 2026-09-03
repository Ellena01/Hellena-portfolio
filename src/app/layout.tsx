import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import ChapterRail from "@/components/ChapterRail";
import CommandPalette from "@/components/CommandPalette";
import { profile } from "@/data/profile";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://helen-ozipius.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Helen Oyiza Ozipius | Computer Science, AI & Technology",
  description:
    "Personal portfolio of Helen Oyiza Ozipius, a Computer Science student and AI builder exploring software engineering, educational technology, and human-centered AI.",
  keywords: [
    "Helen Oyiza Ozipius",
    "Computer Science",
    "AI builder",
    "Creative Technologist",
    "EdTech",
    "AUST",
    "Nigeria",
    "CogniFlow",
    "Portfolio",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: "Helen Oyiza Ozipius | Computer Science, AI & Technology",
    description:
      "Computer Science student and AI builder exploring software engineering, educational technology, and human-centered AI. Still becoming. Already building.",
    type: "website",
    url: siteUrl,
    siteName: "Helen Oyiza Ozipius",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helen Oyiza Ozipius | Computer Science, AI & Technology",
    description:
      "Computer Science student and AI builder. Still becoming. Already building.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ink text-paper antialiased">
        <a href="#hello" className="skip-link">
          Skip to content
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
        <ChapterRail />
        <CommandPalette />
        <Cursor />
      </body>
    </html>
  );
}
