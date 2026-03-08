import { Button } from "../ui/button";

export function ContactSection() {
  return (
    <section id="contato" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="card-glass rounded-3xl p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">Contato</p>
        <h3 className="mt-3 text-3xl text-ivory">Reserve sua experiencia premium</h3>
        <p className="mt-2 max-w-xl text-sm text-smoke">
          Atendimento de segunda a sabado, com horarios exclusivos e confirmacao imediata pelo painel.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button>WhatsApp</Button>
          <Button variant="outline">Telefone</Button>
        </div>
      </div>
    </section>
  );
}
