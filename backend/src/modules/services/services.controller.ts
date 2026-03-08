import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

export async function listServicesHandler(_req: Request, res: Response) {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { price: "asc" },
  });

  return res.json(services);
}

export async function createServiceHandler(req: Request, res: Response) {
  const service = await prisma.service.create({ data: req.body });
  return res.status(201).json(service);
}

export async function updateServiceHandler(req: Request, res: Response) {
  const service = await prisma.service.update({
    where: { id: req.params.id },
    data: req.body,
  });

  return res.json(service);
}
