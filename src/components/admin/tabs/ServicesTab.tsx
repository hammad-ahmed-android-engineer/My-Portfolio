"use client";

import React from "react";
import { Sparkles, Plus, Trash2 } from "lucide-react";
import { Service } from "@/types/portfolio";
import { ItemListInput } from "../common/ItemListInput";

interface ServicesTabProps {
  services: Service[];
  onUpdateService: <K extends keyof Service>(index: number, field: K, value: Service[K]) => void;
  onAddService: () => void;
  onRemoveService: (index: number) => void;
}

export function ServicesTab({
  services,
  onUpdateService,
  onAddService,
  onRemoveService,
}: ServicesTabProps) {
  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Configured Services ({services.length})</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Tailored Android engineering offerings displayed on the public portfolio.
          </p>
        </div>
        <button
          type="button"
          onClick={onAddService}
          className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, idx) => (
          <div
            key={service.id || idx}
            className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">
                Service #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => onRemoveService(idx)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition cursor-pointer"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Service Title</label>
              <input
                type="text"
                value={service.title}
                onChange={(e) => onUpdateService(idx, "title", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Subtitle</label>
                <input
                  type="text"
                  value={service.subtitle}
                  onChange={(e) => onUpdateService(idx, "subtitle", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Lucide Icon Name</label>
                <input
                  type="text"
                  value={service.icon}
                  onChange={(e) => onUpdateService(idx, "icon", e.target.value)}
                  placeholder="Smartphone, Layers, Zap, Database"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Description</label>
              <textarea
                rows={2}
                value={service.description}
                onChange={(e) => onUpdateService(idx, "description", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none resize-none"
              />
            </div>

            {/* Deliverables List Input */}
            <ItemListInput
              label="Deliverables"
              items={service.deliverables ?? []}
              onChange={(updated) => onUpdateService(idx, "deliverables", updated)}
              placeholder="e.g. End-to-end architecture implementation"
            />

            {/* Tags List Input */}
            <ItemListInput
              label="Technology Tags"
              items={service.tags ?? []}
              onChange={(updated) => onUpdateService(idx, "tags", updated)}
              placeholder="e.g. Kotlin, Jetpack Compose"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

