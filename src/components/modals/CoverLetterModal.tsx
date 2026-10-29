"use client";

import React, { useState } from "react";
import { X, Copy, Check, Mail, ExternalLink, FileText, Download } from "lucide-react";
import { PersonalInfo } from "@/types/portfolio";

interface CoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  coverLetterText?: string;
  personalInfo?: PersonalInfo;
}

const DEFAULT_COVER_LETTER_TEXT = `Dear Hiring Manager,

I am writing to apply for the Android Engineer position at your company. With 5+ years of experience building native Android applications using Kotlin and Jetpack Compose, I have worked across the full application development lifecycle, from architecture and API integration to testing, performance optimization, and Google Play release. I am particularly interested in remote opportunities where I can contribute my technical expertise while working effectively with a distributed team.

Throughout my experience, I have delivered five SaaS, e-commerce, food and beverage, and B2C applications, implementing complex purchase workflows, multi-step checkout, order tracking, wallets, rewards, and secure payment integrations using Checkout.com and Tap Payments SDKs.

I also architected SAR/YamamaCM, an offline-first application developed for Saudi Arabia’s Ministry of Transport to support Hajj operations in 2025 and 2026. The application enables administrators to manage candidate attendance, duty assignments, temporary leave, and extensions, while candidates can view their assignments and confirm meals. Using Room for local data storage and background synchronization, the application supports essential operations without internet access and synchronizes recorded data when connectivity returns.

I focus on measurable engineering outcomes, having achieved 99.99% crash-free sessions, approximately 90% fewer ANRs, around 50% faster cold starts, and 40% lower battery drain in navigation applications. I apply Clean Architecture, MVVM, Hilt, Kotlin Coroutines, Flow, Retrofit, and unit testing to build maintainable, efficient, and reliable Android applications.

Beyond technical development, I collaborate closely with backend, product, UI/UX, and QA teams across Saudi Arabia, Egypt, and India. I am comfortable working in remote and distributed teams, participating in code reviews, and contributing throughout the development and testing lifecycle. I am also completing a Master of Computer Science at NUST.

I would welcome the opportunity to join your company as an Android Engineer and contribute to building reliable, high-quality mobile applications. I believe my experience in delivering production-ready Android apps, improving application performance, and collaborating across distributed teams would allow me to make a meaningful contribution to your engineering team.

Thank you for your time and consideration. I look forward to the opportunity to discuss how my experience aligns with your team's needs.`;

export function CoverLetterModal({
  isOpen,
  onClose,
  coverLetterText,
  personalInfo,
}: CoverLetterModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !personalInfo) return null;
  const info = personalInfo;

  const rawText = coverLetterText?.trim() ? coverLetterText.trim() : DEFAULT_COVER_LETTER_TEXT;

  // Split content into clean paragraphs
  const paragraphs = rawText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPdf = () => {
    if (info.coverLetterDriveLink) {
      window.open(info.coverLetterDriveLink, "_blank");
      return;
    }
    // Clean, formatted browser PDF export
    window.print();
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
                Cover Letter — {info.name}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {info.title} • Remote / Global Alignment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm cursor-pointer"
              title="Download Cover Letter as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
              title="Copy cover letter text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            {info.resumeDriveLink && (
              <a
                href={info.resumeDriveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                title="View CV (PDF)"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>CV (PDF)</span>
              </a>
            )}

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
        <div
          id="cover-letter-printable"
          className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed"
        >
          {/* Official Letterhead */}
          <div className="pb-6 border-b border-zinc-200 dark:border-zinc-800/80">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white uppercase">
              {info.name}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              Senior Android Engineer | Kotlin | Jetpack Compose | Clean Architecture
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
              <a href={`tel:${info.phone}`} className="hover:text-emerald-500 transition">
                {info.phoneDisplay}
              </a>
              <span>•</span>
              <a href={`mailto:${info.email}`} className="hover:text-emerald-500 transition">
                {info.email}
              </a>
              <span>•</span>
              <a
                href={info.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-500 transition inline-flex items-center gap-1"
              >
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Letter Content: dynamically rendered paragraphs */}
          <div className="space-y-4 text-justify sm:text-left">
            {paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? "font-semibold text-zinc-900 dark:text-zinc-100"
                    : "leading-relaxed text-zinc-700 dark:text-zinc-300"
                }
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400">Sincerely,</p>
              <p className="font-bold text-base text-zinc-900 dark:text-zinc-100 mt-1">{info.name}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">{info.title}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{info.email} • {info.phoneDisplay}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Available for remote senior engineering opportunities.
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${info.email}?subject=Interview%20Invitation%20-%20Senior%20Android%20Engineer`}
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
