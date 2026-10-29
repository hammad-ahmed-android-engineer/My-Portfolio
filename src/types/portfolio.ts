export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  deliverables: string[];
  tags: string[];
  order?: number;
  featured?: boolean;
}

export interface ProjectArchitecture {
  pattern: string;
  offlineStrategy?: string;
  networking?: string;
  payments?: string;
  highlights: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  clientOrCompany: string;
  role: string;
  category: "Enterprise" | "SaaS & E-Commerce" | "Media & Utilities" | "System Tools" | string;
  image: string;
  impactHighlight: string;
  summary: string;
  techStack: string[];
  features: string[];
  architectureDetails: ProjectArchitecture;
  metrics: ProjectMetric[];
  playStoreUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  type: string;
  summary: string;
  bullets: string[];
  skills: string[];
  statsBadge?: string;
  order?: number;
}

export interface SkillItem {
  name: string;
  level: number;
  highlight?: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
  order?: number;
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  details: string;
  order?: number;
}

export interface MetricItem {
  value: string;
  label: string;
  description: string;
  icon: string;
  order?: number;
}

export interface ArchitectureLayer {
  number: string;
  title: string;
  subtitle: string;
  role: string;
  components: string[];
  color: string;
  borderHover: string;
}

export interface ArchitecturePillar {
  title: string;
  description: string;
  badge: string;
  icon: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
}

export interface PersonalStats {
  experienceYears?: string;
  crashFreeRate?: string;
  anrReduction?: string;
  coldStartBoost?: string;
  batteryOptimization?: string;
  saasAppsCount?: string;
  [key: string]: string | undefined;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsappUrl: string;
  linkedin: string;
  github: string;
  resumeDriveLink: string;
  coverLetterDriveLink?: string;
  summary: string;
  availability: string;
  currentEducation: string;
  avatarUrl?: string;
  stats?: PersonalStats;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  services: Service[];
  metrics: MetricItem[];
  experiences: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  education: Education[];
  certifications?: Certification[];
  coverLetterText?: string;
}

