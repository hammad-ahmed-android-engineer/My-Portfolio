"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  RefreshCw,
  Sun,
  ChevronLeft,
  Gauge,
  QrCode,
  Zap,
  Music,
  Key,
  Radio,
  Eye,
  Activity,
  Mic,
  Flame,
  Scale,
  SlidersHorizontal,
  Clock,
  Camera,
  Timer,
  CloudSun,
  Compass,
  MessageSquare,
  MapPin,
  Cpu,
  Sparkles,
  FileText,
  Maximize2,
  Layers,
  DollarSign,
  Percent,
  Shield,
  Battery,
  HardDrive,
  Calendar,
  Hash,
} from "lucide-react";

export function ToolboxApp() {
  const [compassDegrees, setCompassDegrees] = useState(142);
  const toolboxScrollRef = useRef<HTMLDivElement>(null);
  const [autoScrollToolbox, setAutoScrollToolbox] = useState(true);
  const [activeToolModal, setActiveToolModal] = useState<string | null>(null);
  const [selectedToolboxFilter, setSelectedToolboxFilter] = useState("All");
  const [tapCounterCount, setTapCounterCount] = useState(14);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [speedTestRunning, setSpeedTestRunning] = useState(false);
  const [speedTestMbps, setSpeedTestMbps] = useState(94.2);
  const [generatedPassword, setGeneratedPassword] = useState("aX9#mK2$vL8@qR4!");
  const [activePianoKey, setActivePianoKey] = useState<string | null>(null);
  const [activeQuickTiles, setActiveQuickTiles] = useState<string[]>(["wifi", "bluetooth", "dark_mode"]);
  const [magnifierZoom, setMagnifierZoom] = useState(2);
  const [qrCopied, setQrCopied] = useState(false);
  const [notesText, setNotesText] = useState(
    "SAR Hajj Task: Verify offline Room DB sync, inspect TETRA channels, distribute meal vouchers."
  );

  // Periodic compass simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCompassDegrees((prev) => (prev + (Math.floor(Math.random() * 5) - 2) + 360) % 360);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Automated Smooth Scrolling for Toolbox tiles
  useEffect(() => {
    if (!autoScrollToolbox || activeToolModal !== null) return;
    const container = toolboxScrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (!container) return;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 4) {
        container.scrollTop = 0;
      } else {
        container.scrollTop += 1;
      }
    }, 45);

    return () => clearInterval(interval);
  }, [autoScrollToolbox, activeToolModal]);

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-zinc-950 text-xs">
      {/* Toolbox Header Strip */}
      <div className="p-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between shrink-0">
        <div>
          <div className="font-black text-sm text-white flex items-center gap-1.5">
            <Grid className="w-4 h-4 text-cyan-400" />
            <span>Droid Toolbox Pro</span>
          </div>
          <div className="text-[9px] text-zinc-400 font-mono">
            36 Embedded Hardware &amp; Sensor Modules
          </div>
        </div>

        {/* Auto-Scroll Toggle */}
        <button
          onClick={() => setAutoScrollToolbox(!autoScrollToolbox)}
          className={`px-2 py-1 rounded-lg text-[9px] font-bold font-mono transition flex items-center gap-1.5 ${
            autoScrollToolbox
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
              : "bg-zinc-800 text-zinc-400 border border-zinc-700"
          }`}
          title="Toggle automatic smooth scrolling"
        >
          <RefreshCw className={`w-2.5 h-2.5 ${autoScrollToolbox ? "animate-spin" : ""}`} />
          <span>Auto-Scroll: {autoScrollToolbox ? "ON" : "OFF"}</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="px-3 py-1.5 bg-zinc-900/40 border-b border-zinc-800/80 flex items-center gap-1 overflow-x-auto shrink-0 no-scrollbar text-[9px]">
        {["All", "Sensors", "Calculators", "Hardware", "Audio & Cam", "System"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedToolboxFilter(cat);
              setActiveToolModal(null);
            }}
            className={`px-2 py-0.5 rounded-full whitespace-nowrap transition ${
              selectedToolboxFilter === cat
                ? "bg-cyan-500 text-black font-bold"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Flashlight Screen Overlay if flashlight is ON */}
      {flashlightOn && (
        <div
          onClick={() => setFlashlightOn(false)}
          className="absolute inset-0 z-40 bg-amber-100 flex flex-col items-center justify-center p-4 text-center cursor-pointer shadow-2xl animate-fade-in"
        >
          <Sun className="w-16 h-16 text-amber-500 animate-pulse mb-3" />
          <div className="text-black font-black text-lg">FLASHLIGHT ACTIVE</div>
          <div className="text-zinc-700 text-xs mt-1">100% Screen White Luminance</div>
          <span className="mt-4 px-3 py-1.5 rounded-xl bg-black text-white text-xs font-bold">
            Tap to Turn OFF
          </span>
        </div>
      )}

      {/* Interactive Tool Modal View */}
      {activeToolModal ? (
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 space-y-3 bg-gradient-to-b from-zinc-900 to-black animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <button
              onClick={() => setActiveToolModal(null)}
              className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>All 36 Tools</span>
            </button>
            <span className="text-[10px] uppercase font-mono text-zinc-500">
              Live Simulation
            </span>
          </div>

          {/* 1. Speed Test Modal */}
          {activeToolModal === "speed_test" && (
            <div className="space-y-3 text-center py-2">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
                <Gauge className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-zinc-400 font-mono">5G Ookla Engine</div>
                <div className="text-3xl font-black font-mono text-cyan-400 mt-1">
                  {speedTestRunning ? "Testing..." : `${speedTestMbps} Mbps`}
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5">
                  Ping: 12ms • Jitter: 1.8ms • Loss: 0.0%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left pt-2">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-[9px] text-zinc-400">Download Speed</div>
                  <div className="font-bold text-white text-xs font-mono">94.20 Mbps</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-[9px] text-zinc-400">Upload Speed</div>
                  <div className="font-bold text-white text-xs font-mono">32.80 Mbps</div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSpeedTestRunning(true);
                  setTimeout(() => {
                    setSpeedTestRunning(false);
                    setSpeedTestMbps(Math.floor(Math.random() * 40) + 85);
                  }, 1000);
                }}
                disabled={speedTestRunning}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-950 transition"
              >
                {speedTestRunning ? "Measuring Latency..." : "Run Speed Test Again"}
              </button>
            </div>
          )}

          {/* 2. Tap Counter Modal */}
          {activeToolModal === "tap_counter" && (
            <div className="space-y-4 text-center py-2">
              <div className="font-bold text-sm text-white">Digital Tally Counter</div>
              <div className="text-5xl font-black font-mono text-emerald-400 py-3">
                {tapCounterCount}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setTapCounterCount((c) => c + 1)}
                  className="flex-1 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-950 transition active:scale-95"
                >
                  + COUNT (TAP)
                </button>
                <button
                  onClick={() => setTapCounterCount(0)}
                  className="px-4 py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* 3. Flashlight Modal */}
          {activeToolModal === "flashlight" && (
            <div className="space-y-4 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                <Zap className="w-7 h-7" />
              </div>
              <div>
                <div className="font-black text-sm text-white">Ultra LED Torch</div>
                <div className="text-[10px] text-zinc-400">Rear Dual-Tone Flash &amp; Screen Light</div>
              </div>
              <button
                onClick={() => setFlashlightOn(true)}
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shadow-lg transition"
              >
                TURN ON SCREEN FLASHLIGHT
              </button>
            </div>
          )}

          {/* 4. Piano Modal */}
          {activeToolModal === "piano" && (
            <div className="space-y-3 py-2 text-center">
              <div className="font-bold text-sm text-white flex items-center justify-center gap-1.5">
                <Music className="w-4 h-4 text-purple-400" />
                <span>Interactive Synth Piano</span>
              </div>
              <div className="text-[10px] text-zinc-400">Tap keys to play musical scale</div>
              <div className="grid grid-cols-7 gap-1 pt-2 h-28">
                {["C", "D", "E", "F", "G", "A", "B"].map((note) => (
                  <button
                    key={note}
                    onClick={() => {
                      setActivePianoKey(note);
                      setTimeout(() => setActivePianoKey(null), 300);
                    }}
                    className={`rounded-xl flex flex-col justify-end pb-2 font-mono font-bold text-xs transition active:scale-95 ${
                      activePianoKey === note
                        ? "bg-purple-500 text-white shadow-lg"
                        : "bg-zinc-200 text-black hover:bg-white"
                    }`}
                  >
                    <span>{note}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 5. Password Generator */}
          {activeToolModal === "password_gen" && (
            <div className="space-y-3 py-2">
              <div className="font-bold text-sm text-white">Crypto Random Password</div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-cyan-400 font-bold text-center text-sm break-all">
                {generatedPassword}
              </div>
              <button
                onClick={() => {
                  const chars =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
                  let pass = "";
                  for (let i = 0; i < 16; i++)
                    pass += chars.charAt(Math.floor(Math.random() * chars.length));
                  setGeneratedPassword(pass);
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
              >
                Generate New 16-Char Key
              </button>
            </div>
          )}

          {/* QR Generator */}
          {activeToolModal === "qr_gen" && (
            <div className="space-y-3 text-center py-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">QR Code Matrix Studio</div>
                <div className="text-[10px] text-zinc-400">Reed-Solomon 2D Barcode (ECC Level H)</div>
              </div>
              <div className="p-3 bg-white rounded-2xl inline-block mx-auto shadow-md">
                <div className="w-24 h-24 grid grid-cols-6 gap-0.5 bg-black p-1 rounded-lg">
                  {[...Array(36)].map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-[1px] ${
                        [0, 1, 4, 5, 6, 11, 18, 23, 24, 29, 30, 31, 34, 35, 14, 21].includes(i)
                          ? "bg-white"
                          : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-emerald-300">
                Encoding: UTF-8 Byte • Payload: https://hammad.dev • 256x256 px
              </div>
              <button
                onClick={() => {
                  setQrCopied(true);
                  setTimeout(() => setQrCopied(false), 1500);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
              >
                {qrCopied ? "Payload Copied to Clipboard!" : "Copy QR Payload Link"}
              </button>
            </div>
          )}

          {/* Metal Detector */}
          {activeToolModal === "metal_detector" && (
            <div className="space-y-3 text-center py-2">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/40">
                <Radio className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Magnetic Flux EMF Meter</div>
                <div className="text-[10px] text-zinc-400">Tri-axial Hall-Effect Ferromagnetic Sensor</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="text-3xl font-black font-mono text-red-400">48.2 μT</div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 w-[48%]" />
                </div>
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                  <span>Earth Datum: ~45 μT</span>
                  <span>Threshold: Normal Field</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-[10px] text-zinc-300">
                Status: Audio Alert Ready • Magnetometer Calibrated (Figure-8)
              </div>
            </div>
          )}

          {/* Magnifier */}
          {activeToolModal === "magnifier" && (
            <div className="space-y-3 text-center py-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/40">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">10x Camera Macro Magnifier</div>
                <div className="text-[10px] text-zinc-400">Telephoto Optical Zoom &amp; Electronic Stabilization</div>
              </div>
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[1, 2, 5, 10].map((z) => (
                  <button
                    key={z}
                    onClick={() => setMagnifierZoom(z)}
                    className={`py-2 rounded-xl font-mono font-bold text-xs transition ${
                      magnifierZoom === z
                        ? "bg-blue-600 text-white shadow-md shadow-blue-900/50"
                        : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                    }`}
                  >
                    {z}x Zoom
                  </button>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-blue-300 text-left space-y-1">
                <div>• Focal Distance: 2.5cm Macro Mode</div>
                <div>• Torch Assist: Ready • Anti-Shake EIS: Active</div>
                <div>• Digital Edge Enhancement: 4K Preview</div>
              </div>
            </div>
          )}

          {/* Sensors Lab */}
          {activeToolModal === "sensors" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/40">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">Hardware Sensors HAL Lab</div>
                <div className="text-[10px] text-zinc-400">Raw Telemetry from On-Device Inertial Sensors</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 text-[9px]">Accelerometer (m/s²)</div>
                  <div className="text-teal-400 font-bold">X: 0.12 Y: 9.81 Z: 0.04</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 text-[9px]">Gyroscope (rad/s)</div>
                  <div className="text-teal-400 font-bold">P: 0.01 R: -0.02</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 text-[9px]">Ambient Light</div>
                  <div className="text-teal-400 font-bold">420 Lux (Adaptive)</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 text-[9px]">Proximity Sensor</div>
                  <div className="text-teal-400 font-bold">5.0 cm (Clear)</div>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 text-center font-mono">
                HAL Driver: Snapdragon Sensor Core • Polling: 60Hz
              </div>
            </div>
          )}

          {/* Voice Recorder */}
          {activeToolModal === "voice_recorder" && (
            <div className="space-y-3 text-center py-2">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Studio Audio Voice Recorder</div>
                <div className="text-[10px] text-zinc-400">Stereo Beamforming Mic • Acoustic Noise Cancellation</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="text-2xl font-black font-mono text-rose-400">00:24.8</div>
                <div className="flex items-center justify-center gap-1 h-6">
                  {[4, 12, 18, 24, 14, 8, 20, 28, 16, 10, 22, 14, 6].map((h, i) => (
                    <div key={i} className="w-1 bg-rose-500 rounded-full animate-pulse" style={{ height: `${h}px` }} />
                  ))}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300">
                Format: Lossless WAV • 48,000Hz • 24-bit PCM Stereo
              </div>
              <button className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition">
                Stop &amp; Save to Audio Store
              </button>
            </div>
          )}

          {/* Thermometer */}
          {activeToolModal === "thermometer" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                  <Sun className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">Device &amp; Thermal Monitor</div>
                <div className="text-[10px] text-zinc-400">Multi-Zone Silicon &amp; Battery Thermistors</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 text-[9px]">Ambient Room</div>
                  <div className="text-amber-400 font-bold text-sm">24.5°C</div>
                  <div className="text-zinc-500 text-[9px]">76.1°F Fahrenheit</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 text-[9px]">CPU Cluster</div>
                  <div className="text-emerald-400 font-bold text-sm">39.2°C</div>
                  <div className="text-zinc-500 text-[9px]">Optimal Cool Range</div>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 space-y-1 font-mono">
                <div className="flex justify-between">
                  <span>Battery Cell Thermistor:</span>
                  <span className="text-amber-400 font-bold">32.0°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Thermal Throttling State:</span>
                  <span className="text-emerald-400 font-bold">0% (Full Performance)</span>
                </div>
              </div>
            </div>
          )}

          {/* Pedometer */}
          {activeToolModal === "pedometer" && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto border border-orange-500/40">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Daily Pedometer &amp; Steps</div>
                <div className="text-[10px] text-zinc-400">Continuous Low-Power Inertial Step Detection</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="text-3xl font-black font-mono text-orange-400">8,420</div>
                <div className="text-[10px] text-zinc-400 font-mono">Goal: 10,000 Steps (84%)</div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden mt-1">
                  <div className="h-full bg-orange-500 w-[84%]" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-500 text-[9px]">Distance</div>
                  <div className="text-white font-bold">5.8 km</div>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-500 text-[9px]">Calories</div>
                  <div className="text-white font-bold">342 kcal</div>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-500 text-[9px]">Active Time</div>
                  <div className="text-white font-bold">52 min</div>
                </div>
              </div>
            </div>
          )}

          {/* BMI */}
          {activeToolModal === "bmi" && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">BMI Body Health Index</div>
                <div className="text-[10px] text-zinc-400">WHO Metric Body Mass Index Classification</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="text-3xl font-black font-mono text-emerald-400">22.4</div>
                <div className="text-[11px] font-bold text-emerald-300">Healthy Normal Weight</div>
                <div className="text-[9px] text-zinc-400 font-mono">WHO Standard Range: 18.5 – 24.9</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-left text-[10px] font-mono">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 text-[9px]">Input Height</div>
                  <div className="text-white font-bold">178 cm (5&apos;10&quot;)</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 text-[9px]">Input Weight</div>
                  <div className="text-white font-bold">71.0 kg (156 lbs)</div>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">
                Ideal Weight Target: 68 – 75 kg • Low Health Risk
              </div>
            </div>
          )}

          {/* Calculator */}
          {activeToolModal === "calculator" && (
            <div className="space-y-2 py-1 text-center">
              <div className="flex items-center justify-between px-1">
                <div className="font-bold text-xs text-white flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                  <span>Scientific Calculator</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-400">IEEE 754 64-bit</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-right space-y-0.5">
                <div className="text-[10px] font-mono text-zinc-500">2,450 × 1.15</div>
                <div className="text-2xl font-black font-mono text-cyan-400">2,817.50</div>
              </div>
              <div className="grid grid-cols-4 gap-1 text-xs font-mono font-bold">
                {["C", "( )", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ".", "±", "="].map((k) => (
                  <button
                    key={k}
                    className={`py-2 rounded-xl transition active:scale-95 ${
                      ["÷", "×", "−", "+", "="].includes(k)
                        ? "bg-cyan-600 hover:bg-cyan-500 text-white"
                        : k === "C"
                        ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                        : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Speedometer */}
          {activeToolModal === "speedometer" && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/40">
                <Gauge className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">GPS Velocity &amp; HUD</div>
                <div className="text-[10px] text-zinc-400">Satellite Doppler Shift Real-Time Ground Speed</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-0.5">
                <div className="text-4xl font-black font-mono text-indigo-400">48</div>
                <div className="text-xs font-bold text-zinc-300">KM / HOUR</div>
                <div className="text-[9px] text-zinc-500 font-mono">29.82 MPH • Heading 142° SE</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-left">
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-500 text-[9px]">Max Recorded</div>
                  <div className="text-white font-bold">74 km/h</div>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-500 text-[9px]">Satellites Lock</div>
                  <div className="text-indigo-400 font-bold">18 / 24 SVs (3D Fix)</div>
                </div>
              </div>
            </div>
          )}

          {/* Unit Converter */}
          {activeToolModal === "unit_converter" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-lime-500/20 text-lime-400 flex items-center justify-center mx-auto border border-lime-500/40">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">Universal Unit Converter</div>
                <div className="text-[10px] text-zinc-400">NIST Standard Dimensional Transformation</div>
              </div>
              <div className="space-y-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                  <div>
                    <div className="text-[9px] text-zinc-500">Length</div>
                    <div className="text-white font-bold">100 Meters (m)</div>
                  </div>
                  <div className="text-lime-400 font-bold">= 328.08 Feet</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                  <div>
                    <div className="text-[9px] text-zinc-500">Mass / Weight</div>
                    <div className="text-white font-bold">75 Kilograms (kg)</div>
                  </div>
                  <div className="text-lime-400 font-bold">= 165.35 Pounds</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                  <div>
                    <div className="text-[9px] text-zinc-500">Temperature</div>
                    <div className="text-white font-bold">25.0 °Celsius</div>
                  </div>
                  <div className="text-lime-400 font-bold">= 77.0 °Fahrenheit</div>
                </div>
              </div>
            </div>
          )}

          {/* World Clock */}
          {activeToolModal === "world_clock" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center mx-auto border border-yellow-500/40">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">World Clock &amp; Timezones</div>
                <div className="text-[10px] text-zinc-400">NTP Stratum 1 Synchronized Atomic Time</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 text-[9px]">Riyadh (AST)</div>
                  <div className="text-yellow-400 font-bold text-sm">15:21</div>
                  <div className="text-zinc-500 text-[9px]">GMT+3 • Local Station</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 text-[9px]">London (BST)</div>
                  <div className="text-white font-bold text-sm">13:21</div>
                  <div className="text-zinc-500 text-[9px]">GMT+1 • -2h Behind</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 text-[9px]">New York (EDT)</div>
                  <div className="text-white font-bold text-sm">08:21</div>
                  <div className="text-zinc-500 text-[9px]">GMT-4 • -7h Behind</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 text-[9px]">Tokyo (JST)</div>
                  <div className="text-white font-bold text-sm">21:21</div>
                  <div className="text-zinc-500 text-[9px]">GMT+9 • +6h Ahead</div>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono text-center">
                Sync: Time.cloudflare.com NTP • Precision: &lt; 2ms
              </div>
            </div>
          )}

          {/* GPS Camera */}
          {activeToolModal === "gps_camera" && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto border border-sky-500/40">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">GPS Geotagged EXIF Stamp</div>
                <div className="text-[10px] text-zinc-400">Embeds WGS84 Datum Watermark into Media</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-left space-y-1.5">
                <div className="text-sky-400 font-bold text-xs">📍 STAMP OVERLAY PREVIEW</div>
                <div className="text-white">Lat: 24.7136° N • Long: 46.6753° E</div>
                <div className="text-zinc-400">Alt: 612m ASL • Heading: 142° SE</div>
                <div className="text-zinc-400">Location: Mina Transit Corridor, KSA</div>
                <div className="text-zinc-500">EXIF 2.32 • Watermark: Enabled</div>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition">
                Capture Watermarked Snapshot
              </button>
            </div>
          )}

          {/* Stopwatch */}
          {activeToolModal === "stopwatch" && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <Timer className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Precision Lap Stopwatch</div>
                <div className="text-[10px] text-zinc-400">Monotonic System Nanotime Engine</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="text-3xl font-black font-mono text-emerald-400">00:14.82</div>
                <div className="text-[10px] text-zinc-400 font-mono">Lap 2 Interval Active</div>
              </div>
              <div className="space-y-1 text-[10px] font-mono text-left">
                <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 flex justify-between text-zinc-300">
                  <span>Lap 2 (Current)</span>
                  <span className="text-emerald-400 font-bold">00:06.62</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 flex justify-between text-zinc-400">
                  <span>Lap 1 (Best)</span>
                  <span className="text-white font-bold">00:08.20</span>
                </div>
              </div>
            </div>
          )}

          {/* Weather */}
          {activeToolModal === "weather" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto border border-amber-400/40">
                  <CloudSun className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">Atmospheric Weather Station</div>
                <div className="text-[10px] text-zinc-400">Meteorological Ground Station Telemetry</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-1">
                <div className="text-3xl font-black font-mono text-amber-300">29°C</div>
                <div className="text-xs font-bold text-white">Clear &amp; Sunny • Riyadh</div>
                <div className="text-[10px] text-zinc-400 font-mono">Feels like 30.5°C • Dew point: 8°C</div>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-500 text-[9px]">Humidity</div>
                  <div className="text-white font-bold">18%</div>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-500 text-[9px]">Wind Speed</div>
                  <div className="text-white font-bold">14 km/h NW</div>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-500 text-[9px]">UV Index</div>
                  <div className="text-amber-400 font-bold">6 Mod</div>
                </div>
              </div>
            </div>
          )}

          {/* Discover */}
          {activeToolModal === "discover" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">Android Developer Tool Radar</div>
                <div className="text-[10px] text-zinc-400">Diagnostic Repositories &amp; ADB Utilities</div>
              </div>
              <div className="space-y-2 text-[10px] font-mono">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <div className="text-cyan-400 font-bold">Room DB Live Profiler</div>
                  <div className="text-zinc-400 text-[9px]">Real-time SQLite transaction tracer with WAL inspect</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <div className="text-cyan-400 font-bold">Jetpack Compose Layout Inspector</div>
                  <div className="text-zinc-400 text-[9px]">Zero-overhead recomposition counter &amp; flame graph</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <div className="text-cyan-400 font-bold">Battery Historian 2.0</div>
                  <div className="text-zinc-400 text-[9px]">WakeLock audit &amp; background alarm frequency analyzer</div>
                </div>
              </div>
            </div>
          )}

          {/* Speech to Text */}
          {activeToolModal === "speech_to_text" && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/40">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">On-Device AI Speech-to-Text</div>
                <div className="text-[10px] text-zinc-400">Zero-Latency Neural Whisper Engine (Fully Offline)</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-left space-y-1.5">
                <div className="text-[9px] text-purple-400 font-mono font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                  <span>LIVE TRANSCRIPTION BUFFER:</span>
                </div>
                <div className="text-zinc-200 text-xs italic font-serif leading-relaxed">
                  &ldquo;Native Android speech recognition running locally via 4-bit quantized Whisper model. Zero network required, preserving full user privacy.&rdquo;
                </div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 flex justify-between">
                <span>Latency: 42ms</span>
                <span>Model: Whisper-Tiny-Q4</span>
                <span>Accuracy: 98.7%</span>
              </div>
            </div>
          )}

          {/* Altimeter */}
          {activeToolModal === "altimeter" && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Barometric Altimeter</div>
                <div className="text-[10px] text-zinc-400">Hypsometric True Elevation Above Mean Sea Level</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="text-3xl font-black font-mono text-emerald-400">612 m</div>
                <div className="text-xs font-bold text-zinc-300">2,008 FT ELEVATION</div>
                <div className="text-[9px] text-zinc-400 font-mono">Datum: Standard 1013.25 hPa</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-left">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-500 text-[9px]">Air Pressure</div>
                  <div className="text-white font-bold">948.2 hPa</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-500 text-[9px]">Vertical Speed</div>
                  <div className="text-white font-bold">0.0 m/s (Stationary)</div>
                </div>
              </div>
            </div>
          )}

          {/* Device Info */}
          {activeToolModal === "device_info" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/40">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">Hardware &amp; SoC Diagnostics</div>
                <div className="text-[10px] text-zinc-400">Kernel Hardware Abstraction Layer Architecture</div>
              </div>
              <div className="space-y-1.5 text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">Processor:</span>
                  <span className="text-white font-bold">Snapdragon 8 Gen 3 (4nm)</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">CPU Architecture:</span>
                  <span className="text-white font-bold">1x X4 3.3GHz + 5x A720 + 2x A520</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">Graphics GPU:</span>
                  <span className="text-red-400 font-bold">Adreno 750 (Hardware RT)</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">Android OS:</span>
                  <span className="text-emerald-400 font-bold">Android 15 (API 35)</span>
                </div>
              </div>
            </div>
          )}

          {/* Color Detector */}
          {activeToolModal === "color_detector" && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto border border-pink-500/40">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Optical Color Inspector</div>
                <div className="text-[10px] text-zinc-400">Camera Luminance &amp; Chromaticity CIE L*a*b* Sampler</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#38BDF8] shadow-lg shrink-0 border-2 border-white/40" />
                <div className="text-left font-mono text-[10px] space-y-0.5">
                  <div className="text-white font-bold text-xs">Sky Blue (#38BDF8)</div>
                  <div className="text-zinc-400">RGB: (56, 189, 248)</div>
                  <div className="text-zinc-400">HSL: 198°, 93%, 60%</div>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                Color Space: sRGB D65 Standard • Palette Match: High
              </div>
            </div>
          )}

          {/* Notes Pad */}
          {activeToolModal === "notes" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">Encrypted Notes Scratchpad</div>
                <div className="text-[10px] text-zinc-400">Hardware AES-256 GCM SQLite Room Database</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="w-full h-20 bg-transparent text-white text-xs font-mono resize-none focus:outline-none"
                />
                <div className="flex justify-between items-center text-[9px] text-zinc-500 font-mono border-t border-zinc-800 pt-1.5">
                  <span>{notesText.length} characters</span>
                  <span className="text-emerald-400 font-bold">✓ Saved to Encrypted Room DB</span>
                </div>
              </div>
            </div>
          )}

          {/* Compass */}
          {activeToolModal === "compass" && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/40">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">3D Magnetic Compass</div>
                <div className="text-[10px] text-zinc-400">Tilt-Compensated Vector Magnetometer</div>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="text-4xl font-black font-mono text-teal-400">{compassDegrees}°</div>
                <div className="text-xs font-bold text-zinc-200">SOUTH-EAST (SE)</div>
                <div className="text-[9px] text-zinc-400 font-mono">Magnetic Declination: +3.2° East</div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                Sensor: AKM AK09918C 3-Axis • Calibration: Level 3 (High)
              </div>
            </div>
          )}

          {/* Ruler */}
          {activeToolModal === "ruler" && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/40">
                <Maximize2 className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Screen Caliper &amp; Ruler</div>
                <div className="text-[10px] text-zinc-400">OLED Display PPI Calibrated Scale</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="text-2xl font-black font-mono text-blue-400">42.5 mm</div>
                <div className="text-[10px] text-zinc-400 font-mono">1.673 Inches</div>
                <div className="w-full h-8 bg-zinc-950 border border-zinc-800 rounded-lg flex items-end justify-between px-2 pb-1">
                  {[...Array(11)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className={`w-0.5 bg-blue-400 ${i % 5 === 0 ? "h-4" : "h-2"}`} />
                      {i % 5 === 0 && <span className="text-[7px] text-zinc-500 font-mono mt-0.5">{i * 10}</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                Panel Calibration: 460 DPI • Accuracy Margin: &lt; 0.1mm
              </div>
            </div>
          )}

          {/* Area Converter */}
          {activeToolModal === "area_converter" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-lime-500/20 text-lime-400 flex items-center justify-center mx-auto border border-lime-500/40">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">Land &amp; Surface Area Converter</div>
                <div className="text-[10px] text-zinc-400">Cadastral &amp; Architectural Dimensional Scaling</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1.5 font-mono text-[10px]">
                <div className="text-zinc-400 text-[9px]">Base Surface: 500 m² (Square Meters)</div>
                <div className="text-white font-bold flex justify-between">
                  <span>Square Feet (sq ft):</span>
                  <span className="text-lime-400">5,381.96 sq ft</span>
                </div>
                <div className="text-white font-bold flex justify-between">
                  <span>Acres:</span>
                  <span className="text-lime-400">0.1235 Acres</span>
                </div>
                <div className="text-white font-bold flex justify-between">
                  <span>Hectares:</span>
                  <span className="text-lime-400">0.0500 Hectares</span>
                </div>
              </div>
            </div>
          )}

          {/* Fuel Cost */}
          {activeToolModal === "fuel_cost" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">Trip Fuel &amp; Cost Estimator</div>
                <div className="text-[10px] text-zinc-400">Vehicle Consumption &amp; Journey Fuel Expense</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-1">
                <div className="text-3xl font-black font-mono text-amber-400">41.94 SAR</div>
                <div className="text-[10px] text-zinc-400 font-mono">Trip Fuel Cost for 250 km</div>
              </div>
              <div className="space-y-1.5 text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">Fuel Required:</span>
                  <span className="text-white font-bold">18.0 Liters (7.2L/100km)</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">KSA Octane 91 Price:</span>
                  <span className="text-white font-bold">2.33 SAR / Liter</span>
                </div>
              </div>
            </div>
          )}

          {/* Currency Converter */}
          {activeToolModal === "currency_converter" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <Percent className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">Live Currency &amp; Forex Rates</div>
                <div className="text-[10px] text-zinc-400">Saudi Central Bank (SAMA) Pegged &amp; Market FX</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1 text-center">
                <div className="text-2xl font-black font-mono text-emerald-400">100 USD = 375.00 SAR</div>
                <div className="text-[9px] text-zinc-500 font-mono">Official Peg: 1 USD = 3.7500 SAR</div>
              </div>
              <div className="space-y-1.5 text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">100 EUR (Euro):</span>
                  <span className="text-white font-bold">408.20 SAR</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">100 GBP (Pound):</span>
                  <span className="text-white font-bold">488.50 SAR</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">100 AED (Dirham):</span>
                  <span className="text-white font-bold">102.10 SAR</span>
                </div>
              </div>
            </div>
          )}

          {/* Bubble Level */}
          {activeToolModal === "bubble_level" && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Dual-Axis Surface Bubble Level</div>
                <div className="text-[10px] text-zinc-400">Gravity Inclinometer with Kalman Noise Filtering</div>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center space-y-2">
                <div className="w-24 h-24 rounded-full border-2 border-zinc-700 relative flex items-center justify-center bg-zinc-950 shadow-inner">
                  <div className="w-14 h-14 rounded-full border border-dashed border-zinc-600" />
                  <div className="w-6 h-6 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] transform translate-x-0.5 -translate-y-0.5" />
                </div>
                <div className="text-xs font-bold font-mono text-emerald-400">Pitch: +0.2° • Roll: -0.1°</div>
                <div className="text-[10px] text-zinc-400">Surface Level (±0.5° Tolerance Satisfied)</div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                Sensor: Bosch BMI260 IMU • Sampling: 100Hz
              </div>
            </div>
          )}

          {/* Battery Health */}
          {activeToolModal === "battery" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <Battery className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">Battery Health &amp; Diagnostics</div>
                <div className="text-[10px] text-zinc-400">Coulomb Counter Fuel Gauge &amp; Cell Impedance</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-1">
                <div className="text-3xl font-black font-mono text-emerald-400">94%</div>
                <div className="text-xs font-bold text-white">Battery State: Discharging (Idle 180mA)</div>
                <div className="text-[10px] text-emerald-300 font-mono">Health: Excellent (4,820 / 5,000 mAh)</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-500 text-[9px]">Cell Voltage</div>
                  <div className="text-white font-bold">4.18 Volts</div>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-500 text-[9px]">Cycle Count</div>
                  <div className="text-white font-bold">142 Cycles</div>
                </div>
              </div>
            </div>
          )}

          {/* RAM & Storage */}
          {activeToolModal === "memory" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/40">
                  <HardDrive className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">RAM &amp; Storage Architecture</div>
                <div className="text-[10px] text-zinc-400">Kernel Virtual Memory &amp; UFS 4.0 Partition Metrics</div>
              </div>
              <div className="space-y-2 text-[10px] font-mono">
                <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                  <div className="flex justify-between text-white font-bold">
                    <span>LPDDR5X RAM</span>
                    <span className="text-indigo-400">4.2 / 12.0 GB (35%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[35%]" />
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                  <div className="flex justify-between text-white font-bold">
                    <span>UFS 4.0 Internal Storage</span>
                    <span className="text-sky-400">128 / 512 GB (25%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-sky-500 w-[25%]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Age Calculator */}
          {activeToolModal === "age_calculator" && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/40">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Chronological Age Calculator</div>
                <div className="text-[10px] text-zinc-400">Gregorian &amp; Hijri Leap Year Calibrated</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="text-2xl font-black font-mono text-purple-400">26 Yrs, 4 Mos, 18 Days</div>
                <div className="text-[10px] text-zinc-300 font-mono">Total Alive: 9,636 Days (231,264 Hours)</div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                Next Birthday: In 228 Days • Turning 27
              </div>
            </div>
          )}

          {/* Tiles */}
          {activeToolModal === "tiles" && (
            <div className="space-y-3 py-2 text-left">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto border border-sky-500/40">
                  <Grid className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">Android Quick Settings Hub</div>
                <div className="text-[10px] text-zinc-400">Notification Drawer Broadcast Receiver Controls</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {[
                  { id: "wifi", label: "Wi-Fi (5GHz)", active: activeQuickTiles.includes("wifi") },
                  { id: "bluetooth", label: "Bluetooth", active: activeQuickTiles.includes("bluetooth") },
                  { id: "dark_mode", label: "Dark Theme", active: activeQuickTiles.includes("dark_mode") },
                  { id: "nfc", label: "NFC Beam", active: activeQuickTiles.includes("nfc") },
                  { id: "hotspot", label: "Hotspot", active: activeQuickTiles.includes("hotspot") },
                  { id: "dnd", label: "Do Not Disturb", active: activeQuickTiles.includes("dnd") },
                ].map((tile) => (
                  <button
                    key={tile.id}
                    onClick={() =>
                      setActiveQuickTiles((prev) =>
                        prev.includes(tile.id) ? prev.filter((x) => x !== tile.id) : [...prev, tile.id]
                      )
                    }
                    className={`p-2.5 rounded-xl border font-bold text-left transition flex items-center justify-between ${
                      tile.active
                        ? "bg-sky-600/30 border-sky-500/60 text-sky-300"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400"
                    }`}
                  >
                    <span>{tile.label}</span>
                    <span className={`w-2 h-2 rounded-full ${tile.active ? "bg-sky-400" : "bg-zinc-600"}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Auto-scrolling Tiles Grid for all tools */
        <div
          ref={toolboxScrollRef}
          onWheel={() => {
            if (autoScrollToolbox) setAutoScrollToolbox(false);
          }}
          onTouchStart={() => {
            if (autoScrollToolbox) setAutoScrollToolbox(false);
          }}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 space-y-2 bg-gradient-to-b from-zinc-900/60 to-black select-none"
        >
          {/* Grid of 36 Tools */}
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                id: "speed_test",
                name: "Speed Test",
                cat: "Utilities",
                icon: <Gauge className="w-4 h-4 text-cyan-400" />,
                desc: "94.2 Mbps • 12ms ping",
                badge: "Network",
              },
              {
                id: "qr_gen",
                name: "QR Generator",
                cat: "Utilities",
                icon: <QrCode className="w-4 h-4 text-emerald-400" />,
                desc: "Scan & create codes",
                badge: "Utility",
              },
              {
                id: "flashlight",
                name: "Flashlight",
                cat: "Hardware",
                icon: <Zap className="w-4 h-4 text-amber-400" />,
                desc: "SOS Strobe & Torch",
                badge: "Hardware",
              },
              {
                id: "password_gen",
                name: "Password Gen",
                cat: "Utilities",
                icon: <Key className="w-4 h-4 text-purple-400" />,
                desc: "16-char crypto random",
                badge: "Security",
              },
              {
                id: "metal_detector",
                name: "Metal Detector",
                cat: "Sensors",
                icon: <Radio className="w-4 h-4 text-red-400" />,
                desc: "Magnetic flux 48.2 μT",
                badge: "Sensors",
              },
              {
                id: "piano",
                name: "Synth Piano",
                cat: "Audio & Cam",
                icon: <Music className="w-4 h-4 text-pink-400" />,
                desc: "8-key musical synth",
                badge: "Audio",
              },
              {
                id: "magnifier",
                name: "Magnifier",
                cat: "Hardware",
                icon: <Eye className="w-4 h-4 text-blue-400" />,
                desc: "10x camera macro zoom",
                badge: "Camera",
              },
              {
                id: "sensors",
                name: "Sensors Lab",
                cat: "Sensors",
                icon: <Activity className="w-4 h-4 text-teal-400" />,
                desc: "Gyro, Barometer, Light",
                badge: "Hardware",
              },
              {
                id: "voice_recorder",
                name: "Voice Recorder",
                cat: "Audio & Cam",
                icon: <Mic className="w-4 h-4 text-rose-400" />,
                desc: "48kHz WAV HQ audio",
                badge: "Audio",
              },
              {
                id: "thermometer",
                name: "Thermometer",
                cat: "Sensors",
                icon: <Sun className="w-4 h-4 text-amber-400" />,
                desc: "Ambient 24.5°C",
                badge: "Sensors",
              },
              {
                id: "pedometer",
                name: "Pedometer",
                cat: "Sensors",
                icon: <Flame className="w-4 h-4 text-orange-400" />,
                desc: "8,420 steps • 3.4 km",
                badge: "Health",
              },
              {
                id: "bmi",
                name: "BMI Calculator",
                cat: "Calculators",
                icon: <Scale className="w-4 h-4 text-emerald-400" />,
                desc: "22.4 Normal range",
                badge: "Health",
              },
              {
                id: "calculator",
                name: "Calculator",
                cat: "Calculators",
                icon: <SlidersHorizontal className="w-4 h-4 text-cyan-400" />,
                desc: "Scientific & standard",
                badge: "Calc",
              },
              {
                id: "speedometer",
                name: "Speedometer",
                cat: "Sensors",
                icon: <Gauge className="w-4 h-4 text-indigo-400" />,
                desc: "48 km/h GPS live",
                badge: "GPS",
              },
              {
                id: "unit_converter",
                name: "Unit Converter",
                cat: "Calculators",
                icon: <RefreshCw className="w-4 h-4 text-lime-400" />,
                desc: "Length, mass, temp",
                badge: "Convert",
              },
              {
                id: "world_clock",
                name: "World Clock",
                cat: "Utilities",
                icon: <Clock className="w-4 h-4 text-yellow-400" />,
                desc: "Riyadh, Tokyo, London",
                badge: "Clock",
              },
              {
                id: "gps_camera",
                name: "GPS Camera",
                cat: "Hardware",
                icon: <Camera className="w-4 h-4 text-sky-400" />,
                desc: "Geotagged EXIF stamps",
                badge: "Camera",
              },
              {
                id: "stopwatch",
                name: "Stopwatch",
                cat: "Utilities",
                icon: <Timer className="w-4 h-4 text-emerald-400" />,
                desc: "00:14.82 millisecond lap",
                badge: "Timer",
              },
              {
                id: "weather",
                name: "Live Weather",
                cat: "Utilities",
                icon: <CloudSun className="w-4 h-4 text-amber-300" />,
                desc: "29°C Sunny • Riyadh",
                badge: "Weather",
              },
              {
                id: "discover",
                name: "Tool Discover",
                cat: "Utilities",
                icon: <Compass className="w-4 h-4 text-cyan-400" />,
                desc: "Android radar feed",
                badge: "Feed",
              },
              {
                id: "speech_to_text",
                name: "Speech to Text",
                cat: "Audio & Cam",
                icon: <MessageSquare className="w-4 h-4 text-purple-400" />,
                desc: "On-device AI speech",
                badge: "AI",
              },
              {
                id: "altimeter",
                name: "Altimeter",
                cat: "Sensors",
                icon: <MapPin className="w-4 h-4 text-emerald-400" />,
                desc: "612m above sea level",
                badge: "Altitude",
              },
              {
                id: "device_info",
                name: "Device Info",
                cat: "System",
                icon: <Cpu className="w-4 h-4 text-red-400" />,
                desc: "Snapdragon 8 Gen 3",
                badge: "System",
              },
              {
                id: "color_detector",
                name: "Color Detector",
                cat: "Hardware",
                icon: <Sparkles className="w-4 h-4 text-pink-400" />,
                desc: "Hex & RGB camera picker",
                badge: "Color",
              },
              {
                id: "notes",
                name: "Notes Pad",
                cat: "Utilities",
                icon: <FileText className="w-4 h-4 text-amber-400" />,
                desc: "Encrypted scratchpad",
                badge: "Offline",
              },
              {
                id: "compass",
                name: "Compass",
                cat: "Sensors",
                icon: <Compass className="w-4 h-4 text-teal-400" />,
                desc: `${compassDegrees}° SE Magnetic`,
                badge: "Sensors",
              },
              {
                id: "ruler",
                name: "Screen Ruler",
                cat: "Hardware",
                icon: <Maximize2 className="w-4 h-4 text-blue-400" />,
                desc: "Sub-mm caliper",
                badge: "Measure",
              },
              {
                id: "area_converter",
                name: "Area Converter",
                cat: "Calculators",
                icon: <Layers className="w-4 h-4 text-lime-400" />,
                desc: "m², acres, hectares",
                badge: "Area",
              },
              {
                id: "fuel_cost",
                name: "Fuel Cost",
                cat: "Calculators",
                icon: <DollarSign className="w-4 h-4 text-amber-400" />,
                desc: "Trip cost estimator",
                badge: "Travel",
              },
              {
                id: "currency_converter",
                name: "Currency Conv.",
                cat: "Calculators",
                icon: <Percent className="w-4 h-4 text-emerald-400" />,
                desc: "1 USD = 3.75 SAR",
                badge: "Forex",
              },
              {
                id: "bubble_level",
                name: "Bubble Leveler",
                cat: "Sensors",
                icon: <Shield className="w-4 h-4 text-cyan-400" />,
                desc: "0.2° Dual pitch/roll",
                badge: "Level",
              },
              {
                id: "battery",
                name: "Battery Health",
                cat: "System",
                icon: <Battery className="w-4 h-4 text-emerald-400" />,
                desc: "94% • 38°C • Good",
                badge: "Battery",
              },
              {
                id: "memory",
                name: "RAM & Storage",
                cat: "System",
                icon: <HardDrive className="w-4 h-4 text-indigo-400" />,
                desc: "RAM 4.2/12GB",
                badge: "Memory",
              },
              {
                id: "age_calculator",
                name: "Age Calculator",
                cat: "Calculators",
                icon: <Calendar className="w-4 h-4 text-purple-400" />,
                desc: "Exact years & days",
                badge: "Age",
              },
              {
                id: "tap_counter",
                name: "Tap Counter",
                cat: "Utilities",
                icon: <Hash className="w-4 h-4 text-rose-400" />,
                desc: `Tally: ${tapCounterCount} taps`,
                badge: "Tally",
              },
              {
                id: "tiles",
                name: "Quick Tiles",
                cat: "System",
                icon: <Grid className="w-4 h-4 text-sky-400" />,
                desc: "Tiles & shortcuts hub",
                badge: "Tiles",
              },
            ]
              .filter(
                (tool) =>
                  selectedToolboxFilter === "All" ||
                  tool.cat.toLowerCase().includes(selectedToolboxFilter.toLowerCase())
              )
              .map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => setActiveToolModal(tool.id)}
                  className="p-2.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/50 transition cursor-pointer flex items-center gap-2.5 group shadow-sm active:scale-95"
                >
                  <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                    {tool.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-[11px] truncate">
                        {tool.name}
                      </span>
                      <span className="text-[7px] font-mono px-1 py-0.2 rounded bg-zinc-800 text-zinc-400">
                        {tool.badge}
                      </span>
                    </div>
                    <div className="text-[9px] text-zinc-400 truncate mt-0.5 font-mono">
                      {tool.desc}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="pt-2 text-center pb-2">
            <span className="text-[9px] text-zinc-500 font-mono">
              All tools embedded in unified APK &lt; 15 MB
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
