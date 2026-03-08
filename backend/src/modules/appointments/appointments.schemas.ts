import { z } from "zod";

export const createAppointmentSchema = z.object({
  body: z.object({
    barberId: z.string().min(1),
    serviceId: z.string().min(1),
    startAt: z.string().min(10),
    notes: z.string().optional(),
  }),
});

export const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELED"]),
  }),
});
