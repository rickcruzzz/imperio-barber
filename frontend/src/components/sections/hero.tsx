"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Calendar, Award, StarIcon } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-gold/20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&h=1080&fit=crop"
          alt="Barbearia Imperium"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/90" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-gold" />
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Barbearia Premium</p>
          </div>
          <h1 className="font-[var(--font-title)] text-4xl leading-tight text-ivory md:text-6xl">
            Estilo clássico,<br />experiência contemporânea.
          </h1>
          <p className="max-w-md text-base text-smoke md:text-lg leading-relaxed">
            Cortes precisos, ritual de barba e atendimento exclusivo com agendamento inteligente.
          </p>
          
          {/* Stats */}
          <div className="flex gap-6 py-4">
            <div>
              <p className="text-3xl font-bold text-gold">10+</p>
              <p className="text-sm text-smoke">Anos no mercado</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gold">5.0</p>
              <p className="text-sm text-smoke flex items-center gap-1">
                <StarIcon className="h-4 w-4 fill-gold text-gold" /> Avaliação
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                <Calendar className="h-5 w-5" />
                Agendar Horário
              </Button>
            </Link>
            <a href="#servicos">
              <Button variant="outline" size="lg">Ver Serviços</Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-glass rounded-3xl p-8 backdrop-blur-sm"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-gold/20 p-3">
              <StarIcon className="h-6 w-6 text-gold fill-gold" />
            </div>
            <div>
              <p className="text-sm text-gold font-medium">Destaque da Semana</p>
              <h3 className="mt-2 text-2xl font-bold text-ivory">Combo Premium</h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-smoke leading-relaxed">
            Corte + barba + finalização com produtos premium por apenas
          </p>
          <p className="mt-2 text-3xl font-bold text-gold">R$ 120,00</p>
          <Link href="/register" className="mt-6 block">
            <Button variant="outline" className="w-full">Agendar agora</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
