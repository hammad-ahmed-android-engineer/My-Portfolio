"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Sparkles,
  FolderGit2,
  Briefcase,
  Layers,
  GraduationCap,
  BarChart3,
  Globe,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Save,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import {
  PortfolioData,
  PersonalInfo,
  Service,
  Project,
  Experience,
  Education,
  SkillCategory,
  MetricItem,
} from "@/types/portfolio";
import { AdminTab, AdminNotification } from "@/types/admin";
import { SeoStatus, SeoPingResponse } from "@/types/api";
import { apiClient } from "@/utils/apiClient";
import { ProfileTab } from "@/components/admin/tabs/ProfileTab";
import { ServicesTab } from "@/components/admin/tabs/ServicesTab";
import { ProjectsTab } from "@/components/admin/tabs/ProjectsTab";
import { ExperienceTab } from "@/components/admin/tabs/ExperienceTab";
import { SkillsTab } from "@/components/admin/tabs/SkillsTab";
import { EducationTab } from "@/components/admin/tabs/EducationTab";
import { MetricsTab } from "@/components/admin/tabs/MetricsTab";
import { SeoTab } from "@/components/admin/tabs/SeoTab";
import { SettingsTab, DeletableSectionKey } from "@/components/admin/tabs/SettingsTab";
import { ConfirmDeleteModal } from "@/components/admin/common/ConfirmDeleteModal";

interface PendingDelete {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
}

export function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<AdminNotification | null>(null);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);

  // SEO ping state
  const [isPinging, setIsPinging] = useState(false);
  const [seoStatus, setSeoStatus] = useState<SeoStatus | null>(null);
  const [pingResult, setPingResult] = useState<SeoPingResponse | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const portfolio = await apiClient.getPortfolio();
        setData(portfolio);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to load data";
        if (message.includes("Unauthorized") || message.includes("status 401")) {
          router.push("/admin-panel/login");
          return;
        }
        const cached = apiClient.getCachedPortfolio();
        if (cached) {
          setData(cached);
          showNotification("success", "Loaded cached portfolio");
        } else {
          setNotification({
            type: "error",
            message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [router]);

  useEffect(() => {
    if (activeTab === "seo" && !seoStatus) {
      apiClient.getSeoStatus().then(setSeoStatus).catch(() => { });
    }
  }, [activeTab, seoStatus]);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    window.setTimeout(() => setNotification(null), 4000);
  };

  const requestConfirmDelete = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmLabel = "Delete Permanently"
  ) => {
    setPendingDelete({ title, message, onConfirm, confirmLabel });
  };

    const savePortfolioData = async (
      nextData: PortfolioData,
      successMessage = "Your changes have been saved successfully"
    ): Promise<boolean> => {
      setIsSaving(true);
      try {
        const updated = await apiClient.savePortfolio(nextData);
        setData(updated);
        showNotification("success", successMessage);
        return true;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error saving changes";
        if (message.includes("Unauthorized") || message.includes("status 401")) {
          router.push("/admin-panel/login");
          return false;
        }
        showNotification("error", message);
        return false;
      } finally {
        setIsSaving(false);
      }
    };

    const handleSave = async () => {
      if (!data) return;
      await savePortfolioData(data);
    };

    const handleLogout = async () => {
      await apiClient.logout();
      router.push("/admin-panel/login");
    };

    const handleReseed = async () => {
      requestConfirmDelete(
        "Reload Database Data?",
        "Are you sure you want to discard unsaved local edits and reload the current portfolio data directly from MongoDB?",
        async () => {
          setIsSaving(true);
          try {
            const reseeded = await apiClient.reseedPortfolio();
            setData(reseeded);
            showNotification("success", "Portfolio content reloaded from MongoDB!");
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Error reloading content";
            showNotification("error", message);
          } finally {
            setIsSaving(false);
          }
        },
        "Confirm Reload"
      );
    };

    const handleClearSection = (section: DeletableSectionKey, label: string) => {
      if (!data) return;
      requestConfirmDelete(
        `Delete All ${label}?`,
        `Are you sure you want to delete all ${data[section].length} records in "${label}"? Click "Save All Changes" afterward to persist this deletion to MongoDB.`,
        () => {
          setData({
            ...data,
            [section]: [],
          });
          showNotification("success", `Deleted all records in "${label}"`);
        },
        `Delete ${label}`
      );
    };

    const handleClearCache = () => {
      requestConfirmDelete(
        "Clear Local Admin Cache?",
        "Are you sure you want to delete the cached portfolio data stored in your browser's local storage?",
        () => {
          try {
            localStorage.removeItem("hammad_portfolio_cache_v1");
            showNotification("success", "Local browser cache cleared successfully!");
          } catch {
            showNotification("error", "Failed to clear browser cache");
          }
        },
        "Clear Cache"
      );
    };

    const handleDeleteAllData = () => {
      if (!data) return;
      requestConfirmDelete(
        "Delete All Portfolio Section Data?",
        "Are you sure you want to delete all records across Work Experience, Projects, Services, Skills, Education, and Metrics at once? Click 'Save All Changes' afterward if you want to persist this to MongoDB.",
        () => {
          setData({
            ...data,
            experiences: [],
            projects: [],
            services: [],
            skills: [],
            education: [],
            metrics: [],
          });
          showNotification("success", "All portfolio section lists cleared!");
        },
        "Delete All Data"
      );
    };

    const handlePingSearchEngines = async () => {
      setIsPinging(true);
      try {
        const res = await apiClient.pingSearchEngines();
        setPingResult(res);
        showNotification("success", "Search engines pinged successfully!");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to ping search engines";
        showNotification("error", message);
      } finally {
        setIsPinging(false);
      }
    };

    // 1. Profile helpers
    const updateProfile = (field: keyof PersonalInfo, value: any) => {
      if (!data) return;
      setData({
        ...data,
        personalInfo: {
          ...data.personalInfo,
          [field]: value,
        },
      });
    };

    const updateStat = (field: string, value: string) => {
      if (!data) return;
      setData({
        ...data,
        personalInfo: {
          ...data.personalInfo,
          stats: {
            ...(data.personalInfo.stats ?? {}),
            [field]: value,
          },
        },
      });
    };

    const removeStat = (field: string) => {
      if (!data) return;
      requestConfirmDelete(
        "Delete Profile Metric?",
        `Are you sure you want to delete the profile stat "${field}"?`,
        () => {
          const statsCopy = { ...(data.personalInfo.stats ?? {}) };
          delete statsCopy[field];
          setData({
            ...data,
            personalInfo: {
              ...data.personalInfo,
              stats: statsCopy,
            },
          });
          showNotification("success", `Removed stat "${field}"`);
        }
      );
    };

    const updateCoverLetter = (text: string) => {
      if (!data) return;
      setData({ ...data, coverLetterText: text });
    };

    // 2. Services helpers
    const updateService = (index: number, field: keyof Service, value: any) => {
      if (!data) return;
      const updated = [...data.services];
      updated[index] = { ...updated[index], [field]: value };
      setData({ ...data, services: updated });
    };

      const addService = async (customService?: Service): Promise<boolean> => {
        if (!data) return false;
        const newService: Service = customService || {
          id: `service-${Date.now()}`,
          title: "New Android Service",
          subtitle: "Enterprise Mobile Engineering",
          description: "Architecture, implementation, and optimization of robust Android applications.",
          icon: "Smartphone",
          deliverables: ["Production-ready feature deliverables"],
          tags: ["Kotlin", "Jetpack Compose"],
          order: data.services.length + 1,
          featured: true,
        };
        const nextData: PortfolioData = {
          ...data,
          services: [...data.services, newService],
        };
        setData(nextData);
        return await savePortfolioData(nextData, `Saved service "${newService.title}"`);
      };

      const removeService = (index: number) => {
        if (!data) return;
        const target = data.services[index];
        requestConfirmDelete(
          "Delete Service?",
          `Are you sure you want to delete the service "${target?.title || `#${index + 1}`}"?`,
              async() => {
    const nextData: PortfolioData = {
      ...data,
      services: data.services.filter((_, i) => i !== index),
  };
  setData(nextData);
  await savePortfolioData(nextData, `Deleted service "${target?.title}"`);
}
    );
  };

// 3. Projects helpers
const updateProject = (index: number, field: keyof Project, value: any) => {
  if (!data) return;
  const updated = [...data.projects];
  updated[index] = { ...updated[index], [field]: value };
  setData({ ...data, projects: updated });
};

const updateProjectArchitecture = (index: number, field: string, value: any) => {
  if (!data) return;
  const updated = [...data.projects];
  updated[index] = {
    ...updated[index],
    architectureDetails: {
      ...updated[index].architectureDetails,
      [field]: value,
    },
  };
  setData({ ...data, projects: updated });
};

  const addProject = async (customProj?: Project): Promise<boolean> => {
    if (!data) return false;
    const newProj: Project = customProj || {
      id: `proj-${Date.now()}`,
      title: "New Android Project",
      subtitle: "Enterprise Mobile Application",
      clientOrCompany: "Enterprise Client",
      role: "Senior Android Engineer",
      category: "Enterprise",
      image: "",
      impactHighlight: "High-Performance Delivery",
      summary: "Modern native Android application engineered with Jetpack Compose.",
      techStack: ["Kotlin", "Jetpack Compose", "Coroutines", "Room"],
      features: ["Offline-first synchronization", "Clean Architecture"],
      architectureDetails: {
        pattern: "Clean Architecture + MVI",
        offlineStrategy: "Room DB + Flow",
        highlights: ["Modular domain layer"],
      },
      metrics: [{ label: "Crash-Free", value: "99.99%" }],
      featured: true,
      order: data.projects.length + 1,
    };
    const nextData: PortfolioData = {
      ...data,
      projects: [...data.projects, newProj],
    };
    setData(nextData);
    return await savePortfolioData(nextData, `Saved project "${newProj.title}"`);
  };

  const removeProject = (index: number) => {
    if (!data) return;
    const target = data.projects[index];
    requestConfirmDelete(
      "Delete Project?",
      `Are you sure you want to delete the project "${target?.title || `#${index + 1}`}" (${target?.clientOrCompany || ""})?`,
          async() => {
  const nextData: PortfolioData = {
    ...data,
    projects: data.projects.filter((_, i) => i !== index),
};
setData(nextData);
await savePortfolioData(nextData, `Deleted project "${target?.title}"`);
      }
    );
  };

// 4. Experience helpers
const updateExperience = (index: number, field: keyof Experience, value: any) => {
  if (!data) return;
  const updated = [...data.experiences];
  updated[index] = { ...updated[index], [field]: value };
  setData({ ...data, experiences: updated });
};

  const addExperience = async (customExp?: Experience): Promise<boolean> => {
    if (!data) return false;
    const newExp: Experience = customExp || {
      id: `exp-${Date.now()}`,
      role: "Senior Android Engineer",
      company: "Company Name",
      type: "Full-Time Remote",
      period: "2024 - Present",
      location: "",
      summary: "Leading mobile engineering and architecture across high-scale applications.",
      bullets: ["Architected scalable features cutting ANR rate.", "Delivered production releases."],
      skills: ["Kotlin", "Jetpack Compose", "Coroutines", "Room"],
      order: data.experiences.length + 1,
    };
    const nextList = [...data.experiences, newExp].map((e, i) => ({
      ...e,
      order: i + 1,
    }));
    const nextData: PortfolioData = { ...data, experiences: nextList };
    setData(nextData);
    return await savePortfolioData(nextData, `Saved experience at "${newExp.company}"`);
  };

    const reorderExperiences = async (
      reordered: Experience[],
      autoPersist = false
    ): Promise<boolean> => {
      if (!data) return false;
      const normalized = reordered.map((exp, idx) => ({
        ...exp,
        order: idx + 1,
      }));
      const nextData: PortfolioData = { ...data, experiences: normalized };
      setData(nextData);
      if (autoPersist) {
        return await savePortfolioData(nextData, "Saved work experience successfully");
      }
      return true;
    };

    const removeExperience = (index: number) => {
      if (!data) return;
      const target = data.experiences[index];
      requestConfirmDelete(
        "Delete Work Experience?",
        `Are you sure you want to delete the experience "${target?.role || "Role"} @ ${target?.company || "Company"}" (${target?.period || ""})?`,
            async() => {
  const nextData: PortfolioData = {
    ...data,
    experiences: data.experiences.filter((_, i) => i !== index),
};
setData(nextData);
await savePortfolioData(nextData, `Deleted experience at "${target?.company}"`);
      }
    );
  };

// 5. Education helpers
const updateEducation = (index: number, field: keyof Education, value: any) => {
  if (!data) return;
  const updated = [...data.education];
  updated[index] = { ...updated[index], [field]: value };
  setData({ ...data, education: updated });
};

  const addEducation = async (customEdu?: Education): Promise<boolean> => {
    if (!data) return false;
    const newEdu: Education = customEdu || {
      degree: "Degree Title",
      institution: "University / Institution",
      period: "2020 - 2024",
      location: "",
      details: "Key academic focus, achievements, and core coursework.",
      order: data.education.length + 1,
    };
    const nextData: PortfolioData = {
      ...data,
      education: [...data.education, newEdu],
    };
    setData(nextData);
    return await savePortfolioData(nextData, `Saved education "${newEdu.degree}"`);
  };

  const removeEducation = (index: number) => {
    if (!data) return;
    const target = data.education[index];
    requestConfirmDelete(
      "Delete Education Entry?",
      `Are you sure you want to delete "${target?.degree || "Degree"} — ${target?.institution || "Institution"}"?`,
          async() => {
  const nextData: PortfolioData = {
    ...data,
    education: data.education.filter((_, i) => i !== index),
};
setData(nextData);
await savePortfolioData(nextData, `Deleted education "${target?.degree}"`);
      }
    );
  };

// 6. Skills helper
  const updateSkills = async (
    updatedSkills: SkillCategory[],
    autoPersist = false
  ): Promise<boolean> => {
    if (!data) return false;
    const nextData: PortfolioData = { ...data, skills: updatedSkills };
    setData(nextData);
    if (autoPersist) {
      return await savePortfolioData(nextData, "Saved skill categories successfully");
    }
    return true;
  };

  // 7. Metrics helper
    const updateMetrics = async (
      updatedMetrics: MetricItem[],
      autoPersist = false
    ): Promise<boolean> => {
      if (!data) return false;
      const nextData: PortfolioData = { ...data, metrics: updatedMetrics };
      setData(nextData);
      if (autoPersist) {
        return await savePortfolioData(nextData, "Saved impact metrics successfully");
      }
      return true;
    };

    if (isLoading) {
      return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center items-center">
          <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
          <p className="text-sm text-zinc-400">Loading Admin Panel...</p>
        </div>
      );
    }

    if (!data) {
      return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center items-center p-4">
          <p className="text-red-400 mb-4">Failed to load portfolio content.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-600 rounded-xl text-white text-sm cursor-pointer"
          >
            Reload
          </button>
        </div>
      );
    }

    const navGroups = [
      {
        group: "Portfolio Sections",
        items: [
          { id: "profile" as AdminTab, label: "Profile & Documents", icon: User, count: undefined },
          {
            id: "experience" as AdminTab,
            label: "Work Experience",
            icon: Briefcase,
            count: data.experiences.length,
          },
          {
            id: "projects" as AdminTab,
            label: "Showcase Projects",
            icon: FolderGit2,
            count: data.projects.length,
          },
          {
            id: "services" as AdminTab,
            label: "Services Offered",
            icon: Sparkles,
            count: data.services.length,
          },
          {
            id: "skills" as AdminTab,
            label: "Skills & Stack",
            icon: Layers,
            count: data.skills.length,
          },
          {
            id: "education" as AdminTab,
            label: "Education",
            icon: GraduationCap,
            count: data.education.length,
          },
          {
            id: "metrics" as AdminTab,
            label: "Impact Metrics",
            icon: BarChart3,
            count: data.metrics.length,
          },
        ],
      },
      {
        group: "Admin Panel Management",
        items: [
          { id: "seo" as AdminTab, label: "SEO & Indexing", icon: Globe, count: undefined },
          { id: "settings" as AdminTab, label: "Admin Settings", icon: Wrench, count: undefined },
        ],
      },
    ];

    const allNavItems = navGroups.flatMap((g) => g.items);
    const currentTabInfo = allNavItems.find((item) => item.id === activeTab) || allNavItems[0];

    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
        {/* Mobile Sidebar Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar Navigation - Fixed from top to bottom of viewport */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 h-screen w-72 bg-zinc-900/95 border-r border-zinc-800/90 flex flex-col justify-between transition-transform duration-300 shrink-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
        >
          {/* Top Brand Header */}
          <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center font-black text-white text-sm shadow-lg shadow-emerald-500/20 shrink-0">
                HA
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-sm text-white truncate">Admin Panel</h1>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 font-mono">
                    LIVE
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 truncate mt-0.5">{data.personalInfo.name}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {navGroups.map((group) => (
              <div key={group.group} className="space-y-1.5">
                <div className="px-3 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  {group.group}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isActive
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-xs"
                          : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 border border-transparent"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`w - 4 h - 4 ${isActive ? "text-emerald-400" : "text-zinc-400"
                              }`}
                          />
                          <span>{item.label}</span>
                        </div>

                        {item.count !== undefined ? (
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${isActive
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-zinc-800 text-zinc-400"
                              }`}
                          >
                            {item.count}
                          </span>
                        ) : (
                          isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
            }
          </nav >

          {/* Sidebar Footer */}
          < div className="p-4 border-t border-zinc-800/80 bg-zinc-950/50 space-y-2.5" >
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">Connected to MongoDB Atlas</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={
                  process.env.NODE_ENV === "production"
                    ? "https://hammad-ahmed-android-engineer.vercel.app/"
                    : "/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition"
              >
                <span>View Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleLogout}
                title="Sign Out"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-red-950/50 hover:border-red-500/30 text-xs font-medium text-zinc-400 hover:text-red-400 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div >
        </aside >

        {/* Main Content Workspace */}
        < div className="flex-1 flex flex-col min-w-0 lg:pl-72" >
          {/* Fixed Top Workspace Header */}
          < header className="fixed top-0 right-0 left-0 lg:left-72 z-30 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4" >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white cursor-pointer"
                aria-label="Open sidebar menu"
              >
                <Menu className="w-4 h-4" />
              </button>

              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                  <span>Admin Panel</span>
                  <span>/</span>
                  <span className="text-emerald-400">{currentTabInfo.label}</span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white">
                  {currentTabInfo.label}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-600/20 transition disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{isSaving ? "Persisting to DB..." : "Save All Changes"}</span>
              </button>
            </div>
          </header >

          {/* Active Section Body */}
          < main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 pt-20 pb-20" >
            {activeTab === "profile" && (
              <ProfileTab
                personalInfo={data.personalInfo}
                coverLetterText={data.coverLetterText}
                onUpdateProfile={updateProfile}
                onUpdateStat={updateStat}
                onRemoveStat={removeStat}
                onUpdateCoverLetter={updateCoverLetter}
              />
            )}

            {
              activeTab === "services" && (
                <ServicesTab
                  services={data.services}
                  onUpdateService={updateService}
                  onAddService={addService}
                  onRemoveService={removeService}
                  onSaveAll={handleSave}
                  isSaving={isSaving}
                />
              )
            }

            {
              activeTab === "projects" && (
                <ProjectsTab
                  projects={data.projects}
                  onUpdateProject={updateProject}
                  onUpdateArchitecture={updateProjectArchitecture}
                  onAddProject={addProject}
                  onRemoveProject={removeProject}
                  onSaveAll={handleSave}
                  isSaving={isSaving}
                />
              )
            }

            {
              activeTab === "experience" && (
                <ExperienceTab
                  experiences={data.experiences}
                  onUpdateExperience={updateExperience}
                  onAddExperience={addExperience}
                  onRemoveExperience={removeExperience}
                  onReorderExperiences={reorderExperiences}
                  onSaveAll={handleSave}
                  isSaving={isSaving}
                />
              )
            }

            {
              activeTab === "skills" && (
                <SkillsTab
                  skills={data.skills}
                  onUpdateSkills={updateSkills}
                  onRequestDelete={requestConfirmDelete}
                  onSaveAll={handleSave}
                  isSaving={isSaving}
                />
              )
            }

            {
              activeTab === "education" && (
                <EducationTab
                  education={data.education}
                  onUpdateEducation={updateEducation}
                  onAddEducation={addEducation}
                  onRemoveEducation={removeEducation}
                  onSaveAll={handleSave}
                  isSaving={isSaving}
                />
              )
            }

            {
              activeTab === "metrics" && (
                <MetricsTab
                  metrics={data.metrics}
                  onUpdateMetrics={updateMetrics}
                  onRequestDelete={requestConfirmDelete}
                  onSaveAll={handleSave}
                  isSaving={isSaving}
                />
              )
            }

            {
              activeTab === "seo" && (
                <SeoTab
                  seoStatus={seoStatus}
                  isPinging={isPinging}
                  pingResult={pingResult}
                  onPingSearchEngines={handlePingSearchEngines}
                />
              )
            }

            {
              activeTab === "settings" && (
                <SettingsTab
                  onReseed={handleReseed}
                  onClearSection={handleClearSection}
                  onClearCache={handleClearCache}
                  onDeleteAllData={handleDeleteAllData}
                  counts={{
                    experiences: data.experiences.length,
                    projects: data.projects.length,
                    services: data.services.length,
                    skills: data.skills.length,
                    education: data.education.length,
                    metrics: data.metrics.length,
                  }}
                  isSaving={isSaving}
                />
              )
            }
          </main >
        </div >

        {/* Floating Status Notification */}
        {
          notification && (
            <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
              <div
                className={`px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-medium border ${notification.type === "success"
                  ? "bg-emerald-950/90 text-emerald-200 border-emerald-500/30"
                  : "bg-red-950/90 text-red-200 border-red-500/30"
                  }`}
              >
                {notification.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{notification.message}</span>
              </div>
            </div >
          )
        }

        {/* Universal Delete Confirmation Dialog */}
        <ConfirmDeleteModal
          isOpen={Boolean(pendingDelete)}
          title={pendingDelete?.title || "Confirm Delete"}
          message={pendingDelete?.message || "Are you sure you want to delete this item?"}
          confirmLabel={pendingDelete?.confirmLabel}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => pendingDelete?.onConfirm()}
        />
      </div >
    );
  }
