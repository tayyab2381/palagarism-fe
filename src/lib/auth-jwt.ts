import { SignJWT, jwtVerify } from "jose";
import { env } from "@/config/env";
import type { TokenPayload } from "@/types";

const TOKEN_EXPIRY = "7d";

const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

function isTokenPayload(value: unknown): value is TokenPayload {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return typeof record.userId === "string" && typeof record.email === "string";
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ userId: payload.userId, email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(jwtSecret);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, jwtSecret);

    if (!isTokenPayload(payload)) {
      return null;
    }

    return {
      userId: payload.userId,
      email: payload.email,
    };
  } catch {
    return null;
  }
}
