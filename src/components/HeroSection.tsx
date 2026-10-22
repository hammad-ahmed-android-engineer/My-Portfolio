"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Download,
  FileText,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/BrandIcons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { getAssetPath } from "@/utils/basePath";
import { InteractivePhone } from "./InteractivePhone";

interface HeroSectionProps {
  onOpenCoverLetter: () => void;
}

export function HeroSection({ onOpenCoverLetter }: HeroSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 text-xs font-semibold shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Open to Senior Android Roles: On-site or Remote </span>
              {/* (GMT+3, GMT+5, EU, US) */}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
              Senior Android Engineer Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400">
                Mission-Critical
              </span>{" "}
              Native Apps at Scale.
            </h1>

            {/* Differentiating Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              5+ years shipping high-performance mobile systems—from the{" "}
              <strong className="text-zinc-900 dark:text-white font-semibold">
                Saudi Ministry of Transport Hajj Platform (SAR YamamaCM)
              </strong>{" "}
              to <strong className="text-zinc-900 dark:text-white font-semibold">5 SaaS apps on Google Play</strong>.
              Using <span className="text-emerald-600 dark:text-emerald-400 font-medium">Clean Architecture, Jetpack Compose, Kotlin Coroutines</span>, and pushing crash-free rates to{" "}
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">99.99%</strong>.
            </p>

            {/* Quick Profile Snapshot Badge with Aesthetic profilePic */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300" />
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-white dark:border-zinc-900 shadow-lg bg-zinc-900">
                  <Image
                    src={getAssetPath("profilePic.jpg")}
                    alt="Hammad Ahmed"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md border-2 border-white dark:border-zinc-950">
                  ✓
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Hammad Ahmed
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-center sm:justify-start gap-1.5 font-mono mt-0.5">
                  <span>Islamabad</span>
                  <span>•</span>
                  <span>NUST (MS Computer Science)</span>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={getAssetPath(PERSONAL_INFO.pdfResume)}
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                <span>Download CV (PDF)</span>
              </a>

              <a
                href={getAssetPath(PERSONAL_INFO.docxResume)}
                download
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-semibold text-sm transition"
              >
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>CV (.docx)</span>
              </a>

              <button
                onClick={onOpenCoverLetter}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-semibold text-sm transition"
              >
                <span>Read Cover Letter</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {/* Quick Contact & Social Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{PERSONAL_INFO.email}</span>
                  </>
                )}
              </button>

              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp ({PERSONAL_INFO.phoneDisplay})</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-blue-500 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition shrink-0"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4 shrink-0" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition shrink-0"
                aria-label="GitHub Profile"
              >
                <GitHubIcon className="w-4 h-4 shrink-0" />
              </a>
            </div>

            {/* Key Value Badges */}
            <div className="pt-4 grid grid-cols-3 gap-2 border-t border-zinc-200 dark:border-zinc-800/80 text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-mono">Stability</div>
                <div className="text-sm sm:text-base md:text-lg font-black text-emerald-600 dark:text-emerald-400">
                  99.99% Crash-Free
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-mono">Performance</div>
                <div className="text-sm sm:text-base md:text-lg font-black text-cyan-600 dark:text-cyan-400">
                  ~90% ANRs Cut
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-mono">Production</div>
                <div className="text-sm sm:text-base md:text-lg font-black text-indigo-600 dark:text-indigo-400">
                  5 SaaS Apps
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Android Phone */}
          <div className="lg:col-span-5 flex justify-center">
            <InteractivePhone />
          </div>
        </div>
      </div>
    </section>
  );
}
