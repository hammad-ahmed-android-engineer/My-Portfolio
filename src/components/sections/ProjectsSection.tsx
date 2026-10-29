"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FolderGit2,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import { Project } from "@/types/portfolio";
import { resolveProjectPublicImage } from "@/utils/basePath";
import { ProjectDetailModal } from "@/components/modals/ProjectDetailModal";

interface ProjectsSectionProps {
  projects?: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const displayProjects = projects ?? [];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  // Extract unique categories dynamically from projects
  const uniqueCategories = Array.from(new Set(displayProjects.map((p) => p.category))).filter(Boolean);
  const categories = ["All", ...uniqueCategories];

  const filteredProjects =
    selectedCategory === "All"
      ? displayProjects
      : displayProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative bg-zinc-50/50 dark:bg-zinc-900/20 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Production Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            Featured Systems & Applications
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Real production systems architected and delivered—spanning government crowd management, multi-tenant e-commerce, and high-density utilities.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 group"
            >
              {/* Project Image Preview */}
              <div
                className="relative aspect-video w-full overflow-hidden bg-zinc-900 cursor-pointer"
                onClick={() => setActiveProjectModal(project)}
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-4 text-center">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-2 border border-emerald-500/20">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-zinc-300 line-clamp-1">{project.title}</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveProjectPublicImage(project.image, project.id, project.title)}
                  alt={project.title}
                  className="relative z-10 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                  }}
                />
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-black/70 text-emerald-400 backdrop-blur border border-emerald-500/30">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 z-20">
                  <span className="px-2.5 py-1 text-[10px] font-mono rounded-md bg-zinc-900/80 text-zinc-200 backdrop-blur">
                    {project.clientOrCompany}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3
                    className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors cursor-pointer"
                    onClick={() => setActiveProjectModal(project)}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    {project.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed pt-1">
                    {project.summary}
                  </p>
                </div>

                {/* Key Metrics Chips */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                  {project.metrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/60">
                      <div className="text-[10px] text-zinc-400 font-mono">{m.label}</div>
                      <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-400">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Trigger */}
                <button
                  onClick={() => setActiveProjectModal(project)}
                  className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 text-zinc-800 dark:text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Inspect Architecture & Impact</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
}
