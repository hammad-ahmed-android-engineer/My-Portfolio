import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/server/services/authService";
import { seoService } from "@/server/services/seoService";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await authService.getSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = seoService.getStatus();
  return NextResponse.json(status);
}

export async function POST(req: NextRequest) {
  const session = await authService.getSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await seoService.pingSearchEngines();
  return NextResponse.json(result);
}
