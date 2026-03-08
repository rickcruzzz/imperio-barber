import { z } from "zod";

export const createServiceSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().optional(),
    price: z.number().positive(),
    durationMin: z.number().int().positive(),
    imageUrl: z.string().optional(),
  }),
});
