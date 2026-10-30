"use client";

import React, { useState } from "react";
import { BarChart3, Plus, Trash2, ArrowLeft, Save, Pencil } from "lucide-react";
import { MetricItem } from "@/types/portfolio";

interface MetricsTabProps {
  metrics: MetricItem[];
  onUpdateMetrics: (updated: MetricItem[], autoPersist?: boolean) => Promise<boolean> | void;
  onRequestDelete?: (title: string, message: string, onConfirm: () => void) => void;
  onSaveAll?: () => Promise<void> | void;
  isSaving?: boolean;
}

const createEmptyMetric = (order: number): MetricItem => ({
  value: "",
  label: "",
  description: "",
  icon: "ShieldCheck",
  order,
});

  export function MetricsTab({
    metrics,
    onUpdateMetrics,
    onRequestDelete,
    onSaveAll,
    isSaving = false,
  }: MetricsTabProps) {
    const [isCreating, setIsCreating] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [draft, setDraft] = useState<MetricItem>(() =>
      createEmptyMetric(metrics.length + 1)
    );

    const handleOpenCreatePage = () => {
      setDraft(createEmptyMetric(metrics.length + 1));
      setEditingIndex(null);
      setIsCreating(true);
    };

      const handleSaveNew = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!draft.value.trim() || !draft.label.trim()) return;
        await onUpdateMetrics(
          [
            ...metrics,
            {
              ...draft,
              order: metrics.length + 1,
            },
          ],
          true
        );
        setIsCreating(false);
      };

      const handleSaveEdit = async () => {
        if (onSaveAll) {
          await onSaveAll();
        }
        setEditingIndex(null);
      };

      const handleRemoveMetric = (idx: number) => {
        const metricLabel = metrics[idx]?.label || `Metric #${idx + 1}`;
          const doDelete = async () => {
            await onUpdateMetrics(metrics.filter((_, i) => i !== idx), true);
            if (editingIndex === idx) {
              setEditingIndex(null);
            }
          };
          if (onRequestDelete) {
            onRequestDelete(
              "Delete Metric Card?",
              `Are you sure you want to delete the metric card "${metrics[idx]?.value || ""} ${metricLabel}"?`,
              doDelete
            );
          } else {
            doDelete();
          }
        };

        const handleUpdateField = <K extends keyof MetricItem>(idx: number, field: K, val: MetricItem[K]) => {
          const updated = [...metrics];
          updated[idx] = { ...updated[idx], [field]: val };
          onUpdateMetrics(updated);
        };

        // 1. Add New Metric Page
        if (isCreating) {
          return (
            <div className="py-8 space-y-6 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
                    title="Back to Impact Metrics list"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="text-[11px] font-mono text-emerald-400">
                      Impact Metrics / Add New Metric Card
                    </div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      <span>Add New Impact Metric Card</span>
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
                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400">Value (Large) *</label>
                    <input
                      type="text"
                      required
                      value={draft.value}
                      onChange={(e) => setDraft({ ...draft, value: e.target.value })}
                      placeholder="e.g. 99.99%"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 font-bold focus:border-emerald-500 outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400">Label *</label>
                    <input
                      type="text"
                      required
                      value={draft.label}
                      onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                      placeholder="e.g. Crash-Free Sessions"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400">Icon Name</label>
                    <input
                      type="text"
                      value={draft.icon}
                      onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
                      placeholder="ShieldCheck, Zap, Gauge..."
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Description</label>
                  <textarea
                    rows={3}
                    value={draft.description}
                    onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                    placeholder="Description of measurable production outcome delivered..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                  />
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
                    <span>{isSaving ? "Saving..." : "Save Metric"}</span>
                  </button>
                </div>
              </form>
            </div>
          );
        }

        // 2. Edit Selected Metric Page
        if (editingIndex !== null && metrics[editingIndex]) {
          const idx = editingIndex;
          const metric = metrics[idx];

          return (
            <div className="py-8 space-y-6 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingIndex(null)}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
                    title="Back to Impact Metrics list"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="text-[11px] font-mono text-emerald-400">
                      Impact Metrics / Edit Metric #{idx + 1}
                    </div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      <span>
                        {metric.value} — {metric.label || "Untitled Metric"}
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveMetric(idx)}
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
                    <span>{isSaving ? "Saving..." : "Save Metric"}</span>
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400">Value (Large)</label>
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => handleUpdateField(idx, "value", e.target.value)}
                      placeholder="99.99%"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 font-bold focus:border-emerald-500 outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400">Label</label>
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => handleUpdateField(idx, "label", e.target.value)}
                      placeholder="Crash-Free Sessions"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400">Icon Name</label>
                    <input
                      type="text"
                      value={metric.icon}
                      onChange={(e) => handleUpdateField(idx, "icon", e.target.value)}
                      placeholder="ShieldCheck, Zap, Gauge..."
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Description</label>
                  <textarea
                    rows={3}
                    value={metric.description}
                    onChange={(e) => handleUpdateField(idx, "description", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
                  />
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
                      <span>{isSaving ? "Saving..." : "Save Metric"}</span>
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
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      <span>Impact Metric Cards ({metrics.length})</span>
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Select any metric card to view or edit its details, or add a new metric.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenCreatePage}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Metric Card</span>
                  </button>
                </div>

                {metrics.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 text-center text-xs text-zinc-500">
                    No impact metric cards found. Click &ldquo;Add Metric Card&rdquo; to create one.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        onClick={() => setEditingIndex(idx)}
                        className="group p-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/90 hover:border-emerald-500/40 transition flex flex-wrap items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            #{idx + 1}
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-extrabold">
                                {metric.value || "0"}
                              </span>
                              <span className="text-sm font-bold text-white truncate">
                                {metric.label || "Untitled Metric"}
                              </span>
                              {metric.icon && (
                                <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[10px] font-mono">
                                  {metric.icon}
                                </span>
                              )}
                            </div>
                            {metric.description && (
                              <p className="text-[11px] text-zinc-400 truncate max-w-xl mt-1">
                                {metric.description}
                              </p>
                            )}
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
                            onClick={() => handleRemoveMetric(idx)}
                            className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition cursor-pointer"
                            title="Delete Metric"
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

