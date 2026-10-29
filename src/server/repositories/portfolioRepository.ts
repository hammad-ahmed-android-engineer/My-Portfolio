import { PortfolioModel, IPortfolioDocument } from "@/models/Portfolio";
import { PortfolioData } from "@/types/portfolio";
import { connectToDatabase } from "@/lib/db";

const SINGLETON_ID = "main";

export class PortfolioRepository {
  async getSingleton(): Promise<IPortfolioDocument | null> {
    const db = await connectToDatabase();
    if (!db) return null;
    return PortfolioModel.findOne({ singletonId: SINGLETON_ID });
  }

  async createSingleton(data: PortfolioData): Promise<PortfolioData> {
    const db = await connectToDatabase();
    if (!db) return data;
    const created = await PortfolioModel.create({
      singletonId: SINGLETON_ID,
      ...data,
    });
    return JSON.parse(JSON.stringify(created));
  }

  async updateSingleton(
    existing: IPortfolioDocument,
    updated: Partial<PortfolioData>
  ): Promise<PortfolioData> {
    if (updated.personalInfo) {
      const currentInfo = existing.personalInfo
        ? JSON.parse(JSON.stringify(existing.personalInfo))
        : {};
      existing.personalInfo = {
        ...currentInfo,
        ...updated.personalInfo,
        stats: {
          ...(currentInfo.stats ?? {}),
          ...(updated.personalInfo.stats ?? {}),
        },
      };
      existing.markModified("personalInfo");
    }

    if (updated.services !== undefined) {
      existing.services = updated.services;
      existing.markModified("services");
    }
    if (updated.projects !== undefined) {
      existing.projects = updated.projects;
      existing.markModified("projects");
    }
    if (updated.experiences !== undefined) {
      existing.experiences = updated.experiences;
      existing.markModified("experiences");
    }
    if (updated.skills !== undefined) {
      existing.skills = updated.skills;
      existing.markModified("skills");
    }
    if (updated.education !== undefined) {
      existing.education = updated.education;
      existing.markModified("education");
    }
    if (updated.metrics !== undefined) {
      existing.metrics = updated.metrics;
      existing.markModified("metrics");
    }
    if (updated.coverLetterText !== undefined) {
      existing.coverLetterText = updated.coverLetterText;
      existing.markModified("coverLetterText");
    }

    await existing.save();
    return JSON.parse(JSON.stringify(existing));
  }

  async reseedSingleton(data: PortfolioData): Promise<PortfolioData> {
    const db = await connectToDatabase();
    if (db) {
      await PortfolioModel.findOneAndUpdate(
        { singletonId: SINGLETON_ID },
        { $set: { singletonId: SINGLETON_ID, ...data } },
        { upsert: true, new: true }
      );
    }
    return data;
  }
}

export const portfolioRepository = new PortfolioRepository();

