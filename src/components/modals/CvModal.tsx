"use client";

import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  FileText,
  Briefcase,
  GraduationCap,
  Code2,
  Sparkles,
  CheckCircle2,
  Layers,
} from "lucide-react";
import {
  PersonalInfo,
  Experience,
  Education,
  SkillCategory,
  Project,
  MetricItem,
} from "@/types/portfolio";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/BrandIcons";
import { downloadPdf } from "@/utils/documentUtils";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalInfo?: PersonalInfo;
  experiences?: Experience[];
  education?: Education[];
  skills?: SkillCategory[];
  projects?: Project[];
  metrics?: MetricItem[];
}

export function CvModal({
  isOpen,
  onClose,
  personalInfo,
  experiences,
  education,
  skills,
  projects,
  metrics,
}: CvModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !personalInfo) return null;
  const info = personalInfo;

  const handleCopy = () => {
    const text = `${info.name.toUpperCase()} — ${info.title}
Location: ${info.location} | Email: ${info.email} | Phone: ${info.phoneDisplay}
LinkedIn: ${info.linkedin} | GitHub: ${info.github}

EXECUTIVE SUMMARY:
${info.summary}

KEY PRODUCTION METRICS:
${(metrics || []).map((m) => `• ${m.value} ${m.label}: ${m.description}`).join("\n")}

PROFESSIONAL EXPERIENCE:
${(experiences || [])
  .map(
    (exp) =>
      `• ${exp.role} — ${exp.company} (${exp.period}${exp.location ? ` | ${exp.location}` : ""})\n  ${exp.summary}\n${(exp.bullets || []).map((b) => `    - ${b}`).join("\n")}`
  )
  .join("\n\n")}

FEATURED ANDROID SYSTEMS:
${(projects || [])
  .map(
    (p) =>
      `• ${p.title} (${p.clientOrCompany}) — ${p.impactHighlight}\n  ${p.summary}\n  Stack: ${(p.techStack || []).join(", ")}`
  )
  .join("\n\n")}

CORE TECHNICAL COMPETENCIES:
${(skills || [])
  .map(
    (cat) =>
      `• ${cat.category}: ${cat.skills.map((s) => (typeof s === "string" ? s : s.name)).join(", ")}`
  )
  .join("\n")}

EDUCATION:
${(education || [])
  .map((edu) => `• ${edu.degree} — ${edu.institution} (${edu.period})`)
  .join("\n")}
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPdf = () => {
    downloadPdf(info.resumeDriveLink);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white">
                  {info.name} — Curriculum Vitae
                </h2>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PDF Ready
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                {info.title} • {info.stats?.experienceYears || "5+"} Years Production Experience
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 cursor-pointer"
              title="Download CV from Google Drive"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 cursor-pointer"
              title="Copy plain-text resume for ATS"
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

            {info.resumeDriveLink && (
              <a
                href={info.resumeDriveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200"
                title="Open CV in Google Drive"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <span>Drive</span>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition cursor-pointer"
              aria-label="Close CV modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Executive CV Document */}
        <div
          id="cv-printable"
          className="flex-1 overflow-y-auto p-5 sm:p-8 md:p-10 space-y-8 bg-zinc-950 text-zinc-200 font-sans"
        >
          {/* 1. Executive Header Card */}
          <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-zinc-800/90 p-6 sm:p-8 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-lg shadow-emerald-500/20 shrink-0">
                  {info.name
                    ? info.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "HA"}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      {info.name}
                    </h1>
                    {info.availability && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {info.availability}
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-emerald-400 mt-1">
                    {info.title} • Kotlin, Jetpack Compose &amp; Clean Architecture
                  </p>
                  {info.currentEducation && (
                    <p className="text-xs text-zinc-400 font-mono mt-1">
                      {info.currentEducation}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-1.5 text-xs font-mono text-zinc-300 shrink-0">
                {info.email && (
                  <a
                    href={`mailto:${info.email}`}
                    className="inline-flex items-center gap-2 hover:text-emerald-400 transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{info.email}</span>
                  </a>
                )}
                {info.phoneDisplay && (
                  <div className="inline-flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{info.phoneDisplay}</span>
                  </div>
                )}
                {info.location && (
                  <div className="inline-flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{info.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 pt-1">
                  {info.linkedin && (
                    <a
                      href={info.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-emerald-400 transition underline underline-offset-4"
                    >
                      <LinkedInIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {info.github && (
                    <a
                      href={info.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-emerald-400 transition underline underline-offset-4"
                    >
                      <GitHubIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Key Production Metrics Strip */}
            {metrics && metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 pt-6 border-t border-zinc-800/80">
                {metrics.slice(0, 4).map((m, idx) => (
                  <div
                    key={idx}
                    className="px-3.5 py-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80"
                  >
                    <div className="text-base sm:text-lg font-extrabold text-emerald-400 font-mono">
                      {m.value}
                    </div>
                    <div className="text-[11px] font-semibold text-zinc-200 truncate">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Executive Summary */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <h3>Executive Profile &amp; Engineering Philosophy</h3>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 border-l-4 border-l-emerald-500 text-xs sm:text-sm leading-relaxed text-zinc-300">
              {info.summary}
            </div>
          </div>

          {/* 3. Professional Work Experience */}
          {experiences && experiences.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Briefcase className="w-4 h-4" />
                <h3>Professional Experience</h3>
              </div>

              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id || exp.company}
                    className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/70 pb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-white">
                            {exp.role}
                          </h4>
                          <span className="text-emerald-400 font-semibold text-sm">
                            @ {exp.company}
                          </span>
                          {exp.statsBadge && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {exp.statsBadge}
                            </span>
                          )}
                        </div>
                        {exp.location && (
                          <p className="text-[11px] text-zinc-400 mt-0.5">
                            {exp.location} {exp.type ? `• ${exp.type}` : ""}
                          </p>
                        )}
                      </div>
                      <span className="inline-flex items-center self-start sm:self-center px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400 shrink-0">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {exp.summary}
                    </p>

                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="space-y-1.5 pt-1">
                        {exp.bullets.map((ach: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Featured Production Android Systems */}
          {projects && projects.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Layers className="w-4 h-4" />
                <h3>Key Production Systems &amp; Flagship Applications</h3>
              </div>

              <div className="space-y-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id || proj.title}
                    className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-3.5"
                  >
                    {/* Header Row: Title, Client & Category/Impact Badges */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/70 pb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-white">
                            {proj.title}
                          </h4>
                          {proj.category && (
                            <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[10px] font-mono">
                              {proj.category}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-emerald-400 font-medium mt-0.5">
                          {proj.clientOrCompany} • {proj.role}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {proj.architectureDetails?.pattern && (
                          <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300">
                            {proj.architectureDetails.pattern}
                          </span>
                        )}
                        {proj.impactHighlight && (
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-semibold">
                            {proj.impactHighlight}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {proj.summary}
                    </p>

                    {/* Key Features / Engineering Highlights */}
                    {proj.features && proj.features.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                        {proj.features.slice(0, 4).map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bottom Row: Tech Stack & Metrics */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-800/60">
                      {proj.techStack && proj.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {proj.techStack.map((t, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {proj.metrics && proj.metrics.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {proj.metrics.map((m, mIdx) => (
                            <span
                              key={mIdx}
                              className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300"
                            >
                              <strong className="text-emerald-400">{m.value}</strong> {m.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Technical Competencies & Stack */}
          {skills && skills.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Code2 className="w-4 h-4" />
                <h3>Core Technical Competencies &amp; Android Stack</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {skills.map((cat) => (
                  <div
                    key={cat.category}
                    className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-white">
                        {cat.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {cat.skills.length} skills
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s, idx) => {
                        const name = typeof s === "string" ? s : s.name;
                        const isHighlight = typeof s === "object" && s.highlight;
                        return (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${
                              isHighlight
                                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                : "bg-zinc-950 text-zinc-300 border border-zinc-800"
                            }`}
                          >
                            {name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Academic Credentials */}
          {education && education.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <GraduationCap className="w-4 h-4" />
                <h3>Academic Credentials</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-sm text-white">{edu.degree}</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 font-mono text-[10px] shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    <span className="text-zinc-300 font-medium block text-xs">
                      {edu.institution}
                    </span>
                    {edu.details && (
                      <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">
                        {edu.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
