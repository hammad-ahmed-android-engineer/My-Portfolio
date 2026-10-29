"use client";

import React from "react";
import {
  Wrench,
  RotateCcw,
  ShieldCheck,
  Database,
  Key,
  Trash2,
  Briefcase,
  FolderGit2,
  Sparkles,
  Layers,
  GraduationCap,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

export type DeletableSectionKey =
  | "experiences"
  | "projects"
  | "services"
  | "skills"
  | "education"
  | "metrics";

interface SettingsTabProps {
  onReseed: () => void;
  onClearSection: (section: DeletableSectionKey, label: string) => void;
  onClearCache: () => void;
  onDeleteAllData: () => void;
  counts: {
    experiences: number;
    projects: number;
    services: number;
    skills: number;
    education: number;
    metrics: number;
  };
  isSaving: boolean;
}

export function SettingsTab({
  onReseed,
  onClearSection,
  onClearCache,
  onDeleteAllData,
  counts,
  isSaving,
}: SettingsTabProps) {
  const sectionDeleteControls: Array<{
    key: DeletableSectionKey;
    label: string;
    description: string;
    count: number;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
      {
        key: "experiences",
        label: "Work Experience Records",
        description: "Delete all career history and role entries from the portfolio.",
        count: counts.experiences,
        icon: Briefcase,
      },
      {
        key: "projects",
        label: "Showcase Projects",
        description: "Delete all flagship Android application projects and case studies.",
        count: counts.projects,
        icon: FolderGit2,
      },
      {
        key: "services",
        label: "Services Offered",
        description: "Delete all Android engineering service cards and deliverables.",
        count: counts.services,
        icon: Sparkles,
      },
      {
        key: "skills",
        label: "Skills & Tech Stack Categories",
        description: "Delete all technical competency categories and skill items.",
        count: counts.skills,
        icon: Layers,
      },
      {
        key: "education",
        label: "Academic Education Entries",
        description: "Delete all university degrees and academic credentials.",
        count: counts.education,
        icon: GraduationCap,
      },
      {
        key: "metrics",
        label: "Impact Metric Cards",
        description: "Delete all quantifiable production metric cards.",
        count: counts.metrics,
        icon: BarChart3,
      },
    ];

  return (
    <div className="py-8 space-y-6">
      {/* 1. Admin Panel System Status */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-6">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-emerald-400" />
            <span>Admin Panel Settings &amp; System Status</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Monitor database connectivity, authentication status, and manage portfolio data collections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Database className="w-4 h-4" />
              <span>Database Connection</span>
            </div>
            <div className="text-xs text-zinc-300">MongoDB Atlas Cluster</div>
            <div className="text-[10px] text-zinc-500 font-mono">Status: Active &amp; Synced</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Data Protection</span>
            </div>
            <div className="text-xs text-zinc-300">AES-256 Encrypted Payload</div>
            <div className="text-[10px] text-zinc-500 font-mono">NoSQL Sanitization Active</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
              <Key className="w-4 h-4" />
              <span>Admin Session</span>
            </div>
            <div className="text-xs text-zinc-300">HttpOnly SameSite Cookie</div>
            <div className="text-[10px] text-zinc-500 font-mono">Authenticated Admin Access</div>
          </div>
        </div>
      </div>

      {/* 2. Section-Level Data Deletion Controls */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-5">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-red-400" />
            <span>Delete Portfolio Section Data</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Selectively delete all items within a specific portfolio section. A confirmation dialog will appear before any data is removed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {sectionDeleteControls.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.key}
                className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/90 flex items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-zinc-100 truncate">
                      {section.label}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                      {section.count} items
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    {section.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onClearSection(section.key, section.label)}
                  disabled={isSaving || section.count === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 text-xs font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Delete</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Global Admin Panel Reset & Danger Zone */}
      <div className="p-6 rounded-2xl bg-red-950/10 border border-red-500/25 space-y-4">
        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>Admin Panel Reset &amp; Danger Zone</span>
        </div>

        <div className="divide-y divide-zinc-800/80">
          {/* Clear Local Cache */}
          <div className="py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-zinc-200">Clear Local Admin Browser Cache</h4>
              <p className="text-[11px] text-zinc-400">
                Delete locally cached portfolio snapshots stored in your browser&apos;s storage.
              </p>
            </div>
            <button
              type="button"
              onClick={onClearCache}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Clear Cache</span>
            </button>
          </div>

          {/* Reload from MongoDB */}
          <div className="py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-zinc-200">
                Discard Unsaved Edits &amp; Reload from Database
              </h4>
              <p className="text-[11px] text-zinc-400">
                Revert any unsaved changes in the admin panel and reload live data directly from MongoDB Atlas.
              </p>
            </div>
            <button
              type="button"
              onClick={onReseed}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Reload Database Data</span>
            </button>
          </div>

          {/* Delete All Portfolio Collections */}
          <div className="pt-3.5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-red-300">
                Delete All Portfolio Section Records
              </h4>
              <p className="text-[11px] text-zinc-400">
                Empty all experiences, projects, services, skills, education, and metric records at once.
              </p>
            </div>
            <button
              type="button"
              onClick={onDeleteAllData}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-600/20 transition disabled:opacity-50 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete All Section Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
