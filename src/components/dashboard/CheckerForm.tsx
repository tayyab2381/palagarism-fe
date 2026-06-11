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
  const over = wordCount > MAX_WORDS;
  const canSubmit = wordCount > 0 && !over && !isChecking;

  return (
    <Card variant="elevated">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <FileText className="mt-0.5 h-5 w-5 text-ink-subtle" strokeWidth={1.5} />
          <div>
            <h2 className="font-semibold text-ink">New check</h2>
            <p className="text-sm text-ink-subtle">Optional title, then paste below</p>
          </div>
        </div>
        <Badge variant={over ? "rose" : "muted"}>
          {wordCount.toLocaleString()} / {MAX_WORDS.toLocaleString()}
        </Badge>
      </div>

      <TextInput
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        aria-label="Check title"
      />

      <TextArea
        placeholder="Paste your text here…"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        className="mt-3 min-h-48"
        aria-label="Text to check"
      />

      {over ? (
        <FormError className="mt-3">
          Over the {MAX_WORDS.toLocaleString()} word limit.
        </FormError>
      ) : null}
      {error ? <FormError className="mt-3">{error}</FormError> : null}

      {isChecking ? (
        <div className="mt-5">
          <div className="h-1 overflow-hidden rounded-full bg-stone-100">
            <div className="h-full w-1/3 animate-shimmer rounded-full bg-stone-400" />
          </div>
          <p className="mt-2 text-sm text-ink-subtle">Scanning…</p>
        </div>
      ) : (
        <Button
          type="button"
          className="mt-5 w-full"
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          Run check
        </Button>
      )}
    </Card>
  );
}
