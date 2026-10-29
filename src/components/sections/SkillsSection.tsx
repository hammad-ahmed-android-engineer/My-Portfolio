"use client";

import React from "react";
import {
  Code2,
  Layers,
  Smartphone,
  Database,
  CreditCard,
  Gauge,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { SkillCategory } from "@/types/portfolio";

interface SkillsSectionProps {
  skills?: SkillCategory[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const displaySkills = skills ?? [];

  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-5 h-5 text-emerald-500" />,
    Layers: <Layers className="w-5 h-5 text-cyan-500" />,
    Smartphone: <Smartphone className="w-5 h-5 text-purple-500" />,
    Database: <Database className="w-5 h-5 text-indigo-500" />,
    CreditCard: <CreditCard className="w-5 h-5 text-amber-500" />,
    Gauge: <Gauge className="w-5 h-5 text-emerald-400" />,
  };

  return (
    <section id="skills" className="py-20 relative bg-zinc-50/50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5" />
            <span>Technical Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            Core Competencies & Stack
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A comprehensive breakdown of frameworks, platforms, and methodologies battle-tested in high-traffic production environments.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySkills.map((cat, idx) => (
            <div
              key={idx}
              className="skill-card p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/40 transition-all duration-200"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    {iconMap[cat.iconName] ?? <Code2 className="w-5 h-5 text-emerald-500" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                      {cat.category}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5 leading-relaxed">
                  {cat.description}
                </p>

                {/* Skill List with Progress Bars */}
                <div className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                          {skill.name}
                          {skill.highlight && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/15 text-emerald-500 font-bold">
                              Core
                            </span>
                          )}
                        </span>
                        <span className="font-mono text-zinc-400 text-[11px]">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
