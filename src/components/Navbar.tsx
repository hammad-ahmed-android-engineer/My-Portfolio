"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Layers,
  BarChart3,
  Code2,
  Briefcase,
  GraduationCap,
  Mail,
  Home,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { getAssetPath } from "@/utils/basePath";

interface NavbarProps {
  onOpenCoverLetter: () => void;
}

const navLinks = [
  { label: "Overview", href: "#overview", icon: Home },
  { label: "Metrics", href: "#metrics", icon: BarChart3 },
  { label: "Architecture", href: "#architecture", icon: Layers },
  { label: "Projects", href: "#projects", icon: Code2 },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Skills", href: "#skills", icon: Sparkles },
  { label: "Education", href: "#education", icon: GraduationCap },
  { label: "Contact", href: "#contact", icon: Mail },
];

export function Navbar({ onOpenCoverLetter }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeDropdown, setResumeDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [mounted, setMounted] = useState(false);

  // Only apply client-only state after the first client render has matched the server HTML
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll position for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Watch each section and mark the one in the middle of the screen as active
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Only count a section as active when it crosses the middle band of the viewport
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);


  // Before mount, always use the same values the server rendered
  const currentSection = mounted ? activeSection : "overview";
  const isScrolled = mounted && scrolled;

  const firstName = PERSONAL_INFO.name.split(" ")[0];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 shadow-sm"
          : "bg-transparent py-1 sm:py-2"
          }`}
      >
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 xl:gap-3">
            {/* Brand Logo & Senior Title */}
            <a href="#" className="flex items-center gap-2 group shrink-0 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-white font-black text-xs sm:text-sm">
                  HA
                </div>
              </div>

              <div className="flex flex-col shrink-0 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-white whitespace-nowrap">
                    {/* Show first name on micro screens (< 420px), full name on 420px+ */}
                    <span className="inline min-[420px]:hidden">{firstName}</span>
                    <span className="hidden min-[420px]:inline">{PERSONAL_INFO.name}</span>
                  </span>

                  {/* <span className="hidden xl:inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                    Remote
                  </span> */}
                </div>

                {/* 5+ Yrs Senior Android Engineer - with margin top */}
                <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono block leading-tight whitespace-nowrap mt-1 sm:mt-1.5">
                  5+ Yrs Senior Android Engineer
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
              {navLinks.map((link) => {
                const isActive = currentSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveSection(link.href.slice(1))}
                    aria-current={isActive ? "true" : undefined}
                    className={`px-1.5 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition whitespace-nowrap ${isActive
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900"
                      }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Cover Letter Modal Trigger - visible on xl+ where there is 300px+ space */}
              <button
                onClick={onOpenCoverLetter}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-zinc-200 border border-zinc-800 hover:bg-zinc-900 transition shadow-sm whitespace-nowrap shrink-0 h-9"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="whitespace-nowrap">Cover Letter</span>
              </button>

              {/* Resume Dropdown - Always visible and perfectly responsive on all devices */}
              <div className="relative shrink-0">
                <button
                  onClick={() => setResumeDropdown(!resumeDropdown)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition whitespace-nowrap shrink-0 h-9"
                  aria-label="Download Resume"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">
                    <span className="hidden min-[380px]:inline">Resume / CV</span>
                    <span className="inline min-[380px]:hidden">CV</span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80 shrink-0" />
                </button>

                {resumeDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-48 sm:w-52 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl py-1.5 z-50 text-xs font-medium animate-fade-in"
                    onClick={() => setResumeDropdown(false)}
                  >
                    <div className="px-3 py-1 text-[10px] font-mono uppercase text-zinc-400 border-b border-zinc-800">
                      Download Formats
                    </div>
                    <a
                      href={getAssetPath(PERSONAL_INFO.pdfResume)}
                      download
                      className="flex items-center justify-between px-3 py-2 text-zinc-200 hover:bg-emerald-500/10 hover:text-emerald-400 transition"
                    >
                      <span className="font-semibold">PDF Format (Official)</span>
                      <span className="text-[10px] font-mono text-zinc-400">.pdf</span>
                    </a>
                    <a
                      href={getAssetPath(PERSONAL_INFO.docxResume)}
                      download
                      className="flex items-center justify-between px-3 py-2 text-zinc-200 hover:bg-emerald-500/10 hover:text-emerald-400 transition"
                    >
                      <span className="font-semibold">Word Format</span>
                      <span className="text-[10px] font-mono text-zinc-400">.docx</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile / Tablet Hamburger Button - Shown when desktop links are hidden (< lg) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl border border-zinc-800 text-zinc-200 hover:bg-zinc-900 transition shrink-0"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Side Hamburger Drawer (Overlay & Drawer for < lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          {/* Backdrop blur */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Drawer Panel */}
          <div className="relative w-full max-w-xs sm:max-w-sm h-full bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col z-10 animate-fade-in">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-cyan-500 p-0.5 shadow-sm">
                  <div className="w-full h-full bg-zinc-950 rounded-[6px] flex items-center justify-center text-white font-black text-xs">
                    HA
                  </div>
                </div>
                <div>
                  <div className="font-extrabold text-sm text-white">
                    {PERSONAL_INFO.name}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    Navigation Menu
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg border border-zinc-800 text-zinc-300 hover:bg-zinc-900"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title Pages / Sections List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <div className="px-2 pb-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                Portfolio Sections
              </div>
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = currentSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setActiveSection(link.href.slice(1));
                      setMobileMenuOpen(false);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${isActive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-zinc-200 hover:bg-emerald-500/10 hover:text-emerald-400"
                      }`}
                  >
                    <IconComponent
                      className={`w-4 h-4 shrink-0 ${isActive ? "text-emerald-400" : "text-emerald-500"
                        }`}
                    />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-zinc-800 space-y-2 bg-zinc-900/50">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCoverLetter();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-200 text-xs font-semibold shadow-sm hover:border-emerald-500 transition"
              >
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>Read Cover Letter</span>
              </button>

              <a
                href={getAssetPath(PERSONAL_INFO.pdfResume)}
                download
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition"
              >
                <Download className="w-4 h-4" />
                <span>Download CV (PDF)</span>
              </a>

              <a
                href={getAssetPath(PERSONAL_INFO.docxResume)}
                download
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-zinc-400 hover:text-white text-xs transition"
              >
                <span>Download CV (.docx)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}