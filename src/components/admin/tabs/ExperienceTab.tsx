"use client";

import React from "react";
import { Briefcase, Plus, Trash2 } from "lucide-react";
import { Experience } from "@/types/portfolio";
import { ItemListInput } from "../common/ItemListInput";

interface ExperienceTabProps {
  experiences: Experience[];
  onUpdateExperience: <K extends keyof Experience>(index: number, field: K, value: Experience[K]) => void;
  onAddExperience: () => void;
  onRemoveExperience: (index: number) => void;
}

export function ExperienceTab({
  experiences,
  onUpdateExperience,
  onAddExperience,
  onRemoveExperience,
}: ExperienceTabProps) {
  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>Work Experience ({experiences.length})</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Professional career history, verified engineering responsibilities, and technologies used.
          </p>
        </div>
        <button
          type="button"
          onClick={onAddExperience}
          className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <div
            key={exp.id || idx}
            className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-mono font-bold text-emerald-400">
                Experience #{idx + 1} • {exp.company}
              </span>
              <button
                type="button"
                onClick={() => onRemoveExperience(idx)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition cursor-pointer"
                title="Delete Experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Company Name</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => onUpdateExperience(idx, "company", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-semibold"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] text-zinc-400">Job Title / Role</label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => onUpdateExperience(idx, "role", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Tenure / Period</label>
                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => onUpdateExperience(idx, "period", e.target.value)}
                  placeholder="2022 - Present"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Location</label>
                <input
                  type="text"
                  value={exp.location ?? ""}
                  onChange={(e) => onUpdateExperience(idx, "location", e.target.value)}
                  placeholder="Riyadh, Saudi Arabia (Remote)"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Employment Type</label>
                <input
                  type="text"
                  value={exp.type}
                  onChange={(e) => onUpdateExperience(idx, "type", e.target.value)}
                  placeholder="Full-Time, Contract..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-3">
                <label className="text-[11px] text-zinc-400">Highlight Stats Badge (Optional)</label>
                <input
                  type="text"
                  value={exp.statsBadge ?? ""}
                  onChange={(e) => onUpdateExperience(idx, "statsBadge", e.target.value)}
                  placeholder="e.g. 99.99% Crash-Free • Hajj Platform"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 font-bold focus:border-emerald-500 outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Role Summary</label>
              <textarea
                rows={2}
                value={exp.summary}
                onChange={(e) => onUpdateExperience(idx, "summary", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none resize-none"
              />
            </div>

            {/* Bullet Points via ItemListInput */}
            <ItemListInput
              label="Key Responsibilities & Deliverable Bullets"
              items={exp.bullets ?? []}
              onChange={(updated) => onUpdateExperience(idx, "bullets", updated)}
              placeholder="e.g. Architected offline database reducing sync latency by 40%"
            />

            {/* Skills & Technologies via ItemListInput */}
            <ItemListInput
              label="Technologies Used in this Role"
              items={exp.skills ?? []}
              onChange={(updated) => onUpdateExperience(idx, "skills", updated)}
              placeholder="e.g. Kotlin, Jetpack Compose, Coroutines, Room"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

