export type PlagiarismProviderName = "copyleaks" | "google";

export interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
  PLAGIARISM_PROVIDER: PlagiarismProviderName;
  PLAGIARISM_API_KEY: string;
  PLAGIARISM_API_EMAIL: string;
  GOOGLE_CUSTOM_SEARCH_API_KEY: string;
  GOOGLE_CUSTOM_SEARCH_ENGINE_ID: string;
  NEXT_PUBLIC_APP_URL: string;
}

const REQUIRED_ENV_KEYS = [
  "DATABASE_URL",
  "JWT_SECRET",
  "PLAGIARISM_PROVIDER",
  "NEXT_PUBLIC_APP_URL",
] as const;

function isPlagiarismProvider(value: string): value is PlagiarismProviderName {
  return value === "copyleaks" || value === "google";
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

  const provider = process.env.PLAGIARISM_PROVIDER!.trim().toLowerCase();

  if (!isPlagiarismProvider(provider)) {
    throw new Error(
      `Invalid PLAGIARISM_PROVIDER "${provider}". Expected "copyleaks" or "google".`,
    );
  }

  const plagiarismApiKey = process.env.PLAGIARISM_API_KEY?.trim() ?? "";
  const plagiarismApiEmail = process.env.PLAGIARISM_API_EMAIL?.trim() ?? "";
  const googleApiKey = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY?.trim() ?? "";
  const googleEngineId = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID?.trim() ?? "";

  if (provider === "copyleaks") {
    const copyleaksMissing: string[] = [];

    if (plagiarismApiKey === "") {
      copyleaksMissing.push("PLAGIARISM_API_KEY");
    }

    if (plagiarismApiEmail === "") {
      copyleaksMissing.push("PLAGIARISM_API_EMAIL");
    }

    if (copyleaksMissing.length > 0) {
      throw new Error(
        `Missing required environment variable(s) for copyleaks provider: ${copyleaksMissing.join(", ")}.`,
      );
    }
  }

  if (provider === "google") {
    const googleMissing: string[] = [];

    if (googleApiKey === "") {
      googleMissing.push("GOOGLE_CUSTOM_SEARCH_API_KEY");
    }

    if (googleEngineId === "") {
      googleMissing.push("GOOGLE_CUSTOM_SEARCH_ENGINE_ID");
    }

    if (googleMissing.length > 0) {
      throw new Error(
        `Missing required environment variable(s) for google provider: ${googleMissing.join(", ")}.`,
      );
    }
  }

  return {
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
    PLAGIARISM_PROVIDER: provider,
    PLAGIARISM_API_KEY: plagiarismApiKey,
    PLAGIARISM_API_EMAIL: plagiarismApiEmail,
    GOOGLE_CUSTOM_SEARCH_API_KEY: googleApiKey,
    GOOGLE_CUSTOM_SEARCH_ENGINE_ID: googleEngineId,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
  };
}

export const env: Env = validateEnv();
