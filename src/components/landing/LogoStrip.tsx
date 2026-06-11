const logos = ["LUMS", "NUST", "IBA", "QAU", "COMSATS", "FAST"] as const;

export function LogoStrip() {
  return (
    <section className="border-y border-line py-8">
      <p className="text-center text-xs uppercase tracking-widest text-ink-subtle">
        Used by students at
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        {logos.map((name) => (
          <span
            key={name}
            className="text-sm font-medium text-stone-400"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
