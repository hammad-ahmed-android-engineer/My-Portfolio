"use client";

import React from "react";
import { Sparkles, Flame } from "lucide-react";
import {
  EdgeType,
  ColorPalette,
  EmojiBorder,
  ShapeBorder,
  NotchStyle,
} from "./types";

interface EdgeLightingAppProps {
  edgeType: EdgeType;
  setEdgeType: (t: EdgeType) => void;
  edgeColor: ColorPalette;
  setEdgeColor: (c: ColorPalette) => void;
  selectedEmoji: EmojiBorder;
  setSelectedEmoji: (e: EmojiBorder) => void;
  selectedShape: ShapeBorder;
  setSelectedShape: (s: ShapeBorder) => void;
  notchStyle: NotchStyle;
  setNotchStyle: (n: NotchStyle) => void;
  edgeBorderWidth: number;
  setEdgeBorderWidth: (w: number) => void;
  glowSpeed: number;
  setGlowSpeed: (s: number) => void;
  cornerRoundness: number;
  setCornerRoundness: (r: number) => void;
}

export function EdgeLightingApp({
  edgeType,
  setEdgeType,
  edgeColor,
  setEdgeColor,
  selectedEmoji,
  setSelectedEmoji,
  selectedShape,
  setSelectedShape,
  notchStyle,
  setNotchStyle,
  edgeBorderWidth,
  setEdgeBorderWidth,
  glowSpeed,
  setGlowSpeed,
  cornerRoundness,
  setCornerRoundness,
}: EdgeLightingAppProps) {
  return (
    <div className="flex-1 min-h-0 flex flex-col p-3.5 overflow-y-auto overscroll-contain space-y-3.5 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-xs select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-sm text-white">Edge Glow Studio</span>
            <div className="text-[9px] text-zinc-400 font-mono">AOD SurfaceView Engine</div>
          </div>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          60 FPS VSync
        </span>
      </div>

      {/* Quick Preset Themes */}
      <div className="space-y-1.5">
        <span className="text-[10px] text-zinc-400 uppercase font-mono block">
          Quick Presets
        </span>
        <div className="grid grid-cols-4 gap-1 text-[9px]">
          <button
            onClick={() => {
              setEdgeType("emojis");
              setSelectedEmoji("⭐");
              setEdgeColor("rainbow");
            }}
            className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-pink-500/50 flex flex-col items-center gap-0.5 text-center transition"
          >
            <span>🌟</span>
            <span className="text-zinc-300 font-semibold truncate w-full">Galaxy</span>
          </button>

          <button
            onClick={() => {
              setEdgeType("emojis");
              setSelectedEmoji("❤️");
              setEdgeColor("sunset");
            }}
            className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-rose-500/50 flex flex-col items-center gap-0.5 text-center transition"
          >
            <span>💖</span>
            <span className="text-zinc-300 font-semibold truncate w-full">Romantic</span>
          </button>

          <button
            onClick={() => {
              setEdgeType("shapes");
              setSelectedShape("◆");
              setEdgeColor("cyberpunk");
            }}
            className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-yellow-500/50 flex flex-col items-center gap-0.5 text-center transition"
          >
            <span>⚡</span>
            <span className="text-zinc-300 font-semibold truncate w-full">Cyber</span>
          </button>

          <button
            onClick={() => {
              setEdgeType("neon_glow");
              setEdgeColor("cotton_candy");
              setNotchStyle("dynamic_island");
            }}
            className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-sky-500/50 flex flex-col items-center gap-0.5 text-center transition"
          >
            <span>🍬</span>
            <span className="text-zinc-300 font-semibold truncate w-full">Candy</span>
          </button>
        </div>
      </div>

      {/* 1. Edge Style / Pattern */}
      <div className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
        <span className="text-[10px] text-zinc-400 uppercase font-mono block">
          1. Edge Pattern &amp; Style
        </span>
        <div className="grid grid-cols-3 gap-1.5 text-[10px]">
          {[
            { id: "emojis", label: "Emojis Orbit", icon: "😍" },
            { id: "neon_glow", label: "Neon Beam", icon: "✨" },
            { id: "shapes", label: "Geo Shapes", icon: "🔷" },
            { id: "snake_run", label: "Snake Run", icon: "🐍" },
            { id: "dotted_chase", label: "Dotted Chase", icon: "⚡" },
            { id: "double_ring", label: "Dual Beam", icon: "🌈" },
          ].map((style) => (
            <button
              key={style.id}
              onClick={() => setEdgeType(style.id as EdgeType)}
              className={`p-2 rounded-xl flex flex-col items-center gap-1 border text-center transition ${
                edgeType === style.id
                  ? "border-pink-500 bg-pink-500/10 text-pink-300 font-bold shadow-sm"
                  : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span className="text-sm">{style.icon}</span>
              <span className="text-[9px] leading-tight">{style.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Emoji Selector (when edgeType === 'emojis') */}
      {edgeType === "emojis" && (
        <div className="p-3 rounded-2xl bg-zinc-900/90 border border-pink-500/40 space-y-2 animate-fade-in">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-pink-300 uppercase font-mono font-bold">
              Pick Border Emoji
            </span>
            <span className="text-zinc-400">Selected: {selectedEmoji}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {(["⭐", "❤️", "🔥", "⚡", "🌸", "🦋", "💎", "✨"] as EmojiBorder[]).map((emo) => (
              <button
                key={emo}
                onClick={() => setSelectedEmoji(emo)}
                className={`py-2 rounded-xl text-lg border flex items-center justify-center transition active:scale-95 ${
                  selectedEmoji === emo
                    ? "bg-pink-500/20 border-pink-500 shadow-md ring-1 ring-pink-500"
                    : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {emo}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Shapes Selector (when edgeType === 'shapes') */}
      {edgeType === "shapes" && (
        <div className="p-3 rounded-2xl bg-zinc-900/90 border border-cyan-500/40 space-y-2 animate-fade-in">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-cyan-300 uppercase font-mono font-bold">
              Pick Geometric Shape
            </span>
            <span className="text-zinc-400">Selected: {selectedShape}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { id: "★", name: "Star" },
                { id: "♥", name: "Heart" },
                { id: "●", name: "Circle" },
                { id: "▲", name: "Triangle" },
                { id: "⬡", name: "Hexagon" },
                { id: "◆", name: "Diamond" },
              ] as { id: ShapeBorder; name: string }[]
            ).map((shp) => (
              <button
                key={shp.id}
                onClick={() => setSelectedShape(shp.id)}
                className={`py-2 rounded-xl border flex flex-col items-center justify-center transition active:scale-95 ${
                  selectedShape === shp.id
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold ring-1 ring-cyan-500"
                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                <span className="text-base font-mono">{shp.id}</span>
                <span className="text-[9px] mt-0.5">{shp.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. Multi-Color & Solo Color Palettes */}
      <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2.5">
        <span className="text-[10px] text-zinc-400 uppercase font-mono block">
          Color Themes &amp; Multi-Colors
        </span>

        {/* Multi-Color Gradient Themes */}
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <button
            onClick={() => setEdgeColor("rainbow")}
            className={`p-2 rounded-xl flex items-center gap-2 border transition ${
              edgeColor === "rainbow"
                ? "border-pink-500 bg-pink-500/10 text-pink-300 font-bold"
                : "border-zinc-800 bg-zinc-950 text-zinc-400"
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-red-500 via-green-400 to-blue-500 shadow-sm" />
            <span>Rainbow Wave</span>
          </button>

          <button
            onClick={() => setEdgeColor("cyberpunk")}
            className={`p-2 rounded-xl flex items-center gap-2 border transition ${
              edgeColor === "cyberpunk"
                ? "border-yellow-400 bg-yellow-500/10 text-yellow-300 font-bold"
                : "border-zinc-800 bg-zinc-950 text-zinc-400"
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-yellow-400 to-cyan-400 shadow-sm" />
            <span>Cyberpunk 2077</span>
          </button>

          <button
            onClick={() => setEdgeColor("sunset")}
            className={`p-2 rounded-xl flex items-center gap-2 border transition ${
              edgeColor === "sunset"
                ? "border-rose-500 bg-rose-500/10 text-rose-300 font-bold"
                : "border-zinc-800 bg-zinc-950 text-zinc-400"
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 shadow-sm" />
            <span>Miami Sunset</span>
          </button>

          <button
            onClick={() => setEdgeColor("cotton_candy")}
            className={`p-2 rounded-xl flex items-center gap-2 border transition ${
              edgeColor === "cotton_candy"
                ? "border-sky-400 bg-sky-500/10 text-sky-300 font-bold"
                : "border-zinc-800 bg-zinc-950 text-zinc-400"
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-purple-400 to-sky-400 shadow-sm" />
            <span>Cotton Candy</span>
          </button>
        </div>

        {/* Solo Neon Colors */}
        <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 border-t border-zinc-800/80">
          <button
            onClick={() => setEdgeColor("emerald")}
            className={`p-2 rounded-xl flex items-center gap-2 border transition ${
              edgeColor === "emerald"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold"
                : "border-zinc-800 bg-zinc-950 text-zinc-400"
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm" />
            <span>Cyber Emerald</span>
          </button>

          <button
            onClick={() => setEdgeColor("cyan")}
            className={`p-2 rounded-xl flex items-center gap-2 border transition ${
              edgeColor === "cyan"
                ? "border-cyan-500 bg-cyan-500/10 text-cyan-300 font-bold"
                : "border-zinc-800 bg-zinc-950 text-zinc-400"
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-sm" />
            <span>Sapphire Cyan</span>
          </button>

          <button
            onClick={() => setEdgeColor("purple")}
            className={`p-2 rounded-xl flex items-center gap-2 border transition ${
              edgeColor === "purple"
                ? "border-purple-500 bg-purple-500/10 text-purple-300 font-bold"
                : "border-zinc-800 bg-zinc-950 text-zinc-400"
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-purple-400 shadow-sm" />
            <span>Neon Violet</span>
          </button>

          <button
            onClick={() => setEdgeColor("amber")}
            className={`p-2 rounded-xl flex items-center gap-2 border transition ${
              edgeColor === "amber"
                ? "border-amber-500 bg-amber-500/10 text-amber-300 font-bold"
                : "border-zinc-800 bg-zinc-950 text-zinc-400"
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm" />
            <span>Sunset Amber</span>
          </button>
        </div>
      </div>

      {/* 5. Notch & Display Customization */}
      <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
        <span className="text-[10px] text-zinc-400 uppercase font-mono block">
          Camera Notch Style
        </span>
        <div className="grid grid-cols-4 gap-1 text-[9px]">
          {[
            { id: "punch_hole", label: "Punch Hole" },
            { id: "dynamic_island", label: "Island Pill" },
            { id: "infinity_u", label: "Infinity-U" },
            { id: "infinity_v", label: "Infinity-V" },
          ].map((notch) => (
            <button
              key={notch.id}
              onClick={() => setNotchStyle(notch.id as NotchStyle)}
              className={`p-1.5 rounded-lg border text-center transition truncate ${
                notchStyle === notch.id
                  ? "border-pink-500 bg-pink-500/20 text-pink-300 font-bold"
                  : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {notch.label}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Sliders (Speed, Border Width, Corner Roundness) */}
      <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
        {/* Speed Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-zinc-300 text-[10px]">
            <span>Animation Flow Speed</span>
            <span className="font-mono text-pink-400 font-bold">{glowSpeed}x</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={glowSpeed}
            onChange={(e) => setGlowSpeed(Number(e.target.value))}
            className="w-full accent-pink-500"
          />
        </div>

        {/* Border Width Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-zinc-300 text-[10px]">
            <span>Border Beam Thickness</span>
            <span className="font-mono text-cyan-400 font-bold">{edgeBorderWidth}px</span>
          </div>
          <input
            type="range"
            min="2"
            max="8"
            value={edgeBorderWidth}
            onChange={(e) => setEdgeBorderWidth(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        {/* Corner Curvature Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-zinc-300 text-[10px]">
            <span>Corner Curvature (Radius)</span>
            <span className="font-mono text-amber-400 font-bold">{cornerRoundness}px</span>
          </div>
          <input
            type="range"
            min="20"
            max="44"
            value={cornerRoundness}
            onChange={(e) => setCornerRoundness(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>

      {/* Technical Canvas Note */}
      <div className="p-3 rounded-2xl bg-pink-950/20 border border-pink-500/30 text-[11px] text-zinc-300 space-y-1">
        <div className="font-semibold text-pink-400 flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5" />
          <span>Hardware Accelerated Android SurfaceView</span>
        </div>
        <p className="text-zinc-400 text-[10px] leading-relaxed">
          Native Android Canvas onDraw routines run with zero memory allocations per frame, delivering steady 60 FPS while consuming &lt; 1.1% battery/hour.
        </p>
      </div>
    </div>
  );
}

interface EdgeBorderOverlayProps {
  edgeType: EdgeType;
  selectedEmoji: EmojiBorder;
  selectedShape: ShapeBorder;
  edgeColor: ColorPalette;
  edgeBorderWidth: number;
  cornerRoundness: number;
}

export function EdgeBorderOverlay({
  edgeType,
  selectedEmoji,
  selectedShape,
  edgeColor,
  edgeBorderWidth,
  cornerRoundness,
}: EdgeBorderOverlayProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
      style={{ borderRadius: `${cornerRoundness}px` }}
    >
      {/* Emojis Edge Border */}
      {edgeType === "emojis" && (
        <div className="w-full h-full relative">
          <div className="absolute top-1 inset-x-2 flex justify-between text-xs animate-pulse">
            {[...Array(8)].map((_, i) => (
              <span key={`top-${i}`} className="transform hover:scale-125 transition drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                {selectedEmoji}
              </span>
            ))}
          </div>
          <div className="absolute bottom-1 inset-x-2 flex justify-between text-xs animate-pulse">
            {[...Array(8)].map((_, i) => (
              <span key={`bot-${i}`} className="transform hover:scale-125 transition drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                {selectedEmoji}
              </span>
            ))}
          </div>
          <div className="absolute left-1 inset-y-8 flex flex-col justify-between text-xs animate-pulse">
            {[...Array(9)].map((_, i) => (
              <span key={`lft-${i}`} className="transform hover:scale-125 transition drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                {selectedEmoji}
              </span>
            ))}
          </div>
          <div className="absolute right-1 inset-y-8 flex flex-col justify-between text-xs animate-pulse">
            {[...Array(9)].map((_, i) => (
              <span key={`rgt-${i}`} className="transform hover:scale-125 transition drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                {selectedEmoji}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Geometric Shapes Edge Border */}
      {edgeType === "shapes" && (
        <div className="w-full h-full relative font-mono font-black">
          <div className="absolute top-1 inset-x-2 flex justify-between text-xs text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse">
            {[...Array(8)].map((_, i) => (
              <span key={`stop-${i}`}>{selectedShape}</span>
            ))}
          </div>
          <div className="absolute bottom-1 inset-x-2 flex justify-between text-xs text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse">
            {[...Array(8)].map((_, i) => (
              <span key={`sbot-${i}`}>{selectedShape}</span>
            ))}
          </div>
          <div className="absolute left-1.5 inset-y-8 flex flex-col justify-between text-xs text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse">
            {[...Array(9)].map((_, i) => (
              <span key={`slft-${i}`}>{selectedShape}</span>
            ))}
          </div>
          <div className="absolute right-1.5 inset-y-8 flex flex-col justify-between text-xs text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse">
            {[...Array(9)].map((_, i) => (
              <span key={`srgt-${i}`}>{selectedShape}</span>
            ))}
          </div>
        </div>
      )}

      {/* Neon Glow, Snake Run, Dotted Chase, or Double Ring */}
      {(edgeType === "neon_glow" ||
        edgeType === "snake_run" ||
        edgeType === "dotted_chase" ||
        edgeType === "double_ring") && (
        <div
          className={`w-full h-full border ${
            edgeType === "dotted_chase"
              ? "border-dotted"
              : edgeType === "snake_run"
              ? "border-dashed"
              : "border-solid"
          } ${
            edgeColor === "rainbow"
              ? "border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.8),inset_0_0_15px_rgba(59,130,246,0.6)]"
              : edgeColor === "cyberpunk"
              ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8),inset_0_0_15px_rgba(6,182,212,0.6)]"
              : edgeColor === "sunset"
              ? "border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.8),inset_0_0_15px_rgba(249,115,22,0.6)]"
              : edgeColor === "cotton_candy"
              ? "border-sky-400 shadow-[0_0_20px_rgba(192,132,252,0.8),inset_0_0_15px_rgba(56,189,248,0.6)]"
              : edgeColor === "cyan"
              ? "border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.9)]"
              : edgeColor === "purple"
              ? "border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.9)]"
              : edgeColor === "amber"
              ? "border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.9)]"
              : "border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.9)]"
          } animate-pulse`}
          style={{
            borderWidth: `${edgeBorderWidth}px`,
            borderRadius: `${cornerRoundness}px`,
          }}
        />
      )}
    </div>
  );
}
