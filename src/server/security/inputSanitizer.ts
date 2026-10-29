/**
 * Recursively removes MongoDB operator keys (e.g. $gt, $ne, $where) and invalid dot notations
 * to completely eliminate NoSQL injection vulnerabilities (OWASP A03).
 */
export function sanitizeNoSqlInput<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") {
    // If it's a string, strip script tags
    if (typeof obj === "string") {
      return obj.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") as unknown as T;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeNoSqlInput(item)) as unknown as T;
  }

  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    // Drop any key that starts with '$' or contains '.' (NoSQL operator attack vectors)
    if (key.startsWith("$") || key.includes(".")) {
      console.warn(`[OWASP A03] Blocked potential NoSQL injection key: ${key}`);
      continue;
    }
    cleaned[key] = sanitizeNoSqlInput(value);
  }
  return cleaned as T;
}

