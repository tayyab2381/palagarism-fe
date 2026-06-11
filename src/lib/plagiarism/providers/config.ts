export interface CopyleaksCredentials {
  apiKey: string;
  email: string;
}

/** Returns true when Copyleaks API credentials are present. */
export function isCopyleaksConfigured(credentials: CopyleaksCredentials): boolean {
  return credentials.apiKey.trim() !== "" && credentials.email.trim() !== "";
}
