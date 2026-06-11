"use client";

import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { SecondaryCard } from "@/components/ui/SecondaryCard";
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

/** Mobile drawer for session history. */
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
        className="absolute inset-0 bg-obsidian/40"
        aria-label="Close history"
        onClick={onClose}
      />

      <SecondaryCard className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-b-none p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-caption font-medium uppercase text-steel">
            This Session
          </p>
          <SecondaryButton type="button" onClick={onClose} className="px-3 py-2">
            Close
          </SecondaryButton>
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
              className={`w-full rounded-card-sm p-3 text-left transition-opacity hover:opacity-90 ${
                entry.id === currentId ? "bg-snow shadow-card-inset" : "bg-fog"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-body font-medium text-ink">{entry.title}</p>
                <SimilarityScoreBadge score={entry.result.overallScore} />
              </div>
              <p className="mt-2 text-caption font-normal text-steel">
                {formatCheckedAt(entry.checkedAt)}
              </p>
            </button>
          ))}
        </div>

        {history.length > 0 ? (
          <SecondaryButton
            type="button"
            onClick={() => {
              onClearAll();
              onClose();
            }}
            className="mt-4 w-full"
          >
            Clear All History
          </SecondaryButton>
        ) : null}
      </SecondaryCard>
    </div>
  );
}
