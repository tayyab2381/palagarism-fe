import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth-jwt";
import {
  DEV_USER_EMAIL,
  DEV_USER_ID,
  isDevBypassEnabled,
} from "@/lib/dev-bypass";
import type { TokenPayload } from "@/types";

/** Extracts bearer token from the Authorization header. */
function extractBearerToken(request: Request): string | null {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice(7).trim();
}

/** Reads JWT from Authorization header or httpOnly auth_token cookie. */
async function extractAuthToken(request: Request): Promise<string | null> {
  const bearerToken = extractBearerToken(request);

  if (bearerToken) {
    return bearerToken;
  }

  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value ?? null;
}

/**
 * Resolves the authenticated user from the request.
 * In APP_ENV=development, returns a stable dev user without a token.
 */
export async function resolveRequestUser(
  request: Request,
): Promise<TokenPayload | null> {
  if (isDevBypassEnabled()) {
    return {
      userId: DEV_USER_ID,
      email: DEV_USER_EMAIL,
    };
  }

  const token = await extractAuthToken(request);

  if (!token) {
    return null;
  }

  return verifyToken(token);
}
