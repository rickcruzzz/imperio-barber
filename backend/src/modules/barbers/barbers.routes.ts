import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createBarberHandler, listBarbersHandler, upsertScheduleHandler } from "./barbers.controller";
import { createBarberSchema } from "./barbers.schemas";

export const barbersRouter = Router();

barbersRouter.get("/", listBarbersHandler);
barbersRouter.post("/", authenticate, authorize(UserRole.ADMIN), validate(createBarberSchema), createBarberHandler);
barbersRouter.put("/:barberId/schedules", authenticate, authorize(UserRole.ADMIN), upsertScheduleHandler);
