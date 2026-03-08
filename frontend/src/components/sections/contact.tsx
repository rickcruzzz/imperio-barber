import { Button } from "../ui/button";
import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contato" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="card-glass rounded-3xl p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Contato</p>
          <h3 className="mt-3 text-4xl font-bold text-ivory">Reserve sua experiência premium</h3>
          <p className="mt-3 max-w-2xl text-base text-smoke leading-relaxed">
            Atendimento de segunda a sábado, com horários exclusivos e confirmação imediata pelo painel.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gold/10 p-2">
                  <MapPin className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ivory">Endereço</p>
                  <p className="text-sm text-smoke mt-1">Rua Premium, 123 - Centro<br />São Paulo, SP</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gold/10 p-2">
                  <Phone className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ivory">Telefone</p>
                  <p className="text-sm text-smoke mt-1">(11) 99999-9999</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gold/10 p-2">
                  <Clock className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ivory">Horário</p>
                  <p className="text-sm text-smoke mt-1">Seg - Sex: 9h às 20h<br />Sábado: 9h às 18h</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gold/10 p-2">
                  <Mail className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ivory">E-mail</p>
                  <p className="text-sm text-smoke mt-1">contato@imperiumbarber.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
            </a>
            <a href="tel:+5511999999999">
              <Button variant="outline" size="lg" className="gap-2">
                <Phone className="h-5 w-5" />
                Ligar agora
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
