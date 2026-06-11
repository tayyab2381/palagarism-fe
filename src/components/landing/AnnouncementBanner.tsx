import Link from "next/link";

/** Optional announcement strip above the nav. */
export function AnnouncementBanner() {
  return (
    <div className="border-b border-pebble bg-obsidian px-6 py-3">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-center gap-2 text-center">
        <p className="text-body font-normal text-snow">
          PlagiarCheck is 100% free — no credit card, no document storage.
        </p>
        <Link
          href="/signup"
          className="text-body font-medium text-snow underline hover:opacity-80"
        >
          Start checking now →
        </Link>
      </div>
    </div>
  );
}
