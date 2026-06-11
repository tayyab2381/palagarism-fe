"use client";

import { PrimaryCard } from "@/components/ui/PrimaryCard";
import { PrimaryCtaButton } from "@/components/ui/PrimaryCtaButton";
import { TextArea } from "@/components/ui/TextArea";
import { TextInput } from "@/components/ui/TextInput";
import { countWords } from "@/lib/plagiarism/utils";

const MAX_WORDS = 5_000;

interface CheckerFormProps {
  title: string;
  text: string;
  isChecking: boolean;
  error: string | null;
  onTitleChange: (value: string) => void;
  onTextChange: (value: string) => void;
  onSubmit: () => void;
}

/** Plagiarism check input form with live word count and loading state. */
export function CheckerForm({
  title,
  text,
  isChecking,
  error,
  onTitleChange,
  onTextChange,
  onSubmit,
}: CheckerFormProps) {
  const wordCount = countWords(text);
  const isOverLimit = wordCount > MAX_WORDS;
  const canSubmit = wordCount > 0 && !isOverLimit && !isChecking;

  return (
    <PrimaryCard>
      <TextInput
        type="text"
        placeholder="Give this check a name (optional)"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        className="py-2"
        aria-label="Check title"
      />

      <TextArea
        placeholder="Paste your text here..."
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
        className="mt-4 min-h-48 resize-y"
        aria-label="Text to check"
      />

      <p
        className={`mt-2 text-right text-xs ${isOverLimit ? "text-red-600" : "text-ash"}`}
      >
        {wordCount.toLocaleString()} / {MAX_WORDS.toLocaleString()} words
      </p>

      {error ? (
        <p className="mt-3 text-sm font-normal text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      {isChecking ? (
        <div className="mt-6">
          <div className="relative h-1 overflow-hidden rounded-full bg-fog">
            <div className="absolute inset-y-0 left-0 w-1/3 animate-shimmer rounded-full bg-obsidian" />
          </div>
          <p className="mt-3 text-sm font-normal text-steel">
            Scanning across the web...
          </p>
        </div>
      ) : (
        <PrimaryCtaButton
          type="button"
          className="mt-6 w-full"
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          Check for Plagiarism
        </PrimaryCtaButton>
      )}
    </PrimaryCard>
  );
}
