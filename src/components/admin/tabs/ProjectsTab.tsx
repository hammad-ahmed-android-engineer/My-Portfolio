"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  Plus,
  Trash2,
  Cpu,
  BarChart2,
  ArrowLeft,
  Save,
  Pencil,
  Building2,
} from "lucide-react";
import { Project, ProjectMetric } from "@/types/portfolio";
import { ItemListInput } from "../common/ItemListInput";

interface ProjectsTabProps {
  projects: Project[];
  onUpdateProject: <K extends keyof Project>(index: number, field: K, value: Project[K]) => void;
  onUpdateArchitecture: (index: number, field: string, value: string | string[]) => void;
  onAddProject: (newProj?: Project) => Promise<boolean> | void;
  onRemoveProject: (index: number) => void;
  onSaveAll?: () => Promise<void> | void;
  isSaving?: boolean;
}

const createEmptyProject = (order: number): Project => ({
  id: `proj-${Date.now()}`,
  title: "",
  subtitle: "",
  clientOrCompany: "",
  role: "Senior Android Engineer",
  category: "Enterprise",
  image: "",
  impactHighlight: "",
  summary: "",
  techStack: [],
  features: [],
  architectureDetails: {
    pattern: "Clean Architecture + MVVM",
    offlineStrategy: "Room Database + Kotlin Flow",
    highlights: [],
  },
  metrics: [],
  playStoreUrl: "",
  githubUrl: "",
  featured: true,
  order,
});

export function ProjectsTab({
  projects,
  onUpdateProject,
  onUpdateArchitecture,
  onAddProject,
  onRemoveProject,
  onSaveAll,
  isSaving = false,
}: ProjectsTabProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<Project>(() =>
    createEmptyProject(projects.length + 1)
  );

  const handleOpenCreatePage = () => {
    setDraft(createEmptyProject(projects.length + 1));
    setEditingIndex(null);
    setIsCreating(true);
  };

    const handleSaveNew = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!draft.title.trim()) return;
        await onAddProject({
          ...draft,
          id: `proj-${Date.now()}`,
          order: projects.length + 1,
        });
        setIsCreating(false);
      };

      const handleSaveEdit = async () => {
        if (onSaveAll) {
          await onSaveAll();
        }
        setEditingIndex(null);
      };

      const handleAddDraftMetric = () => {
        const current = draft.metrics ?? [];
        setDraft({
          ...draft,
          metrics: [...current, { label: "Metric", value: "100%" }],
        });
      };

      const handleUpdateDraftMetric = (
        mIdx: number,
        field: "label" | "value",
        val: string
      ) => {
        const current = [...(draft.metrics ?? [])];
        current[mIdx] = { ...current[mIdx], [field]: val };
        setDraft({ ...draft, metrics: current });
      };

      const handleRemoveDraftMetric = (mIdx: number) => {
        setDraft({
          ...draft,
          metrics: (draft.metrics ?? []).filter((_, i) => i !== mIdx),
        });
      };

      const handleAddProjectMetric = (projIdx: number) => {
        const currentMetrics = projects[projIdx].metrics ?? [];
        const newMetric: ProjectMetric = { label: "Metric", value: "100%" };
        onUpdateProject(projIdx, "metrics", [...currentMetrics, newMetric]);
      };

      const handleUpdateProjectMetric = (
        projIdx: number,
        metricIdx: number,
        field: "label" | "value",
        val: string
      ) => {
        const currentMetrics = [...(projects[projIdx].metrics ?? [])];
        currentMetrics[metricIdx] = {
          ...currentMetrics[metricIdx],
          [field]: val,
        };
        onUpdateProject(projIdx, "metrics", currentMetrics);
      };

      const handleRemoveProjectMetric = (projIdx: number, metricIdx: number) => {
        const currentMetrics = (projects[projIdx].metrics ?? []).filter((_, i) => i !== metricIdx);
        onUpdateProject(projIdx, "metrics", currentMetrics);
      };

      // 1. Add New Project Page
      if (isCreating) {
        return (
          <div className="py-8 space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
                  title="Back to Showcase Projects list"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="text-[11px] font-mono text-emerald-400">
                    Showcase Projects / Add New Project
                  </div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-emerald-400" />
                    <span>Add New Showcase Project</span>
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
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] text-zinc-400">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    placeholder="e.g. SAR Hajj & Candidate Management"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Category</label>
                  <input
                    type="text"
                    value={draft.category}
                    onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                    placeholder="Enterprise, SaaS, Utilities..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Client / Company</label>
                  <input
                    type="text"
                    value={draft.clientOrCompany}
                    onChange={(e) => setDraft({ ...draft, clientOrCompany: e.target.value })}
                    placeholder="e.g. Saudi Arabia Railways"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Engineer Role</label>
                  <input
                    type="text"
                    value={draft.role}
                    onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                    placeholder="Senior Android Engineer"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Impact Highlight</label>
                  <input
                    type="text"
                    value={draft.impactHighlight}
                    onChange={(e) => setDraft({ ...draft, impactHighlight: e.target.value })}
                    placeholder="e.g. 99.99% Crash-Free"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 font-bold focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Cover Image Filename (in /public)</label>
                  <input
                    type="text"
                    value={draft.image}
                    onChange={(e) => setDraft({ ...draft, image: e.target.value })}
                    placeholder="toolbox.jpg, saas-apps.jpg..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Play Store URL</label>
                  <input
                    type="url"
                    value={draft.playStoreUrl ?? ""}
                    onChange={(e) => setDraft({ ...draft, playStoreUrl: e.target.value })}
                    placeholder="https://play.google.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={draft.githubUrl ?? ""}
                    onChange={(e) => setDraft({ ...draft, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Summary</label>
                <textarea
                  rows={3}
                  value={draft.summary}
                  onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                  placeholder="Overview of the application architecture and business impact..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                />
              </div>

              <ItemListInput
                label="Tech Stack Technologies"
                items={draft.techStack ?? []}
                onChange={(updated) => setDraft({ ...draft, techStack: updated })}
                placeholder="Type a technology (e.g. Kotlin) and click Add..."
              />

              <ItemListInput
                label="Key Features & Capabilities"
                items={draft.features ?? []}
                onChange={(updated) => setDraft({ ...draft, features: updated })}
                placeholder="Type a feature and click Add..."
              />

              {/* Architecture Details Box */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-3">
                <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Architecture &amp; Offline Specifications</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400">Architectural Pattern</label>
                    <input
                      type="text"
                      value={draft.architectureDetails?.pattern ?? ""}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          architectureDetails: {
                            ...draft.architectureDetails,
                            pattern: e.target.value,
                          },
                        })
                      }
                      placeholder="Clean Architecture + MVI"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400">Offline Strategy</label>
                    <input
                      type="text"
                      value={draft.architectureDetails?.offlineStrategy ?? ""}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          architectureDetails: {
                            ...draft.architectureDetails,
                            offlineStrategy: e.target.value,
                          },
                        })
                      }
                      placeholder="Room Database + Kotlin Flow"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <ItemListInput
                  label="Architecture Highlights"
                  items={draft.architectureDetails?.highlights ?? []}
                  onChange={(updated) =>
                    setDraft({
                      ...draft,
                      architectureDetails: {
                        ...draft.architectureDetails,
                        highlights: updated,
                      },
                    })
                  }
                  placeholder="Type an architectural highlight and click Add..."
                />
              </div>

              {/* Project Metrics */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Project Outcome Metrics</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddDraftMetric}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] text-emerald-400 font-semibold transition cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Metric</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(draft.metrics ?? []).map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900 border border-zinc-800"
                    >
                      <input
                        type="text"
                        value={m.label}
                        onChange={(e) => handleUpdateDraftMetric(mIdx, "label", e.target.value)}
                        placeholder="Label (e.g. Crash-Free)"
                        className="flex-1 px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 outline-none"
                      />
                      <input
                        type="text"
                        value={m.value}
                        onChange={(e) => handleUpdateDraftMetric(mIdx, "value", e.target.value)}
                        placeholder="Value (e.g. 99.99%)"
                        className="w-24 px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 font-bold outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveDraftMetric(mIdx)}
                        className="text-zinc-500 hover:text-red-400 transition cursor-pointer"
                        title="Remove metric"
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
                  <span>{isSaving ? "Saving..." : "Save Project"}</span>
                </button>
              </div>
            </form>
          </div>
        );
      }

      // 2. Edit Selected Project Page
      if (editingIndex !== null && projects[editingIndex]) {
        const idx = editingIndex;
        const proj = projects[idx];

        return (
          <div className="py-8 space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingIndex(null)}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
                  title="Back to Showcase Projects list"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="text-[11px] font-mono text-emerald-400">
                    Showcase Projects / Edit Project #{idx + 1}
                  </div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-emerald-400" />
                    <span>{proj.title || "Untitled Project"}</span>
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onRemoveProject(idx);
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
                  <span>{isSaving ? "Saving..." : "Save Project"}</span>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] text-zinc-400">Title</label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => onUpdateProject(idx, "title", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Category</label>
                  <input
                    type="text"
                    value={proj.category}
                    onChange={(e) => onUpdateProject(idx, "category", e.target.value)}
                    placeholder="Enterprise, SaaS, Utilities..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Client / Company</label>
                  <input
                    type="text"
                    value={proj.clientOrCompany}
                    onChange={(e) => onUpdateProject(idx, "clientOrCompany", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Engineer Role</label>
                  <input
                    type="text"
                    value={proj.role}
                    onChange={(e) => onUpdateProject(idx, "role", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Impact Highlight</label>
                  <input
                    type="text"
                    value={proj.impactHighlight}
                    onChange={(e) => onUpdateProject(idx, "impactHighlight", e.target.value)}
                    placeholder="e.g. 99.99% Crash-Free"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 font-bold focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Cover Image Filename (in /public)</label>
                  <input
                    type="text"
                    value={proj.image}
                    onChange={(e) => onUpdateProject(idx, "image", e.target.value)}
                    placeholder="toolbox.jpg, saas-apps.jpg..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Play Store URL</label>
                  <input
                    type="url"
                    value={proj.playStoreUrl ?? ""}
                    onChange={(e) => onUpdateProject(idx, "playStoreUrl", e.target.value)}
                    placeholder="https://play.google.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={proj.githubUrl ?? ""}
                    onChange={(e) => onUpdateProject(idx, "githubUrl", e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Summary</label>
                <textarea
                  rows={3}
                  value={proj.summary}
                  onChange={(e) => onUpdateProject(idx, "summary", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                />
              </div>

              <ItemListInput
                label="Tech Stack Technologies"
                items={proj.techStack ?? []}
                onChange={(updated) => onUpdateProject(idx, "techStack", updated)}
                placeholder="e.g. Kotlin"
              />

              <ItemListInput
                label="Key Features & Capabilities"
                items={proj.features ?? []}
                onChange={(updated) => onUpdateProject(idx, "features", updated)}
                placeholder="e.g. Offline-first synchronization"
              />

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-3">
                <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Architecture &amp; Offline Specifications</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400">Architectural Pattern</label>
                    <input
                      type="text"
                      value={proj.architectureDetails?.pattern ?? ""}
                      onChange={(e) => onUpdateArchitecture(idx, "pattern", e.target.value)}
                      placeholder="Clean Architecture + MVI"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400">Offline Strategy</label>
                    <input
                      type="text"
                      value={proj.architectureDetails?.offlineStrategy ?? ""}
                      onChange={(e) => onUpdateArchitecture(idx, "offlineStrategy", e.target.value)}
                      placeholder="Room Database + Kotlin Flow"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <ItemListInput
                  label="Architecture Highlights"
                  items={proj.architectureDetails?.highlights ?? []}
                  onChange={(updated) => onUpdateArchitecture(idx, "highlights", updated)}
                  placeholder="e.g. Multi-module gradle structure"
                />
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Project Outcome Metrics</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleAddProjectMetric(idx)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] text-emerald-400 font-semibold transition cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Metric</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(proj.metrics ?? []).map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900 border border-zinc-800"
                    >
                      <input
                        type="text"
                        value={m.label}
                        onChange={(e) => handleUpdateProjectMetric(idx, mIdx, "label", e.target.value)}
                        placeholder="Label (e.g. Crash-Free)"
                        className="flex-1 px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 outline-none"
                      />
                      <input
                        type="text"
                        value={m.value}
                        onChange={(e) => handleUpdateProjectMetric(idx, mIdx, "value", e.target.value)}
                        placeholder="Value (e.g. 99.99%)"
                        className="w-24 px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 font-bold outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveProjectMetric(idx, mIdx)}
                        className="text-zinc-500 hover:text-red-400 transition cursor-pointer"
                        title="Remove metric"
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
                    type="button"
                    disabled={isSaving}
                    onClick={handleSaveEdit}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? "Saving..." : "Save Project"}</span>
                  </button>
                </div>
              </div>
            </div>
            );
  }

            // 3. Minimal List View
            return (
            <div className="py-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-emerald-400" />
                    <span>Showcase Projects ({projects.length})</span>
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Select any project to view or edit its details, or add a new project.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenCreatePage}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 text-center text-xs text-zinc-500">
                  No projects found. Click &ldquo;Add Project&rdquo; to create one.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {projects.map((proj, idx) => (
                    <div
                      key={proj.id || idx}
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
                              {proj.title || "Untitled Project"}
                            </span>
                            {proj.category && (
                              <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[10px] font-mono">
                                {proj.category}
                              </span>
                            )}
                            {proj.impactHighlight && (
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold">
                                {proj.impactHighlight}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 mt-1 font-mono">
                            {proj.clientOrCompany && (
                              <span className="inline-flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-zinc-500" />
                                {proj.clientOrCompany}
                              </span>
                            )}
                            {proj.role && <span>• {proj.role}</span>}
                            <span>• {(proj.techStack ?? []).length} technologies</span>
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
                          onClick={() => onRemoveProject(idx)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition cursor-pointer"
                          title="Delete Project"
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

