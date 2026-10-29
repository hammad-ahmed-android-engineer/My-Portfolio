"use client";

import React, { useState } from "react";
import { User, Plus, Trash2, FileText, Activity } from "lucide-react";
import { PersonalInfo } from "@/types/portfolio";

interface ProfileTabProps {
  personalInfo: PersonalInfo;
  coverLetterText?: string;
  onUpdateProfile: <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => void;
  onUpdateStat: (field: string, value: string) => void;
  onRemoveStat: (field: string) => void;
  onUpdateCoverLetter: (text: string) => void;
}

export function ProfileTab({
  personalInfo,
  coverLetterText = "",
  onUpdateProfile,
  onUpdateStat,
  onRemoveStat,
  onUpdateCoverLetter,
}: ProfileTabProps) {
  const [newStatKey, setNewStatKey] = useState("");
  const [newStatValue, setNewStatValue] = useState("");

  const handleAddCustomStat = () => {
    const key = newStatKey.trim();
    const val = newStatValue.trim();
    if (!key || !val) return;
    onUpdateStat(key, val);
    setNewStatKey("");
    setNewStatValue("");
  };

  const stats = personalInfo.stats ?? {};

  return (
    <div className="py-8 space-y-6">
      {/* 1. General Profile Info */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-400" />
          <span>General Profile Information</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Full Name</label>
            <input
              type="text"
              value={personalInfo.name}
              onChange={(e) => onUpdateProfile("name", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Professional Title</label>
            <input
              type="text"
              value={personalInfo.title}
              onChange={(e) => onUpdateProfile("title", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Email Address</label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => onUpdateProfile("email", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Phone Display</label>
            <input
              type="text"
              value={personalInfo.phoneDisplay}
              onChange={(e) => onUpdateProfile("phoneDisplay", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Location</label>
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => onUpdateProfile("location", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Availability Tag</label>
            <input
              type="text"
              value={personalInfo.availability}
              onChange={(e) => onUpdateProfile("availability", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs text-zinc-400">Current Academic Program</label>
            <input
              type="text"
              value={personalInfo.currentEducation}
              onChange={(e) => onUpdateProfile("currentEducation", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs text-zinc-400">Avatar Image URL (or path in /public)</label>
            <input
              type="text"
              value={personalInfo.avatarUrl ?? ""}
              onChange={(e) => onUpdateProfile("avatarUrl", e.target.value)}
              placeholder="/profilePic.jpg"
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-400">Tagline / Headline</label>
          <input
            type="text"
            value={personalInfo.tagline}
            onChange={(e) => onUpdateProfile("tagline", e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-400">Summary / Professional Bio</label>
          <textarea
            rows={3}
            value={personalInfo.summary}
            onChange={(e) => onUpdateProfile("summary", e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none resize-none"
          />
        </div>

        {/* Links & Documents */}
        <div className="pt-4 border-t border-zinc-800 space-y-4">
          <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            External Links &amp; Drive Documents
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-zinc-400">Resume / CV Drive Link</label>
              <input
                type="url"
                value={personalInfo.resumeDriveLink}
                onChange={(e) => onUpdateProfile("resumeDriveLink", e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-400">Cover Letter Drive Link (Optional)</label>
              <input
                type="url"
                value={personalInfo.coverLetterDriveLink ?? ""}
                onChange={(e) => onUpdateProfile("coverLetterDriveLink", e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-400">WhatsApp URL</label>
              <input
                type="url"
                value={personalInfo.whatsappUrl}
                onChange={(e) => onUpdateProfile("whatsappUrl", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-400">LinkedIn URL</label>
              <input
                type="url"
                value={personalInfo.linkedin}
                onChange={(e) => onUpdateProfile("linkedin", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs text-zinc-400">GitHub URL</label>
              <input
                type="url"
                value={personalInfo.github}
                onChange={(e) => onUpdateProfile("github", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Compacted Quantitative Engineering Metrics */}
        <div className="pt-4 border-t border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Quantitative Engineering Metrics (`personalInfo.stats`)</span>
              </h3>
              <p className="text-[11px] text-zinc-400">
                Atomic subdocument storing key engineering metrics without polluting root collections.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1 relative group">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-zinc-400 font-mono capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <button
                    type="button"
                    onClick={() => onRemoveStat(key)}
                    className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 transition"
                    title={`Delete ${key}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <input
                  type="text"
                  value={value ?? ""}
                  onChange={(e) => onUpdateStat(key, e.target.value)}
                  className="w-full px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-emerald-400 font-bold focus:border-emerald-500 outline-none font-mono"
                />
              </div>
            ))}
          </div>

          {/* Add custom stat key-value */}
          <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-zinc-400 font-semibold">Add Custom Stat Metric:</span>
            <input
              type="text"
              value={newStatKey}
              onChange={(e) => setNewStatKey(e.target.value)}
              placeholder="e.g. appDownloads"
              className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 outline-none font-mono"
            />
            <input
              type="text"
              value={newStatValue}
              onChange={(e) => setNewStatValue(e.target.value)}
              placeholder="e.g. 500k+"
              className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 outline-none font-mono"
            />
            <button
              type="button"
              onClick={handleAddCustomStat}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition"
            >
              <Plus className="w-3 h-3" />
              <span>Add Metric</span>
            </button>
          </div>
        </div>

        {/* Dynamic Cover Letter Editor */}
        <div className="pt-4 border-t border-zinc-800 space-y-3">
          <div>
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dynamic Cover Letter Content</span>
            </h3>
            <p className="text-[11px] text-zinc-400">
              Edit the live dynamic text shown in the public cover letter modal. Split paragraphs with a blank line.
            </p>
          </div>
          <textarea
            rows={8}
            value={coverLetterText}
            onChange={(e) => onUpdateCoverLetter(e.target.value)}
            placeholder="Dear Hiring Team,&#10;&#10;I am writing to express my interest in..."
            className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none leading-relaxed font-sans"
          />
        </div>
      </div>
    </div>
  );
}

