import { secureStorage } from "@/utils/secureStorage";
import { PortfolioData } from "@/types/portfolio";
import { SeoStatus, SeoPingResponse } from "@/types/api";

export type { SeoStatus, SeoPingResponse };

export const apiClient = {
  /**
   * Admin Login
   */
  async login(username: string, password: string): Promise<boolean> {
    const res = await fetch("/api/portal/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error ?? "Authentication failed");
    }

    return !!data.success;
  },

  /**
   * Admin Logout
   */
  async logout(): Promise<void> {
    await fetch("/api/portal/auth", {
      method: "DELETE",
    });
    secureStorage.clear();
  },

  /**
   * Check if current admin session is valid
   */
  async checkSession(): Promise<boolean> {
    try {
      const res = await fetch("/api/portal/auth");
      const data = await res.json();
      return !!data.authenticated;
    } catch {
      return false;
    }
  },

  /**
   * Fetch portfolio data (with encrypted browser caching)
   */
  async getPortfolio(): Promise<PortfolioData> {
    const res = await fetch("/api/portal/content", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error ?? "Failed to fetch portfolio data");
    }

    secureStorage.setItem("portfolio_cache", data);
    return data;
  },

  /**
   * Save portfolio modifications & update encrypted cache
   */
  async savePortfolio(data: PortfolioData): Promise<PortfolioData> {
    const res = await fetch("/api/portal/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    const json = await res.json();
    if (!res.ok || !json.data) {
      throw new Error(json.error ?? "Failed to save portfolio data");
    }

    secureStorage.setItem("portfolio_cache", json.data);
    return json.data;
  },

  /**
   * Reseed portfolio to defaults
   */
  async reseedPortfolio(): Promise<PortfolioData> {
    const res = await fetch("/api/portal/content", {
      method: "DELETE",
    });

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    const json = await res.json();
    if (!res.ok || !json.data) {
      throw new Error(json.error ?? "Failed to reseed portfolio");
    }

    secureStorage.setItem("portfolio_cache", json.data);
    return json.data;
  },

  /**
   * Retrieve cached portfolio from encrypted browser storage
   */
  getCachedPortfolio(): PortfolioData | null {
    return secureStorage.getItem<PortfolioData>("portfolio_cache");
  },

  /**
   * Fetch SEO and Sitemap Status
   */
  async getSeoStatus(): Promise<SeoStatus> {
    const res = await fetch("/api/portal/seo");
    if (!res.ok) {
      throw new Error("Failed to load SEO status");
    }
    return res.json();
  },

  /**
   * Ping Search Engines (Google/Bing) to crawl updated sitemap
   */
  async pingSearchEngines(): Promise<SeoPingResponse> {
    const res = await fetch("/api/portal/seo", {
      method: "POST",
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error ?? "Failed to ping search engines");
    }
    return res.json();
  },
};
