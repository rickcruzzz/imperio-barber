import { AppointmentStatus, UserRole } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { createAppointment } from "./appointments.service";

export async function listAppointmentsHandler(req: Request, res: Response) {
  const role = req.auth?.role;
  const userId = req.auth?.userId;

  const where =
    role === UserRole.ADMIN
      ? {}
      : role === UserRole.BARBER
      ? { barber: { userId } }
      : { client: { userId } };

  const appointments = await prisma.appointment.findMany({
    where,
    include: {
      client: { include: { user: true } },
      barber: { include: { user: true } },
      service: true,
    },
    orderBy: { startAt: "desc" },
  });

  return res.json(appointments);
}

export async function createAppointmentHandler(req: Request, res: Response) {
  const result = await createAppointment({
    actorId: req.auth!.userId,
    actorRole: req.auth!.role,
    barberId: req.body.barberId,
    serviceId: req.body.serviceId,
    startAt: req.body.startAt,
    notes: req.body.notes,
  });

  return res.status(201).json(result);
}

export async function updateStatusHandler(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: req.body.status as AppointmentStatus },
  });

  return res.json(appointment);
}

export async function cancelAppointmentHandler(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const found = await prisma.appointment.findUnique({
    where: { id },
    include: { client: true },
  });

  if (!found) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  const isOwner = found.client?.userId === req.auth?.userId;
  const isAdmin = req.auth?.role === UserRole.ADMIN;
  if (!isOwner && !isAdmin) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: AppointmentStatus.CANCELED },
  });

  return res.json(appointment);
}
