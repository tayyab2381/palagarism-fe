import { Button } from "@/components/ui/Button";

export function CtaBandSection() {
  return (
    <section className="pb-section">
      <div className="rounded-xl border border-line bg-surface px-8 py-10 text-center md:px-12">
        <h2 className="text-heading-sm font-semibold text-ink md:text-heading">
          Try it on your next draft
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-subtle">
          Account takes half a minute. Checks stay free.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button href="/signup">Create account</Button>
          <Button href="/login" variant="secondary">
            Sign in
          </Button>
        </div>
      </div>
    </section>
  );
}
