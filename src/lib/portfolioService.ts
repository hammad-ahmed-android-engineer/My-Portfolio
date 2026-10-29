import { portfolioService } from "@/server/services/portfolioService";
import { PortfolioData } from "@/types/portfolio";

export { portfolioService };

export async function getPortfolioData(): Promise<PortfolioData> {
  return portfolioService.getPortfolioData();
}

export async function updatePortfolioData(updated: Partial<PortfolioData>): Promise<PortfolioData> {
  return portfolioService.updatePortfolioData(updated);
}

export async function reseedPortfolioData(): Promise<PortfolioData> {
  return portfolioService.reseedPortfolioData();
}
