import { AppointmentStatus } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

export async function dashboardMetricsHandler(_req: Request, res: Response) {
  const [users, clients, barbers, services, appointments, revenue] = await Promise.all([
    prisma.user.count(),
    prisma.client.count(),
    prisma.barber.count(),
    prisma.service.count({ where: { isActive: true } }),
    prisma.appointment.groupBy({ by: ["status"], _count: true }),
    prisma.appointment.aggregate({
      _count: true,
      where: { status: { in: [AppointmentStatus.CONFIRMED, AppointmentStatus.COMPLETED] } },
    }),
  ]);

  return res.json({
    users,
    clients,
    barbers,
    services,
    appointments,
    revenueEstimateAppointments: revenue._count,
  });
}
