"use client";

import React from "react";
import {
  ShieldCheck,
  Zap,
  ShoppingBag,
  Compass,
  Gauge,
  BatteryCharging,
  TrendingUp,
  Activity,
} from "lucide-react";
import { METRICS_DATA } from "@/data/portfolioData";

export function ImpactMetrics() {
  const iconsMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    Zap: <Zap className="w-6 h-6 text-amber-500" />,
    ShoppingBag: <ShoppingBag className="w-6 h-6 text-cyan-500" />,
    Compass: <Compass className="w-6 h-6 text-emerald-400" />,
    Gauge: <Gauge className="w-6 h-6 text-indigo-500" />,
    Wrench: <BatteryCharging className="w-6 h-6 text-purple-500" />,
  };

  return (
    <section id="metrics" className="py-20 relative bg-zinc-50/50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5" />
            <span>Proven Engineering Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            Quantifiable Impact in Production
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Hiring managers value results over buzzwords. Here is what I have systematically delivered across 5+ years of shipping enterprise Android apps.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {METRICS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="metric-card relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group-hover:scale-110 transition-transform">
                  {iconsMap[item.icon] || <TrendingUp className="w-6 h-6 text-emerald-500" />}
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
                  Verified Metric
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white font-mono mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {item.value}
              </div>

              <div className="text-base font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                {item.label}
              </div>

              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
