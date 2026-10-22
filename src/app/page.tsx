"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ImpactMetrics } from "@/components/ImpactMetrics";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsSection } from "@/components/SkillsSection";
import { EducationSection } from "@/components/EducationSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CoverLetterModal } from "@/components/CoverLetterModal";

export default function Home() {
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Top Navigation */}
      <Navbar onOpenCoverLetter={() => setIsCoverLetterOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection onOpenCoverLetter={() => setIsCoverLetterOpen(true)} />
        <ImpactMetrics />
        <ArchitectureSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection onOpenCoverLetter={() => setIsCoverLetterOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenCoverLetter={() => setIsCoverLetterOpen(true)} />

      {/* Interactive Cover Letter Dialog */}
      <CoverLetterModal
        isOpen={isCoverLetterOpen}
        onClose={() => setIsCoverLetterOpen(false)}
      />
    </div>
  );
}
