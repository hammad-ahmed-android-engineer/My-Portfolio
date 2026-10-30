"use client";

import React, { useState } from "react";
import { Layers, Plus, Trash2, Star, ArrowLeft, Save, Pencil } from "lucide-react";
import { SkillCategory, SkillItem } from "@/types/portfolio";

interface SkillsPageProps {
  skills: SkillCategory[];
  onUpdateSkills: (updated: SkillCategory[], autoPersist?: boolean) => Promise<boolean> | void;
  onRequestDelete?: (title: string, message: string, onConfirm: () => void) => void;
  onSaveAll?: () => Promise<boolean | void> | void;
  isSaving?: boolean;
}

const createEmptySkillCategory = (order: number): SkillCategory => ({
  category: "",
  description: "",
  iconName: "Code2",
  skills: [{ name: "", level: 90, highlight: false }],
  order,
});

  export function SkillsPage({
    skills,
    onUpdateSkills,
    onRequestDelete,
    onSaveAll,
    isSaving = false,
  }: SkillsPageProps) {
    const [isCreating, setIsCreating] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [draft, setDraft] = useState<SkillCategory>(() =>
      createEmptySkillCategory(skills.length + 1)
    );

    const handleOpenCreatePage = () => {
      setDraft(createEmptySkillCategory(skills.length + 1));
      setEditingIndex(null);
      setIsCreating(true);
    };

    const handleSaveNew = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!draft.category.trim() || !(draft.description ?? "").trim()) return;
      const cleanedSkills = draft.skills.filter((s) => s.name.trim().length > 0);
      if (cleanedSkills.length === 0) return;
      const saved = await onUpdateSkills(
        [
          ...skills,
          {
            ...draft,
            skills: cleanedSkills,
            order: skills.length + 1,
          },
        ],
        true
      );
      if (saved !== false) {
        setIsCreating(false);
      }
    };

    const handleSaveEdit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (editingIndex !== null && skills[editingIndex]) {
        const current = skills[editingIndex];
        if (!current.category.trim() || !(current.description ?? "").trim()) {
          return;
        }
        const hasEmptySkill = current.skills.some((s) => !s.name.trim());
        if (hasEmptySkill) {
          return;
        }
      }
      if (onSaveAll) {
        const saved = await onSaveAll();
        if (saved === false) return;
      }
      setEditingIndex(null);
    };

    const handleAddDraftSkill = () => {
      setDraft({
        ...draft,
        skills: [...draft.skills, { name: "", level: 85, highlight: false }],
      });
    };

    const handleUpdateDraftSkill = <K extends keyof SkillItem>(
      sIdx: number,
      field: K,
      val: SkillItem[K]
    ) => {
      const updated = [...draft.skills];
      updated[sIdx] = { ...updated[sIdx], [field]: val };
      setDraft({ ...draft, skills: updated });
    };

    const handleRemoveDraftSkill = (sIdx: number) => {
      setDraft({
        ...draft,
        skills: draft.skills.filter((_, i) => i !== sIdx),
      });
    };

    const handleRemoveCategory = (cIdx: number) => {
      const catName = skills[cIdx]?.category || `Category #${cIdx + 1}`;
      const doDelete = async () => {
        await onUpdateSkills(skills.filter((_, idx) => idx !== cIdx), true);
        if (editingIndex === cIdx) {
          setEditingIndex(null);
        }
      };
      if (onRequestDelete) {
        onRequestDelete(
          "Delete Skill Category?",
          `Are you sure you want to delete the skill category "${catName}" and all ${skills[cIdx]?.skills.length || 0} skills inside it?`,
          doDelete
        );
      } else {
        doDelete();
      }
    };

    const handleUpdateCategoryField = <K extends keyof SkillCategory>(
      cIdx: number,
      field: K,
      val: SkillCategory[K]
    ) => {
      const updated = [...skills];
      updated[cIdx] = { ...updated[cIdx], [field]: val };
      onUpdateSkills(updated);
    };

    const handleAddSkillToCategory = (cIdx: number) => {
      const updated = [...skills];
      const newSkill: SkillItem = {
        name: "New Skill",
        level: 85,
        highlight: false,
      };
      updated[cIdx].skills = [...updated[cIdx].skills, newSkill];
      onUpdateSkills(updated);
    };

    const handleUpdateSkill = <K extends keyof SkillItem>(
      cIdx: number,
      sIdx: number,
      field: K,
      val: SkillItem[K]
    ) => {
      const updated = [...skills];
      const categorySkills = [...updated[cIdx].skills];
      categorySkills[sIdx] = { ...categorySkills[sIdx], [field]: val };
      updated[cIdx].skills = categorySkills;
      onUpdateSkills(updated);
    };

    const handleRemoveSkill = (cIdx: number, sIdx: number) => {
      const skillObj = skills[cIdx]?.skills[sIdx];
      const skillName = typeof skillObj === "string" ? skillObj : skillObj?.name || "this skill";
      const doDelete = () => {
        const updated = [...skills];
        updated[cIdx].skills = updated[cIdx].skills.filter((_, idx) => idx !== sIdx);
        onUpdateSkills(updated);
      };
      if (onRequestDelete) {
        onRequestDelete(
          "Delete Skill?",
          `Are you sure you want to delete "${skillName}" from ${skills[cIdx]?.category}?`,
          doDelete
        );
      } else {
        doDelete();
      }
    };

    if (isCreating) {
      return (
        <div className="py-8 space-y-6 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
                title="Back to Skill Categories list"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="text-[11px] font-mono text-emerald-400">
                  Skills &amp; Stack / Add New Skill Category
                </div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Add New Skill Category</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Category Name *</label>
                <input
                  type="text"
                  required
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  placeholder="e.g. Android Architecture & Jetpack"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 font-bold focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Lucide Icon Name</label>
                <input
                  type="text"
                  value={draft.iconName}
                  onChange={(e) => setDraft({ ...draft, iconName: e.target.value })}
                  placeholder="Code2, Layers, Database..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Category Description *</label>
              <textarea
                rows={2}
                required
                value={draft.description ?? ""}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                placeholder="Brief summary of this skill domain..."
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-zinc-400">
                  Skills in Category ({draft.skills.length}) *
                </label>
                <button
                  type="button"
                  onClick={handleAddDraftSkill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] text-emerald-400 font-semibold transition cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Skill Row</span>
                </button>
              </div>

              <div className="space-y-2">
                {draft.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800"
                  >
                    <input
                      type="text"
                      required
                      value={skill.name}
                      onChange={(e) => handleUpdateDraftSkill(sIdx, "name", e.target.value)}
                      placeholder="Skill name * (e.g. Jetpack Compose)"
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 outline-none"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={skill.level}
                        onChange={(e) =>
                          handleUpdateDraftSkill(sIdx, "level", Number(e.target.value))
                        }
                        className="w-14 px-1.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-center text-zinc-200 outline-none font-mono"
                      />
                      <span className="text-[10px] text-zinc-500 font-mono">%</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleUpdateDraftSkill(sIdx, "highlight", !skill.highlight)}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${skill.highlight
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        : "bg-zinc-900 border-zinc-800 text-zinc-600 hover:text-zinc-400"
                        }`}
                      title="Highlight skill"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveDraftSkill(sIdx)}
                      className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 transition cursor-pointer"
                      title="Remove skill row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
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
                <span>{isSaving ? "Saving..." : "Save Skill Category"}</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 2. Edit Selected Skill Category Page
    if (editingIndex !== null && skills[editingIndex]) {
      const cIdx = editingIndex;
      const cat = skills[cIdx];

      return (
        <form onSubmit={handleSaveEdit} className="py-8 space-y-6 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setEditingIndex(null)}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
                title="Back to Skill Categories list"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="text-[11px] font-mono text-emerald-400">
                  Skills &amp; Stack / Edit Category #{cIdx + 1}
                </div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>{cat.category || "Untitled Category"}</span>
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleRemoveCategory(cIdx)}
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
                <span>{isSaving ? "Saving..." : "Save Skill Category"}</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Category Name *</label>
                <input
                  type="text"
                  required
                  value={cat.category}
                  onChange={(e) => handleUpdateCategoryField(cIdx, "category", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 font-bold focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Lucide Icon Name</label>
                <input
                  type="text"
                  value={cat.iconName}
                  onChange={(e) => handleUpdateCategoryField(cIdx, "iconName", e.target.value)}
                  placeholder="Code2, Layers, Database..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Category Description *</label>
              <textarea
                rows={2}
                required
                value={cat.description ?? ""}
                onChange={(e) => handleUpdateCategoryField(cIdx, "description", e.target.value)}
                placeholder="Brief summary of this skill domain..."
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-zinc-400">
                  Skills ({cat.skills.length}) *
                </label>
                <button
                  type="button"
                  onClick={() => handleAddSkillToCategory(cIdx)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] text-emerald-400 font-semibold transition cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="space-y-2">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800"
                  >
                    <input
                      type="text"
                      required
                      value={skill.name}
                      onChange={(e) => handleUpdateSkill(cIdx, sIdx, "name", e.target.value)}
                      placeholder="Skill name *"
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 outline-none"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={skill.level}
                        onChange={(e) =>
                          handleUpdateSkill(cIdx, sIdx, "level", Number(e.target.value))
                        }
                        className="w-14 px-1.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-center text-zinc-200 outline-none font-mono"
                        title="Proficiency percentage"
                      />
                      <span className="text-[10px] text-zinc-500 font-mono">%</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleUpdateSkill(cIdx, sIdx, "highlight", !skill.highlight)}
                      className={`p-1.5 rounded-lg transition cursor-pointer ${skill.highlight
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        : "text-zinc-600 hover:text-zinc-400"
                        }`}
                      title={skill.highlight ? "Starred Skill" : "Star Skill"}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(cIdx, sIdx)}
                      className="text-zinc-500 hover:text-red-400 transition cursor-pointer"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
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
                <span>{isSaving ? "Saving..." : "Save Skill Category"}</span>
              </button>
            </div>
          </div>
        </form>
      );
    }

    return (
      <div className="py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Skill Categories &amp; Competencies ({skills.length})</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Select any category to view or edit its skills, or add a new skill category.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenCreatePage}
            className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skill Category</span>
          </button>
        </div>

        {skills.length === 0 ? (
          <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 text-center text-xs text-zinc-500">
            No skill categories configured. Click &ldquo;Add Skill Category&rdquo; to create one.
          </div>
        ) : (
          <div className="space-y-2.5">
            {skills.map((cat, cIdx) => (
              <div
                key={cIdx}
                onClick={() => setEditingIndex(cIdx)}
                className="group p-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/90 hover:border-emerald-500/40 transition flex flex-wrap items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    #{cIdx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-white truncate">
                        {cat.category || "Untitled Category"}
                      </span>
                      {cat.iconName && (
                        <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[10px] font-mono">
                          {cat.iconName}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-400 mt-1 font-mono">
                      <span>{cat.skills.length} skills</span>
                      <span>•</span>
                      <span className="truncate max-w-md text-zinc-500">
                        {cat.skills
                          .slice(0, 5)
                          .map((s) => s.name)
                          .join(", ")}
                        {cat.skills.length > 5 ? ` +${cat.skills.length - 5} more` : ""}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-2 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setEditingIndex(cIdx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-200 hover:text-emerald-400 transition cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(cIdx)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition cursor-pointer"
                    title="Delete Category"
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

