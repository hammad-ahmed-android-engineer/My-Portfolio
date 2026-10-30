import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hammad-ahmed-android-engineer.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin-panel",
          "/admin-panel/",
          "/api/portal",
          "/api/portal/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
