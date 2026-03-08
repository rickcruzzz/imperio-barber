import { Barber } from "@/types";
import { Card } from "../ui/card";
import { SectionTitle } from "../ui/section-title";

export function TeamSection({ barbers }: { barbers: Barber[] }) {
  return (
    <section id="equipe" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <SectionTitle eyebrow="Equipe" title="Mestres do corte" />
      <div className="grid gap-4 md:grid-cols-3">
        {barbers.map((barber) => (
          <Card key={barber.id}>
            <h3 className="text-xl text-ivory">{barber.user.name}</h3>
            <p className="mt-2 text-sm text-smoke">{barber.specialty || "Especialista premium"}</p>
            <p className="mt-3 text-sm text-gold">{barber.experience} anos de experiencia</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
