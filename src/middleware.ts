import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth-jwt";
import {
  DEV_USER_EMAIL,
  DEV_USER_ID,
  isDevBypassEnabled,
} from "@/lib/dev-bypass";

function extractToken(request: NextRequest): string | null {
  const authorization = request.headers.get("authorization");

  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice(7).trim();
  }

  return request.cookies.get("auth_token")?.value ?? null;
}

function passThroughWithUser(
  request: NextRequest,
  userId: string,
  email: string,
): NextResponse {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", userId);
  requestHeaders.set("x-user-email", email);

  if (isDevBypassEnabled()) {
    requestHeaders.set("x-dev-bypass", "true");
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export async function middleware(request: NextRequest) {
  if (isDevBypassEnabled()) {
    return passThroughWithUser(request, DEV_USER_ID, DEV_USER_EMAIL);
  }

  const token = extractToken(request);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return passThroughWithUser(request, payload.userId, payload.email);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
