import { Router } from "express";
import { publicContentHandler } from "./public.controller";

export const publicRouter = Router();

publicRouter.get("/content", publicContentHandler);
