import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function authorize(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.auth.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden" });
    }

    return next();
  };
}
