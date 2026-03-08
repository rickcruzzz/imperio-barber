import { NextFunction, Request, Response } from "express";

function sanitizeValue<T>(value: T): T {
  if (typeof value === "string") {
    return value.trim().replace(/[<>]/g, "") as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item)) as T;
  }

  if (value !== null && typeof value === "object") {
    const cleanObject: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      cleanObject[key] = sanitizeValue(val);
    }
    return cleanObject as T;
  }

  return value;
}

export function sanitizeInput(req: Request, _res: Response, next: NextFunction) {
  (req as Request & { body: unknown }).body = sanitizeValue(req.body);
  (req as Request & { query: unknown }).query = sanitizeValue(req.query);
  (req as Request & { params: unknown }).params = sanitizeValue(req.params);
  next();
}
