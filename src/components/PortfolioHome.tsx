"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactMetrics } from "@/components/sections/ImpactMetrics";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CoverLetterModal } from "@/components/modals/CoverLetterModal";
import { CvModal } from "@/components/modals/CvModal";
import { PortfolioData } from "@/types/portfolio";
import { useExtensionShield } from "@/hooks/useExtensionShield";
import { apiClient } from "@/utils/apiClient";

interface PortfolioHomeProps {
  initialData?: PortfolioData;
}

export function PortfolioHome({ initialData }: PortfolioHomeProps) {
  const [data, setData] = useState<PortfolioData | null>(initialData ?? null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);

  // Suppress third-party browser extensions (e.g. CareerFlow scrapers) from injecting into DOM
  useExtensionShield();

  useEffect(() => {
    let isMounted = true;
    async function loadFromApi() {
      try {
        const liveData = await apiClient.getPortfolio();
        if (isMounted && liveData) {
          setData(liveData);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted && !data) {
          const msg = err instanceof Error ? err.message : "Failed to load portfolio from API";
          setError(msg);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    // Always fetch latest data from the API endpoint connected to MongoDB
    loadFromApi();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading && !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-zinc-400">Loading portfolio from API...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 p-4">
        <p className="text-sm text-red-400 mb-4">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 relative overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar
        personalInfo={data.personalInfo}
        onOpenCoverLetter={() => setIsCoverLetterOpen(true)}
        onOpenCv={() => setIsCvOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          personalInfo={data.personalInfo}
          onOpenCoverLetter={() => setIsCoverLetterOpen(true)}
          onOpenCv={() => setIsCvOpen(true)}
        />
        <ImpactMetrics metrics={data.metrics} />
        <ServicesSection services={data.services} />
        <ArchitectureSection />
        <ProjectsSection projects={data.projects} />
        <ExperienceSection experiences={data.experiences} />
        <SkillsSection skills={data.skills} />
        <EducationSection education={data.education} />
        <ContactSection
          personalInfo={data.personalInfo}
          onOpenCoverLetter={() => setIsCoverLetterOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        personalInfo={data.personalInfo}
        onOpenCoverLetter={() => setIsCoverLetterOpen(true)}
        onOpenCv={() => setIsCvOpen(true)}
      />

      {/* Interactive Cover Letter Dialog */}
      <CoverLetterModal
        isOpen={isCoverLetterOpen}
        onClose={() => setIsCoverLetterOpen(false)}
        coverLetterText={data.coverLetterText}
        personalInfo={data.personalInfo}
      />

      {/* Interactive CV / Resume Dialog */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        personalInfo={data.personalInfo}
        experiences={data.experiences}
        education={data.education}
        skills={data.skills}
        projects={data.projects}
        metrics={data.metrics}
      />
    </div>
  );
}
