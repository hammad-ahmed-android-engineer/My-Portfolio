"use client";

import React, { useState } from "react";
import { Signal, Wifi, Battery, Smartphone } from "lucide-react";
import {
  DemoApp,
  EdgeType,
  ColorPalette,
  EmojiBorder,
  ShapeBorder,
  NotchStyle,
} from "./types";
import { SarHajjApp } from "./SarHajjApp";
import { EcommerceApp } from "./EcommerceApp";
import { EdgeLightingApp, EdgeBorderOverlay } from "./EdgeLightingApp";
import { ToolboxApp } from "./ToolboxApp";

export function InteractivePhone() {
  const [activeApp, setActiveApp] = useState<DemoApp>("yamamacm");

  const touchStartPos = React.useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartPos.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (app: DemoApp, e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartPos.current.x;
    const dy = t.clientY - touchStartPos.current.y;
    touchStartPos.current = null;
    // Only switch if it's a genuine tap/click, not a scroll gesture
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      setActiveApp(app);
    }
  };

  // Edge Lighting Global State (Persisted across tab switches so live effects don't reset)
  const [edgeType, setEdgeType] = useState<EdgeType>("neon_glow");
  const [edgeColor, setEdgeColor] = useState<ColorPalette>("rainbow");
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiBorder>("⭐");
  const [selectedShape, setSelectedShape] = useState<ShapeBorder>("●");
  const [notchStyle, setNotchStyle] = useState<NotchStyle>("dynamic_island");
  const [edgeBorderWidth, setEdgeBorderWidth] = useState<number>(4);
  const [glowSpeed, setGlowSpeed] = useState<number>(3.5);
  const [cornerRoundness, setCornerRoundness] = useState<number>(38);

  return (
    <div className="relative mx-auto flex flex-col items-center w-full max-w-lg">
      {/* Device Switcher Tabs - Select app to preview live on phone */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-center p-2 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-lg mb-8 w-full gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={() => setActiveApp("yamamacm")}
          className={`flex-auto py-2 px-3.5 rounded-xl text-xs font-semibold text-center whitespace-nowrap flex items-center justify-center transition-all cursor-pointer ${
            activeApp === "yamamacm"
              ? "bg-zinc-800 text-emerald-400 shadow-md border border-emerald-500/40"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 border border-transparent"
          }`}
        >
          SAR Hajj
        </button>

        <button
          type="button"
          onClick={() => setActiveApp("ecommerce")}
          className={`flex-auto py-2 px-3.5 rounded-xl text-xs font-semibold text-center whitespace-nowrap flex items-center justify-center transition-all cursor-pointer ${
            activeApp === "ecommerce"
              ? "bg-zinc-800 text-emerald-400 shadow-md border border-emerald-500/40"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 border border-transparent"
          }`}
        >
          5 SaaS Apps
        </button>

        <button
          type="button"
          onClick={() => setActiveApp("edgelighting")}
          className={`flex-auto py-2 px-3.5 rounded-xl text-xs font-semibold text-center whitespace-nowrap flex items-center justify-center transition-all cursor-pointer ${
            activeApp === "edgelighting"
              ? "bg-zinc-800 text-emerald-400 shadow-md border border-emerald-500/40"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 border border-transparent"
          }`}
        >
          Edge Light
        </button>

        <button
          type="button"
          onClick={() => setActiveApp("toolbox")}
          className={`flex-auto py-2 px-3.5 rounded-xl text-xs font-semibold text-center whitespace-nowrap flex items-center justify-center transition-all cursor-pointer ${
            activeApp === "toolbox"
              ? "bg-zinc-800 text-emerald-400 shadow-md border border-emerald-500/40"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 border border-transparent"
          }`}
        >
          Toolbox
        </button>
      </div>

      {/* Sleek Modern Phone Frame - Normal elegant chassis border for all apps, glowing lighting on Edge Light */}
      <div
        className={`relative w-[300px] h-[610px] sm:w-[325px] sm:h-[640px] rounded-[42px] transition-all duration-300 ${
          activeApp === "edgelighting"
            ? "p-2 bg-zinc-900/95 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_35px_rgba(16,185,129,0.4)] border-2 border-emerald-500/70"
            : "p-2 bg-zinc-900/90 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(0,0,0,0.5)] border border-zinc-700/60"
        }`}
      >
        {/* Subtle Hardware Antenna Highlights */}
        <div className="absolute -left-[2px] top-24 w-0.5 h-6 bg-zinc-700 rounded-l" />
        <div className="absolute -left-[2px] top-36 w-0.5 h-10 bg-zinc-700 rounded-l" />
        <div className="absolute -right-[2px] top-32 w-0.5 h-12 bg-zinc-700 rounded-r" />

        {/* Screen Display - Ultra-Clean Edge-to-Edge Bezel */}
        <div className="relative w-full h-full bg-black overflow-hidden flex flex-col shadow-inner rounded-[34px]">
          {/* Dynamic Edge Lighting Overlay - RENDERED ONLY FOR EDGE LIGHT APP */}
          {activeApp === "edgelighting" && (
            <EdgeBorderOverlay
              edgeType={edgeType}
              selectedEmoji={selectedEmoji}
              selectedShape={selectedShape}
              edgeColor={edgeColor}
              edgeBorderWidth={edgeBorderWidth}
              cornerRoundness={cornerRoundness}
            />
          )}

          {/* Status Bar */}
          <div className="relative z-30 h-7 px-5 flex items-center justify-between text-zinc-400 text-[11px] font-mono select-none shrink-0 bg-transparent">
            {/* Clock */}
            <span className="font-semibold text-white tracking-wider">09:41</span>

            {/* Dynamic Island / Camera Punch Hole */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-18 h-4 bg-zinc-950 rounded-full flex items-center justify-end px-1.5 gap-1 border border-zinc-800/60 shadow-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Screen Display Area */}
          <div className="relative flex-1 min-h-0 flex flex-col overflow-hidden z-20">
            {activeApp === "yamamacm" && <SarHajjApp />}
            {activeApp === "ecommerce" && <EcommerceApp />}
            {activeApp === "edgelighting" && (
              <EdgeLightingApp
                edgeType={edgeType}
                setEdgeType={setEdgeType}
                edgeColor={edgeColor}
                setEdgeColor={setEdgeColor}
                selectedEmoji={selectedEmoji}
                setSelectedEmoji={setSelectedEmoji}
                selectedShape={selectedShape}
                setSelectedShape={setSelectedShape}
                notchStyle={notchStyle}
                setNotchStyle={setNotchStyle}
                edgeBorderWidth={edgeBorderWidth}
                setEdgeBorderWidth={setEdgeBorderWidth}
                glowSpeed={glowSpeed}
                setGlowSpeed={setGlowSpeed}
                cornerRoundness={cornerRoundness}
                setCornerRoundness={setCornerRoundness}
              />
            )}
            {activeApp === "toolbox" && <ToolboxApp />}
          </div>

          {/* Bottom App Navigation Switcher */}
          <div className="relative z-30 h-12 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800/80 flex items-center justify-around px-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveApp("yamamacm")}
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd("yamamacm", e)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition ${activeApp === "yamamacm"
                  ? "text-emerald-400"
                  : "text-zinc-500 hover:text-zinc-300"
                }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black ${activeApp === "yamamacm"
                    ? "bg-emerald-500 text-black shadow-xs shadow-emerald-500/50"
                    : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                H
              </div>
              <span className="text-[9px] font-medium leading-none">Hajj</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveApp("ecommerce")}
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd("ecommerce", e)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition ${activeApp === "ecommerce"
                  ? "text-emerald-400"
                  : "text-zinc-500 hover:text-zinc-300"
                }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black ${activeApp === "ecommerce"
                    ? "bg-emerald-500 text-black shadow-xs shadow-emerald-500/50"
                    : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                E
              </div>
              <span className="text-[9px] font-medium leading-none">SaaS</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveApp("edgelighting")}
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd("edgelighting", e)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition ${activeApp === "edgelighting"
                  ? "text-emerald-400"
                  : "text-zinc-500 hover:text-zinc-300"
                }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black ${activeApp === "edgelighting"
                    ? "bg-emerald-500 text-black shadow-xs shadow-emerald-500/50"
                    : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                L
              </div>
              <span className="text-[9px] font-medium leading-none">Edge</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveApp("toolbox")}
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd("toolbox", e)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition ${activeApp === "toolbox"
                  ? "text-emerald-400"
                  : "text-zinc-500 hover:text-zinc-300"
                }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black ${activeApp === "toolbox"
                    ? "bg-emerald-500 text-black shadow-xs shadow-emerald-500/50"
                    : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                T
              </div>
              <span className="text-[9px] font-medium leading-none">Tools</span>
            </button>
          </div>

          {/* Android Home Indicator Bar */}
          <div className="h-4 bg-zinc-950 flex items-center justify-center shrink-0">
            <div className="w-24 h-1 bg-zinc-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Simulator helper subtitle */}
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
        <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
        <span>Live Interactive Android Demo Simulator</span>
      </div>
    </div>
  );
}