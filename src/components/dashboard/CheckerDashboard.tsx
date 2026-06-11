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

export function CheckerDashboard() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentResult = usePlagiarismStore((s) => s.currentResult);
  const history = usePlagiarismStore((s) => s.history);
  const isChecking = usePlagiarismStore((s) => s.isChecking);
  const error = usePlagiarismStore((s) => s.error);
  const addResult = usePlagiarismStore((s) => s.addResult);
  const setCurrentResult = usePlagiarismStore((s) => s.setCurrentResult);
  const clearAll = usePlagiarismStore((s) => s.clearAll);
  const setChecking = usePlagiarismStore((s) => s.setChecking);
  const setError = usePlagiarismStore((s) => s.setError);
  const resultCount = useResultCount();

  async function handleSubmit() {
    const wc = countWords(text);
    if (wc === 0) {
      setError("Paste some text first.");
      return;
    }
    if (wc > MAX_WORDS) {
      setError(`Over the ${MAX_WORDS.toLocaleString()} word limit.`);
      return;
    }

    setChecking(true);
    setError(null);

    try {
      const res = await runPlagiarismCheck(text, title);
      if (!res.success || !res.data) {
        setError(res.error ?? "Check failed.");
        return;
      }
      addResult(title, text, res.data);
    } catch {
      setError("Something went wrong.");
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
        <History className="h-4 w-4" strokeWidth={1.5} />
        History
        {resultCount > 0 ? <Badge variant="muted">{resultCount}</Badge> : null}
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
            description="Run a check and your similarity report will show here."
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
