import { NextRequest, NextResponse } from "next/server";
import { portfolioService } from "@/server/services/portfolioService";
import { encryptPayload } from "@/server/security/crypto";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const data = await portfolioService.getPortfolioData();
    const shouldEncrypt = req.nextUrl.searchParams.get("encrypted") === "true";

    if (shouldEncrypt) {
      return NextResponse.json({ e: encryptPayload(data) });
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error: unknown) {
    console.error("Public content retrieval failed:", error);
    return NextResponse.json(
      { error: "Failed to retrieve portfolio content" },
      { status: 500 }
    );
  }
}
