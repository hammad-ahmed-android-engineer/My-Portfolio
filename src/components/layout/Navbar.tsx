"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Menu,
  X,
  Sparkles,
  Layers,
  BarChart3,
  Code2,
  Briefcase,
  GraduationCap,
  Mail,
  Home,
  ExternalLink,
  Wrench,
  FileText,
  Download,
  Loader2,
} from "lucide-react";
import { PersonalInfo } from "@/types/portfolio";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useActiveSection } from "@/hooks/useActiveSection";
import { downloadPdf } from "@/utils/documentUtils";

interface NavbarProps {
  onOpenCoverLetter?: () => void;
  onOpenCv?: () => void;
  personalInfo?: PersonalInfo;
}

const navLinks = [
  { label: "Overview", href: "#overview", icon: Home },
  { label: "Metrics", href: "#metrics", icon: BarChart3 },
  { label: "Services", href: "#services", icon: Wrench },
  { label: "Architecture", href: "#architecture", icon: Layers },
  { label: "Projects", href: "#projects", icon: Code2 },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Skills", href: "#skills", icon: Sparkles },
  { label: "Education", href: "#education", icon: GraduationCap },
  { label: "Contact", href: "#contact", icon: Mail },
];

export function Navbar({ personalInfo, onOpenCoverLetter, onOpenCv }: NavbarProps) {
  const info = personalInfo;
  const { isScrolled: scrolled } = useScrollPosition(15);
  const sectionIds = useMemo(() => navLinks.map((l) => l.href.slice(1)), []);
  const { activeSection, setActiveSection } = useActiveSection(sectionIds, "overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDownloadingCv, setIsDownloadingCv] = useState(false);

  const handleNavbarDownloadCv = async () => {
    if (isDownloadingCv) return;
    setIsDownloadingCv(true);
    try {
      await downloadPdf(
        info?.resumeDriveLink,
        () => {
          if (onOpenCv) {
            onOpenCv();
            setTimeout(() => window.print(), 350);
          } else {
            window.print();
          }
        },
        "cv"
      );
    } finally {
      setIsDownloadingCv(false);
    }
  };

  useEffect(() => {
    setMounted(true);
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

  const currentSection = mounted ? activeSection : "overview";
  const isScrolled = mounted && scrolled;
  const firstName = info?.name ? info.name.split(" ")[0] : "";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 shadow-sm ${
          isScrolled
            ? "sm:bg-zinc-950/90 sm:backdrop-blur-md sm:border-zinc-800 sm:shadow-sm"
            : "sm:bg-transparent sm:border-transparent sm:py-1"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 xl:gap-3">
            {/* Brand Logo & Title */}
            <a href="#" className="flex items-center gap-2 group min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-white font-black text-xs sm:text-sm">
                  HA
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-white truncate">
                    <span className="inline min-[420px]:hidden">{firstName}</span>
                    <span className="hidden min-[420px]:inline">{info?.name}</span>
                  </span>
                </div>

                <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono block leading-tight truncate mt-0.5 sm:mt-1.5">
                  <span className="hidden sm:inline">
                    {info?.stats?.experienceYears ? `${info.stats.experienceYears} Yrs ` : ""}
                  </span>
                  {info?.title}
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
                    className={`px-1.5 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition whitespace-nowrap ${
                      isActive
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Action Buttons - Single Download CV button as requested */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {isDownloadingCv ? (
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 sm:py-2 text-xs font-semibold rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap shrink-0 h-9 select-none"
                  role="status"
                  aria-live="polite"
                >
                  <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                  <span className="whitespace-nowrap">
                    <span className="hidden sm:inline">Downloading...</span>
                    <span className="inline sm:hidden">...</span>
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleNavbarDownloadCv}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition whitespace-nowrap shrink-0 h-9 cursor-pointer"
                  aria-label="Download CV"
                  title="Download Hammad's CV in PDF format"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">
                    <span className="hidden sm:inline">Download CV</span>
                    <span className="inline sm:hidden">CV</span>
                  </span>
                </button>
              )}

              {/* Mobile / Tablet Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl border border-zinc-800 text-zinc-200 hover:bg-zinc-900 transition shrink-0 cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Side Hamburger Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col z-10 animate-slide-left">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5">
                  <div className="w-full h-full bg-zinc-950 rounded-[6px] flex items-center justify-center text-white font-black text-xs">
                    HA
                  </div>
                </div>
                <div>
                  <div className="font-extrabold text-sm text-white">{info?.name}</div>
                  <div className="text-[10px] text-zinc-400 font-mono">Navigation Menu</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg border border-zinc-800 text-zinc-300 hover:bg-zinc-900 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

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
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-zinc-200 hover:bg-emerald-500/10 hover:text-emerald-400"
                    }`}
                  >
                    <IconComponent
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-emerald-400" : "text-emerald-500"
                      }`}
                    />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCv) {
                    onOpenCv();
                  } else {
                    downloadPdf(info?.resumeDriveLink, undefined, "cv");
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View / Download CV (PDF)</span>
              </button>
              {onOpenCoverLetter && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCoverLetter();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-semibold border border-zinc-700 transition cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Read / Download Cover Letter (PDF)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

