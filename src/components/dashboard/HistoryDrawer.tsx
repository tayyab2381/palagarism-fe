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

export function HistoryDrawer({
  isOpen,
  history,
  currentId,
  onClose,
  onSelect,
  onClearAll,
}: HistoryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-stone-900/20"
        aria-label="Close"
        onClick={onClose}
      />
      <Card className="absolute bottom-0 left-0 right-0 max-h-[75vh] overflow-y-auto rounded-b-none p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-medium text-ink">Session history</span>
          <Button variant="ghost" onClick={onClose} className="px-2 py-1 text-sm">
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
              className={`w-full rounded-lg border px-3 py-2 text-left ${
                entry.id === currentId ? "border-stone-300 bg-stone-50" : "border-line"
              }`}
            >
              <div className="flex justify-between gap-2">
                <span className="text-sm font-medium text-ink">{entry.title}</span>
                <SimilarityScoreBadge score={entry.result.overallScore} />
              </div>
              <span className="text-xs text-ink-subtle">
                {formatCheckedAt(entry.checkedAt)}
              </span>
            </button>
          ))}
        </div>

        {history.length > 0 ? (
          <Button
            variant="secondary"
            onClick={() => {
              onClearAll();
              onClose();
            }}
            className="mt-3 w-full"
          >
            Clear session
          </Button>
        ) : null}
      </Card>
    </div>
  );
}
