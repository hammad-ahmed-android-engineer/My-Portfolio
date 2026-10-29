import { connectDB } from "@/lib/db";
import { AuditLogModel } from "@/models/Portfolio";

export async function recordSecurityEvent(
  action: string,
  performedBy: string,
  ip: string,
  userAgent: string,
  status: "SUCCESS" | "FAILED" | "BLOCKED",
  details: Record<string, unknown> = {}
): Promise<void> {
  try {
    await connectDB();
    await AuditLogModel.create({
      action,
      performedBy,
      ip,
      userAgent,
      status,
      details,
      timestamp: new Date(),
    });
  } catch {
    console.warn(`[Security Log] ${action} by ${performedBy} (${ip}) - Status: ${status}`);
  }
}

