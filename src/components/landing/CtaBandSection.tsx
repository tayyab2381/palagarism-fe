import { Button } from "@/components/ui/Button";

/** Gradient CTA band for final conversion. */
export function CtaBandSection() {
  return (
    <section className="pb-section">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-brand px-8 py-14 text-center shadow-glow md:px-16">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to check your work?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-indigo-100">
            Join thousands of students who trust PlagiarCheck for free, private
            plagiarism detection.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/signup"
              className="bg-white text-brand-700 shadow-lg hover:bg-slate-50"
            >
              Create free account
            </Button>
            <Button
              href="/login"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              I have an account
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
