"use client";

import React, { useState } from "react";
import { GraduationCap, Plus, Trash2, ArrowLeft, Save, Pencil, Calendar, MapPin } from "lucide-react";
import { Education } from "@/types/portfolio";

interface EducationPageProps {
  education: Education[];
  onUpdateEducation: <K extends keyof Education>(index: number, field: K, value: Education[K]) => void;
  onAddEducation: (newEdu?: Education) => Promise<boolean> | void;
  onRemoveEducation: (index: number) => void;
  onSaveAll?: () => Promise<boolean | void> | void;
  isSaving?: boolean;
}

const createEmptyEducation = (order: number): Education => ({
  degree: "",
  institution: "",
  period: "",
  location: "",
  details: "",
  order,
});

  export function EducationPage({
    education,
    onUpdateEducation,
    onAddEducation,
    onRemoveEducation,
    onSaveAll,
    isSaving = false,
  }: EducationPageProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<Education>(() =>
    createEmptyEducation(education.length + 1)
  );

  const handleOpenCreatePage = () => {
    setDraft(createEmptyEducation(education.length + 1));
    setEditingIndex(null);
    setIsCreating(true);
  };

  const handleSaveNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.degree.trim() || !draft.institution.trim() || !draft.period.trim() || !draft.details.trim()) return;
    const saved = await onAddEducation({
      ...draft,
      order: education.length + 1,
    });
    if (saved !== false) {
      setIsCreating(false);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null && education[editingIndex]) {
      const current = education[editingIndex];
      if (!current.degree.trim() || !current.institution.trim() || !current.period.trim() || !current.details.trim()) {
        return;
      }
    }
    if (onSaveAll) {
      const saved = await onSaveAll();
      if (saved === false) return;
    }
    setEditingIndex(null);
  };

  // 1. Add New Education Page
  if (isCreating) {
    return (
      <div className="py-8 space-y-6 animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
              title="Back to Academic Education list"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[11px] font-mono text-emerald-400">
                Academic Education / Add New Degree
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>Add New Education Record</span>
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCreating(false)}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium transition cursor-pointer"
          >
            Cancel
          </button>
        </div>

        <form
          onSubmit={handleSaveNew}
          className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-5"
        >
          <div className="space-y-1">
            <label className="text-[11px] text-zinc-400">Degree Title *</label>
            <input
              type="text"
              required
              value={draft.degree}
              onChange={(e) => setDraft({ ...draft, degree: e.target.value })}
              placeholder="e.g. Master of Science in Computer Science"
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-zinc-400">Institution / University *</label>
            <input
              type="text"
              required
              value={draft.institution}
              onChange={(e) => setDraft({ ...draft, institution: e.target.value })}
              placeholder="e.g. National University of Sciences and Technology (NUST)"
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Period / Years *</label>
              <input
                type="text"
                required
                value={draft.period}
                onChange={(e) => setDraft({ ...draft, period: e.target.value })}
                placeholder="e.g. 2023 - 2025"
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Location (Optional)</label>
              <input
                type="text"
                value={draft.location ?? ""}
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                placeholder="e.g. Islamabad, Pakistan"
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-zinc-400">Details / Description *</label>
            <textarea
              rows={3}
              required
              value={draft.details}
              onChange={(e) => setDraft({ ...draft, details: e.target.value })}
              placeholder="Key academic focus, research areas, and coursework..."
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Education"}</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 2. Edit Selected Education Page
  if (editingIndex !== null && education[editingIndex]) {
    const idx = editingIndex;
    const edu = education[idx];

    return (
      <form onSubmit={handleSaveEdit} className="py-8 space-y-6 animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setEditingIndex(null)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
              title="Back to Academic Education list"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[11px] font-mono text-emerald-400">
                Academic Education / Edit Degree #{idx + 1}
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>{edu.degree || "Untitled Degree"}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onRemoveEducation(idx);
                setEditingIndex(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-400 text-xs font-semibold transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "Saving..." : "Save Education"}</span>
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-5">
          <div className="space-y-1">
            <label className="text-[11px] text-zinc-400">Degree Title *</label>
            <input
              type="text"
              required
              value={edu.degree}
              onChange={(e) => onUpdateEducation(idx, "degree", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-zinc-400">Institution / University *</label>
            <input
              type="text"
              required
              value={edu.institution}
              onChange={(e) => onUpdateEducation(idx, "institution", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Period / Years *</label>
              <input
                type="text"
                required
                value={edu.period}
                onChange={(e) => onUpdateEducation(idx, "period", e.target.value)}
                placeholder="2020 - 2024"
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Location (Optional)</label>
              <input
                type="text"
                value={edu.location ?? ""}
                onChange={(e) => onUpdateEducation(idx, "location", e.target.value)}
                placeholder="Islamabad, Pakistan"
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-zinc-400">Details / Description *</label>
            <textarea
              rows={3}
              required
              value={edu.details}
              onChange={(e) => onUpdateEducation(idx, "details", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingIndex(null)}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Education"}</span>
            </button>
          </div>
        </div>
      </form>
    );
  }

  // 3. Minimal List View
  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Academic Education ({education.length})</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Select any degree to view or edit its details, or add a new academic credential.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCreatePage}
          className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 text-center text-xs text-zinc-500">
          No education records found. Click &ldquo;Add Education&rdquo; to create one.
        </div>
      ) : (
        <div className="space-y-2.5">
          {education.map((edu, idx) => (
            <div
              key={idx}
              onClick={() => setEditingIndex(idx)}
              className="group p-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/90 hover:border-emerald-500/40 transition flex flex-wrap items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  #{idx + 1}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-white truncate">
                      {edu.degree || "Untitled Degree"}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">
                      — {edu.institution || "Unnamed Institution"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 mt-1 font-mono">
                    {edu.period && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-500" />
                        {edu.period}
                      </span>
                    )}
                    {edu.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        {edu.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div
                className="flex items-center gap-2 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setEditingIndex(idx)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-200 hover:text-emerald-400 transition cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveEducation(idx)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition cursor-pointer"
                  title="Delete Degree"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

