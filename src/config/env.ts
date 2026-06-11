import { isDevBypassEnabled } from "@/lib/dev-bypass";
import {
  isCopyleaksConfigured,
  isGoogleConfigured,
} from "@/lib/plagiarism/providers/config";

export type PlagiarismProviderMode = "auto" | "google" | "copyleaks";

export interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
  APP_ENV: string;
  IS_DEV_BYPASS: boolean;
  PLAGIARISM_PROVIDER: PlagiarismProviderMode;
  PLAGIARISM_API_KEY: string;
  PLAGIARISM_API_EMAIL: string;
  GOOGLE_CUSTOM_SEARCH_API_KEY: string;
  GOOGLE_CUSTOM_SEARCH_ENGINE_ID: string;
  COPYLEAKS_SANDBOX: boolean;
  NEXT_PUBLIC_APP_URL: string;
}

const REQUIRED_ENV_KEYS = [
  "DATABASE_URL",
  "JWT_SECRET",
  "PLAGIARISM_PROVIDER",
  "NEXT_PUBLIC_APP_URL",
] as const;

/** Normalizes provider env values, including legacy aliases. */
function normalizePlagiarismProvider(value: string): PlagiarismProviderMode | null {
  const normalized = value.trim().toLowerCase();

  if (normalized === "auto") {
    return "auto";
  }

  if (normalized === "google" || normalized === "google-search") {
    return "google";
  }

  if (normalized === "copyleaks") {
    return "copyleaks";
  }

  return null;
}

function readGoogleApiKey(): string {
  return (
    process.env.GOOGLE_CUSTOM_SEARCH_API_KEY?.trim() ??
    process.env.GOOGLE_SEARCH_API_KEY?.trim() ??
    ""
  );
}

function readGoogleEngineId(): string {
  return (
    process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID?.trim() ??
    process.env.GOOGLE_SEARCH_ENGINE_ID?.trim() ??
    ""
  );
}

function parseCopyleaksSandbox(value: string | undefined): boolean {
  if (value === undefined || value.trim() === "") {
    return true;
  }

  const normalized = value.trim().toLowerCase();
  return normalized !== "false" && normalized !== "0";
}

function validateEnv(): Env {
  const missing = REQUIRED_ENV_KEYS.filter((key) => {
    const value = process.env[key];
    return value === undefined || value.trim() === "";
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(", ")}. ` +
        "Copy .env.local.example to .env.local and set all values before starting the app.",
    );
  }

  const provider = normalizePlagiarismProvider(process.env.PLAGIARISM_PROVIDER!);

  if (!provider) {
    throw new Error(
      `Invalid PLAGIARISM_PROVIDER "${process.env.PLAGIARISM_PROVIDER}". Expected "auto", "google", "google-search", or "copyleaks".`,
    );
  }

  const credentials = {
    googleApiKey: readGoogleApiKey(),
    googleEngineId: readGoogleEngineId(),
    copyleaksApiKey: process.env.PLAGIARISM_API_KEY?.trim() ?? "",
    copyleaksEmail: process.env.PLAGIARISM_API_EMAIL?.trim() ?? "",
  };

  const isDevBypass = isDevBypassEnabled();

  const envCandidate: Env = {
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
    APP_ENV: process.env.APP_ENV?.trim() ?? "",
    IS_DEV_BYPASS: isDevBypass,
    PLAGIARISM_PROVIDER: provider,
    PLAGIARISM_API_KEY: credentials.copyleaksApiKey,
    PLAGIARISM_API_EMAIL: credentials.copyleaksEmail,
    GOOGLE_CUSTOM_SEARCH_API_KEY: credentials.googleApiKey,
    GOOGLE_CUSTOM_SEARCH_ENGINE_ID: credentials.googleEngineId,
    COPYLEAKS_SANDBOX: parseCopyleaksSandbox(process.env.COPYLEAKS_SANDBOX),
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
  };

  if (!isDevBypass) {
    if (provider === "google" && !isGoogleConfigured(credentials)) {
      throw new Error(
        "PLAGIARISM_PROVIDER=google requires GOOGLE_CUSTOM_SEARCH_API_KEY and GOOGLE_CUSTOM_SEARCH_ENGINE_ID.",
      );
    }

    if (provider === "copyleaks" && !isCopyleaksConfigured(credentials)) {
      throw new Error(
        "PLAGIARISM_PROVIDER=copyleaks requires PLAGIARISM_API_KEY and PLAGIARISM_API_EMAIL.",
      );
    }

    if (
      provider === "auto" &&
      !isGoogleConfigured(credentials) &&
      !isCopyleaksConfigured(credentials)
    ) {
      throw new Error(
        "PLAGIARISM_PROVIDER=auto requires at least one provider configured (Google Custom Search or Copyleaks credentials).",
      );
    }
  }

  if (isDevBypass) {
    console.warn(
      "[PlagiarCheck] APP_ENV=development — auth, rate limits, and provider env checks are bypassed.",
    );
  }

  return envCandidate;
}

export const env: Env = validateEnv();
