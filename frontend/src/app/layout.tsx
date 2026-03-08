import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import "./globals.css";

const titleFont = Cinzel({ subsets: ["latin"], variable: "--font-title" });
const bodyFont = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Imperium Barber",
  description: "Barbearia premium com agendamento online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${titleFont.variable} ${bodyFont.variable} font-[var(--font-body)]`}>{children}</body>
    </html>
  );
}
