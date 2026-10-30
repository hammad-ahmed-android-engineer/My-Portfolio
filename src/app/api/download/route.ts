import { NextRequest, NextResponse } from "next/server";
import { portfolioService } from "@/server/services/portfolioService";

export const dynamic = "force-dynamic";

function extractDriveFileId(url?: string): string | null {
  if (!url) return null;
  const fileMatch = url.match(/\/(?:file\/|document\/)?d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return fileMatch[1];
  }
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return idMatch[1];
  }
  return null;
}

function buildDownloadUrl(rawUrl: string): string {
  const fileId = extractDriveFileId(rawUrl);
  if (!fileId) return rawUrl;

  if (rawUrl.includes("docs.google.com/document")) {
    return `https://docs.google.com/document/d/${fileId}/export?format=pdf`;
  }

  return `https://drive.google.com/uc?export=download&id=${fileId}&confirm=t`;
}

export async function GET(req: NextRequest) {
  try {
    const docType = req.nextUrl.searchParams.get("type") === "cover-letter" ? "cover-letter" : "cv";
    const explicitUrl = req.nextUrl.searchParams.get("url") || "";

    let sourceUrl = explicitUrl;
    if (!sourceUrl) {
      const data = await portfolioService.getPortfolioData();
      sourceUrl =
        docType === "cover-letter"
          ? data.personalInfo?.coverLetterDriveLink || data.personalInfo?.resumeDriveLink || ""
          : data.personalInfo?.resumeDriveLink || "";
    }

    if (!sourceUrl || !sourceUrl.startsWith("http")) {
      return NextResponse.json({ error: "Document URL not configured" }, { status: 404 });
    }

    const targetUrl = buildDownloadUrl(sourceUrl);
    let upstream = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      },
      redirect: "follow",
    });

    const contentType = upstream.headers.get("content-type") || "";
    const fileId = extractDriveFileId(sourceUrl);

    // If Google Drive returns an HTML confirmation/viewer page instead of the binary PDF,
    // use the direct usercontent download endpoint
    if (fileId && contentType.includes("text/html")) {
      const altUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
      const retry = await fetch(altUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        },
        redirect: "follow",
      });
      if (retry.ok) {
        upstream = retry;
      }
    }

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Unable to fetch document from Google Drive" },
        { status: 502 }
      );
    }

    const buffer = await upstream.arrayBuffer();
    const filename =
      docType === "cover-letter"
        ? "Hammad_Ahmed_Cover_Letter.pdf"
        : "Hammad_Ahmed_Android_Engineer_CV.pdf";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (error) {
    console.error("Document download proxy error:", error);
    return NextResponse.json({ error: "Failed to download document" }, { status: 500 });
  }
}
