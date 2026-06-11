/** Stable dev user injected when APP_ENV=development bypass is active. */
export const DEV_USER_ID = "dev-bypass-user";
export const DEV_USER_EMAIL = "dev@plagiarcheck.local";

/**
 * Returns true when local development bypass is enabled.
 * Never active in production — requires APP_ENV=development (or dev).
 */
export function isDevBypassEnabled(): boolean {
  if (process.env.NODE_ENV === "production") {
    return false;
  }

  const appEnv = process.env.APP_ENV?.trim().toLowerCase();
  return appEnv === "development" || appEnv === "dev";
}
