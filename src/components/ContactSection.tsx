"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  Download,
  FileText,
  Clock,
  Globe,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/BrandIcons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { getAssetPath } from "@/utils/basePath";

interface ContactSectionProps {
  onOpenCoverLetter: () => void;
}

export function ContactSection({ onOpenCoverLetter }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Quick inquiry form state
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const sender = name.trim() || "Recruiter / Hiring Team";
    const orgSuffix = company.trim() ? ` [${company.trim()}]` : "";
    const subject = encodeURIComponent(
      `Reaching out from your Android Portfolio — ${sender}${orgSuffix}`
    );
    const body = encodeURIComponent(
      `Hi Hammad,\n\nI came across your portfolio and would like to connect regarding a potential opportunity or collaboration.\n\nFrom: ${sender}${company.trim() ? `\nOrganization: ${company.trim()}` : ""
      }\n\nMessage:\n${message.trim() || "We would like to discuss potential collaboration and next steps."}\n\nBest regards,\n${sender}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 relative bg-zinc-50/50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Ready to Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            Let&apos;s Build Something Exceptional
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Currently interviewing for Senior Android Engineer roles. Available for remote positions with global timezone flexibility (GMT+3 / GMT+5 / EU / US).
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contacts & Download Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Contact Channels
              </h3>

              {/* Email item */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-mono">Email Address</div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-emerald-500 transition break-all"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone / WhatsApp item */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-mono">Phone / WhatsApp</div>
                    <a
                      href={PERSONAL_INFO.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-emerald-500 transition"
                    >
                      {PERSONAL_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn & GitHub Links */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-blue-500/50 flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-2">
                    <LinkedInIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      LinkedIn
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-500" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-400 flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-2">
                    <GitHubIcon className="w-4 h-4 text-zinc-700 dark:text-zinc-200" />
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      GitHub
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200" />
                </a>
              </div>

              {/* Timezone & Remote Capability */}
              <div className="p-3.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1 text-xs">
                <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Timezone Compatibility</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                  Based in Islamabad (GMT+5). Excellent overlap with Saudi Arabia / GCC (GMT+3, only 2h diff), UK / Europe (4-5h diff), and flexible for US East early syncs.
                </p>
              </div>

              {/* Direct CV Download Buttons */}
              <div className="pt-2 space-y-2">
                <a
                  href={getAssetPath(PERSONAL_INFO.pdfResume)}
                  download
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-md shadow-emerald-600/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Complete Resume (PDF)</span>
                </a>

                <button
                  onClick={onOpenCoverLetter}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition"
                >
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>Read Official Cover Letter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Quick Inquiry Email Generator */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Send an Inquiry or Schedule an Interview
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Fill in your details below to open a pre-formatted invitation directly in your email client.
                </p>
              </div>

              <form onSubmit={handleSendMail} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Careem, Deliveroo, Tech Corp"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Opportunity or Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about the role, technical challenges, or team you are hiring for..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Email to Hammad</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
