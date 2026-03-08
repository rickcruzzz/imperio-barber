import { SectionTitle } from "../ui/section-title";

export function GallerySection({ gallery }: { gallery: Array<{ id: string; title: string; imageUrl: string }> }) {
  return (
    <section id="galeria" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <SectionTitle eyebrow="Galeria" title="Ambiente e resultados" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {gallery.map((item) => (
          <div key={item.id} className="card-glass rounded-xl p-4">
            <div className="h-24 rounded-lg bg-gradient-to-br from-gold/20 to-black/40" />
            <p className="mt-2 text-xs text-smoke">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
