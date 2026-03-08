import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import {
  forgotPasswordHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
} from "./auth.controller";
import {
  forgotPasswordSchema,
  loginSchema,
  refreshSchema,
  registerSchema,
  resetPasswordSchema,
} from "./auth.schemas";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), registerHandler);
authRouter.post("/login", validate(loginSchema), loginHandler);
authRouter.post("/refresh", validate(refreshSchema), refreshHandler);
authRouter.post("/logout", logoutHandler);
authRouter.post("/forgot-password", validate(forgotPasswordSchema), forgotPasswordHandler);
authRouter.post("/reset-password", validate(resetPasswordSchema), resetPasswordHandler);
