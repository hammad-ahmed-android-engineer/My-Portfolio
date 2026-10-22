"use client";

import React from "react";
import Image from "next/image";
import { X, CheckCircle2, Layers, Cpu, Database, CreditCard, ExternalLink, ArrowRight, ShieldCheck } from "lucide-react";
import { Project, PERSONAL_INFO } from "@/data/portfolioData";
import { getAssetPath } from "@/utils/basePath";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/80 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {project.category}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              {project.clientOrCompany}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Hero Banner with Preview */}
          <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 aspect-video max-h-[380px]">
            <Image
              src={getAssetPath(project.image)}
              alt={project.title}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {project.title}
              </h1>
              <p className="text-sm text-zinc-300 mt-1 max-w-2xl">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Metrics Highlight Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20"
              >
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {m.label}
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Project Overview & Architecture Challenge
            </h3>
            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Architecture Deep Dive */}
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 space-y-4">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
              <Layers className="w-5 h-5 text-emerald-500" />
              <span>Architectural Blueprint</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800">
                <span className="text-zinc-400 uppercase font-mono block mb-1">
                  Design Pattern
                </span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                  {project.architectureDetails.pattern}
                </span>
              </div>

              {project.architectureDetails.offlineStrategy && (
                <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800">
                  <span className="text-zinc-400 uppercase font-mono block mb-1">
                    Offline Synchronization
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                    {project.architectureDetails.offlineStrategy}
                  </span>
                </div>
              )}

              {project.architectureDetails.payments && (
                <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800">
                  <span className="text-zinc-400 uppercase font-mono block mb-1">
                    Payments Integration
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                    {project.architectureDetails.payments}
                  </span>
                </div>
              )}

              <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800">
                <span className="text-zinc-400 uppercase font-mono block mb-1">
                  Key Engineering Highlights
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-zinc-700 dark:text-zinc-300">
                  {project.architectureDetails.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Key Shipped Features */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Key Features & Capabilities Shipped
            </h3>
            <div className="space-y-2.5">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/70 bg-white dark:bg-zinc-900/40"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{feat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/80">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Impact: <strong className="text-zinc-900 dark:text-zinc-200">{project.impactHighlight}</strong>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Inquiry%20regarding%20${encodeURIComponent(project.title)}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
            >
              <span>Ask About Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
