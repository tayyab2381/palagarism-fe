import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

interface AuthSubmitButtonProps {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

/** Full-width gradient submit button for auth forms. */
export function AuthSubmitButton({
  children,
  isLoading = false,
  loadingText = "Loading...",
}: AuthSubmitButtonProps) {
  return (
    <Button type="submit" disabled={isLoading} className="mt-2 w-full">
      {isLoading ? loadingText : children}
    </Button>
  );
}
