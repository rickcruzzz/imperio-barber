import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { listUsersHandler, meHandler } from "./users.controller";

export const usersRouter = Router();

usersRouter.get("/me", authenticate, meHandler);
usersRouter.get("/", authenticate, authorize(UserRole.ADMIN), listUsersHandler);
