/** Maps Postgres / connection errors to safe client messages and logs details server-side. */
export function handleDatabaseError(
  context: string,
  error: unknown,
): { status: number; message: string } {
  const pgCode =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
      ? (error as { code: string }).code
      : null;

  const pgMessage =
    error instanceof Error ? error.message : "Unknown database error";

  console.error(`[${context}] Database error:`, {
    code: pgCode,
    message: pgMessage,
  });

  if (pgCode === "42P01") {
    return {
      status: 503,
      message:
        "Database is not initialized. Run the users table migration in Supabase SQL Editor.",
    };
  }

  if (
    pgCode === "ECONNREFUSED" ||
    pgCode === "ENOTFOUND" ||
    pgMessage.includes("ECONNREFUSED") ||
    pgMessage.includes("ENOTFOUND") ||
    pgMessage.includes("getaddrinfo")
  ) {
    return {
      status: 503,
      message:
        "Database connection failed. On Vercel, use the Supabase connection pooler URL (port 6543), not the direct connection.",
    };
  }

  if (
    pgMessage.includes("SSL") ||
    pgMessage.includes("certificate") ||
    pgCode === "28000"
  ) {
    return {
      status: 503,
      message:
        "Database SSL connection failed. Verify DATABASE_URL and that Supabase allows external connections.",
    };
  }

  return {
    status: 500,
    message: "Internal server error",
  };
}
