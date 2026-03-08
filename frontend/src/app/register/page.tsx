"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter letra minúscula")
    .regex(/[0-9]/, "Senha deve conter número"),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    try {
      setError("");
      await api.post("/auth/register", values);
      router.push("/login?registered=true");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Não foi possível criar a conta.";
      setError(message);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="card-glass w-full space-y-4 rounded-2xl p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-ivory">Criar Conta</h1>
          <p className="mt-2 text-sm text-smoke">Junte-se à Imperium Barber</p>
        </div>

        <div className="space-y-3">
          <div>
            <Input placeholder="Nome completo" {...register("name")} />
            {formState.errors.name && (
              <p className="mt-1 text-xs text-red-400">{formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="E-mail" type="email" {...register("email")} />
            {formState.errors.email && (
              <p className="mt-1 text-xs text-red-400">{formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="Telefone (opcional)" {...register("phone")} />
            {formState.errors.phone && (
              <p className="mt-1 text-xs text-red-400">{formState.errors.phone.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="Senha" type="password" {...register("password")} />
            {formState.errors.password && (
              <p className="mt-1 text-xs text-red-400">{formState.errors.password.message}</p>
            )}
            <p className="mt-1 text-xs text-smoke">Mín. 8 caracteres, com maiúscula, minúscula e número</p>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-900/20 border border-red-500/30 p-3">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <Button type="submit" disabled={formState.isSubmitting} className="w-full">
          {formState.isSubmitting ? "Criando..." : "Criar conta"}
        </Button>

        <p className="text-center text-sm text-smoke">
          Já tem uma conta?{" "}
          <a href="/login" className="text-gold hover:underline">
            Entrar
          </a>
        </p>
      </form>
    </main>
  );
}
