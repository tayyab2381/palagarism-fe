"use client";

import { useState } from "react";
import { History } from "lucide-react";
import { CheckerForm } from "@/components/dashboard/CheckerForm";
import { HistoryDrawer } from "@/components/dashboard/HistoryDrawer";
import { ResultDisplay } from "@/components/dashboard/ResultDisplay";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { runPlagiarismCheck } from "@/lib/plagiarism-client";
import { countWords } from "@/lib/plagiarism/utils";
import {
  usePlagiarismStore,
  useResultCount,
} from "@/store/plagiarismStore";

const MAX_WORDS = 5_000;

/** Main checker — form and results; history lives in unified sidebar. */
export function CheckerDashboard() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentResult = usePlagiarismStore((state) => state.currentResult);
  const history = usePlagiarismStore((state) => state.history);
  const isChecking = usePlagiarismStore((state) => state.isChecking);
  const error = usePlagiarismStore((state) => state.error);
  const addResult = usePlagiarismStore((state) => state.addResult);
  const setCurrentResult = usePlagiarismStore((state) => state.setCurrentResult);
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
      <Button
        type="button"
        variant="secondary"
        onClick={() => setIsDrawerOpen(true)}
        className="mb-4 gap-2 lg:hidden"
      >
        <History className="h-4 w-4" />
        History
        {resultCount > 0 ? (
          <Badge variant="brand">{resultCount}</Badge>
        ) : null}
      </Button>

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
