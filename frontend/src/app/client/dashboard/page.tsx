"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

type Item = {
  id: string;
  startAt: string;
  status: string;
  service: { name: string };
  barber: { user: { name: string } };
};

export default function ClientDashboardPage() {
  const [appointments, setAppointments] = useState<Item[]>([]);
  const [services, setServices] = useState<Array<{ id: string; name: string }>>([]);
  const [barbers, setBarbers] = useState<Array<{ id: string; user: { name: string } }>>([]);
  const [form, setForm] = useState({ barberId: "", serviceId: "", startAt: "" });

  async function loadData() {
    const [a, s, b] = await Promise.all([
      api.get("/appointments"),
      api.get("/services"),
      api.get("/barbers"),
    ]);

    setAppointments(a.data);
    setServices(s.data);
    setBarbers(b.data);
  }

  async function createAppointment() {
    await api.post("/appointments", form);
    setForm({ barberId: "", serviceId: "", startAt: "" });
    await loadData();
  }

  async function cancelAppointment(id: string) {
    await api.patch(`/appointments/${id}/cancel`);
    await loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DashboardShell
      title="Area do Cliente"
      links={[{ href: "/client/dashboard", label: "Agendamentos" }, { href: "/", label: "Voltar ao Site" }]}
    >
      <div className="space-y-6">
        <Card>
          <h2 className="mb-4 text-xl text-ivory">Novo agendamento</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <select
              value={form.serviceId}
              onChange={(e) => setForm((prev) => ({ ...prev, serviceId: e.target.value }))}
              className="rounded-xl border border-gold/30 bg-black/40 px-4 py-2.5 text-sm"
            >
              <option value="">Servico</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>

            <select
              value={form.barberId}
              onChange={(e) => setForm((prev) => ({ ...prev, barberId: e.target.value }))}
              className="rounded-xl border border-gold/30 bg-black/40 px-4 py-2.5 text-sm"
            >
              <option value="">Barbeiro</option>
              {barbers.map((barber) => (
                <option key={barber.id} value={barber.id}>{barber.user.name}</option>
              ))}
            </select>

            <Input
              type="datetime-local"
              value={form.startAt}
              onChange={(e) => setForm((prev) => ({ ...prev, startAt: e.target.value }))}
            />
          </div>
          <Button onClick={createAppointment} className="mt-4">Confirmar horario</Button>
        </Card>

        <Card>
          <h2 className="mb-4 text-xl text-ivory">Historico</h2>
          <div className="space-y-3">
            {appointments.map((item) => (
              <div key={item.id} className="rounded-xl border border-gold/20 p-4">
                <p className="text-sm text-ivory">{item.service.name} com {item.barber.user.name}</p>
                <p className="text-xs text-smoke">{new Date(item.startAt).toLocaleString()} - {item.status}</p>
                {item.status !== "CANCELED" ? (
                  <button onClick={() => cancelAppointment(item.id)} className="mt-2 text-xs text-gold">
                    Cancelar
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
