"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Building,
} from "lucide-react";
import { Experience } from "@/types/portfolio";

interface ExperienceSectionProps {
  experiences?: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const displayExperiences = experiences ?? [];
  const [expandedId, setExpandedId] = useState<string>(displayExperiences[0]?.id ?? "");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? "" : id);
  };

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>5+ Years Career Progression</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            Professional Experience & Track Record
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A track record of engineering leadership, production stability, and collaborating with cross-functional product teams across Saudi Arabia, Egypt, India, and Pakistan.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-3xl mx-auto px-1 sm:px-4">
          <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-2.5 sm:ml-6 space-y-8">
            {displayExperiences.map((exp, idx) => {
              const isExpanded = expandedId === exp.id;
              return (
                <div key={exp.id} className="relative pl-4 sm:pl-8 group">
                  {/* Timeline Dot Indicator */}
                  <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-2 border-emerald-500 group-hover:scale-125 transition-transform shadow-sm" />

                  {/* Card Container */}
                  <div className="p-4 sm:p-7 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/40 transition-all duration-200">
                  {/* Top Bar with Period & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </span>

                    {exp.statsBadge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {exp.statsBadge}
                      </span>
                    )}
                  </div>

                  {/* Role & Company Header */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                      <Building className="w-3.5 h-3.5 text-zinc-400" />
                      <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">
                        {exp.company}
                      </strong>
                      {exp.location && (
                        <>
                          <span>•</span>
                          <MapPin className="w-3 h-3 text-zinc-400" />
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Expandable Bullet Points */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-900 space-y-2.5 animate-fade-in">
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bullet}</span>
                        </div>
                      ))}

                      {/* Tech stack pills */}
                      <div className="pt-3 flex flex-wrap gap-1.5">
                        {exp.skills.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="mt-4 pt-2 w-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1 hover:underline"
                  >
                    <span>{isExpanded ? "Collapse Details" : "Read Responsibilities & Achievements"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}
