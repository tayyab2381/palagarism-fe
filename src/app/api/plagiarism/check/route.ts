import { NextResponse } from "next/server";
import { resolveRequestUser } from "@/lib/auth-request";
import { isDevBypassEnabled } from "@/lib/dev-bypass";
import {
  detectPlagiarism,
  PlagiarismDetectionError,
} from "@/lib/plagiarism/detector";
import type { PlagiarismRequest, PlagiarismResult } from "@/lib/plagiarism/types";
import type { ApiResponse } from "@/types";

export const runtime = "nodejs";

const MAX_REQUESTS_PER_HOUR = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/** Enforces per-user hourly request limits using an in-memory store. */
function checkRateLimit(userId: string): boolean {
  if (isDevBypassEnabled()) {
    return true;
  }

  const now = Date.now();
  const entry = rateLimitStore.get(userId);

  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(userId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_HOUR) {
    return false;
  }

  entry.count += 1;
  return true;
}

/** Parses and validates the plagiarism check request body. */
function parseRequestBody(
  body: unknown,
): { ok: true; request: PlagiarismRequest } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body" };
  }

  const { text, title } = body as Record<string, unknown>;

  if (typeof text !== "string") {
    return { ok: false, error: "Text is required" };
  }

  if (title !== undefined && typeof title !== "string") {
    return { ok: false, error: "Title must be a string" };
  }

  return {
    ok: true,
    request: {
      text,
      title,
    },
  };
}

/** Protected endpoint that runs plagiarism detection without persisting results. */
export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse<PlagiarismResult>>> {
  const user = await resolveRequestUser(request);

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  if (!checkRateLimit(user.userId)) {
    return NextResponse.json(
      {
        success: false,
        error: "Rate limit exceeded. Maximum 5 checks per hour.",
      },
      { status: 429 },
    );
  }

  try {
    const body: unknown = await request.json();
    const parsed = parseRequestBody(body);

    if (!parsed.ok) {
      return NextResponse.json(
        { success: false, error: parsed.error },
        { status: 400 },
      );
    }

    const result = await detectPlagiarism(parsed.request);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof PlagiarismDetectionError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
