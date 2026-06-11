import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types";

/** Clears the httpOnly auth_token cookie on logout. */
export async function POST(): Promise<NextResponse<ApiResponse>> {
  const response = NextResponse.json({ success: true });

  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
