import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  cancelAppointmentHandler,
  createAppointmentHandler,
  listAppointmentsHandler,
  updateStatusHandler,
} from "./appointments.controller";
import { createAppointmentSchema, updateStatusSchema } from "./appointments.schemas";

export const appointmentsRouter = Router();

appointmentsRouter.get("/", authenticate, listAppointmentsHandler);
appointmentsRouter.post(
  "/",
  authenticate,
  authorize(UserRole.CLIENT),
  validate(createAppointmentSchema),
  createAppointmentHandler
);
appointmentsRouter.patch(
  "/:id/status",
  authenticate,
  authorize(UserRole.ADMIN, UserRole.BARBER),
  validate(updateStatusSchema),
  updateStatusHandler
);
appointmentsRouter.patch("/:id/cancel", authenticate, cancelAppointmentHandler);
