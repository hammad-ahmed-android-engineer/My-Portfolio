"use client";

import React, { useState } from "react";
import { X, Copy, Check, Mail, ExternalLink, FileText, Download, Loader2 } from "lucide-react";
import { PersonalInfo } from "@/types/portfolio";
import { downloadPdf } from "@/utils/documentUtils";

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

/**
 * Formats raw cover letter text into structured salutation and body paragraphs.
 * Even if the text in the database was saved as a single block or has "Dear Hiring Manager, I am writing..."
 * on the same line, this separates the salutation onto its own line and splits the body into readable paragraphs.
 */
function parseCoverLetterContent(raw: string): { salutation: string; bodyParagraphs: string[] } {
  let cleaned = raw.replace(/\r\n/g, "\n").trim();

  // Remove trailing "Sincerely, ..." if embedded in raw text (since we render a formatted sign-off block)
  cleaned = cleaned.replace(/\n*\s*(?:Sincerely|Best regards|Kind regards|Regards),[\s\S]*$/i, "").trim();

  let salutation = "Dear Hiring Manager,";

  // Check if text starts with a salutation like "Dear Hiring Manager," or "Dear Hiring Team,"
  const salutationMatch = cleaned.match(/^(Dear\s+[^,\n]+,)\s*([\s\S]*)$/i);
  if (salutationMatch) {
    salutation = salutationMatch[1].trim();
    cleaned = salutationMatch[2].trim();
  }

  // Split by blank lines or single newlines
  let paragraphs = cleaned
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // If the entire body was stored as one single giant paragraph without newlines,
  // split it at logical paragraph topic boundaries so it reads like a proper letter.
  if (paragraphs.length === 1 && paragraphs[0].length > 450) {
    paragraphs = paragraphs[0]
      .split(
        /(?<=\.)\s+(?=(?:Throughout my experience|I also architected|I focus on measurable|Beyond technical development|I would welcome the opportunity|Thank you for your time))/
      )
      .map((p) => p.trim())
      .filter(Boolean);
  }

  return { salutation, bodyParagraphs: paragraphs };
}

export function CoverLetterModal({
  isOpen,
  onClose,
  coverLetterText,
  personalInfo,
}: CoverLetterModalProps) {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen || !personalInfo) return null;
  const info = personalInfo;

  const rawText = coverLetterText?.trim() ? coverLetterText.trim() : DEFAULT_COVER_LETTER_TEXT;
  const { salutation, bodyParagraphs } = parseCoverLetterContent(rawText);

  const formattedCopyText = `${salutation}\n\n${bodyParagraphs.join("\n\n")}\n\nSincerely,\n${info.name}\n${info.title}\n${info.email} | ${info.phoneDisplay}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedCopyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPdf = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadPdf(
        info.coverLetterDriveLink || info.resumeDriveLink,
        undefined,
        "cover-letter"
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header — Aligned cleanly to match CV Modal */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white">
                  {info.name} — Cover Letter
                </h2>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PDF Ready
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                {info.title} • Remote &amp; Global Engineering Alignment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isDownloading ? (
              <div
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 select-none"
                role="status"
                aria-live="polite"
              >
                <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                <span>Downloading...</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 cursor-pointer"
                title="Download Cover Letter PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 cursor-pointer"
              title="Copy cover letter text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="hidden sm:inline">Copy Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Letterhead & Formal Cover Letter Content */}
        <div
          id="cover-letter-printable"
          className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 space-y-6 bg-zinc-950 text-zinc-200 font-sans"
        >
          {/* Official Letterhead */}
          <div className="pb-6 border-b border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                {info.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-emerald-400 mt-1">
                {info.title} • Kotlin, Jetpack Compose &amp; Clean Architecture
              </p>
              {info.location && (
                <p className="text-xs text-zinc-400 mt-0.5">{info.location}</p>
              )}
            </div>

            <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-zinc-300">
              {info.phoneDisplay && (
                <a href={`tel:${info.phone}`} className="hover:text-emerald-400 transition">
                  {info.phoneDisplay}
                </a>
              )}
              {info.email && (
                <a href={`mailto:${info.email}`} className="hover:text-emerald-400 transition">
                  {info.email}
                </a>
              )}
              {info.linkedin && (
                <a
                  href={info.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition inline-flex items-center gap-1 text-emerald-400"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Formal Letter Body */}
          <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed font-normal text-zinc-300">
            {/* Salutation on its own dedicated line */}
            <p className="font-semibold text-white text-base pb-1">
              {salutation}
            </p>

            {/* Body Paragraphs in clean normal weight */}
            {bodyParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="font-normal text-zinc-300 leading-7 text-left"
              >
                {paragraph}
              </p>
            ))}

            {/* Formal Sign-Off */}
            <div className="pt-6 mt-6 border-t border-zinc-800/80 space-y-1">
              <p className="text-zinc-400 font-normal">Sincerely,</p>
              <p className="font-bold text-base text-white pt-1">{info.name}</p>
              <p className="text-xs text-emerald-400 font-mono">{info.title}</p>
              <p className="text-xs text-zinc-400">
                {info.email} {info.phoneDisplay ? `• ${info.phoneDisplay}` : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-zinc-800 bg-zinc-900/60 shrink-0">
          <div className="text-xs text-zinc-400">
            Available for remote senior Android engineering opportunities.
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${info.email}?subject=Interview%20Invitation%20-%20Senior%20Android%20Engineer`}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
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
