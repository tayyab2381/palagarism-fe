"use client";

import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";
import { SecondaryCard } from "@/components/ui/SecondaryCard";
import { formatCheckedAt } from "@/lib/score-utils";
import type { CheckHistory } from "@/store/plagiarismStore";

interface SessionSidebarProps {
  history: CheckHistory[];
  currentId: string | null;
  onSelect: (id: string) => void;
  onClearAll: () => void;
}

/** Desktop sidebar listing in-session plagiarism checks. */
export function SessionSidebar({
  history,
  currentId,
  onSelect,
  onClearAll,
}: SessionSidebarProps) {
  return (
    <aside className="hidden w-[280px] shrink-0 lg:block">
      <SecondaryCard className="flex min-h-[calc(100vh-8rem)] flex-col p-4">
        <p className="text-xs font-medium uppercase text-steel">This Session</p>

        <div className="mt-4 flex-1 space-y-2 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-sm font-normal text-steel">
              No checks yet. Run your first scan to see history here.
            </p>
          ) : (
            history.map((entry) => {
              const isActive = entry.id === currentId;

              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => onSelect(entry.id)}
                  className={`w-full rounded-card-sm bg-fog p-3 text-left transition-colors hover:bg-pebble/40 ${
                    isActive ? "ring-1 ring-pebble" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-ink">{entry.title}</p>
                    <SimilarityScoreBadge score={entry.result.overallScore} />
                  </div>
                  <p className="mt-2 text-xs font-normal text-steel">
                    {formatCheckedAt(entry.checkedAt)}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {history.length > 0 ? (
          <button
            type="button"
            onClick={onClearAll}
            className="mt-4 text-left text-sm text-steel underline hover:text-ink"
          >
            Clear All History
          </button>
        ) : null}
      </SecondaryCard>
    </aside>
  );
}
