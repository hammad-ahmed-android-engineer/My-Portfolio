"use client";

import React from "react";
import { Mail, ArrowUp } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/BrandIcons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { getAssetPath } from "@/utils/basePath";

interface FooterProps {
  onOpenCoverLetter: () => void;
}

export function Footer({ onOpenCoverLetter }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-zinc-800 bg-zinc-950 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Main Row: Brand | Nav | Social */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-zinc-100 dark:border-zinc-900 text-center sm:text-left">
          {/* Brand */}
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 p-0.5 shadow-sm shrink-0">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-white font-black text-[11px]">
                HA
              </div>
            </div>
            <div className="text-left">
              <div className="font-extrabold text-sm text-zinc-900 dark:text-white leading-tight">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">
                Senior Android Engineer
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-medium">
            <a href="#overview" className="hover:text-emerald-500 transition">Overview</a>
            <a href="#metrics" className="hover:text-emerald-500 transition">Metrics</a>
            <a href="#architecture" className="hover:text-emerald-500 transition">Architecture</a>
            <a href="#projects" className="hover:text-emerald-500 transition">Projects</a>
            <a href="#experience" className="hover:text-emerald-500 transition">Experience</a>
            <a href="#skills" className="hover:text-emerald-500 transition">Skills</a>
            <button onClick={onOpenCoverLetter} className="hover:text-emerald-500 transition">
              Cover Letter
            </button>
          </nav>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center justify-center gap-2">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-blue-500 hover:border-blue-500/50 transition shrink-0"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-3.5 h-3.5 shrink-0" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 transition shrink-0"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-3.5 h-3.5 shrink-0" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/50 transition shrink-0"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition shrink-0"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-zinc-500 dark:text-zinc-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Deployed &amp; Static Export Ready for GitHub Pages</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
