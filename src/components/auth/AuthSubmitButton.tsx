import { PrimaryCtaButton } from "@/components/ui/PrimaryCtaButton";

interface AuthSubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  children: string;
}

/** Full-width primary CTA with obsidian loading spinner state. */
export function AuthSubmitButton({
  isLoading,
  loadingText,
  children,
}: AuthSubmitButtonProps) {
  return (
    <PrimaryCtaButton
      type="submit"
      className="mt-6 w-full"
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <span className="inline-flex items-center">
          <span
            className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            aria-hidden="true"
          />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </PrimaryCtaButton>
  );
}
