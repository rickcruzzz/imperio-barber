"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { setSessionToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    try {
      setError("");
      const { data } = await api.post("/auth/login", values);
      setSessionToken(data.accessToken);

      if (data.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/client/dashboard");
      }
    } catch {
      setError("Credenciais invalidas");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="card-glass w-full space-y-4 rounded-2xl p-6">
        <h1 className="text-2xl text-ivory">Entrar</h1>
        <Input placeholder="E-mail" {...register("email")} />
        <Input placeholder="Senha" type="password" {...register("password")} />
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <Button type="submit" disabled={formState.isSubmitting} className="w-full">
          {formState.isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </main>
  );
}
