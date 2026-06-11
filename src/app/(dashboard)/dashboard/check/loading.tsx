import { Card } from "@/components/ui/Card";

export default function CheckLoading() {
  return (
    <div className="space-y-6">
      <Card variant="elevated" className="animate-pulse">
        <div className="h-4 w-40 rounded-lg bg-slate-100" />
        <div className="mt-6 h-10 rounded-xl bg-slate-100" />
        <div className="mt-4 h-48 rounded-xl bg-slate-100" />
        <div className="mt-6 h-12 rounded-xl bg-slate-100" />
      </Card>
    </div>
  );
}
