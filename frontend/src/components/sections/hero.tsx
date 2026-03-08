"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-gold/20 bg-hero-glow">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Barbearia Premium</p>
          <h1 className="font-[var(--font-title)] text-4xl leading-tight text-ivory md:text-6xl">
            Estilo classico, experiencia contemporanea.
          </h1>
          <p className="max-w-md text-sm text-smoke md:text-base">
            Cortes precisos, ritual de barba e atendimento exclusivo com agendamento inteligente.
          </p>
          <div className="flex gap-3">
            <Link href="/register">
              <Button>Agendar Horario</Button>
            </Link>
            <a href="#servicos">
              <Button variant="outline">Ver Servicos</Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-glass rounded-3xl p-8"
        >
          <p className="text-sm text-gold">Destaque da Semana</p>
          <h3 className="mt-3 text-2xl text-ivory">Combo Premium</h3>
          <p className="mt-2 text-sm text-smoke">Corte + barba + finalizacao por R$ 120,00.</p>
        </motion.div>
      </div>
    </section>
  );
}
