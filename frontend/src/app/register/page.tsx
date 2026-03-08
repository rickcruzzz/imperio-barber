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
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
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
      router.push("/login");
    } catch {
      setError("Nao foi possivel criar a conta.");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="card-glass w-full space-y-4 rounded-2xl p-6">
        <h1 className="text-2xl text-ivory">Criar Conta</h1>
        <Input placeholder="Nome" {...register("name")} />
        <Input placeholder="E-mail" {...register("email")} />
        <Input placeholder="Telefone" {...register("phone")} />
        <Input placeholder="Senha" type="password" {...register("password")} />
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <Button type="submit" disabled={formState.isSubmitting} className="w-full">
          {formState.isSubmitting ? "Criando..." : "Criar conta"}
        </Button>
      </form>
    </main>
  );
}
