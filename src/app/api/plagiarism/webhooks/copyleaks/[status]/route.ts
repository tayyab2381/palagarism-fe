import { NextResponse } from "next/server";
import {
  completeScan,
  failScan,
  type CopyleaksCompletedPayload,
} from "@/lib/plagiarism/copyleaks-webhook-store";

/** Receives Copyleaks async scan webhooks and stores results for polling. */
export async function POST(
  request: Request,
  context: { params: { status: string } },
): Promise<NextResponse> {
  const scanId = new URL(request.url).searchParams.get("scanId");
  const status = context.params.status;

  if (!scanId) {
    return NextResponse.json({ success: false, error: "Missing scanId" }, {
      status: 400,
    });
  }

  if (status === "error") {
    failScan(scanId, "Copyleaks reported a scan error");
    return NextResponse.json({ success: true });
  }

  if (status === "completed") {
    const payload = (await request.json()) as CopyleaksCompletedPayload;
    completeScan(scanId, payload);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: true });
}
