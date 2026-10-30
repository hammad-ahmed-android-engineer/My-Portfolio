/**
 * Document utility helpers for PDF viewing and silent direct downloading.
 */

export function getDriveDirectDownloadUrl(url?: string): string {
  if (!url) return "";

  const fileMatch = url.match(/\/(?:file\/|document\/)?d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    if (url.includes("docs.google.com/document")) {
      return `https://docs.google.com/document/d/${fileMatch[1]}/export?format=pdf`;
    }
    return `https://drive.google.com/uc?export=download&id=${fileMatch[1]}&confirm=t`;
  }

  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${idMatch[1]}&confirm=t`;
  }

  return url;
}

export function openPdfViewer(url?: string, fallbackFn?: () => void) {
  if (url && url.startsWith("http")) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else if (fallbackFn) {
    fallbackFn();
  }
}

/**
 * Fetches the PDF binary stream via /api/download and triggers a browser Blob download
 * in the current tab without opening a new tab or changing the page.
 * Returns a Promise that resolves once the file download has been triggered.
 */
export async function downloadPdf(
  url?: string,
  fallbackFn?: () => void,
  docType: "cv" | "cover-letter" = "cv"
): Promise<void> {
  const filename =
    docType === "cover-letter"
      ? "Hammad_Ahmed_Cover_Letter.pdf"
      : "Hammad_Ahmed_Android_Engineer_CV.pdf";

  const params = new URLSearchParams({ type: docType });
  if (url && url.startsWith("http")) {
    params.set("url", url);
  }

  const downloadEndpoint = `/api/download?${params.toString()}`;
  const container = document.getElementById("app-root") || document.body;

  try {
    const response = await fetch(downloadEndpoint);
    if (!response.ok) {
      throw new Error(`Download failed with status ${response.status}`);
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", filename);
    link.style.display = "none";
    container.appendChild(link);
    link.click();

    setTimeout(() => {
      try {
        container.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch {}
    }, 300);
  } catch (err) {
    console.error("Failed to download PDF:", err);
    if (fallbackFn) {
      fallbackFn();
    }
  }
}
