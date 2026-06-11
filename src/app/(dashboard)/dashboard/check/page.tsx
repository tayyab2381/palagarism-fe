import { CheckerDashboard } from "@/components/dashboard/CheckerDashboard";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function CheckPage() {
  return (
    <ErrorBoundary fallbackTitle="Checker unavailable">
      <CheckerDashboard />
    </ErrorBoundary>
  );
}
