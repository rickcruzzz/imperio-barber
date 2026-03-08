import { SectionTitle } from "../ui/section-title";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const defaultTestimonials = [
  {
    id: "1",
    authorName: "Carlos Silva",
    comment: "Melhor barbearia que já frequentei! Atendimento impecável e profissionais altamente qualificados. O ambiente é incrível e o resultado sempre supera as expectativas.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "2",
    authorName: "Rafael Santos",
    comment: "Excelente experiência! O corte ficou perfeito e o atendimento foi nota 10. Já virei cliente fiel. Recomendo demais!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: "3",
    authorName: "Lucas Mendes",
    comment: "Profissionalismo e qualidade em cada detalhe. A Imperium Barber elevou o padrão das barbearias premium. Vale cada centavo!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: "4",
    authorName: "Felipe Costa",
    comment: "Ambiente sofisticado, barbeiros experientes e produtos de primeira linha. Aqui você não só corta o cabelo, mas vive uma experiência única.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=15",
  },
];

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Array<{ id: string; authorName: string; comment: string; rating: number }>;
}) {
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <SectionTitle 
        eyebrow="Depoimentos" 
        title="Clientes que voltam toda semana" 
        subtitle="Veja o que nossos clientes dizem sobre a experiência Imperium"
      />
      <div className="grid gap-6 md:grid-cols-2">
        {displayTestimonials.map((item) => {
          const itemWithImage = { ...item, image: (item as any).image || `https://i.pravatar.cc/150?u=${item.id}` };
          return (
            <div key={item.id} className="card-glass group hover:border-gold/50 rounded-2xl p-6 transition-all duration-300">
              <div className="flex items-start gap-4">
                <Quote className="h-8 w-8 text-gold/30 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-smoke leading-relaxed italic">
                    "{item.comment}"
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image 
                        src={itemWithImage.image} 
                        alt={item.authorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ivory">{item.authorName}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < item.rating
                                ? "fill-gold text-gold"
                                : "text-smoke/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
