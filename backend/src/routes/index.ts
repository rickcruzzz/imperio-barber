import { Router } from "express";
import { adminRouter } from "../modules/admin/admin.routes";
import { appointmentsRouter } from "../modules/appointments/appointments.routes";
import { authRouter } from "../modules/auth/auth.routes";
import { barbersRouter } from "../modules/barbers/barbers.routes";
import { publicRouter } from "../modules/public/public.routes";
import { servicesRouter } from "../modules/services/services.routes";
import { usersRouter } from "../modules/users/users.routes";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/barbers", barbersRouter);
apiRouter.use("/services", servicesRouter);
apiRouter.use("/appointments", appointmentsRouter);
apiRouter.use("/public", publicRouter);
apiRouter.use("/admin", adminRouter);
