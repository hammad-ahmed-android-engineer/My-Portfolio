"use client";

import React, { useState } from "react";
import { Sparkles, Plus, Trash2, ArrowLeft, Save, Pencil } from "lucide-react";
import { Service } from "@/types/portfolio";
import { ItemListInput } from "../common/ItemListInput";

interface ServicesPageProps {
  services: Service[];
  onUpdateService: <K extends keyof Service>(index: number, field: K, value: Service[K]) => void;
  onAddService: (newService?: Service) => Promise<boolean> | void;
  onRemoveService: (index: number) => void;
  onSaveAll?: () => Promise<boolean | void> | void;
  isSaving?: boolean;
}

const createEmptyService = (order: number): Service => ({
  id: `service-${Date.now()}`,
  title: "",
  subtitle: "",
  description: "",
  icon: "Smartphone",
  deliverables: [],
  tags: [],
  order,
  featured: true,
});

  export function ServicesPage({
    services,
    onUpdateService,
    onAddService,
    onRemoveService,
    onSaveAll,
    isSaving = false,
  }: ServicesPageProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<Service>(() =>
    createEmptyService(services.length + 1)
  );

  const handleOpenCreatePage = () => {
    setDraft(createEmptyService(services.length + 1));
    setEditingIndex(null);
    setIsCreating(true);
  };

  const handleSaveNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.subtitle.trim() || !draft.description.trim()) return;
    const saved = await onAddService({
      ...draft,
      id: `service-${Date.now()}`,
      order: services.length + 1,
    });
    if (saved !== false) {
      setIsCreating(false);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null && services[editingIndex]) {
      const current = services[editingIndex];
      if (!current.title.trim() || !current.subtitle.trim() || !current.description.trim()) {
        return;
      }
    }
    if (onSaveAll) {
      const saved = await onSaveAll();
      if (saved === false) return;
    }
    setEditingIndex(null);
  };

  // 1. Add New Service Page
  if (isCreating) {
    return (
      <div className="py-8 space-y-6 animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
              title="Back to Services list"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[11px] font-mono text-emerald-400">
                Services Offered / Add New Service
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Add New Service Offering</span>
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
          <div className="space-y-1">
            <label className="text-[11px] text-zinc-400">Service Title *</label>
            <input
              type="text"
              required
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="e.g. Native Android App Engineering"
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Subtitle *</label>
              <input
                type="text"
                required
                value={draft.subtitle}
                onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
                placeholder="e.g. Enterprise Mobile Architecture"
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Lucide Icon Name</label>
              <input
                type="text"
                value={draft.icon}
                onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
                placeholder="Smartphone, Layers, Zap, Database"
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-zinc-400">Description *</label>
            <textarea
              rows={3}
              required
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              placeholder="Detailed overview of this engineering service..."
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
            />
          </div>

          <ItemListInput
            label="Deliverables"
            items={draft.deliverables ?? []}
            onChange={(updated) => setDraft({ ...draft, deliverables: updated })}
            placeholder="Type a deliverable and click Add..."
          />

          <ItemListInput
            label="Technology Tags"
            items={draft.tags ?? []}
            onChange={(updated) => setDraft({ ...draft, tags: updated })}
            placeholder="Type a tag (e.g. Kotlin) and click Add..."
          />

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
              <span>{isSaving ? "Saving..." : "Save Service"}</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 2. Edit Selected Service Page
  if (editingIndex !== null && services[editingIndex]) {
    const idx = editingIndex;
    const service = services[idx];

    return (
      <form onSubmit={handleSaveEdit} className="py-8 space-y-6 animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setEditingIndex(null)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
              title="Back to Services list"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[11px] font-mono text-emerald-400">
                Services Offered / Edit Service #{idx + 1}
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{service.title || "Untitled Service"}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onRemoveService(idx);
                setEditingIndex(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-400 text-xs font-semibold transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "Saving..." : "Save Service"}</span>
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-5">
          <div className="space-y-1">
            <label className="text-[11px] text-zinc-400">Service Title *</label>
            <input
              type="text"
              required
              value={service.title}
              onChange={(e) => onUpdateService(idx, "title", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Subtitle *</label>
              <input
                type="text"
                required
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
            <label className="text-[11px] text-zinc-400">Description *</label>
            <textarea
              rows={3}
              required
              value={service.description}
              onChange={(e) => onUpdateService(idx, "description", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
            />
          </div>

          <ItemListInput
            label="Deliverables"
            items={service.deliverables ?? []}
            onChange={(updated) => onUpdateService(idx, "deliverables", updated)}
            placeholder="e.g. End-to-end architecture implementation"
          />

          <ItemListInput
            label="Technology Tags"
            items={service.tags ?? []}
            onChange={(updated) => onUpdateService(idx, "tags", updated)}
            placeholder="e.g. Kotlin"
          />

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingIndex(null)}
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
              <span>{isSaving ? "Saving..." : "Save Service"}</span>
            </button>
          </div>
        </div>
      </form>
    );
  }

  // 3. Minimal List View
  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Configured Services ({services.length})</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Select any service to view or edit its details, or add a new service offering.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCreatePage}
          className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Service</span>
        </button>
      </div>

      {services.length === 0 ? (
        <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 text-center text-xs text-zinc-500">
          No services configured. Click &ldquo;Add Service&rdquo; to create one.
        </div>
      ) : (
        <div className="space-y-2.5">
          {services.map((service, idx) => (
            <div
              key={service.id || idx}
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
                      {service.title || "Untitled Service"}
                    </span>
                    {service.icon && (
                      <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[10px] font-mono">
                        {service.icon}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 mt-1 font-mono">
                    {service.subtitle && <span>{service.subtitle}</span>}
                    <span>• {(service.deliverables ?? []).length} deliverables</span>
                    <span>• {(service.tags ?? []).length} tags</span>
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
                  onClick={() => onRemoveService(idx)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition cursor-pointer"
                  title="Delete Service"
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

