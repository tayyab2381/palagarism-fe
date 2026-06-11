import { NextResponse } from "next/server";
import { hashPassword, signToken } from "@/lib/auth";
import { query } from "@/lib/db";
import type {
  ApiResponse,
  AuthCredentials,
  AuthSuccessData,
  UserRow,
} from "@/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateCredentials(
  body: unknown,
): { ok: true; credentials: AuthCredentials } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body" };
  }

  const { email, password } = body as Record<string, unknown>;

  if (typeof email !== "string" || typeof password !== "string") {
    return { ok: false, error: "Email and password are required" };
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return { ok: false, error: "Invalid email format" };
  }

  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters" };
  }

  return {
    ok: true,
    credentials: { email: normalizedEmail, password },
  };
}

export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse<AuthSuccessData>>> {
  try {
    const body: unknown = await request.json();
    const validation = validateCredentials(body);

    if (!validation.ok) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 },
      );
    }

    const { email, password } = validation.credentials;

    const existing = await query<Pick<UserRow, "id">>(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );

    if (existing.rowCount && existing.rowCount > 0) {
      return NextResponse.json(
        { success: false, error: "Email already in use" },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);

    const inserted = await query<Pick<UserRow, "id" | "email">>(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email, passwordHash],
    );

    const user = inserted.rows[0];

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Failed to create user" },
        { status: 500 },
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
