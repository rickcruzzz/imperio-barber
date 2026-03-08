import { UserRole } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { hashPassword } from "../../utils/password";

export async function listBarbersHandler(_req: Request, res: Response) {
  const barbers = await prisma.barber.findMany({
    include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } }, schedules: true },
    orderBy: { user: { name: "asc" } },
  });

  return res.json(barbers);
}

export async function createBarberHandler(req: Request, res: Response) {
  const { name, email, password, bio, specialty, experience } = req.body;

  const barber = await prisma.user.create({
    data: {
      name,
      email,
      role: UserRole.BARBER,
      passwordHash: await hashPassword(password),
      barber: {
        create: {
          bio,
          specialty,
          experience: experience ?? 0,
        },
      },
    },
    include: { barber: true },
  });

  return res.status(201).json(barber);
}

export async function upsertScheduleHandler(req: Request, res: Response) {
  const barberId = Array.isArray(req.params.barberId) 
    ? req.params.barberId[0] 
    : req.params.barberId;
  const schedules = req.body.schedules as Array<{
    weekday: number;
    startTime: string;
    endTime: string;
    isAvailable?: boolean;
  }>;

  await prisma.$transaction(async (tx) => {
    await tx.schedule.deleteMany({ where: { barberId } });
    if (schedules.length > 0) {
      await tx.schedule.createMany({
        data: schedules.map((item) => ({
          barberId,
          weekday: item.weekday,
          startTime: item.startTime,
          endTime: item.endTime,
          isAvailable: item.isAvailable ?? true,
        })),
      });
    }
  });

  return res.json({ message: "Schedule updated" });
}
