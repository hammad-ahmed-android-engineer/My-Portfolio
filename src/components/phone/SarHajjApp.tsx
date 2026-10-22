"use client";

import React, { useState } from "react";
import {
  MapPin,
  RefreshCw,
  Clock,
  Check,
  CheckCircle2,
  Layers,
  User,
  Phone,
  MessageSquare,
  UtensilsCrossed,
  Shield,
} from "lucide-react";
import { SarCandidate } from "./types";

export function SarHajjApp() {
  const [sarRole, setSarRole] = useState<"admin" | "candidate">("admin");
  const [isSynced, setIsSynced] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [mealConfirmed, setMealConfirmed] = useState(false);
  const [dutyStation] = useState("Platform A - Al-Masha'er, Mina");
  const [dutySession] = useState("Hajj 1446H Peak Stoning Operations");
  const [dutyShift] = useState("Morning Shift: 08:00 AM – 04:00 PM");
  const [dutySupervisor] = useState("Capt. Fahad Al-Otaibi");
  const [selectedStationFilter, setSelectedStationFilter] = useState("All");

  const [sarCandidates, setSarCandidates] = useState<SarCandidate[]>([
    {
      id: "SAR-101",
      name: "Hammad Ahmed",
      role: "Lead Crowd Controller",
      station: "Mina Platform A",
      shift: "08:00 - 16:00",
      status: "present",
      checkInTime: "07:54 AM",
    },
    {
      id: "SAR-102",
      name: "Faisal Al-Zahrani",
      role: "Station Safety Specialist",
      station: "Mina Platform A",
      shift: "08:00 - 16:00",
      status: "present",
      checkInTime: "07:58 AM",
    },
    {
      id: "SAR-103",
      name: "Tariq Mansoor",
      role: "Crowd Flow Marshal",
      station: "Jamarat Post 4",
      shift: "08:00 - 16:00",
      status: "break",
      checkInTime: "08:12 AM",
    },
    {
      id: "SAR-104",
      name: "Sultan Al-Ghamdi",
      role: "Emergency Responder",
      station: "Muzdalifah Sector 2",
      shift: "08:00 - 16:00",
      status: "absent",
      checkInTime: "-",
    },
    {
      id: "SAR-105",
      name: "Omar Al-Harbi",
      role: "Platform Marshaller",
      station: "Mina Platform B",
      shift: "08:00 - 16:00",
      status: "present",
      checkInTime: "08:05 AM",
    },
  ]);

  const handleSimulateSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setIsSynced(true);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950 text-xs">
      {/* App Bar & Role Switcher */}
      <div className="p-3 bg-zinc-900/95 border-b border-zinc-800 space-y-2 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
              SAR
            </div>
            <div>
              <span className="font-bold text-sm tracking-wide text-white">YamamaCM</span>
              <div className="text-[9px] text-zinc-400 font-mono">Hajj 1446H Operations</div>
            </div>
          </div>

          {/* Offline Sync Indicator */}
          <button
            onClick={handleSimulateSync}
            disabled={syncing}
            className="px-2 py-1 text-[9px] font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 flex items-center gap-1 transition"
          >
            <RefreshCw className={`w-2.5 h-2.5 text-emerald-400 ${syncing ? "animate-spin" : ""}`} />
            <span>{syncing ? "Syncing..." : isSynced ? "Room Synced" : "Pending Log"}</span>
          </button>
        </div>

        {/* Role Switcher Tabs (Admin vs Candidate) */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-zinc-950 border border-zinc-800 text-[10px] gap-1 font-semibold">
          <button
            onClick={() => setSarRole("admin")}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
              sarRole === "admin"
                ? "bg-emerald-600 text-white shadow-sm font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>👨‍💼</span>
            <span>Admin Attendance</span>
          </button>

          <button
            onClick={() => setSarRole("candidate")}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
              sarRole === "candidate"
                ? "bg-emerald-600 text-white shadow-sm font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>👷</span>
            <span>Candidate Portal</span>
          </button>
        </div>
      </div>

      {/* Scrollable Screen Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* -------------------------------------------------------------
            SCREEN 1: ADMIN ATTENDANCE PORTAL
            ------------------------------------------------------------- */}
        {sarRole === "admin" && (
          <div className="space-y-3 animate-fade-in">
            {/* Attendance Metric Counters */}
            <div className="grid grid-cols-4 gap-1.5 text-center">
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-[9px] text-zinc-400">Total</div>
                <div className="font-mono font-bold text-white text-xs mt-0.5">
                  {sarCandidates.length}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-[9px] text-emerald-400 font-semibold">Present</div>
                <div className="font-mono font-bold text-emerald-300 text-xs mt-0.5">
                  {sarCandidates.filter((c) => c.status === "present").length}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="text-[9px] text-amber-400 font-semibold">Break</div>
                <div className="font-mono font-bold text-amber-300 text-xs mt-0.5">
                  {sarCandidates.filter((c) => c.status === "break").length}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30">
                <div className="text-[9px] text-red-400 font-semibold">Absent</div>
                <div className="font-mono font-bold text-red-300 text-xs mt-0.5">
                  {sarCandidates.filter((c) => c.status === "absent").length}
                </div>
              </div>
            </div>

            {/* Common Metadata Strip */}
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1 text-[10px]">
              <div className="flex justify-between items-center text-zinc-300">
                <span className="font-bold flex items-center gap-1 text-emerald-400">
                  <MapPin className="w-3 h-3" />
                  <span>Masha&apos;er Hajj Sector</span>
                </span>
                <span className="font-mono text-zinc-400">Shift: 08:00 – 16:00</span>
              </div>
              <div className="text-[9px] text-zinc-400">
                Supervisor In-Charge: <span className="text-white font-semibold">{dutySupervisor}</span>
              </div>
            </div>

            {/* Station Filter Pills */}
            <div className="flex items-center gap-1 text-[9px] overflow-x-auto pb-0.5 no-scrollbar">
              {["All", "Mina", "Jamarat", "Muzdalifah"].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStationFilter(st)}
                  className={`px-2 py-0.5 rounded-full transition whitespace-nowrap ${
                    selectedStationFilter === st
                      ? "bg-emerald-600 text-white font-bold"
                      : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Candidates Attendance Roster List */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-0.5 text-[10px]">
                <span className="font-bold text-zinc-200 uppercase font-mono">
                  Candidate Roster (Take Attendance)
                </span>
                <span className="text-zinc-500 text-[9px]">Tap to update status</span>
              </div>

              {sarCandidates
                .filter(
                  (c) =>
                    selectedStationFilter === "All" ||
                    c.station.toLowerCase().includes(selectedStationFilter.toLowerCase())
                )
                .map((candidate) => (
                  <div
                    key={candidate.id}
                    className="p-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white text-xs">
                            {candidate.name}
                          </span>
                          <span className="text-[8px] font-mono px-1 rounded bg-zinc-800 text-zinc-400">
                            {candidate.id}
                          </span>
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">
                          {candidate.role}
                        </div>
                        <div className="text-[9px] text-zinc-500 mt-0.5 flex items-center gap-1.5">
                          <span>📍 {candidate.station}</span>
                          <span>•</span>
                          <span>Check-in: {candidate.checkInTime}</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          candidate.status === "present"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : candidate.status === "break"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-red-500/20 text-red-300 border border-red-500/30"
                        }`}
                      >
                        {candidate.status}
                      </span>
                    </div>

                    {/* Attendance Selector Actions */}
                    <div className="grid grid-cols-3 gap-1 pt-1 border-t border-zinc-800/80 text-[9px] font-semibold">
                      <button
                        onClick={() => {
                          setSarCandidates((prev) =>
                            prev.map((c) =>
                              c.id === candidate.id ? { ...c, status: "present", checkInTime: "07:55 AM" } : c
                            )
                          );
                          setIsSynced(false);
                        }}
                        className={`py-1 rounded-lg border flex items-center justify-center gap-1 transition ${
                          candidate.status === "present"
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold"
                            : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <Check className="w-2.5 h-2.5" />
                        <span>Present</span>
                      </button>

                      <button
                        onClick={() => {
                          setSarCandidates((prev) =>
                            prev.map((c) =>
                              c.id === candidate.id ? { ...c, status: "break" } : c
                            )
                          );
                          setIsSynced(false);
                        }}
                        className={`py-1 rounded-lg border flex items-center justify-center gap-1 transition ${
                          candidate.status === "break"
                            ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                            : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <Clock className="w-2.5 h-2.5" />
                        <span>Break</span>
                      </button>

                      <button
                        onClick={() => {
                          setSarCandidates((prev) =>
                            prev.map((c) =>
                              c.id === candidate.id ? { ...c, status: "absent", checkInTime: "-" } : c
                            )
                          );
                          setIsSynced(false);
                        }}
                        className={`py-1 rounded-lg border flex items-center justify-center gap-1 transition ${
                          candidate.status === "absent"
                            ? "bg-red-500/20 border-red-500 text-red-300 font-bold"
                            : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <span>Absent</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Bulk Attendance Sync CTA */}
            <button
              onClick={handleSimulateSync}
              disabled={syncing}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950 transition"
            >
              <RefreshCw className={`w-3 h-3 ${syncing ? "animate-spin" : ""}`} />
              <span>{syncing ? "Uploading to Cloud..." : "Sync Attendance to Ministry Cloud"}</span>
            </button>
          </div>
        )}

        {/* -------------------------------------------------------------
            SCREEN 2: CANDIDATE PORTAL (Station, Session, Shift, Supervisor)
            ------------------------------------------------------------- */}
        {sarRole === "candidate" && (
          <div className="space-y-3 animate-fade-in">
            {/* Candidate Badge Card */}
            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs border border-emerald-500/30">
                  HA
                </div>
                <div>
                  <div className="font-bold text-white text-xs">Hammad Ahmed</div>
                  <div className="text-[10px] text-zinc-400">Lead Crowd Controller</div>
                  <span className="text-[8px] font-mono text-emerald-400">Badge #SAR-101 • Verified</span>
                </div>
              </div>
              <span className="text-[8px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                On Duty
              </span>
            </div>

            {/* Common Details Card (Station, Session, Shift, Assigned Supervisor) */}
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2.5 text-[10px]">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="font-bold text-zinc-300 uppercase font-mono">
                  Deployment Information
                </span>
                <span className="text-emerald-400 font-semibold">Active Assignment</span>
              </div>

              {/* Station */}
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[9px] text-zinc-400 font-mono">Assigned Station / Post</div>
                  <div className="font-bold text-white text-xs">{dutyStation}</div>
                  <div className="text-[9px] text-zinc-500">Masha&apos;er Train Platform 1 • Capacity: 84%</div>
                </div>
              </div>

              {/* Session */}
              <div className="flex items-start gap-2 pt-1.5 border-t border-zinc-800/80">
                <Layers className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[9px] text-zinc-400 font-mono">Event / Session</div>
                  <div className="font-semibold text-zinc-200 text-[11px]">{dutySession}</div>
                  <div className="text-[9px] text-zinc-500">Ministry of Hajj Roster #H1446-08</div>
                </div>
              </div>

              {/* Shift */}
              <div className="flex items-start gap-2 pt-1.5 border-t border-zinc-800/80">
                <Clock className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[9px] text-zinc-400 font-mono">Duty Shift &amp; Hours</div>
                  <div className="font-semibold text-zinc-200 text-[11px]">{dutyShift}</div>
                  <div className="text-[9px] text-emerald-400">Checked In: 07:54 AM (3h 48m on post)</div>
                </div>
              </div>

              {/* Assigned Supervisor */}
              <div className="flex items-center justify-between pt-1.5 border-t border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <div>
                    <div className="text-[9px] text-zinc-400 font-mono">Assigned To (Supervisor)</div>
                    <div className="font-bold text-white text-[11px]">{dutySupervisor}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-emerald-400" title="Radio Call">
                    <Phone className="w-3 h-3" />
                  </button>
                  <button className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-cyan-400" title="Message Dispatch">
                    <MessageSquare className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Meal Voucher Card */}
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
                  <span>Hajj Duty Meal Voucher</span>
                </span>
                <span className="text-[9px] text-zinc-400 font-mono">Lunch Session</span>
              </div>
              <p className="text-[10px] text-zinc-400 leading-snug">
                Pickup at Catering Tent B (Mina Gate 4). Room DB token logs validation without network.
              </p>
              <button
                onClick={() => {
                  setMealConfirmed(!mealConfirmed);
                  setIsSynced(false);
                }}
                className={`w-full py-2 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                  mealConfirmed
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{mealConfirmed ? "Meal Confirmed (12:30 PM)" : "Confirm Meal Receipt"}</span>
              </button>
            </div>

            {/* Quick Staff Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <button
                onClick={() => setIsSynced(false)}
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-left transition"
              >
                <Clock className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                <div className="font-bold text-white text-[11px]">Request Break</div>
                <div className="text-[9px] text-zinc-400">15m Prayer / Rest</div>
              </button>

              <button
                onClick={() => setIsSynced(false)}
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-left transition"
              >
                <Shield className="w-3.5 h-3.5 text-rose-400 mb-1" />
                <div className="font-bold text-white text-[11px]">Crowd Incident</div>
                <div className="text-[9px] text-zinc-400">Direct Command Dispatch</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
