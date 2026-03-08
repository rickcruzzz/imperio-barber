"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { setSessionToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "true") {
      setSuccess("Conta criada com sucesso! Faça login para continuar.");
    }
  }, []);

  async function onSubmit(values: FormValues) {
    try {
      setError("");
      setSuccess("");
      const { data } = await api.post("/auth/login", values);
      setSessionToken(data.accessToken);

      if (data.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/client/dashboard");
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || "Credenciais inválidas";
      setError(message);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="card-glass w-full space-y-4 rounded-2xl p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-ivory">Entrar</h1>
          <p className="mt-2 text-sm text-smoke">Acesse sua conta Imperium Barber</p>
        </div>

        {success && (
          <div className="rounded-lg bg-green-900/20 border border-green-500/30 p-3">
            <p className="text-sm text-green-300">{success}</p>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <Input placeholder="E-mail" type="email" {...register("email")} />
            {formState.errors.email && (
              <p className="mt-1 text-xs text-red-400">{formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="Senha" type="password" {...register("password")} />
            {formState.errors.password && (
              <p className="mt-1 text-xs text-red-400">{formState.errors.password.message}</p>
            )}
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-900/20 border border-red-500/30 p-3">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <Button type="submit" disabled={formState.isSubmitting} className="w-full">
          {formState.isSubmitting ? "Entrando..." : "Entrar"}
        </Button>

        <p className="text-center text-sm text-smoke">
          Não tem uma conta?{" "}
          <a href="/register" className="text-gold hover:underline">
            Criar conta
          </a>
        </p>
      </form>
    </main>
  );
}
