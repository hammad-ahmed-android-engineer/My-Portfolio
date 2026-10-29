"use client";

import React from "react";
import { BarChart3, Plus, Trash2 } from "lucide-react";
import { MetricItem } from "@/types/portfolio";

interface MetricsTabProps {
  metrics: MetricItem[];
  onUpdateMetrics: (updated: MetricItem[]) => void;
  onRequestDelete?: (title: string, message: string, onConfirm: () => void) => void;
}

export function MetricsTab({ metrics, onUpdateMetrics, onRequestDelete }: MetricsTabProps) {
  const handleAddMetric = () => {
    const newMetric: MetricItem = {
      value: "99.99%",
      label: "New Verified Metric",
      description: "Description of measurable production outcome delivered.",
      icon: "ShieldCheck",
      order: metrics.length + 1,
    };
    onUpdateMetrics([...metrics, newMetric]);
  };

  const handleRemoveMetric = (idx: number) => {
    const metricLabel = metrics[idx]?.label || `Metric #${idx + 1}`;
    const doDelete = () => onUpdateMetrics(metrics.filter((_, i) => i !== idx));
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

    return (
      <div className="py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Impact Metric Cards ({metrics.length})</span>
            </h2>
            <p className="text-xs text-zinc-400">
              High-visibility quantifiable production metrics showcased in the Bento grid.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddMetric}
            className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Metric Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2.5"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-[10px] font-mono text-zinc-500">Metric #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveMetric(idx)}
                  className="text-zinc-500 hover:text-red-400 transition cursor-pointer"
                  title="Delete Metric"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400">Value (Large)</label>
                  <input
                    type="text"
                    value={metric.value}
                    onChange={(e) => handleUpdateField(idx, "value", e.target.value)}
                    placeholder="99.99%"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 font-bold focus:border-emerald-500 outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400">Icon Name</label>
                  <input
                    type="text"
                    value={metric.icon}
                    onChange={(e) => handleUpdateField(idx, "icon", e.target.value)}
                    placeholder="ShieldCheck, Zap, Gauge..."
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400">Label</label>
                <input
                  type="text"
                  value={metric.label}
                  onChange={(e) => handleUpdateField(idx, "label", e.target.value)}
                  placeholder="Crash-Free Sessions"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400">Description</label>
                <textarea
                  rows={2}
                  value={metric.description}
                  onChange={(e) => handleUpdateField(idx, "description", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300 focus:border-emerald-500 outline-none resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

