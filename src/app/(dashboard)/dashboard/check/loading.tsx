import { PrimaryCard } from "@/components/ui/PrimaryCard";

/** Loading skeleton for the dashboard check page. */
export default function CheckLoading() {
  return (
    <div className="space-y-6">
      <PrimaryCard className="animate-pulse">
        <div className="h-4 w-32 rounded-badge bg-fog" />
        <div className="mt-6 h-10 rounded-input bg-fog" />
        <div className="mt-4 h-48 rounded-input bg-fog" />
        <div className="mt-6 h-12 rounded-pill bg-fog" />
      </PrimaryCard>
    </div>
  );
}
