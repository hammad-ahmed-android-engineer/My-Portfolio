"use client";

import React from "react";
import { Layers, Plus, Trash2, Star } from "lucide-react";
import { SkillCategory, SkillItem } from "@/types/portfolio";

interface SkillsTabProps {
  skills: SkillCategory[];
  onUpdateSkills: (updated: SkillCategory[]) => void;
  onRequestDelete?: (title: string, message: string, onConfirm: () => void) => void;
}

export function SkillsTab({ skills, onUpdateSkills, onRequestDelete }: SkillsTabProps) {
  const handleAddCategory = () => {
    const newCategory: SkillCategory = {
      category: "New Skill Domain",
      description: "Core technical capabilities and toolkits",
      iconName: "Code2",
      skills: [{ name: "New Skill", level: 90, highlight: false }],
      order: skills.length + 1,
    };
    onUpdateSkills([...skills, newCategory]);
  };

  const handleRemoveCategory = (cIdx: number) => {
    const catName = skills[cIdx]?.category || `Category #${cIdx + 1}`;
    const doDelete = () => onUpdateSkills(skills.filter((_, idx) => idx !== cIdx));
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

  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Skill Categories &amp; Competencies ({skills.length})</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Define technical domains, competencies, proficiencies, and highlighted skills.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddCategory}
          className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Skill Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((cat, cIdx) => (
          <div
            key={cIdx}
            className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4"
          >
            {/* Category header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="text-xs font-mono font-bold text-emerald-400">
                Category #{cIdx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveCategory(cIdx)}
                className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition cursor-pointer"
                title="Delete Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Category Name</label>
                <input
                  type="text"
                  value={cat.category}
                  onChange={(e) => handleUpdateCategoryField(cIdx, "category", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 font-bold focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Lucide Icon Name</label>
                <input
                  type="text"
                  value={cat.iconName}
                  onChange={(e) => handleUpdateCategoryField(cIdx, "iconName", e.target.value)}
                  placeholder="Code2, Layers, Database..."
                  className="w-full px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 outline-none font-mono"
                />
              </div>
            </div>

            {/* Skills list */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-zinc-400">
                  Skills ({cat.skills.length})
                </label>
                <button
                  type="button"
                  onClick={() => handleAddSkillToCategory(cIdx)}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] text-emerald-400 font-semibold transition"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="space-y-1.5">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center gap-2 p-2 rounded-xl bg-zinc-950 border border-zinc-800"
                  >
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleUpdateSkill(cIdx, sIdx, "name", e.target.value)}
                      placeholder="Skill name"
                      className="flex-1 px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 outline-none"
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
                      className={`p-1.5 rounded-lg transition ${skill.highlight
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
                      className="text-zinc-500 hover:text-red-400 transition"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

