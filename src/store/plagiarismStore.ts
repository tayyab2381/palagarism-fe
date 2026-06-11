"use client";

import { nanoid } from "nanoid";
import { create } from "zustand";
import type { PlagiarismResult } from "@/lib/plagiarism/types";

const DISPLAY_TEXT_LIMIT = 500;

export interface CheckHistory {
  id: string;
  title: string;
  text: string;
  result: PlagiarismResult;
  checkedAt: string;
}

export interface PlagiarismStore {
  history: CheckHistory[];
  currentResult: CheckHistory | null;
  isChecking: boolean;
  error: string | null;

  addResult: (title: string, text: string, result: PlagiarismResult) => void;
  setCurrentResult: (id: string) => void;
  removeResult: (id: string) => void;
  clearAll: () => void;
  setChecking: (val: boolean) => void;
  setError: (msg: string | null) => void;
}

/**
 * Results are intentionally never persisted.
 * Refreshing the page clears all history. This is by design for user privacy.
 */
export const usePlagiarismStore = create<PlagiarismStore>((set, get) => ({
  history: [],
  currentResult: null,
  isChecking: false,
  error: null,

  addResult: (title, text, result) => {
    const { history } = get();
    const resolvedTitle =
      title.trim() === "" ? `Check #${history.length + 1}` : title.trim();
    const truncatedText =
      text.length > DISPLAY_TEXT_LIMIT
        ? `${text.slice(0, DISPLAY_TEXT_LIMIT)}…`
        : text;

    const entry: CheckHistory = {
      id: nanoid(),
      title: resolvedTitle,
      text: truncatedText,
      result,
      checkedAt: new Date().toISOString(),
    };

    set({
      history: [entry, ...history],
      currentResult: entry,
      error: null,
    });
  },

  setCurrentResult: (id) => {
    const match = get().history.find((entry) => entry.id === id) ?? null;
    set({ currentResult: match });
  },

  removeResult: (id) => {
    const { history, currentResult } = get();
    const nextHistory = history.filter((entry) => entry.id !== id);
    const nextCurrent =
      currentResult?.id === id ? (nextHistory[0] ?? null) : currentResult;

    set({
      history: nextHistory,
      currentResult: nextCurrent,
    });
  },

  clearAll: () => {
    set({
      history: [],
      currentResult: null,
      error: null,
    });
  },

  setChecking: (val) => {
    set({ isChecking: val });
  },

  setError: (msg) => {
    set({ error: msg });
  },
}));

/** Returns the number of checks stored in memory. */
export function useResultCount(): number {
  return usePlagiarismStore((state) => state.history.length);
}

/** Returns whether any plagiarism results are currently in memory. */
export function useHasResults(): boolean {
  return usePlagiarismStore((state) => state.history.length > 0);
}
