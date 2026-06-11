import { NextResponse } from "next/server";
import { signToken, verifyPassword } from "@/lib/auth";
import { query } from "@/lib/db";
import type {
  ApiResponse,
  AuthCredentials,
  AuthSuccessData,
  UserRow,
} from "@/types";

const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password";

function parseCredentials(
  body: unknown,
): { ok: true; credentials: AuthCredentials } | { ok: false } {
  if (typeof body !== "object" || body === null) {
    return { ok: false };
  }

  const { email, password } = body as Record<string, unknown>;

  if (typeof email !== "string" || typeof password !== "string") {
    return { ok: false };
  }

  return {
    ok: true,
    credentials: { email: email.trim().toLowerCase(), password },
  };
}

export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse<AuthSuccessData>>> {
  try {
    const body: unknown = await request.json();
    const parsed = parseCredentials(body);

    if (!parsed.ok) {
      return NextResponse.json(
        { success: false, error: INVALID_CREDENTIALS_MESSAGE },
        { status: 401 },
      );
    }

    const { email, password } = parsed.credentials;

    const result = await query<Pick<UserRow, "id" | "email" | "password_hash">>(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [email],
    );

    const user = result.rows[0];

    if (!user) {
      return NextResponse.json(
        { success: false, error: INVALID_CREDENTIALS_MESSAGE },
        { status: 401 },
      );
    }

    const passwordValid = await verifyPassword(password, user.password_hash);

    if (!passwordValid) {
      return NextResponse.json(
        { success: false, error: INVALID_CREDENTIALS_MESSAGE },
        { status: 401 },
      );
    }

    const token = await signToken({ userId: user.id, email: user.email });

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: { id: user.id, email: user.email },
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
