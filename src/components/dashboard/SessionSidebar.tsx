"use client";

import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { SecondaryCard } from "@/components/ui/SecondaryCard";
import { formatCheckedAt } from "@/lib/score-utils";
import type { CheckHistory } from "@/store/plagiarismStore";

interface SessionSidebarProps {
  history: CheckHistory[];
  currentId: string | null;
  onSelect: (id: string) => void;
  onClearAll: () => void;
  onRemove?: (id: string) => void;
}

/** Desktop sidebar listing in-session plagiarism checks. */
export function SessionSidebar({
  history,
  currentId,
  onSelect,
  onClearAll,
  onRemove,
}: SessionSidebarProps) {
  return (
    <aside className="mb-6 w-full shrink-0 lg:mb-0 lg:w-[280px]">
      <SecondaryCard className="flex flex-col p-4 lg:min-h-[calc(100vh-12rem)]">
        <p className="text-caption font-medium uppercase text-steel">
          This Session
        </p>

        <div className="mt-4 flex-1 space-y-2 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-body font-normal text-steel">
              No checks yet. Run your first scan to see history here.
            </p>
          ) : (
            history.map((entry) => {
              const isActive = entry.id === currentId;

              return (
                <div
                  key={entry.id}
                  className={`rounded-card-sm p-3 transition-opacity hover:opacity-90 ${
                    isActive ? "bg-snow shadow-card-inset" : "bg-fog"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelect(entry.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-body font-medium text-ink">
                        {entry.title}
                      </p>
                      <SimilarityScoreBadge score={entry.result.overallScore} />
                    </div>
                    <p className="mt-2 text-caption font-normal text-steel">
                      {formatCheckedAt(entry.checkedAt)}
                    </p>
                  </button>
                  {onRemove ? (
                    <SecondaryButton
                      type="button"
                      onClick={() => onRemove(entry.id)}
                      className="mt-2 w-full px-3 py-2 text-caption"
                    >
                      Remove
                    </SecondaryButton>
                  ) : null}
                </div>
              );
            })
          )}
        </div>

        {history.length > 0 ? (
          <SecondaryButton
            type="button"
            onClick={onClearAll}
            className="mt-4 w-full"
          >
            Clear All History
          </SecondaryButton>
        ) : null}
      </SecondaryCard>
    </aside>
  );
}
