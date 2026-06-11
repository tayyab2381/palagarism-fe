import * as cheerio from "cheerio";
import { WordTokenizer } from "natural/lib/natural/tokenizers";
import { env } from "@/config/env";
import type {
  MatchResult,
  PlagiarismProvider,
  PlagiarismRequest,
  PlagiarismResult,
} from "@/lib/plagiarism/types";
import { PlagiarismProviderError } from "@/lib/plagiarism/types";
import {
  buildPlagiarismResult,
  countWords,
  selectRepresentativeSentences,
} from "@/lib/plagiarism/utils";

const GOOGLE_SEARCH_URL = "https://www.googleapis.com/customsearch/v1";
const SIMILARITY_THRESHOLD = 0.25;
const PAGE_FETCH_TIMEOUT_MS = 10_000;
const MAX_PAGE_CHARS = 4_000;

interface GoogleSearchItem {
  link?: string;
  snippet?: string;
}

interface GoogleSearchResponse {
  items?: GoogleSearchItem[];
}

const wordTokenizer = new WordTokenizer();

/** Tokenizes text into a lowercase word set using the natural library. */
function tokenize(text: string): Set<string> {
  const tokens = wordTokenizer.tokenize(text.toLowerCase()) ?? [];
  return new Set(tokens.filter((token) => token.length > 2));
}

/** Calculates Jaccard similarity between two strings using token sets. */
function jaccardSimilarity(left: string, right: string): number {
  const leftTokens = tokenize(left);
  const rightTokens = tokenize(right);

  if (leftTokens.size === 0 || rightTokens.size === 0) {
    return 0;
  }

  let intersection = 0;

  leftTokens.forEach((token) => {
    if (rightTokens.has(token)) {
      intersection += 1;
    }
  });

  const union = new Set([
    ...Array.from(leftTokens),
    ...Array.from(rightTokens),
  ]).size;
  return union === 0 ? 0 : intersection / union;
}

/** Extracts plain text from HTML using cheerio for similarity comparison. */
function extractTextFromHtml(html: string): string {
  const $ = cheerio.load(html);
  $("script, style, noscript").remove();
  const bodyText = $("body").text();
  const fallbackText = bodyText.length > 0 ? bodyText : $.root().text();
  return fallbackText.replace(/\s+/g, " ").trim();
}

/** Fetches a URL and returns plain text content for similarity comparison. */
async function fetchPageText(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PAGE_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "PlagiarCheck/1.0",
      },
    });

    if (!response.ok) {
      return "";
    }

    const html = await response.text();
    return extractTextFromHtml(html).slice(0, MAX_PAGE_CHARS);
  } catch {
    return "";
  } finally {
    clearTimeout(timeout);
  }
}

/** Queries Google Custom Search for a representative sentence. */
async function searchGoogle(query: string): Promise<GoogleSearchItem[]> {
  const params = new URLSearchParams({
    key: env.GOOGLE_CUSTOM_SEARCH_API_KEY,
    cx: env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
    q: query,
    num: "3",
  });

  const response = await fetch(`${GOOGLE_SEARCH_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new PlagiarismProviderError(
      `Google Custom Search failed with status ${response.status}`,
      "GOOGLE_SEARCH_FAILED",
    );
  }

  const data = (await response.json()) as GoogleSearchResponse;
  return data.items ?? [];
}

/** Primary provider — Google Custom Search + Jaccard similarity scoring. */
export class GoogleSearchProvider implements PlagiarismProvider {
  /** Searches the web for similar content and scores matches with Jaccard similarity. */
  async check(request: PlagiarismRequest): Promise<PlagiarismResult> {
    const sentences = selectRepresentativeSentences(request.text, 6);
    const wordCount = countWords(request.text);
    const matches: MatchResult[] = [];
    const seenUrls = new Set<string>();

    for (const sentence of sentences) {
      const searchResults = await searchGoogle(sentence);

      for (const result of searchResults) {
        if (!result.link || seenUrls.has(result.link)) {
          continue;
        }

        const pageText = await fetchPageText(result.link);
        const comparisonText =
          pageText.length > 0 ? pageText : (result.snippet ?? "");
        const similarityRatio = jaccardSimilarity(sentence, comparisonText);
        const similarityPercent = Math.round(similarityRatio * 100);

        if (similarityPercent < SIMILARITY_THRESHOLD * 100) {
          continue;
        }

        seenUrls.add(result.link);
        matches.push({
          url: result.link,
          similarity: similarityPercent,
          matchedText: sentence,
        });
      }
    }

    matches.sort((left, right) => right.similarity - left.similarity);

    const overallScore =
      matches.length > 0
        ? Math.round(
            matches.reduce((sum, match) => sum + match.similarity, 0) /
              matches.length,
          )
        : 0;

    return buildPlagiarismResult(matches, wordCount, overallScore);
  }
}
