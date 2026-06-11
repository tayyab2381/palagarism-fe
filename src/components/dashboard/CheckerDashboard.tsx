"use client";

import { useState } from "react";
import { CheckerForm } from "@/components/dashboard/CheckerForm";
import { HistoryDrawer } from "@/components/dashboard/HistoryDrawer";
import { ResultDisplay } from "@/components/dashboard/ResultDisplay";
import { SessionSidebar } from "@/components/dashboard/SessionSidebar";
import { EmptyState } from "@/components/ui/EmptyState";
import { DarkFilledBadge } from "@/components/ui/DarkFilledBadge";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { runPlagiarismCheck } from "@/lib/plagiarism-client";
import { countWords } from "@/lib/plagiarism/utils";
import {
  usePlagiarismStore,
  useResultCount,
} from "@/store/plagiarismStore";

const MAX_WORDS = 5_000;

/** Main plagiarism checker dashboard with session history and result view. */
export function CheckerDashboard() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const history = usePlagiarismStore((state) => state.history);
  const currentResult = usePlagiarismStore((state) => state.currentResult);
  const isChecking = usePlagiarismStore((state) => state.isChecking);
  const error = usePlagiarismStore((state) => state.error);
  const addResult = usePlagiarismStore((state) => state.addResult);
  const setCurrentResult = usePlagiarismStore((state) => state.setCurrentResult);
  const removeResult = usePlagiarismStore((state) => state.removeResult);
  const clearAll = usePlagiarismStore((state) => state.clearAll);
  const setChecking = usePlagiarismStore((state) => state.setChecking);
  const setError = usePlagiarismStore((state) => state.setError);

  const resultCount = useResultCount();

  async function handleSubmit() {
    const wordCount = countWords(text);

    if (wordCount === 0) {
      setError("Please paste some text before checking.");
      return;
    }

    if (wordCount > MAX_WORDS) {
      setError(`Text exceeds the ${MAX_WORDS.toLocaleString()} word limit.`);
      return;
    }

    setChecking(true);
    setError(null);

    try {
      const response = await runPlagiarismCheck(text, title);

      if (!response.success || !response.data) {
        setError(response.error ?? "Plagiarism check failed. Please try again.");
        return;
      }

      addResult(title, text, response.data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <>
      <SecondaryButton
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        className="mb-4 lg:hidden"
      >
        History
        {resultCount > 0 ? (
          <DarkFilledBadge className="ml-2">{resultCount}</DarkFilledBadge>
        ) : null}
      </SecondaryButton>

      <div className="flex flex-col lg:flex-row lg:gap-6">
        <SessionSidebar
          history={history}
          currentId={currentResult?.id ?? null}
          onSelect={setCurrentResult}
          onClearAll={clearAll}
          onRemove={removeResult}
        />

        <div className="min-w-0 flex-1">
          <CheckerForm
            title={title}
            text={text}
            isChecking={isChecking}
            error={error}
            onTitleChange={setTitle}
            onTextChange={setText}
            onSubmit={handleSubmit}
          />

          {currentResult ? (
            <ResultDisplay result={currentResult.result} />
          ) : !isChecking && history.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                title="No results yet"
                description="Paste your text above and run a plagiarism check. Results will appear here with similarity scores and matched sources."
              />
            </div>
          ) : null}
        </div>
      </div>

      <HistoryDrawer
        isOpen={isDrawerOpen}
        history={history}
        currentId={currentResult?.id ?? null}
        onClose={() => setIsDrawerOpen(false)}
        onSelect={setCurrentResult}
        onClearAll={clearAll}
      />
    </>
  );
}
