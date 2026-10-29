import mongoose from "mongoose";
import dns from "dns";
import { serverConfig } from "@/lib/config";

// Only use custom public DNS servers in local Windows development if needed,
// never override internal container DNS in production serverless environments (Vercel).
if (process.env.NODE_ENV !== "production") {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
  } catch {
    // Ignore
  }
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  lastError?: string | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null, lastError: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export function getLastDbError(): string | null {
  return cached.lastError ?? null;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const mongoUri = (process.env.MONGODB_URI || serverConfig.mongoUri || "")
    .trim()
    .replace(/^["']|["']$/g, "");
  if (!mongoUri) {
    cached.lastError = "MONGODB_URI environment variable is empty or not set.";
    return null;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      dbName: "portfolio",
    };

    cached.promise = (async () => {
      try {
        const connection = await mongoose.connect(mongoUri, opts);
        cached.lastError = null;
        return connection;
      } catch (err: any) {
        cached.promise = null;
        cached.conn = null;
        cached.lastError = err?.message || "MongoDB connection failed";
        console.warn("MongoDB connection attempt failed:", err.message);
        return null as unknown as typeof mongoose;
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err: any) {
    cached.promise = null;
    cached.conn = null;
    cached.lastError = err?.message || "MongoDB connection failed";
    return null;
  }
}

export const connectDB = connectToDatabase;


