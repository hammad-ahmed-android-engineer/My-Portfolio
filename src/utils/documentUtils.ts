/**
 * Document utility helpers for PDF viewing and direct downloading.
 */

export function getDriveDirectDownloadUrl(url?: string): string {
  if (!url) return "";

  // Check if it's a Google Drive file link
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${fileMatch[1]}`;
  }

  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${idMatch[1]}`;
  }

  // If already a direct download or external link, return as-is
  return url;
}

export function openPdfViewer(url?: string, fallbackFn?: () => void) {
  if (url && url.startsWith("http")) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else if (fallbackFn) {
    fallbackFn();
  }
}

export function downloadPdf(url?: string, fallbackFn?: () => void) {
  if (url && url.startsWith("http")) {
    const downloadUrl = getDriveDirectDownloadUrl(url);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("download", "Hammad_Ahmed_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (fallbackFn) {
    fallbackFn();
  } else {
    window.print();
  }
}

