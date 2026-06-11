"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckerForm } from "@/components/dashboard/CheckerForm";
import { HistoryDrawer } from "@/components/dashboard/HistoryDrawer";
import { ResultDisplay } from "@/components/dashboard/ResultDisplay";
import { SessionSidebar } from "@/components/dashboard/SessionSidebar";
import { runPlagiarismCheck } from "@/lib/plagiarism-client";
import { countWords } from "@/lib/plagiarism/utils";
import {
  usePlagiarismStore,
  useResultCount,
} from "@/store/plagiarismStore";

const MAX_WORDS = 5_000;

/** Main plagiarism checker dashboard with sidebar history and result view. */
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
    <div className="min-h-screen bg-mist">
      <header className="border-b border-pebble bg-mist">
        <div className="mx-auto flex h-14 max-w-page items-center justify-between px-6">
          <Link href="/" className="text-lg font-semibold text-obsidian">
            PlagiarCheck
          </Link>
          <p className="text-sm font-normal text-steel">Dashboard</p>
        </div>
      </header>

      <div className="mx-auto max-w-page px-6 py-8">
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="mb-4 inline-flex items-center rounded-badge bg-graphite px-3 py-1.5 text-xs font-medium text-white lg:hidden"
        >
          History ({resultCount})
        </button>

        <div className="flex flex-col lg:flex-row">
          <SessionSidebar
            history={history}
            currentId={currentResult?.id ?? null}
            onSelect={setCurrentResult}
            onClearAll={clearAll}
          />

          <main className="flex-1 lg:pl-6">
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
            ) : null}
          </main>
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
    </div>
  );
}
