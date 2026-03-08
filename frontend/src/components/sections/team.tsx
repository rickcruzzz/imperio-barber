import { Barber } from "@/types";
import { Card } from "../ui/card";
import { SectionTitle } from "../ui/section-title";
import { Award, Users } from "lucide-react";
import Image from "next/image";

// Imagens profissionais de barbeiros do Unsplash
const barberImages = [
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop",
];

export function TeamSection({ barbers }: { barbers: Barber[] }) {
  return (
    <section id="equipe" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <SectionTitle eyebrow="Equipe" title="Mestres do corte" subtitle="Profissionais experientes e dedicados" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {barbers.map((barber, index) => (
          <Card key={barber.id} className="group hover:border-gold/50 transition-all duration-300 overflow-hidden">
            <div className="relative h-64 w-full overflow-hidden rounded-lg bg-charcoal">
              <Image
                src={barberImages[index % barberImages.length]}
                alt={barber.user.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-ivory">{barber.user.name}</h3>
                <p className="mt-1 text-sm text-gold flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  {barber.specialty || "Especialista Premium"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-smoke flex items-center gap-2">
                <Users className="h-4 w-4" />
                {barber.experience} anos de experiência
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
