"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  Phone,
  FileText,
  Eye,
  Download,
} from "lucide-react";
import { InteractivePhone } from "@/components/phone/InteractivePhone";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/BrandIcons";
import { PersonalInfo } from "@/types/portfolio";
import { resolveAvatarPublicImage } from "@/utils/basePath";
import { downloadPdf } from "@/utils/documentUtils";

interface HeroSectionProps {
  onOpenCoverLetter?: () => void;
  onOpenCv?: () => void;
  personalInfo?: PersonalInfo;
}

export function HeroSection({ onOpenCoverLetter, onOpenCv, personalInfo }: HeroSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  if (!personalInfo) return null;
  const info = personalInfo;
  const avatarSrc = resolveAvatarPublicImage(info.avatarUrl);
  const showAvatarImg = Boolean(avatarSrc) && !avatarError;

  const handleCopyEmail = () => {
    if (!info.email) return;
    navigator.clipboard.writeText(info.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="overview" className="relative pt-24 pb-12 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-indigo-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Pitch & Profile */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            {info.availability && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 text-xs font-semibold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{info.availability}</span>
              </div>
            )}

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
              {info.title} Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400">
                Mission-Critical
              </span>{" "}
              Native Apps at Scale.
            </h1>

            {/* Differentiating Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              {info.summary ? (
                info.summary
              ) : (
                info.tagline
              )}
            </p>

            {/* Quick Profile Snapshot Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
              <div className="relative group shrink-0">
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300" />
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-lg bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-black text-lg sm:text-xl tracking-tight select-none z-0">
                    {info.name
                      ? info.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "HA"}
                  </span>
                  {showAvatarImg && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={avatarSrc}
                      alt={info.name}
                      className="absolute inset-0 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300 z-10"
                      onError={() => setAvatarError(true)}
                    />
                  )}
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-1 -right-1 z-20 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md border-2 border-zinc-950">
                  ✓
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {info.name}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 flex flex-wrap items-center justify-center sm:justify-start gap-1.5 font-mono mt-0.5">
                  {info.location && <span>{info.location}</span>}
                  {info.location && info.currentEducation && <span>•</span>}
                  {info.currentEducation && <span>{info.currentEducation}</span>}
                </div>
              </div>
            </div>

            {/* Action Buttons + Quick Contact Strip */}
            <div className="space-y-4 pt-1">
              {/* Primary Action Buttons - Aligned on a single horizontal row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                {/* Button 1: CV (PDF) */}
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenCv) {
                      onOpenCv();
                    } else {
                      downloadPdf(info.resumeDriveLink, undefined, "cv");
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                  title="View & Download Hammad's CV (PDF)"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>View / Download CV</span>
                </button>

                {/* Button 2: Cover Letter (PDF) */}
                {onOpenCoverLetter && (
                  <button
                    type="button"
                    onClick={onOpenCoverLetter}
                    className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-semibold text-xs sm:text-sm transition cursor-pointer whitespace-nowrap"
                    title="Read & Download Cover Letter (PDF)"
                  >
                    <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Cover Letter (PDF)</span>
                  </button>
                )}

                {/* Button 3: Get in Touch */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-semibold text-xs sm:text-sm transition whitespace-nowrap"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />
                </a>
              </div>

              {/* Quick Contact & Social Strip */}
              <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {info.email && (
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{info.email}</span>
                    </>
                  )}
                </button>
              )}

              {info.whatsappUrl && (
                <a
                  href={info.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp{info.phoneDisplay ? ` (${info.phoneDisplay})` : ""}</span>
                </a>
              )}

              {info.linkedin && (
                <a
                  href={info.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-blue-500 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition shrink-0"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-4 h-4 shrink-0" />
                </a>
              )}

                {info.github && (
                  <a
                    href={info.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition shrink-0"
                    aria-label="GitHub Profile"
                  >
                    <GitHubIcon className="w-4 h-4 shrink-0" />
                  </a>
                )}
              </div>
            </div>

            {/* Key Value Badges */}
            {info.stats && (
              <div className="pt-4 grid grid-cols-3 gap-2 border-t border-zinc-200 dark:border-zinc-800/80 text-center lg:text-left">
                {info.stats.crashFreeRate && (
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-mono">Stability</div>
                    <div className="text-sm sm:text-base md:text-lg font-black text-emerald-600 dark:text-emerald-400">
                      {info.stats.crashFreeRate} Crash-Free
                    </div>
                  </div>
                )}
                {info.stats.anrReduction && (
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-mono">Performance</div>
                    <div className="text-sm sm:text-base md:text-lg font-black text-cyan-600 dark:text-cyan-400">
                      {info.stats.anrReduction} ANRs Cut
                    </div>
                  </div>
                )}
                {info.stats.saasAppsCount && (
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-mono">Production</div>
                    <div className="text-sm sm:text-base md:text-lg font-black text-indigo-600 dark:text-indigo-400">
                      {info.stats.saasAppsCount} SaaS Apps
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Live Interactive Android Phone */}
          <div className="lg:col-span-5 flex justify-center relative z-20 pointer-events-auto">
            <InteractivePhone />
          </div>
        </div>
      </div>
    </section>
  );
}
