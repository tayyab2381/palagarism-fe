import { signToken } from "@/lib/auth";
import { DEV_USER_EMAIL, DEV_USER_ID } from "@/lib/dev-bypass";
import type { AuthSuccessData } from "@/types";

/** Issues a signed dev session without touching the database. */
export async function createDevAuthResponse(
  email?: string,
): Promise<AuthSuccessData> {
  const resolvedEmail = email?.trim().toLowerCase() || DEV_USER_EMAIL;
  const token = await signToken({
    userId: DEV_USER_ID,
    email: resolvedEmail,
  });

  return {
    token,
    user: {
      id: DEV_USER_ID,
      email: resolvedEmail,
    },
  };
}
