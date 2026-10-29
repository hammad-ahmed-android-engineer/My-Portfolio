import mongoose from "mongoose";
import dns from "dns";
import { serverConfig } from "@/lib/config";

try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch {
  // Ignore
}

const MONGODB_URI = serverConfig.mongoUri;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      dbName: "portfolio",
    };

    cached.promise = (async () => {
      try {
        return await mongoose.connect(MONGODB_URI, opts);
      } catch (err: any) {
        cached.promise = null;
        console.warn("MongoDB connection attempt failed, continuing in fallback mode:", err.message);
        return null as unknown as typeof mongoose;
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch {
    cached.promise = null;
    return null;
  }
}

export const connectDB = connectToDatabase;


