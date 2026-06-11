import type { PlagiarismResult } from "@/lib/plagiarism/types";
import type { ApiResponse } from "@/types";

/** Attempts to read auth_token from document.cookie (non-httpOnly fallback). */
export function getAuthTokenFromCookie(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(/(?:^|;\s*)auth_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/** Runs a plagiarism check against the protected API. */
export async function runPlagiarismCheck(
  text: string,
  title?: string,
): Promise<ApiResponse<PlagiarismResult>> {
  const token = getAuthTokenFromCookie();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch("/api/plagiarism/check", {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({ text, title: title?.trim() || undefined }),
  });

  return (await response.json()) as ApiResponse<PlagiarismResult>;
}
