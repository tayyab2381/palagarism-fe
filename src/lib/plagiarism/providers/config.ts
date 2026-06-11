export interface ProviderCredentials {
  googleApiKey: string;
  googleEngineId: string;
  copyleaksApiKey: string;
  copyleaksEmail: string;
}

/** Returns true when Google Custom Search credentials are present. */
export function isGoogleConfigured(credentials: ProviderCredentials): boolean {
  return (
    credentials.googleApiKey.trim() !== "" &&
    credentials.googleEngineId.trim() !== ""
  );
}

/** Returns true when Copyleaks API credentials are present. */
export function isCopyleaksConfigured(credentials: ProviderCredentials): boolean {
  return (
    credentials.copyleaksApiKey.trim() !== "" &&
    credentials.copyleaksEmail.trim() !== ""
  );
}
