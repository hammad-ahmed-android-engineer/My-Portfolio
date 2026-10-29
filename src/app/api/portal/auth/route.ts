import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/server/services/authService";
import {
getClientIp,
  verifyOriginCsrf,
} from "@/server/security/csrf";
import {
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
} from "@/server/security/rateLimiter";
import { recordSecurityEvent } from "@/server/security/auditLogger";
import { sanitizeNoSqlInput } from "@/server/security/inputSanitizer";
import { LoginRequest } from "@/types/api";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") ?? "unknown";

  if (!verifyOriginCsrf(req)) {
    await recordSecurityEvent("CSRF_BLOCKED", "anonymous", ip, userAgent, "BLOCKED");
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const rateCheck = await checkRateLimit(ip);
  if (!rateCheck.allowed) {
    await recordSecurityEvent("BRUTE_FORCE_LOCKOUT", "anonymous", ip, userAgent, "BLOCKED");
    return NextResponse.json(
      { error: "Too many failed login attempts. Temporarily locked for 15 minutes." },
      { status: 429 }
    );
  }

  let body: LoginRequest;
  try {
    body = sanitizeNoSqlInput(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }

  const { username = "", password = "" } = body;
  const isValid = authService.verifyCredentials(username, password);

  if (!isValid) {
    await recordFailedAttempt(ip);
    await recordSecurityEvent("LOGIN_FAILED", username, ip, userAgent, "FAILED");
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await resetRateLimit(ip);
  await recordSecurityEvent("LOGIN_SUCCESS", username, ip, userAgent, "SUCCESS");

  const token = authService.createToken(username);
  const response = NextResponse.json({ success: true, message: "Authenticated successfully" });
  authService.setSessionCookie(response, token);

  return response;
}

export async function DELETE(req: NextRequest) {
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") ?? "unknown";

  await recordSecurityEvent("LOGOUT", "admin", ip, userAgent, "SUCCESS");
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  authService.clearSessionCookie(response);

  return response;
}
