const logos = [
  "Stanford",
  "MIT",
  "Oxford",
  "Cambridge",
  "LUMS",
  "NUST",
] as const;

/** Education logo strip for social proof. */
export function LogoStrip() {
  return (
    <section className="border-y border-slate-200/60 bg-white/50 py-10">
      <div className="mx-auto max-w-page px-6">
        <p className="text-center text-sm font-medium text-slate-500">
          Trusted by students at leading institutions
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logos.map((name) => (
            <span
              key={name}
              className="text-sm font-bold tracking-wide text-slate-400"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
