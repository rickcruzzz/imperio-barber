import { SectionTitle } from "../ui/section-title";

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Array<{ id: string; authorName: string; comment: string; rating: number }>;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <SectionTitle eyebrow="Depoimentos" title="Clientes que voltam toda semana" />
      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((item) => (
          <div key={item.id} className="card-glass rounded-2xl p-5">
            <p className="text-sm text-smoke">"{item.comment}"</p>
            <p className="mt-3 text-sm text-gold">{item.authorName} - {item.rating}/5</p>
          </div>
        ))}
      </div>
    </section>
  );
}
