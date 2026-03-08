import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createServiceHandler, listServicesHandler, updateServiceHandler } from "./services.controller";
import { createServiceSchema } from "./services.schemas";

export const servicesRouter = Router();

servicesRouter.get("/", listServicesHandler);
servicesRouter.post("/", authenticate, authorize(UserRole.ADMIN), validate(createServiceSchema), createServiceHandler);
servicesRouter.put("/:id", authenticate, authorize(UserRole.ADMIN), updateServiceHandler);
