import Link from "next/link";

export function AnnouncementBanner() {
  return (
    <div className="border-b border-line bg-stone-100/60 px-6 py-2">
      <p className="text-center text-sm text-ink-subtle">
        Free for students —{" "}
        <Link href="/signup" className="font-medium text-ink underline-offset-2 hover:underline">
          create an account
        </Link>
      </p>
    </div>
  );
}
