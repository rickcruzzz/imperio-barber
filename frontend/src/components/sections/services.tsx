import { PublicService } from "@/types";
import { Card } from "../ui/card";
import { SectionTitle } from "../ui/section-title";

export function ServicesSection({ services }: { services: PublicService[] }) {
  return (
    <section id="servicos" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <SectionTitle eyebrow="Servicos" title="Experiencias exclusivas" subtitle="Tabela transparente com duracao e valor." />
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="space-y-3">
            <h3 className="text-xl text-ivory">{service.name}</h3>
            <p className="text-sm text-smoke">{service.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gold">R$ {Number(service.price).toFixed(2)}</span>
              <span className="text-smoke">{service.durationMin} min</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
