"use client";

import React from "react";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { Education } from "@/types/portfolio";

interface EducationTabProps {
  education: Education[];
  onUpdateEducation: <K extends keyof Education>(index: number, field: K, value: Education[K]) => void;
  onAddEducation: () => void;
  onRemoveEducation: (index: number) => void;
}

export function EducationTab({
  education,
  onUpdateEducation,
  onAddEducation,
  onRemoveEducation,
}: EducationTabProps) {
  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Academic Education ({education.length})</span>
          </h2>
          <p className="text-xs text-zinc-400">Manage academic degrees, institutions, and research credentials.</p>
        </div>
        <button
          type="button"
          onClick={onAddEducation}
          className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.map((edu, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="text-xs font-mono font-bold text-emerald-400">
                Degree #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => onRemoveEducation(idx)}
                className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition cursor-pointer"
                title="Delete Degree"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Degree Title</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => onUpdateEducation(idx, "degree", e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Institution / University</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => onUpdateEducation(idx, "institution", e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Period / Years</label>
                <input
                  type="text"
                  value={edu.period}
                  onChange={(e) => onUpdateEducation(idx, "period", e.target.value)}
                  placeholder="2020 - 2024"
                  className="w-full px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Location (Optional)</label>
                <input
                  type="text"
                  value={edu.location ?? ""}
                  onChange={(e) => onUpdateEducation(idx, "location", e.target.value)}
                  placeholder="Islamabad, Pakistan"
                  className="w-full px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Details / Coursework</label>
              <textarea
                rows={2}
                value={edu.details}
                onChange={(e) => onUpdateEducation(idx, "details", e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

