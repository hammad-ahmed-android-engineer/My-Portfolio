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
} from "./phone/types";
import { SarHajjApp } from "./phone/SarHajjApp";
import { EcommerceApp } from "./phone/EcommerceApp";
import { EdgeLightingApp, EdgeBorderOverlay } from "./phone/EdgeLightingApp";
import { ToolboxApp } from "./phone/ToolboxApp";

export function InteractivePhone() {
  const [activeApp, setActiveApp] = useState<DemoApp>("yamamacm");

  // Dynamic Edge Lighting state (shared with Phone chassis & overlay)
  const [edgeType, setEdgeType] = useState<EdgeType>("emojis");
  const [edgeColor, setEdgeColor] = useState<ColorPalette>("rainbow");
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiBorder>("⭐");
  const [selectedShape, setSelectedShape] = useState<ShapeBorder>("★");
  const [notchStyle, setNotchStyle] = useState<NotchStyle>("punch_hole");
  const [edgeBorderWidth, setEdgeBorderWidth] = useState(4);
  const [glowSpeed, setGlowSpeed] = useState(3);
  const [cornerRoundness, setCornerRoundness] = useState(34);

  const getEdgeGlowClass = () => {
    if (activeApp !== "edgelighting") return "";
    switch (edgeColor) {
      case "emerald":
        return "shadow-[0_0_30px_rgba(16,185,129,0.9),inset_0_0_15px_rgba(16,185,129,0.5)] border-emerald-400";
      case "cyan":
        return "shadow-[0_0_30px_rgba(6,182,212,0.9),inset_0_0_15px_rgba(6,182,212,0.5)] border-cyan-400";
      case "purple":
        return "shadow-[0_0_30px_rgba(168,85,247,0.9),inset_0_0_15px_rgba(168,85,247,0.5)] border-purple-400";
      case "amber":
        return "shadow-[0_0_30px_rgba(245,158,11,0.9),inset_0_0_15px_rgba(245,158,11,0.5)] border-amber-400";
      case "rainbow":
        return "shadow-[0_0_35px_rgba(236,72,153,0.85),0_0_20px_rgba(59,130,246,0.85),inset_0_0_15px_rgba(168,85,247,0.6)] border-pink-500 animate-pulse";
      case "cyberpunk":
        return "shadow-[0_0_30px_rgba(250,204,21,0.9),inset_0_0_15px_rgba(6,182,212,0.7)] border-yellow-400";
      case "sunset":
        return "shadow-[0_0_30px_rgba(244,63,94,0.9),inset_0_0_15px_rgba(249,115,22,0.7)] border-rose-500";
      case "cotton_candy":
        return "shadow-[0_0_30px_rgba(192,132,252,0.9),inset_0_0_15px_rgba(56,189,248,0.7)] border-sky-400";
      default:
        return "shadow-[0_0_30px_rgba(16,185,129,0.9)] border-emerald-400";
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Device Switcher Tabs - Guaranteed Single Line on all screens */}
      <div className="grid grid-cols-4 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-inner mb-4 w-full gap-1">
        <button
          onClick={() => setActiveApp("yamamacm")}
          className={`py-1.5 px-1 rounded-xl text-[11px] sm:text-xs font-semibold text-center whitespace-nowrap transition-all ${
            activeApp === "yamamacm"
              ? "bg-zinc-800 text-emerald-400 shadow-sm"
              : "text-zinc-400 hover:text-zinc-100"
          }`}
        >
          SAR Hajj
        </button>

        <button
          onClick={() => setActiveApp("ecommerce")}
          className={`py-1.5 px-1 rounded-xl text-[11px] sm:text-xs font-semibold text-center whitespace-nowrap transition-all ${
            activeApp === "ecommerce"
              ? "bg-zinc-800 text-emerald-400 shadow-sm"
              : "text-zinc-400 hover:text-zinc-100"
          }`}
        >
          5 SaaS Apps
        </button>

        <button
          onClick={() => setActiveApp("edgelighting")}
          className={`py-1.5 px-1 rounded-xl text-[11px] sm:text-xs font-semibold text-center whitespace-nowrap transition-all ${
            activeApp === "edgelighting"
              ? "bg-zinc-800 text-emerald-400 shadow-sm"
              : "text-zinc-400 hover:text-zinc-100"
          }`}
        >
          Edge Light
        </button>

        <button
          onClick={() => setActiveApp("toolbox")}
          className={`py-1.5 px-1 rounded-xl text-[11px] sm:text-xs font-semibold text-center whitespace-nowrap transition-all ${
            activeApp === "toolbox"
              ? "bg-zinc-800 text-emerald-400 shadow-sm"
              : "text-zinc-400 hover:text-zinc-100"
          }`}
        >
          Toolbox
        </button>
      </div>

      {/* Realistic Android Phone Chassis */}
      <div
        className={`relative w-full max-w-[320px] sm:max-w-[350px] h-[640px] sm:h-[660px] rounded-[44px] bg-zinc-950 p-3 sm:p-3.5 shadow-2xl transition-all duration-300 border-4 ${
          activeApp === "edgelighting"
            ? getEdgeGlowClass()
            : "border-zinc-800 dark:border-zinc-700 shadow-emerald-500/10"
        }`}
      >
        {/* Screen Bezel & Container */}
        <div className="relative w-full h-full rounded-[34px] bg-zinc-950 overflow-hidden flex flex-col text-zinc-100 font-sans select-none border border-zinc-800/60">
          {/* Animated Edge Lighting Perimeter Overlay (Active during Edge Lighting) */}
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
          <div className="h-7 w-full flex items-center justify-between px-6 pt-1 text-[11px] font-mono text-zinc-400 z-30 shrink-0 bg-zinc-950">
            <span>12:45</span>
            {/* Dynamic Camera Notch / Island */}
            {activeApp === "edgelighting" && notchStyle === "dynamic_island" ? (
              <div className="w-16 h-4 rounded-full bg-black border border-zinc-700/80 mx-auto -mt-1 shadow-md flex items-center justify-between px-2 text-[7px] text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-zinc-300">Edge 60fps</span>
              </div>
            ) : activeApp === "edgelighting" && notchStyle === "infinity_u" ? (
              <div className="w-6 h-3 rounded-b-xl bg-zinc-900 border-x border-b border-zinc-700 mx-auto -mt-2 shadow-inner" />
            ) : activeApp === "edgelighting" && notchStyle === "infinity_v" ? (
              <div
                className="w-5 h-2.5 bg-zinc-900 border-x border-b border-zinc-700 mx-auto -mt-2 shadow-inner"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              />
            ) : (
              <div className="w-3.5 h-3.5 rounded-full bg-zinc-900 border border-zinc-700 mx-auto -mt-1 shadow-inner" />
            )}
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3 text-zinc-300" />
              <Wifi className="w-3 h-3 text-zinc-300" />
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* =========================================================
              MODULAR APP RENDERERS
              ========================================================= */}
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

          {/* Android System Navigation Bar */}
          <div className="h-6 w-full flex items-center justify-center gap-12 bg-black text-zinc-600 text-[10px] shrink-0">
            <span className="w-3 h-3 border-l-2 border-b-2 border-zinc-500 transform rotate-45" />
            <span className="w-2.5 h-2.5 rounded-full border border-zinc-500" />
            <span className="w-2.5 h-2.5 rounded-sm border border-zinc-500" />
          </div>
        </div>
      </div>

      {/* Interactive Helper Text */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400 text-center">
        <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Tap tabs to test Hammad&apos;s architectures • Auto-play video walkthrough active</span>
      </div>
    </div>
  );
}
