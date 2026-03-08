import { z } from "zod";

export const createBarberSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    bio: z.string().optional(),
    specialty: z.string().optional(),
    experience: z.number().int().min(0).max(60).optional(),
  }),
});
