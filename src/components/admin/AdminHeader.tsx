"use client";

import React from "react";
import { ExternalLink, Save, LogOut } from "lucide-react";

interface AdminHeaderProps {
  name: string;
  title: string;
  isSaving: boolean;
  onSave: () => void;
  onLogout: () => void;
}

export function AdminHeader({
  name,
  title,
  isSaving,
  onSave,
  onLogout,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 flex items-center justify-center font-bold text-white text-xs">
          HA
        </div>
        <div>
          <h1 className="font-extrabold text-sm text-white flex items-center gap-2">
            <span>Portfolio Admin Panel</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Live MongoDB
            </span>
          </h1>
          <p className="text-[11px] text-zinc-400">
            {name} • {title}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={
            process.env.NODE_ENV === "production"
              ? "https://hammad-ahmed-android-engineer.vercel.app/"
              : "/"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:text-white transition"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition disabled:opacity-50 cursor-pointer"
        >
          {isSaving ? (
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>{isSaving ? "Persisting..." : "Save All Changes"}</span>
        </button>

        <button
          type="button"
          onClick={onLogout}
          title="Sign out"
          className="p-2 rounded-xl border border-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-900 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

