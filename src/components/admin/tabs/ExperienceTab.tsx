"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  Pencil,
  MapPin,
  Calendar,
  GripVertical,
  ArrowUpDown,
} from "lucide-react";
import { Experience } from "@/types/portfolio";
import { ItemListInput } from "../common/ItemListInput";

interface ExperienceTabProps {
  experiences: Experience[];
  onUpdateExperience: <K extends keyof Experience>(index: number, field: K, value: Experience[K]) => void;
  onAddExperience: (newExp?: Experience) => Promise<boolean> | void;
  onRemoveExperience: (index: number) => void;
  onReorderExperiences?: (reordered: Experience[], autoPersist?: boolean) => Promise<boolean> | void;
  onSaveAll?: () => Promise<void> | void;
  isSaving?: boolean;
}

const MONTH_MAP: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

/**
 * Parses a single date token such as "Jan 2024", "2024 Jan", "03/2023", "2023-03", "2024", or "Present"
 * into a numeric score (YYYY * 100 + MM) so experiences can be sorted chronologically.
 */
function parseDateTokenScore(token: string, isEndToken = false): number {
  const clean = token.trim().toLowerCase();
  if (!clean) return 0;

  if (/(present|current|now|ongoing)/i.test(clean)) {
    const now = new Date();
    return (now.getFullYear() + 1) * 100 + (now.getMonth() + 1);
  }

  let year = 0;
  let month = isEndToken ? 12 : 1;

  // Match 4-digit year (1990-2099)
  const yearMatch = clean.match(/\b(19\d{2}|20\d{2})\b/);
  if (yearMatch) {
    year = parseInt(yearMatch[1], 10);
  }

  // Match named month ("Jan", "January", etc.) in either "Month Year" or "Year Month"
  for (const [name, num] of Object.entries(MONTH_MAP)) {
    const regex = new RegExp(`\\b${name}\\b`, "i");
    if (regex.test(clean)) {
      month = num;
      break;
    }
  }

  // Match numeric month/year ("03/2024", "3/2024") or year-month ("2024-03", "2024/03")
  const slashOrDash = clean.match(/\b(\d{1,2})[\/\-](19\d{2}|20\d{2})\b/);
  if (slashOrDash) {
    const m = parseInt(slashOrDash[1], 10);
    if (m >= 1 && m <= 12) month = m;
    year = parseInt(slashOrDash[2], 10);
  } else {
    const isoMatch = clean.match(/\b(19\d{2}|20\d{2})[\/\-](\d{1,2})\b/);
    if (isoMatch) {
      year = parseInt(isoMatch[1], 10);
      const m = parseInt(isoMatch[2], 10);
      if (m >= 1 && m <= 12) month = m;
    }
  }

  return year * 100 + month;
}

/**
 * Computes a composite sort key [endScore, startScore] from a period string like
 * "Jan 2024 - Present", "2022 - 2024", "May 2021 - Dec 2022", or "2023 May - 2024 Aug".
 */
function getPeriodSortScore(period?: string): { endScore: number; startScore: number } {
  if (!period) return { endScore: 0, startScore: 0 };
  const parts = period.split(/\s*(?:–|—|-|to)\s*/i);
  const startPart = parts[0] || "";
  const endPart = parts.length > 1 ? parts[parts.length - 1] : startPart;

  const startScore = parseDateTokenScore(startPart, false);
  const endScore = parseDateTokenScore(endPart, true);

  return { endScore, startScore };
}

export function sortExperiencesByPeriod(list: Experience[]): Experience[] {
  return [...list]
    .sort((a, b) => {
      const scoreA = getPeriodSortScore(a.period);
      const scoreB = getPeriodSortScore(b.period);
      if (scoreB.endScore !== scoreA.endScore) {
        return scoreB.endScore - scoreA.endScore;
      }
      return scoreB.startScore - scoreA.startScore;
    })
    .map((exp, idx) => ({
      ...exp,
      order: idx + 1,
    }));
}

const createEmptyExperience = (order: number): Experience => ({
  id: `exp-${Date.now()}`,
  role: "",
  company: "",
  type: "Full-Time Remote",
  period: "",
  location: "",
  statsBadge: "",
  summary: "",
  bullets: [],
  skills: [],
  order,
});

export function ExperienceTab({
  experiences,
  onUpdateExperience,
  onAddExperience,
  onRemoveExperience,
  onReorderExperiences,
  onSaveAll,
  isSaving = false,
}: ExperienceTabProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<Experience>(() =>
    createEmptyExperience(experiences.length + 1)
  );

  const handleOpenCreatePage = () => {
    setDraft(createEmptyExperience(experiences.length + 1));
    setEditingIndex(null);
    setIsCreating(true);
  };

    const handleSaveNew = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!draft.company.trim() || !draft.role.trim()) return;
      const created: Experience = {
        ...draft,
        id: `exp-${Date.now()}`,
        order: experiences.length + 1,
      };
      if (onReorderExperiences) {
        const autoSorted = sortExperiencesByPeriod([...experiences, created]);
        await onReorderExperiences(autoSorted, true);
      } else {
        await onAddExperience(created);
      }
      setIsCreating(false);
    };

      const handleSaveEdit = async () => {
        if (onSaveAll) {
          await onSaveAll();
        }
        setEditingIndex(null);
      };

      const handleAutoSortByDate = async () => {
        if (!onReorderExperiences) return;
        const sorted = sortExperiencesByPeriod(experiences);
        await onReorderExperiences(sorted, true);
      };

        const handleMoveItem = async (fromIdx: number, toIdx: number) => {
          if (!onReorderExperiences) return;
          if (toIdx < 0 || toIdx >= experiences.length || fromIdx === toIdx) return;
          const updated = [...experiences];
          const [moved] = updated.splice(fromIdx, 1);
          updated.splice(toIdx, 0, moved);
          await onReorderExperiences(updated, true);
        };

        const handleDragStart = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
          setDraggedIndex(idx);
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", String(idx));
        };

        const handleDragOver = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          if (dragOverIndex !== idx) {
            setDragOverIndex(idx);
          }
        };

        const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIdx: number) => {
          e.preventDefault();
          const fromIdx = draggedIndex !== null ? draggedIndex : Number(e.dataTransfer.getData("text/plain"));
          setDraggedIndex(null);
          setDragOverIndex(null);
          if (!Number.isNaN(fromIdx) && fromIdx !== dropIdx) {
            handleMoveItem(fromIdx, dropIdx);
          }
        };

        const handleDragEnd = () => {
          setDraggedIndex(null);
          setDragOverIndex(null);
        };

        // 1. Add New Page
        if (isCreating) {
          return (
            <div className="py-8 space-y-6 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
                    title="Back to Work Experience list"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="text-[11px] font-mono text-emerald-400">
                      Work Experience / Add New Record
                    </div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                      <span>Add New Work Experience</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={draft.company}
                      onChange={(e) => setDraft({ ...draft, company: e.target.value })}
                      placeholder="e.g. Saudi Arabia Railways (SAR)"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-semibold"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] text-zinc-400">Job Title / Role *</label>
                    <input
                      type="text"
                      required
                      value={draft.role}
                      onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                      placeholder="e.g. Senior Android Engineer"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400">Tenure / Period</label>
                    <input
                      type="text"
                      value={draft.period}
                      onChange={(e) => setDraft({ ...draft, period: e.target.value })}
                      placeholder="e.g. 2024 - Present"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400">Location</label>
                    <input
                      type="text"
                      value={draft.location ?? ""}
                      onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                      placeholder="e.g. Riyadh, Saudi Arabia (Remote)"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400">Employment Type</label>
                    <input
                      type="text"
                      value={draft.type}
                      onChange={(e) => setDraft({ ...draft, type: e.target.value })}
                      placeholder="Full-Time Remote, Contract..."
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-3">
                    <label className="text-[11px] text-zinc-400">Highlight Stats Badge (Optional)</label>
                    <input
                      type="text"
                      value={draft.statsBadge ?? ""}
                      onChange={(e) => setDraft({ ...draft, statsBadge: e.target.value })}
                      placeholder="e.g. 99.99% Crash-Free • Hajj Platform"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 font-bold focus:border-emerald-500 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Role Summary</label>
                  <textarea
                    rows={3}
                    value={draft.summary}
                    onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                    placeholder="Concise overview of engineering scope and impact in this role..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                  />
                </div>

                <ItemListInput
                  label="Key Responsibilities & Deliverable Bullets"
                  items={draft.bullets ?? []}
                  onChange={(updated) => setDraft({ ...draft, bullets: updated })}
                  placeholder="Type a bullet point and click Add..."
                />

                <ItemListInput
                  label="Technologies Used in this Role"
                  items={draft.skills ?? []}
                  onChange={(updated) => setDraft({ ...draft, skills: updated })}
                  placeholder="Type a technology (e.g. Kotlin) and click Add..."
                />

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
                    <span>{isSaving ? "Saving..." : "Save Experience"}</span>
                  </button>
                </div>
              </form>
            </div>
          );
        }

        // 2. Edit Selected Experience Page
        if (editingIndex !== null && experiences[editingIndex]) {
          const idx = editingIndex;
          const exp = experiences[idx];

          return (
            <div className="py-8 space-y-6 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingIndex(null)}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
                    title="Back to Work Experience list"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="text-[11px] font-mono text-emerald-400">
                      Work Experience / Edit Experience #{idx + 1}
                    </div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                      <span>{exp.role || "Role"} — {exp.company || "Company"}</span>
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onRemoveExperience(idx);
                      setEditingIndex(null);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-400 text-xs font-semibold transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={handleSaveEdit}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? "Saving..." : "Save Experience"}</span>
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    rows={3}
                    value={exp.summary}
                    onChange={(e) => onUpdateExperience(idx, "summary", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                  />
                </div>

                <ItemListInput
                  label="Key Responsibilities & Deliverable Bullets"
                  items={exp.bullets ?? []}
                  onChange={(updated) => onUpdateExperience(idx, "bullets", updated)}
                  placeholder="e.g. Architected offline database reducing sync latency by 40%"
                />

                <ItemListInput
                  label="Technologies Used in this Role"
                  items={exp.skills ?? []}
                  onChange={(updated) => onUpdateExperience(idx, "skills", updated)}
                  placeholder="e.g. Kotlin"
                />

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(null)}
                      className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handleSaveEdit}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition disabled:opacity-50 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSaving ? "Saving..." : "Save Experience"}</span>
                    </button>
                  </div>
                </div>
              </div>
              );
  }

              // 3. Minimal List View
              return (
              <div className="py-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                      <span>Work Experience ({experiences.length})</span>
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Drag and drop rows to reorder manually, or auto-sort by Year &amp; Month.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {onReorderExperiences && experiences.length > 1 && (
                      <button
                        type="button"
                        onClick={handleAutoSortByDate}
                        className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-emerald-400 border border-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        title="Automatically sort experiences from latest to oldest based on Year & Month"
                      >
                        <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Auto-Sort by Date</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleOpenCreatePage}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Experience</span>
                    </button>
                  </div>
                </div>

                {experiences.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 text-center text-xs text-zinc-500">
                    No work experience entries found. Click &ldquo;Add Experience&rdquo; to create one.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {experiences.map((exp, idx) => {
                      const isDragging = draggedIndex === idx;
                      const isDragOver = dragOverIndex === idx && draggedIndex !== idx;

                      return (
                        <div
                          key={exp.id || idx}
                          draggable={Boolean(onReorderExperiences)}
                          onDragStart={(e) => handleDragStart(e, idx)}
                          onDragOver={(e) => handleDragOver(e, idx)}
                          onDrop={(e) => handleDrop(e, idx)}
                          onDragEnd={handleDragEnd}
                          onClick={() => setEditingIndex(idx)}
                          className={`group p-4 rounded-xl border transition flex flex-wrap items-center justify-between gap-4 cursor-pointer ${isDragging
                              ? "opacity-50 bg-zinc-900 border-emerald-500/60"
                              : isDragOver
                                ? "bg-emerald-950/30 border-emerald-500 shadow-lg shadow-emerald-500/10"
                                : "bg-zinc-900/40 hover:bg-zinc-900/80 border-zinc-800/90 hover:border-emerald-500/40"
                            }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {onReorderExperiences && (
                              <div
                                className="p-1 text-zinc-500 group-hover:text-zinc-300 cursor-grab active:cursor-grabbing shrink-0"
                                title="Drag to reorder"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <GripVertical className="w-4 h-4" />
                              </div>
                            )}

                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                              #{idx + 1}
                            </div>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-bold text-white truncate">
                                  {exp.role || "Untitled Role"}
                                </span>
                                <span className="text-xs text-emerald-400 font-semibold">
                                  @ {exp.company || "Unnamed Company"}
                                </span>
                                {exp.type && (
                                  <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[10px] font-mono">
                                    {exp.type}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 mt-1 font-mono">
                                {exp.period && (
                                  <span className="inline-flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-zinc-500" />
                                    {exp.period}
                                  </span>
                                )}
                                {exp.location && (
                                  <span className="inline-flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-zinc-500" />
                                    {exp.location}
                                  </span>
                                )}
                                <span>{(exp.bullets ?? []).length} bullets</span>
                                <span>•</span>
                                <span>{(exp.skills ?? []).length} skills</span>
                              </div>
                            </div>
                          </div>

                          <div
                            className="flex items-center gap-1.5 shrink-0"
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
                              onClick={() => onRemoveExperience(idx)}
                              className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition cursor-pointer"
                              title="Delete Experience"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              );
}

