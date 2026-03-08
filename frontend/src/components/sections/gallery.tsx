import { SectionTitle } from "../ui/section-title";
import Image from "next/image";

// Imagens profissionais de barbearias do Unsplash
const defaultGalleryImages = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&h=600&fit=crop",
];

export function GallerySection({ gallery }: { gallery: Array<{ id: string; title: string; imageUrl: string }> }) {
  const displayItems = gallery.length > 0 ? gallery : defaultGalleryImages.map((url, i) => ({
    id: `default-${i}`,
    title: `Ambiente ${i + 1}`,
    imageUrl: url,
  }));

  return (
    <section id="galeria" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <SectionTitle eyebrow="Galeria" title="Ambiente e resultados" subtitle="Conheça nosso espaço premium e os resultados que entregamos" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {displayItems.slice(0, 8).map((item, index) => (
          <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="absolute bottom-4 left-4 text-sm font-medium text-ivory">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
