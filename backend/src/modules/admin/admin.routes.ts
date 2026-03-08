import { UserRole } from "@prisma/client";
import { Router } from "express";
import multer from "multer";
import path from "path";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { dashboardMetricsHandler } from "./admin.controller";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.resolve("uploads")),
  filename: (_req, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, safeName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export const adminRouter = Router();

adminRouter.get("/metrics", authenticate, authorize(UserRole.ADMIN), dashboardMetricsHandler);
adminRouter.post("/upload", authenticate, authorize(UserRole.ADMIN), upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  return res.status(201).json({
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
  });
});
