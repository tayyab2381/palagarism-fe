import { isDevBypassEnabled } from "@/lib/dev-bypass";
import { isCopyleaksConfigured } from "@/lib/plagiarism/providers/config";

export interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
  APP_ENV: string;
  IS_DEV_BYPASS: boolean;
  PLAGIARISM_API_KEY: string;
  PLAGIARISM_API_EMAIL: string;
  COPYLEAKS_SANDBOX: boolean;
  NEXT_PUBLIC_APP_URL: string;
}

const REQUIRED_ENV_KEYS = [
  "DATABASE_URL",
  "JWT_SECRET",
  "NEXT_PUBLIC_APP_URL",
] as const;

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

  const copyleaksCredentials = {
    apiKey: process.env.PLAGIARISM_API_KEY?.trim() ?? "",
    email: process.env.PLAGIARISM_API_EMAIL?.trim() ?? "",
  };

  const isDevBypass = isDevBypassEnabled();

  const envCandidate: Env = {
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
    APP_ENV: process.env.APP_ENV?.trim() ?? "",
    IS_DEV_BYPASS: isDevBypass,
    PLAGIARISM_API_KEY: copyleaksCredentials.apiKey,
    PLAGIARISM_API_EMAIL: copyleaksCredentials.email,
    COPYLEAKS_SANDBOX: parseCopyleaksSandbox(process.env.COPYLEAKS_SANDBOX),
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
  };

  if (!isDevBypass && !isCopyleaksConfigured(copyleaksCredentials)) {
    throw new Error(
      "Copyleaks is not configured. Set PLAGIARISM_API_KEY and PLAGIARISM_API_EMAIL.",
    );
  }

  if (isDevBypass) {
    console.warn(
      "[PlagiarCheck] APP_ENV=development — auth, rate limits, and provider env checks are bypassed.",
    );
  }

  return envCandidate;
}

export const env: Env = validateEnv();
