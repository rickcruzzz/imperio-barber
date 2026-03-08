import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "must contain uppercase")
      .regex(/[a-z]/, "must contain lowercase")
      .regex(/[0-9]/, "must contain number"),
    phone: z.string().min(8).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(10).optional(),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(10),
    password: z.string().min(8),
  }),
});
