"use client";

import React from "react";
import { FolderGit2, Plus, Trash2, Cpu, BarChart2 } from "lucide-react";
import { Project, ProjectMetric } from "@/types/portfolio";
import { ItemListInput } from "../common/ItemListInput";

interface ProjectsTabProps {
  projects: Project[];
  onUpdateProject: <K extends keyof Project>(index: number, field: K, value: Project[K]) => void;
  onUpdateArchitecture: (index: number, field: string, value: string | string[]) => void;
  onAddProject: () => void;
  onRemoveProject: (index: number) => void;
}

export function ProjectsTab({
  projects,
  onUpdateProject,
  onUpdateArchitecture,
  onAddProject,
  onRemoveProject,
}: ProjectsTabProps) {
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

  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-emerald-400" />
            <span>Showcase Projects ({projects.length})</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Native applications, enterprise systems, and Play Store releases.
          </p>
        </div>
        <button
          type="button"
          onClick={onAddProject}
          className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((proj, idx) => (
          <div
            key={proj.id || idx}
            className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4"
          >
            {/* Header / Actions */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Project #{idx + 1} • {proj.title}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-zinc-800 text-zinc-300 font-mono">
                  {proj.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onRemoveProject(idx)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition cursor-pointer"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Core Fields */}
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
                rows={2}
                value={proj.summary}
                onChange={(e) => onUpdateProject(idx, "summary", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none resize-none"
              />
            </div>

            {/* Tech Stack Chips */}
            <ItemListInput
              label="Tech Stack Technologies"
              items={proj.techStack ?? []}
              onChange={(updated) => onUpdateProject(idx, "techStack", updated)}
              placeholder="e.g. Kotlin, Jetpack Compose, Room"
            />

            {/* Key Features Chips */}
            <ItemListInput
              label="Key Features & Capabilities"
              items={proj.features ?? []}
              onChange={(updated) => onUpdateProject(idx, "features", updated)}
              placeholder="e.g. Offline-first synchronization, WorkManager background sync"
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

            {/* Project Metrics */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Project Outcome Metrics</span>
                </h4>
                <button
                  type="button"
                  onClick={() => handleAddProjectMetric(idx)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] text-emerald-400 font-semibold transition"
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
                      className="text-zinc-500 hover:text-red-400 transition"
                      title="Remove metric"
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

