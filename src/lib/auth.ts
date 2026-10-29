import { authService, ADMIN_COOKIE_NAME } from "@/server/services/authService";
import { NextRequest } from "next/server";
import { AdminSession } from "@/types/api";

export { ADMIN_COOKIE_NAME, authService };
export const COOKIE_NAME = ADMIN_COOKIE_NAME;

export function verifyAdminCredentials(username: string, pass: string): boolean {
  return authService.verifyCredentials(username, pass);
}

export function createAdminToken(username: string): string {
  return authService.createToken(username);
}

export function verifyAdminToken(token: string): AdminSession | null {
  return authService.verifyToken(token);
}

export async function getAdminSessionFromCookies(req?: NextRequest): Promise<AdminSession | null> {
  return authService.getSession(req);
}
