import { PortfolioData } from "@/types/portfolio";
import { portfolioRepository } from "@/server/repositories/portfolioRepository";
import { getLastDbError } from "@/lib/db";

export class PortfolioService {
  async getPortfolioData(): Promise<PortfolioData> {
    const existing = await portfolioRepository.getSingleton();
    if (!existing) {
      const dbErr = getLastDbError();
      throw new Error(
        dbErr
          ? `MongoDB connection error: ${dbErr}`
          : "Portfolio document not found in MongoDB 'portfolio' database."
      );
    }
    return JSON.parse(JSON.stringify(existing));
  }

  async updatePortfolioData(updated: Partial<PortfolioData>): Promise<PortfolioData> {
    const existing = await portfolioRepository.getSingleton();
    if (!existing) {
      throw new Error("Portfolio singleton document not found in MongoDB database.");
    }

    const saved = await portfolioRepository.updateSingleton(existing, updated);
    return saved;
  }

  async reseedPortfolioData(): Promise<PortfolioData> {
    const existing = await portfolioRepository.getSingleton();
    if (!existing) {
      throw new Error("Portfolio singleton document not found in MongoDB database.");
    }
    return JSON.parse(JSON.stringify(existing));
  }
}

export const portfolioService = new PortfolioService();
