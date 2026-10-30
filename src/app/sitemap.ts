import { MetadataRoute } from "next";
import { serverConfig } from "@/config/serverConfig";
import { portfolioRepository } from "@/server/repositories/portfolioRepository";

export const revalidate = 3600;

function toAbsoluteAssetUrl(baseUrl: string, assetPath?: string): string | null {
  if (!assetPath || typeof assetPath !== "string") return null;
  const trimmed = assetPath.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  const normalizedPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${baseUrl}${normalizedPath}`;
}

function slugifyToken(value?: string): string {
  if (!value) return "";
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Generates a comprehensive, high-discoverability XML Sitemap for Hammad Ahmed's
 * Senior Android Engineer portfolio. Includes primary section anchors, personal
 * identity & skill query anchors, dynamic project/experience/service/education
 * entries from MongoDB, and image sitemap associations for Google/Bing Images.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = serverConfig.siteUrl.replace(/\/+$/, "");

  const defaultShowcaseImages: string[] = [
    `${baseUrl}/profilePic.jpg`,
    `${baseUrl}/yamamacm.jpg`,
    `${baseUrl}/ecommerce_suite.jpg`,
    `${baseUrl}/toolbox.jpg`,
    `${baseUrl}/toolbox_app.jpg`,
    `${baseUrl}/saas-apps.jpg`,
    `${baseUrl}/edge-lighting.jpg`,
    `${baseUrl}/edge_lighting.jpg`,
    `${baseUrl}/audiobooks_app.jpg`,
    `${baseUrl}/media_apps.jpg`,
  ];

  let lastModifiedDate = new Date();
  const projectImagesSet = new Set<string>(defaultShowcaseImages);
  let avatarImageUrl = `${baseUrl}/profilePic.jpg`;

  const dynamicProjectEntries: MetadataRoute.Sitemap = [];
  const dynamicExperienceEntries: MetadataRoute.Sitemap = [];
  const dynamicServiceEntries: MetadataRoute.Sitemap = [];
  const dynamicSkillEntries: MetadataRoute.Sitemap = [];
  const dynamicEducationEntries: MetadataRoute.Sitemap = [];

  try {
    const portfolio = await portfolioRepository.getSingleton();
    if (portfolio) {
      const maybeUpdatedAt = (portfolio as unknown as { updatedAt?: Date | string }).updatedAt;
      if (maybeUpdatedAt) {
        const parsed = new Date(maybeUpdatedAt);
        if (!Number.isNaN(parsed.getTime())) {
          lastModifiedDate = parsed;
        }
      }

      const resolvedAvatar = toAbsoluteAssetUrl(baseUrl, portfolio.personalInfo?.avatarUrl);
      if (resolvedAvatar) {
        avatarImageUrl = resolvedAvatar;
        projectImagesSet.add(resolvedAvatar);
      }

      // 1. Dynamic Projects from MongoDB
      if (Array.isArray(portfolio.projects)) {
        for (const project of portfolio.projects) {
          const imgUrl = toAbsoluteAssetUrl(baseUrl, project.image);
          if (imgUrl) {
            projectImagesSet.add(imgUrl);
          }
          const slug = slugifyToken(project.id || project.title);
          if (slug) {
            dynamicProjectEntries.push({
              url: `${baseUrl}/?project=${slug}#projects`,
              lastModified: lastModifiedDate,
              changeFrequency: "weekly",
              priority: 0.85,
              images: imgUrl ? [imgUrl] : undefined,
            });
          }
        }
      }

      // 2. Dynamic Work Experiences from MongoDB
      if (Array.isArray(portfolio.experiences)) {
        for (const exp of portfolio.experiences) {
          const slug = slugifyToken(`${exp.company}-${exp.role}`);
          if (slug) {
            dynamicExperienceEntries.push({
              url: `${baseUrl}/?experience=${slug}#experience`,
              lastModified: lastModifiedDate,
              changeFrequency: "monthly",
              priority: 0.85,
            });
          }
        }
      }

      // 3. Dynamic Services Offered from MongoDB
      if (Array.isArray(portfolio.services)) {
        for (const service of portfolio.services) {
          const slug = slugifyToken(service.id || service.title);
          if (slug) {
            dynamicServiceEntries.push({
              url: `${baseUrl}/?service=${slug}#services`,
              lastModified: lastModifiedDate,
              changeFrequency: "monthly",
              priority: 0.8,
            });
          }
        }
      }

      // 4. Dynamic Skill Categories from MongoDB
      if (Array.isArray(portfolio.skills)) {
        for (const cat of portfolio.skills) {
          const slug = slugifyToken(cat.category);
          if (slug) {
            dynamicSkillEntries.push({
              url: `${baseUrl}/?skill-domain=${slug}#skills`,
              lastModified: lastModifiedDate,
              changeFrequency: "monthly",
              priority: 0.8,
            });
          }
        }
      }

      // 5. Dynamic Academic Education from MongoDB
      if (Array.isArray(portfolio.education)) {
        for (const edu of portfolio.education) {
          const slug = slugifyToken(`${edu.institution}-${edu.degree}`);
          if (slug) {
            dynamicEducationEntries.push({
              url: `${baseUrl}/?education=${slug}#education`,
              lastModified: lastModifiedDate,
              changeFrequency: "monthly",
              priority: 0.75,
            });
          }
        }
      }
    }
  } catch {
    // Fallback gracefully to static entries if MongoDB is unreachable at build time
  }

  const allPortfolioImages = Array.from(projectImagesSet);

  // Core portfolio navigation & section entries
  const coreSectionEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastModifiedDate,
      changeFrequency: "daily",
      priority: 1.0,
      images: allPortfolioImages,
    },
    {
      url: `${baseUrl}/#overview`,
      lastModified: lastModifiedDate,
      changeFrequency: "weekly",
      priority: 0.95,
      images: [avatarImageUrl],
    },
    {
      url: `${baseUrl}/#metrics`,
      lastModified: lastModifiedDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: lastModifiedDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#architecture`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: lastModifiedDate,
      changeFrequency: "weekly",
      priority: 0.95,
      images: allPortfolioImages.filter((img) => img !== avatarImageUrl),
    },
    {
      url: `${baseUrl}/#experience`,
      lastModified: lastModifiedDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#skills`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/#education`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  // High-intent personal identity, role, location & specialization discovery URLs for Hammad Ahmed
  const personalIdentitySearchEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/?engineer=hammad-ahmed-senior-android-engineer`,
      lastModified: lastModifiedDate,
      changeFrequency: "weekly",
      priority: 0.95,
      images: [avatarImageUrl],
    },
    {
      url: `${baseUrl}/?engineer=hammad-ahmed-senior-android-developer`,
      lastModified: lastModifiedDate,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [avatarImageUrl],
    },
    {
      url: `${baseUrl}/?engineer=hammad-ahmed-kotlin-jetpack-compose-architect`,
      lastModified: lastModifiedDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/?engineer=hammad-ahmed-mobile-software-engineer-nust`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/?specialty=clean-architecture-mvvm-mvi-offline-first-android`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/?specialty=kotlin-coroutines-flow-room-dagger-hilt-android`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/?availability=remote-senior-android-engineer-ksa-uae-eu-us-global`,
      lastModified: lastModifiedDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  return [
    ...coreSectionEntries,
    ...personalIdentitySearchEntries,
    ...dynamicProjectEntries,
    ...dynamicExperienceEntries,
    ...dynamicServiceEntries,
    ...dynamicSkillEntries,
    ...dynamicEducationEntries,
  ];
}
