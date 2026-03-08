export function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="text-xs uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold text-ivory md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-sm text-smoke md:text-base">{subtitle}</p> : null}
    </div>
  );
}
