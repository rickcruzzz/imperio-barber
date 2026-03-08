"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";

type Metrics = {
  users: number;
  clients: number;
  barbers: number;
  services: number;
  revenueEstimateAppointments: number;
  appointments: Array<{ status: string; _count: number }>;
};

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    api.get("/admin/metrics").then((response) => setMetrics(response.data));
  }, []);

  return (
    <DashboardShell
      title="Painel Admin"
      links={[
        { href: "/admin/dashboard", label: "Dashboard" },
        { href: "/", label: "Site institucional" },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs text-smoke">Usuarios</p>
          <p className="mt-2 text-3xl text-ivory">{metrics?.users ?? "-"}</p>
        </Card>
        <Card>
          <p className="text-xs text-smoke">Clientes</p>
          <p className="mt-2 text-3xl text-ivory">{metrics?.clients ?? "-"}</p>
        </Card>
        <Card>
          <p className="text-xs text-smoke">Barbeiros</p>
          <p className="mt-2 text-3xl text-ivory">{metrics?.barbers ?? "-"}</p>
        </Card>
        <Card>
          <p className="text-xs text-smoke">Servicos ativos</p>
          <p className="mt-2 text-3xl text-ivory">{metrics?.services ?? "-"}</p>
        </Card>
        <Card>
          <p className="text-xs text-smoke">Atendimentos faturaveis</p>
          <p className="mt-2 text-3xl text-ivory">{metrics?.revenueEstimateAppointments ?? "-"}</p>
        </Card>
      </div>
    </DashboardShell>
  );
}
