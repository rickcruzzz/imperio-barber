import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

export async function meHandler(req: Request, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.auth?.userId },
    include: { client: true, barber: true },
  });

  return res.json(user);
}

export async function listUsersHandler(_req: Request, res: Response) {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return res.json(users);
}
