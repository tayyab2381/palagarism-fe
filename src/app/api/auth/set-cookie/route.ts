import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types";

const COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

/** Sets the httpOnly auth_token cookie after successful login or signup. */
export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse>> {
  try {
    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 },
      );
    }

    const { token } = body as Record<string, unknown>;

    if (typeof token !== "string" || token.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Token is required" },
        { status: 400 },
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE_SECONDS,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
