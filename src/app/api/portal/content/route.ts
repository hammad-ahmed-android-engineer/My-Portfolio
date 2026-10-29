import { NextRequest, NextResponse } from "next/server";
import { portfolioService } from "@/server/services/portfolioService";
import { authService } from "@/server/services/authService";
import { getClientIp, verifyOriginCsrf } from "@/server/security/csrf";
import { recordSecurityEvent } from "@/server/security/auditLogger";
import { sanitizeNoSqlInput } from "@/server/security/inputSanitizer";
import { PortfolioData } from "@/types/portfolio";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await authService.getSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await portfolioService.getPortfolioData();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load data";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return handleSave(req);
}

export async function PUT(req: NextRequest) {
  return handleSave(req);
}

async function handleSave(req: NextRequest) {
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") ?? "unknown";

  if (!verifyOriginCsrf(req)) {
    await recordSecurityEvent("CSRF_BLOCKED", "admin", ip, userAgent, "BLOCKED");
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const session = await authService.getSession(req);
  if (!session) {
    await recordSecurityEvent("UNAUTHORIZED_ACCESS", "anonymous", ip, userAgent, "BLOCKED");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<PortfolioData>;
  try {
    body = sanitizeNoSqlInput(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }

  try {
    const saved = await portfolioService.updatePortfolioData(body);
    await recordSecurityEvent("PORTFOLIO_UPDATE", session.username, ip, userAgent, "SUCCESS");
    return NextResponse.json({ success: true, data: saved });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update portfolio";
    await recordSecurityEvent("PORTFOLIO_UPDATE_FAILED", session.username, ip, userAgent, "FAILED", {
      error: message,
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") ?? "unknown";

  const session = await authService.getSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const reseeded = await portfolioService.reseedPortfolioData();
    await recordSecurityEvent("PORTFOLIO_RESEED", session.username, ip, userAgent, "SUCCESS");
    return NextResponse.json({ success: true, data: reseeded });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to reseed portfolio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
