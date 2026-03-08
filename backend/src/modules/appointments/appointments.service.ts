import { AppointmentStatus, UserRole } from "@prisma/client";
import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import { env } from "../../config/env";
import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

type CreateAppointmentInput = {
  actorId: string;
  actorRole: UserRole;
  barberId: string;
  serviceId: string;
  startAt: string;
  notes?: string;
};

export async function createAppointment(input: CreateAppointmentInput) {
  const start = dayjs(input.startAt);
  if (!start.isValid() || start.isBefore(dayjs())) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid date. Past dates are not allowed");
  }

  const service = await prisma.service.findUnique({ where: { id: input.serviceId } });
  if (!service || !service.isActive) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Service not found");
  }

  const barber = await prisma.barber.findUnique({ where: { id: input.barberId }, include: { schedules: true } });
  if (!barber) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Barber not found");
  }

  const client = await prisma.client.findUnique({ where: { userId: input.actorId } });
  if (!client || input.actorRole !== UserRole.CLIENT) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Client profile not found");
  }

  const dayAppointments = await prisma.appointment.count({
    where: {
      barberId: input.barberId,
      startAt: {
        gte: start.startOf("day").toDate(),
        lte: start.endOf("day").toDate(),
      },
      status: { not: AppointmentStatus.CANCELED },
    },
  });

  if (dayAppointments >= env.MAX_APPOINTMENTS_PER_DAY) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Barber reached max daily appointments");
  }

  const weekday = start.day();
  const hhmm = start.format("HH:mm");
  const inSchedule = barber.schedules.some(
    (item) => item.weekday === weekday && item.isAvailable && hhmm >= item.startTime && hhmm < item.endTime
  );

  if (!inSchedule) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Selected time is outside barber schedule");
  }

  const end = start.add(service.durationMin, "minute");

  const conflict = await prisma.appointment.findFirst({
    where: {
      barberId: input.barberId,
      status: { in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED] },
      OR: [
        { startAt: { lt: end.toDate(), gte: start.toDate() } },
        { endAt: { gt: start.toDate(), lte: end.toDate() } },
        {
          AND: [
            { startAt: { lte: start.toDate() } },
            { endAt: { gte: end.toDate() } },
          ],
        },
      ],
    },
  });

  if (conflict) {
    throw new ApiError(StatusCodes.CONFLICT, "Time slot is already occupied");
  }

  const appointment = await prisma.appointment.create({
    data: {
      clientId: client.id,
      barberId: input.barberId,
      serviceId: input.serviceId,
      startAt: start.toDate(),
      endAt: end.toDate(),
      notes: input.notes,
    },
    include: {
      client: { include: { user: true } },
      barber: { include: { user: true } },
      service: true,
    },
  });

  return appointment;
}
