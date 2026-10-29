import mongoose, { Schema, Document, Model } from "mongoose";
import { PortfolioData } from "@/types/portfolio";

export interface IPortfolioDocument extends PortfolioData, Document {
  singletonId: string;
  updatedAt: Date;
  createdAt: Date;
}

// -----------------------------------------------------------------------------
// 1. Service Schema
// -----------------------------------------------------------------------------
export const ServiceSchema = new Schema(
  {
    id: { type: String, required: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    description: { type: String, required: true },
    fullDescription: { type: String, default: "" },
    icon: { type: String, default: "Smartphone" },
    badge: { type: String, default: "Architecture" },
    category: { type: String, default: "Android Engineering" },
    deliverables: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    order: { type: Number, default: 0, index: true },
    featured: { type: Boolean, default: true },
    status: { type: String, enum: ["active", "archived", "draft"], default: "active" },
    estimatedTimeline: { type: String, default: "" },
  },
  { timestamps: true }
);

// -----------------------------------------------------------------------------
// 2. Project Schema
// -----------------------------------------------------------------------------
export const ProjectSchema = new Schema(
  {
    id: { type: String, required: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    clientOrCompany: { type: String, default: "" },
    role: { type: String, default: "Senior Android Engineer" },
    category: {
      type: String,
      default: "Enterprise",
    },
    image: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    impactHighlight: { type: String, default: "" },
    summary: { type: String, default: "" },
    techStack: { type: [String], default: [] },
    features: { type: [String], default: [] },
    architectureDetails: {
      pattern: { type: String, default: "Clean Architecture + MVI" },
      offlineStrategy: { type: String, default: "" },
      networking: { type: String, default: "" },
      payments: { type: String, default: "" },
      highlights: { type: [String], default: [] },
    },
    metrics: [
      {
        label: { type: String, default: "" },
        value: { type: String, default: "" },
        _id: false,
      },
    ],
    playStoreUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    liveDemoUrl: { type: String, default: "" },
    videoDemoUrl: { type: String, default: "" },
    featured: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
    status: { type: String, enum: ["published", "draft", "archived"], default: "published" },
  },
  { timestamps: true }
);

// -----------------------------------------------------------------------------
// 3. Experience Schema
// -----------------------------------------------------------------------------
export const ExperienceSchema = new Schema(
  {
    id: { type: String, required: true, index: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    companyUrl: { type: String, default: "" },
    location: { type: String, default: "" },
    period: { type: String, required: true },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },
    isCurrent: { type: Boolean, default: false },
    type: { type: String, default: "Full-Time" },
    summary: { type: String, default: "" },
    bullets: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    statsBadge: { type: String, default: "" },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

// -----------------------------------------------------------------------------
// 4. Skill Schema
// -----------------------------------------------------------------------------
export const SkillCategorySchema = new Schema(
  {
    category: { type: String, required: true },
    description: { type: String, default: "" },
    iconName: { type: String, default: "Code2" },
    skills: [
      {
        name: { type: String, required: true },
        level: { type: Number, default: 90 },
        experienceYears: { type: String, default: "4+ years" },
        highlight: { type: Boolean, default: false },
        icon: { type: String, default: "" },
        _id: false,
      },
    ],
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

// -----------------------------------------------------------------------------
// 5. Education Schema
// -----------------------------------------------------------------------------
export const EducationSchema = new Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    institutionUrl: { type: String, default: "" },
    location: { type: String, default: "" },
    period: { type: String, required: true },
    startYear: { type: String, default: "" },
    endYear: { type: String, default: "" },
    details: { type: String, default: "" },
    honors: { type: [String], default: [] },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

// -----------------------------------------------------------------------------
// 6. Impact Metric Schema
// -----------------------------------------------------------------------------
export const MetricSchema = new Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String, default: "" },
    context: { type: String, default: "" },
    icon: { type: String, default: "ShieldCheck" },
    category: { type: String, default: "Performance" },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

// -----------------------------------------------------------------------------
// 7. Security Audit Log Schema
// -----------------------------------------------------------------------------
export const AuditLogSchema = new Schema(
  {
    action: { type: String, required: true, index: true },
    performedBy: { type: String, default: "system" },
    ip: { type: String, default: "unknown" },
    userAgent: { type: String, default: "unknown" },
    status: { type: String, enum: ["SUCCESS", "FAILED", "BLOCKED"], required: true },
    details: { type: Schema.Types.Mixed, default: {} },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

// -----------------------------------------------------------------------------
// 8. Security Rate Limit & Lockout Schema
// -----------------------------------------------------------------------------
export const SecurityLockoutSchema = new Schema(
  {
    ip: { type: String, required: true, unique: true, index: true },
    attempts: { type: Number, default: 0 },
    lastAttempt: { type: Date, default: Date.now },
    lockedUntil: { type: Date, default: null },
  },
  { timestamps: true }
);

// -----------------------------------------------------------------------------
// 9. Personal Stats Schema (Compacted Quantitative Metrics)
// -----------------------------------------------------------------------------
export const PersonalStatsSchema = new Schema(
  {
    experienceYears: { type: String, default: "5+" },
    crashFreeRate: { type: String, default: "99.99%" },
    anrReduction: { type: String, default: "~90%" },
    coldStartBoost: { type: String, default: "~50%" },
    batteryOptimization: { type: String, default: "~40%" },
    saasAppsCount: { type: String, default: "5" },
  },
  { _id: false, strict: false }
);

// -----------------------------------------------------------------------------
// 10. Personal Profile Schema
// -----------------------------------------------------------------------------
export const PersonalInfoSchema = new Schema(
  {
    name: { type: String, default: "Hammad Ahmed" },
    title: { type: String, default: "Senior Android Engineer" },
    tagline: {
      type: String,
      default: "Kotlin • Jetpack Compose • Clean Architecture • Offline-First Systems",
    },
    location: { type: String, default: "Riyadh, Saudi Arabia (Remote)" },
    email: { type: String, default: "hammadahmedawan95@gmail.com" },
    phone: { type: String, default: "+92 311 9069464" },
    phoneDisplay: { type: String, default: "+92 311 9069464" },
    whatsappUrl: { type: String, default: "https://wa.me/923119069464" },
    linkedin: {
      type: String,
      default: "https://www.linkedin.com/in/hammad-ahmed-android-engineer",
    },
    github: { type: String, default: "https://github.com/hammad-ahmed-android-engineer" },
    twitter: { type: String, default: "" },
    website: { type: String, default: "" },
    resumeDriveLink: { type: String, default: "https://drive.google.com/" },
    coverLetterDriveLink: { type: String, default: "" },
    summary: { type: String, default: "" },
    bio: { type: String, default: "" },
    availability: {
      type: String,
      default: "Available for Full-time Remote Roles (KSA, UAE, EU, US, Global)",
    },
    currentEducation: { type: String, default: "Master of Computer Science (NUST)" },
    avatarUrl: { type: String, default: "/profilePic.jpg" },
    heroBackgroundUrl: { type: String, default: "" },
    status: { type: String, default: "active" },
    stats: { type: PersonalStatsSchema, default: {} },
  },
  { _id: false, strict: false }
);

// -----------------------------------------------------------------------------
// 11. Master Portfolio Schema
// -----------------------------------------------------------------------------
export const PortfolioSchema = new Schema(
  {
    singletonId: { type: String, default: "main", unique: true, index: true },
    personalInfo: { type: PersonalInfoSchema, default: {} },
    services: { type: [ServiceSchema], default: [] },
    metrics: { type: [MetricSchema], default: [] },
    experiences: { type: [ExperienceSchema], default: [] },
    projects: { type: [ProjectSchema], default: [] },
    skills: { type: [SkillCategorySchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    coverLetterText: { type: String, default: "" },
  },
  { timestamps: true }
);

export interface IAuditLogDocument extends Document {
  action: string;
  performedBy: string;
  ip: string;
  userAgent: string;
  status: "SUCCESS" | "FAILED" | "BLOCKED";
  details: Record<string, unknown>;
  timestamp: Date;
}

export interface ISecurityLockoutDocument extends Document {
  ip: string;
  attempts: number;
  lastAttempt: Date;
  lockedUntil?: Date | null;
}

// Export Mongoose Models with clean TypeScript typings
export const PortfolioModel: Model<IPortfolioDocument> =
  (mongoose.models.Portfolio as Model<IPortfolioDocument>) ??
  mongoose.model<IPortfolioDocument>("Portfolio", PortfolioSchema);

export const AuditLogModel: Model<IAuditLogDocument> =
  (mongoose.models.AuditLog as Model<IAuditLogDocument>) ??
  mongoose.model<IAuditLogDocument>("AuditLog", AuditLogSchema);

export const SecurityLockoutModel: Model<ISecurityLockoutDocument> =
  (mongoose.models.SecurityLockout as Model<ISecurityLockoutDocument>) ??
  mongoose.model<ISecurityLockoutDocument>("SecurityLockout", SecurityLockoutSchema);
