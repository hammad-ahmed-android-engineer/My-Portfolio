"use client";

import React from "react";
import { Layers, Database, Smartphone, Cpu } from "lucide-react";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Engineering Discipline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            Clean Architecture &amp; Engineering Philosophy
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            How I structure Android applications to be testable, maintainable, resilient to network drops, and scalable for distributed teams.
          </p>
        </div>

        {/* 3-Tier Layer Blueprint Cards — equal-height via flex */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Layer 1: Presentation */}
          <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase">Layer 01</div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Presentation &amp; UI
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
              Built with <strong className="text-zinc-800 dark:text-zinc-200">Jetpack Compose</strong> &amp; <strong className="text-zinc-800 dark:text-zinc-200">Material Design 3</strong>, using unidirectional data flow, MVVM architecture, and <span className="font-mono text-emerald-600 dark:text-emerald-400">StateFlow</span> for reactive UI state management.
            </p>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">Jetpack Compose</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">StateFlow</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">Material 3</span>
            </div>
          </div>

          {/* Layer 2: Domain */}
          <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase">Layer 02</div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Domain &amp; Business Logic
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
              A pure Kotlin module with no Android dependencies. Encapsulates business rules, validation, payment orchestration, <strong className="text-zinc-800 dark:text-zinc-200">use cases</strong> following SOLID principles and separation of concerns.
            </p>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">Use Cases</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">SOLID Principles</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">Pure Kotlin</span>
            </div>
          </div>

          {/* Layer 3: Data & Infrastructure */}
          <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase">Layer 03</div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Data &amp; Infrastructure
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
              Handles data access through repository implementations, <strong className="text-zinc-800 dark:text-zinc-200">Room</strong> for local persistence, and <strong className="text-zinc-800 dark:text-zinc-200">Retrofit</strong> for remote API communication.
            </p>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">Room DB</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">WorkManager</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">Retrofit 2</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
