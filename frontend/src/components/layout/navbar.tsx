"use client";

import Link from "next/link";
import { Scissors } from "lucide-react";
import { Button } from "../ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-ivory">
          <Scissors className="h-5 w-5 text-gold" />
          <span className="text-lg font-semibold tracking-wide">Imperium Barber</span>
        </Link>

        <nav className="hidden gap-6 text-sm text-smoke md:flex">
          <a href="#servicos" className="hover:text-ivory">Servicos</a>
          <a href="#equipe" className="hover:text-ivory">Equipe</a>
          <a href="#galeria" className="hover:text-ivory">Galeria</a>
          <a href="#contato" className="hover:text-ivory">Contato</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-smoke hover:text-ivory">
            Entrar
          </Link>
          <Link href="/register">
            <Button>Agendar Agora</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
