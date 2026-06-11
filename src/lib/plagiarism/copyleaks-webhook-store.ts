interface CopyleaksInternetResult {
  url?: string;
  introduction?: string;
  matchedWords?: number;
  title?: string;
}

export interface CopyleaksCompletedPayload {
  scannedDocument?: {
    totalWords?: number;
  };
  results?: {
    internet?: CopyleaksInternetResult[];
  };
  score?: {
    aggregatedScore?: number;
  };
}

interface PendingScan {
  status: "pending" | "completed" | "error";
  payload?: CopyleaksCompletedPayload;
  error?: string;
}

const pendingScans = new Map<string, PendingScan>();

/** Registers a scan slot before Copyleaks submission so webhooks can resolve it. */
export function registerPendingScan(scanId: string): void {
  pendingScans.set(scanId, { status: "pending" });
}

/** Stores a completed Copyleaks webhook payload for polling retrieval. */
export function completeScan(
  scanId: string,
  payload: CopyleaksCompletedPayload,
): void {
  pendingScans.set(scanId, { status: "completed", payload });
}

/** Marks a scan as failed when Copyleaks sends an error webhook. */
export function failScan(scanId: string, error: string): void {
  pendingScans.set(scanId, { status: "error", error });
}

/** Polls the in-memory store until the scan completes or times out. */
export async function waitForScanCompletion(
  scanId: string,
  timeoutMs = 90_000,
  intervalMs = 2_000,
): Promise<CopyleaksCompletedPayload> {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const entry = pendingScans.get(scanId);

    if (entry?.status === "completed" && entry.payload) {
      pendingScans.delete(scanId);
      return entry.payload;
    }

    if (entry?.status === "error") {
      pendingScans.delete(scanId);
      throw new Error(entry.error ?? "Copyleaks scan failed");
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  pendingScans.delete(scanId);
  throw new Error("Copyleaks scan timed out waiting for webhook completion");
}
