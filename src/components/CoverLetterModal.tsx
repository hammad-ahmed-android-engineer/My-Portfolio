"use client";

import React, { useState } from "react";
import { X, Copy, Check, Download, Mail, ExternalLink, FileText } from "lucide-react";
import { COVER_LETTER_TEXT, PERSONAL_INFO } from "@/data/portfolioData";
import { getAssetPath } from "@/utils/basePath";

interface CoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CoverLetterModal({ isOpen, onClose }: CoverLetterModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(COVER_LETTER_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Cover Letter — Hammad Ahmed
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Senior Android Engineer • Remote / Global Alignment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              title="Copy cover letter text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <a
              href={getAssetPath(PERSONAL_INFO.coverLetterDocx)}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
              title="Download Cover Letter (.docx)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.docx)</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Letterhead & Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
          {/* Official Letterhead */}
          <div className="pb-6 border-b border-zinc-200 dark:border-zinc-800/80">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white uppercase">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              Senior Android Engineer | Kotlin | Jetpack Compose | Clean Architecture
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
              <span>{PERSONAL_INFO.location}</span>
              <span>•</span>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-emerald-500 transition">
                {PERSONAL_INFO.phoneDisplay}
              </a>
              <span>•</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-emerald-500 transition">
                {PERSONAL_INFO.email}
              </a>
              <span>•</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-500 transition inline-flex items-center gap-1"
              >
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Letter Content */}
          <div className="space-y-4 text-justify sm:text-left">
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
              Dear Hiring Manager,
            </p>

            <p>
              I am writing to apply for the <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Android Engineer</strong> position at your company. With 5+ years of experience building native Android applications using Kotlin and Jetpack Compose, I have worked across the full application development lifecycle, from architecture and API integration to testing, performance optimization, and Google Play release. I am particularly interested in remote opportunities where I can contribute my technical expertise while working effectively with a distributed team.
            </p>

            <p>
              Throughout my experience, I have delivered <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">five SaaS, e-commerce, food and beverage, and B2C applications</strong>, implementing complex purchase workflows, multi-step checkout, order tracking, wallets, rewards, and secure payment integrations using Checkout.com and Tap Payments SDKs.
            </p>

            <p>
              I also architected <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">SAR/YamamaCM</strong>, an offline-first application developed for <span className="text-emerald-600 dark:text-emerald-400 font-medium">Saudi Arabia’s Ministry of Transport</span> to support Hajj operations in 2025 and 2026. The application enables administrators to manage candidate attendance, duty assignments, temporary leave, and extensions, while candidates can view their assignments and confirm meals. Using Room for local data storage and background synchronization, the application supports essential operations without internet access and synchronizes recorded data when connectivity returns.
            </p>

            <p>
              I focus on measurable engineering outcomes, having achieved <strong className="text-emerald-600 dark:text-emerald-400">99.99% crash-free sessions</strong>, approximately <strong className="text-emerald-600 dark:text-emerald-400">90% fewer ANRs</strong>, around <strong className="text-emerald-600 dark:text-emerald-400">50% faster cold starts</strong>, and 40% lower battery drain in navigation applications. I apply Clean Architecture, MVVM, Hilt, Kotlin Coroutines, Flow, Retrofit, and unit testing to build maintainable, efficient, and reliable Android applications.
            </p>

            <p>
              Beyond technical development, I collaborate closely with backend, product, UI/UX, and QA teams across Saudi Arabia, Egypt, and India. I am comfortable working in remote and distributed teams, participating in code reviews, and contributing throughout the development and testing lifecycle. I am also completing a Master of Computer Science at NUST.
            </p>

            <p>
              I would welcome the opportunity to join your company as an Android Engineer and contribute to building reliable, high-quality mobile applications. I believe my experience in delivering production-ready Android apps, improving application performance, and collaborating across distributed teams would allow me to make a meaningful contribution to your engineering team.
            </p>

            <p>
              Thank you for your time and consideration. I look forward to the opportunity to discuss how my experience aligns with your team's needs.
            </p>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400">Sincerely,</p>
              <p className="font-bold text-base text-zinc-900 dark:text-zinc-100 mt-1">Hammad Ahmed</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">Senior Android Engineer</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{PERSONAL_INFO.email} • {PERSONAL_INFO.phoneDisplay}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Ready to discuss how I can help your team?
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Interview%20Invitation%20-%20Senior%20Android%20Engineer`}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact for Interview</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
