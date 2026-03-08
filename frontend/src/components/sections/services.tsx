import { PublicService } from "@/types";
import { Card } from "../ui/card";
import { SectionTitle } from "../ui/section-title";
import { Scissors, Sparkles, Clock } from "lucide-react";

const serviceIcons: Record<string, any> = {
  corte: Scissors,
  barba: Sparkles,
  default: Clock,
};

export function ServicesSection({ services }: { services: PublicService[] }) {
  return (
    <section id="servicos" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <SectionTitle 
        eyebrow="Serviços" 
        title="Experiências exclusivas" 
        subtitle="Tabela transparente com duração e valor." 
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const IconComponent = serviceIcons[service.name.toLowerCase()] || serviceIcons.default;
          return (
            <Card key={service.id} className="group hover:border-gold/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-gold/10 p-3 group-hover:bg-gold/20 transition-colors">
                  <IconComponent className="h-6 w-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-ivory">{service.name}</h3>
                  <p className="mt-2 text-sm text-smoke leading-relaxed">{service.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-gold/10 pt-3">
                    <span className="text-lg font-bold text-gold">R$ {Number(service.price).toFixed(2)}</span>
                    <span className="text-sm text-smoke flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {service.durationMin} min
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
