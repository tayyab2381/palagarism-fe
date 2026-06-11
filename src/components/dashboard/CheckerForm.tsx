"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { FormError } from "@/components/ui/FormError";
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

/** Premium checker form with icon header and gradient loading. */
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
    <Card variant="elevated">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand shadow-glow-sm">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">New plagiarism check</h2>
            <p className="text-sm text-slate-500">Paste up to 5,000 words</p>
          </div>
        </div>
        <Badge variant={isOverLimit ? "rose" : "neutral"}>
          {wordCount.toLocaleString()} / {MAX_WORDS.toLocaleString()}
        </Badge>
      </div>

      <TextInput
        type="text"
        placeholder="Give this check a name (optional)"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        aria-label="Check title"
      />

      <TextArea
        placeholder="Paste your essay, paper, or article here..."
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
        className="mt-4 min-h-52 resize-y"
        aria-label="Text to check"
      />

      {isOverLimit ? (
        <FormError className="mt-4">
          Text exceeds the {MAX_WORDS.toLocaleString()} word limit. Please shorten
          your text before checking.
        </FormError>
      ) : null}

      {error ? <FormError className="mt-4">{error}</FormError> : null}

      {isChecking ? (
        <div className="mt-6">
          <div className="relative h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="absolute inset-y-0 left-0 w-1/3 animate-shimmer rounded-full bg-gradient-brand" />
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Scanning across the web for matches...
          </p>
          <div className="mt-6 space-y-3">
            <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      ) : (
        <Button
          type="button"
          className="mt-6 w-full"
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          Check for plagiarism
        </Button>
      )}
    </Card>
  );
}
