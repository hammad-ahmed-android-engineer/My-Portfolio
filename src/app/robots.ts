import { MetadataRoute } from "next";
import { serverConfig } from "@/config/serverConfig";

const PRIVATE_ADMIN_AND_API_PATHS: string[] = [
  "/admin-panel",
  "/admin-panel/",
  "/admin-panel/login",
  "/admin-console",
  "/admin-console/",
  "/api/",
  "/api/portal",
  "/api/portal/",
  "/api/portal/auth",
  "/api/portal/content",
  "/api/portal/seo",
  "/api/download",
  "/_next/",
];

const PUBLIC_ALLOW_PATHS: string[] = [
  "/",
  "/*.jpg$",
  "/*.jpeg$",
  "/*.png$",
  "/*.webp$",
  "/*.svg$",
  "/*.ico$",
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = serverConfig.siteUrl.replace(/\/+$/, "");

  return {
    rules: [
      // 1. Default global rule for all standard crawlers
      {
        userAgent: "*",
        allow: PUBLIC_ALLOW_PATHS,
        disallow: PRIVATE_ADMIN_AND_API_PATHS,
      },
      // 2. Major Search Engine Crawlers (Google, Bing, DuckDuckGo, Yahoo, Brave, Yandex, Baidu, Naver, Seznam, Apple)
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-Mobile",
          "Googlebot-Video",
          "Mediapartners-Google",
          "AdsBot-Google",
          "Bingbot",
          "AdIdxBot",
          "BingPreview",
          "MSNBot",
          "DuckDuckBot",
          "Slurp",
          "Bravebot",
          "Yandex",
          "YandexBot",
          "YandexImages",
          "Baiduspider",
          "Yeti",
          "NaverBot",
          "SeznamBot",
          "Applebot",
          "Applebot-Extended",
          "Qwantify",
          " Ecosia",
          "Sogou",
        ],
        allow: PUBLIC_ALLOW_PATHS,
        disallow: PRIVATE_ADMIN_AND_API_PATHS,
      },
      // 3. Social Media, Recruiter & Rich Link Preview Bots (LinkedIn, GitHub, X/Twitter, Facebook, Slack, Discord, WhatsApp, Telegram)
      {
        userAgent: [
          "LinkedInBot",
          "Twitterbot",
          "facebookexternalhit",
          "Facebot",
          "Slackbot",
          "Slackbot-LinkExpanding",
          "Discordbot",
          "WhatsApp",
          "TelegramBot",
          "Pinterestbot",
          "Redditbot",
          "SkypeUriPreview",
        ],
        allow: PUBLIC_ALLOW_PATHS,
        disallow: PRIVATE_ADMIN_AND_API_PATHS,
      },
      // 4. AI Search & Assistant Discovery Crawlers (ChatGPT/OpenAI, Claude/Anthropic, Perplexity, Google Gemini, Cohere, Meta, You.com)
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "GoogleOther",
          "Amazonbot",
          "FacebookBot",
          "Meta-ExternalAgent",
          "Meta-ExternalFetcher",
          "YouBot",
          "cohere-ai",
          "CCBot",
        ],
        allow: PUBLIC_ALLOW_PATHS,
        disallow: PRIVATE_ADMIN_AND_API_PATHS,
      },
    ],
    host: baseUrl,
    sitemap: [`${baseUrl}/sitemap.xml`],
  };
}
