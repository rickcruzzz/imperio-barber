import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

export async function publicContentHandler(_req: Request, res: Response) {
  const [services, barbers, testimonials, gallery, promotions] = await Promise.all([
    prisma.service.findMany({ where: { isActive: true }, orderBy: { price: "asc" } }),
    prisma.barber.findMany({ include: { user: true }, orderBy: { user: { name: "asc" } } }),
    prisma.testimonial.findMany({ where: { isPublished: true }, orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.gallery.findMany({ where: { isPublished: true }, orderBy: { createdAt: "desc" }, take: 12 }),
    prisma.promotion.findMany({ where: { isActive: true }, orderBy: { startsAt: "desc" }, take: 3 }),
  ]);

  return res.json({ services, barbers, testimonials, gallery, promotions });
}
