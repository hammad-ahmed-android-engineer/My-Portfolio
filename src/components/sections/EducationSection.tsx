"use client";

import React from "react";
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from "lucide-react";
import { Education } from "@/types/portfolio";

interface EducationSectionProps {
  education?: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  const displayEducation = education ?? [];

  return (
    <section id="education" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            Education
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Solid theoretical foundation combined with years of battle-tested production engineering.
          </p>
        </div>

        {/* Education Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayEducation.map((edu, idx) => (
            <div
              key={idx}
              className="education-card p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/40 transition space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{edu.period}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">
                    {edu.institution}
                  </div>
                  {edu.location && (
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{edu.location}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-2 border-t border-zinc-100 dark:border-zinc-900">
                  {edu.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
