import { PortfolioData } from "./portfolio";

export interface ApiResponse<T = unknown> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  username?: string;
  password?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
}

export interface AdminSession {
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface SeoStatus {
  siteUrl: string;
  sitemapUrl: string;
  robotsUrl: string;
  lastGenerated: string;
  status: "healthy" | "warning" | "error";
}

export interface SeoPingResponse {
  success: boolean;
  timestamp: string;
  sitemapUrl: string;
  results: Record<string, string>;
  message: string;
}

