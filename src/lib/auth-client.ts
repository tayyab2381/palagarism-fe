import type { ApiResponse, AuthSuccessData } from "@/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/** Persists JWT in an httpOnly cookie via the set-cookie API route. */
export async function persistAuthToken(token: string): Promise<void> {
  const response = await fetch("/api/auth/set-cookie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const data = (await response.json()) as ApiResponse;

  if (!response.ok || !data.success) {
    throw new Error(data.error ?? "Failed to establish session");
  }
}

/** Calls login or signup and returns the typed API response. */
export async function authenticate(
  endpoint: "/api/auth/login" | "/api/auth/signup",
  credentials: Record<string, string>,
): Promise<ApiResponse<AuthSuccessData>> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return (await response.json()) as ApiResponse<AuthSuccessData>;
}
