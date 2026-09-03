import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import Marquee from "@/components/Marquee";
import ProjectsSection from "@/components/sections/ProjectsSection";
import HackathonSection from "@/components/sections/HackathonSection";
import StackSection from "@/components/sections/StackSection";
import LearningGraphSection from "@/components/sections/LearningGraphSection";
import TimelineSection from "@/components/sections/TimelineSection";
import HumanSection from "@/components/sections/HumanSection";
import BeyondCodeSection from "@/components/sections/BeyondCodeSection";
import WhyAISection from "@/components/sections/WhyAISection";
import AfricaSection from "@/components/sections/AfricaSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import NowSection from "@/components/sections/NowSection";
import OpportunitiesSection from "@/components/sections/OpportunitiesSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      {/* 01 — HELLO */}
      <HeroSection />
      <AboutSection />

      <Marquee
        items={["build", "learn", "question", "iterate", "imagine", "ship"]}
        duration={28}
      />

      {/* 02 — WORK */}
      <ProjectsSection />
      <HackathonSection />
      <StackSection />

      {/* 03 — JOURNEY */}
      <LearningGraphSection />
      <TimelineSection />
      <HumanSection />

      {/* 04 — THINKING */}
      <BeyondCodeSection />
      <WhyAISection />
      <AfricaSection />
      <PhilosophySection />

      <Marquee
        items={["still becoming", "already building", "curiosity with discipline"]}
        duration={34}
      />

      {/* 05 — NOW */}
      <NowSection />

      {/* 06 — CONTACT */}
      <OpportunitiesSection />
      <ContactSection />
    </>
  );
}
