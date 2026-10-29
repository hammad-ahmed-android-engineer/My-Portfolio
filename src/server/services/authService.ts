import jwt from "jsonwebtoken";
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { serverConfig } from "@/config/serverConfig";
import { AdminSession } from "@/types/api";

export const ADMIN_COOKIE_NAME = "portfolio_admin_token";

export class AuthService {
  /**
   * OWASP A07: Timing-safe comparison to prevent side-channel timing attacks
   */
  verifyCredentials(username: string, pass: string): boolean {
    if (!serverConfig.adminPassword || !pass) return false;
    const userA = Buffer.from(username.trim());
    const userB = Buffer.from(serverConfig.adminUsername);
    const passA = Buffer.from(pass);
    const passB = Buffer.from(serverConfig.adminPassword);

    const userMatches = userA.length === userB.length && crypto.timingSafeEqual(userA, userB);
    const passMatches = passA.length === passB.length && crypto.timingSafeEqual(passA, passB);

    return userMatches && passMatches;
  }

  createToken(username: string): string {
    return jwt.sign({ username, role: "admin" }, serverConfig.jwtSecret, {
      expiresIn: "7d",
    });
  }

  verifyToken(token: string): AdminSession | null {
    try {
      const decoded = jwt.verify(token, serverConfig.jwtSecret) as AdminSession;
      if (decoded && decoded.role === "admin") {
        return decoded;
      }
      return null;
    } catch {
      return null;
    }
  }

  async getSession(req?: NextRequest): Promise<AdminSession | null> {
    if (req) {
      const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
      if (token) return this.verifyToken(token);
    }

    try {
      const cookieStore = await cookies();
      const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
      if (token) return this.verifyToken(token);
    } catch {
      return null;
    }

    return null;
  }

  setSessionCookie(res: NextResponse, token: string): void {
    res.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
  }

  clearSessionCookie(res: NextResponse): void {
    res.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
  }
}

export const authService = new AuthService();

