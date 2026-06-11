"use client";

import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCheckedAt } from "@/lib/score-utils";
import type { CheckHistory } from "@/store/plagiarismStore";

interface HistoryDrawerProps {
  isOpen: boolean;
  history: CheckHistory[];
  currentId: string | null;
  onClose: () => void;
  onSelect: (id: string) => void;
  onClearAll: () => void;
}

/** Mobile bottom drawer for session history. */
export function HistoryDrawer({
  isOpen,
  history,
  currentId,
  onClose,
  onSelect,
  onClearAll,
}: HistoryDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        aria-label="Close history"
        onClick={onClose}
      />

      <Card
        variant="elevated"
        className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-b-none p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">Session history</p>
          <Button type="button" variant="ghost" onClick={onClose} className="px-3 py-2">
            Close
          </Button>
        </div>

        <div className="space-y-2">
          {history.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => {
                onSelect(entry.id);
                onClose();
              }}
              className={`w-full rounded-xl border p-3 text-left transition-colors ${
                entry.id === currentId
                  ? "border-brand-200 bg-brand-50/50"
                  : "border-slate-100 bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-slate-800">{entry.title}</p>
                <SimilarityScoreBadge score={entry.result.overallScore} />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {formatCheckedAt(entry.checkedAt)}
              </p>
            </button>
          ))}
        </div>

        {history.length > 0 ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              onClearAll();
              onClose();
            }}
            className="mt-4 w-full"
          >
            Clear all history
          </Button>
        ) : null}
      </Card>
    </div>
  );
}
