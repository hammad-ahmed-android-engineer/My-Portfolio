"use client";

import React from "react";
import { Mail, ArrowUp, Phone } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/BrandIcons";
import { PersonalInfo } from "@/types/portfolio";
import { downloadPdf } from "@/utils/documentUtils";

interface FooterProps {
  onOpenCoverLetter?: () => void;
  onOpenCv?: () => void;
  personalInfo?: PersonalInfo;
}

export function Footer({ personalInfo, onOpenCoverLetter, onOpenCv }: FooterProps) {
  if (!personalInfo) return null;
  const info = personalInfo;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 text-xs overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-zinc-800/80">
          {/* Brand & Bio */}
          <div className="md:col-span-5 space-y-3.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 p-0.5 shadow-md shadow-emerald-500/10 shrink-0">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-white font-black text-xs">
                  HA
                </div>
              </div>
              <div>
                <div className="font-extrabold text-base text-zinc-100 leading-tight">
                  {info.name}
                </div>
                <div className="text-xs text-emerald-400 font-medium leading-tight">
                  {info.title}
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              {info.summary ? info.summary : info.tagline}
            </p>

            {info.availability && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{info.availability}</span>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3 text-center md:text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Navigation
            </h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs max-w-[260px] mx-auto md:max-w-none md:mx-0 place-items-center md:place-items-start">
                <a href="#overview" className="hover:text-emerald-400 transition">Overview</a>
                <a href="#metrics" className="hover:text-emerald-400 transition">Metrics</a>
                <a href="#services" className="hover:text-emerald-400 transition">Services</a>
                <a href="#architecture" className="hover:text-emerald-400 transition">Architecture</a>
                <a href="#projects" className="hover:text-emerald-400 transition">Projects</a>
                <a href="#experience" className="hover:text-emerald-400 transition">Experience</a>
                <a href="#skills" className="hover:text-emerald-400 transition">Skills</a>
                <a href="#education" className="hover:text-emerald-400 transition">Education</a>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenCv) {
                      onOpenCv();
                    } else if (info.resumeDriveLink) {
                      window.open(info.resumeDriveLink, "_blank", "noopener,noreferrer");
                    }
                  }}
                  className="text-center md:text-left text-emerald-400 hover:text-emerald-300 font-semibold transition cursor-pointer"
                  title="View & Download CV (PDF)"
                >
                  CV (PDF)
                </button>
                {onOpenCoverLetter && (
                  <button
                    type="button"
                    onClick={onOpenCoverLetter}
                    className="text-center md:text-left text-emerald-400 hover:text-emerald-300 font-semibold transition cursor-pointer"
                    title="Read & Download Cover Letter (PDF)"
                  >
                    Cover Letter (PDF)
                  </button>
                )}
              </div>
            </div>

            {/* Connect & Actions */}
            <div className="md:col-span-3 space-y-3 text-center md:text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                Get in Touch
              </h4>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                {info.linkedin && (
                  <a
                    href={info.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-blue-400 hover:border-blue-500/40 transition"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <LinkedInIcon className="w-4 h-4 shrink-0" />
                  </a>
                )}

                {info.github && (
                  <a
                    href={info.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <GitHubIcon className="w-4 h-4 shrink-0" />
                  </a>
                )}

                {info.email && (
                  <a
                    href={`mailto:${info.email}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 transition"
                    aria-label="Email"
                    title="Email"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                  </a>
                )}

                {info.whatsappUrl && (
                  <a
                    href={info.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 transition"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition cursor-pointer"
                  aria-label="Back to top"
                  title="Back to top"
                >
                  <ArrowUp className="w-4 h-4 shrink-0" />
                </button>
              </div>

              {info.location && (
                <p className="text-[11px] text-zinc-500">
                  {info.location}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Row: Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500 text-center sm:text-left">
            <div>
              © {new Date().getFullYear()} {info.name}. All rights reserved.
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Senior Android Engineer Portfolio</span>
            </div>
          </div>
        </div>
    </footer>
  );
}

