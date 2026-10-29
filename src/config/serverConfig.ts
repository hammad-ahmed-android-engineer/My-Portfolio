import crypto from "crypto";

function getRequiredEnv(key: string, devFallback: string): string {
  const value = process.env[key];
  if (value && value.trim().length > 0) {
    return value.trim();
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(`Production configuration error: Missing required environment variable [${key}].`);
  }
  return devFallback;
}

export const serverConfig = {
  mongoUri: process.env.MONGODB_URI ?? "",
  adminUsername: process.env.ADMIN_USERNAME ?? "hammad",
  adminPassword: process.env.ADMIN_PASSWORD ?? "",
  jwtSecret: getRequiredEnv(
    "ADMIN_JWT_SECRET",
    crypto.createHash("sha256").update("portfolio-local-jwt-seed").digest("hex")
  ),
  encryptionKey: getRequiredEnv(
    "PORTFOLIO_ENCRYPTION_KEY",
    crypto.createHash("sha256").update("portfolio-local-encryption-seed").digest("hex")
  ),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hammad-ahmed-android-engineer.vercel.app",
};

export type ServerConfig = typeof serverConfig;

