import { connectDB } from "@/lib/db";
import { SecurityLockoutModel } from "@/models/Portfolio";

export interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  lockedUntil?: Date;
}

export async function checkRateLimit(
  ip: string,
  maxAttempts = 5,
  windowMinutes = 15
): Promise<RateLimitResult> {
  try {
    await connectDB();
    const now = new Date();
    const lockoutRecord = await SecurityLockoutModel.findOne({ ip });

    if (lockoutRecord) {
      if (lockoutRecord.lockedUntil && lockoutRecord.lockedUntil > now) {
        return {
          allowed: false,
          remainingAttempts: 0,
          lockedUntil: lockoutRecord.lockedUntil,
        };
      }

      const timeSinceLastAttempt =
        (now.getTime() - new Date(lockoutRecord.lastAttempt).getTime()) / (1000 * 60);
      if (timeSinceLastAttempt > windowMinutes) {
        lockoutRecord.attempts = 0;
        lockoutRecord.lockedUntil = null;
        await lockoutRecord.save();
        return { allowed: true, remainingAttempts: maxAttempts };
      }

      if (lockoutRecord.attempts >= maxAttempts) {
        const lockedUntil = new Date(now.getTime() + windowMinutes * 60 * 1000);
        lockoutRecord.lockedUntil = lockedUntil;
        await lockoutRecord.save();
        return {
          allowed: false,
          remainingAttempts: 0,
          lockedUntil,
        };
      }

      return {
        allowed: true,
        remainingAttempts: maxAttempts - lockoutRecord.attempts,
      };
    }

    return { allowed: true, remainingAttempts: maxAttempts };
  } catch {
    return { allowed: true, remainingAttempts: maxAttempts };
  }
}

export async function recordFailedAttempt(ip: string): Promise<void> {
  try {
    await connectDB();
    const now = new Date();
    const record = await SecurityLockoutModel.findOne({ ip });

    if (record) {
      record.attempts += 1;
      record.lastAttempt = now;
      if (record.attempts >= 5) {
        record.lockedUntil = new Date(now.getTime() + 15 * 60 * 1000);
      }
      await record.save();
    } else {
      await SecurityLockoutModel.create({
        ip,
        attempts: 1,
        lastAttempt: now,
      });
    }
  } catch (error) {
    console.error("Failed to record failed attempt:", error);
  }
}

export async function resetRateLimit(ip: string): Promise<void> {
  try {
    await connectDB();
    await SecurityLockoutModel.deleteOne({ ip });
  } catch {
    // Ignore error in edge environments
  }
}

