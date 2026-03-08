import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { env } from "./config/env";
import { setupSwagger } from "./docs/swagger";
import { errorMiddleware } from "./middlewares/error.middleware";
import { sanitizeInput } from "./middlewares/sanitize.middleware";
import { apiRouter } from "./routes";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(sanitizeInput);
app.use("/uploads", express.static(path.resolve("uploads")));

setupSwagger(app);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1", apiRouter);
app.use(errorMiddleware);
