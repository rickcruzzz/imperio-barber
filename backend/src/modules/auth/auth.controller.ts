import { Request, Response } from "express";
import {
  forgotPassword,
  login,
  refresh,
  registerClient,
  resetPassword,
} from "./auth.service";

const REFRESH_COOKIE = "refresh_token";

export async function registerHandler(req: Request, res: Response) {
  const user = await registerClient(req.body);
  return res.status(201).json({
    message: "Client registered successfully",
    user: { id: user.id, name: user.name, email: user.email },
  });
}

export async function loginHandler(req: Request, res: Response) {
  const result = await login(req.body.email, req.body.password);

  res.cookie(REFRESH_COOKIE, result.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json(result);
}

export async function refreshHandler(req: Request, res: Response) {
  const token = req.cookies[REFRESH_COOKIE] || req.body.refreshToken;
  const result = await refresh(token);

  res.cookie(REFRESH_COOKIE, result.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json(result);
}

export async function logoutHandler(req: Request, res: Response) {
  res.clearCookie(REFRESH_COOKIE);
  return res.json({ message: "Logged out successfully" });
}

export async function forgotPasswordHandler(req: Request, res: Response) {
  const result = await forgotPassword(req.body.email);
  return res.json(result);
}

export async function resetPasswordHandler(req: Request, res: Response) {
  const result = await resetPassword(req.body.token, req.body.password);
  return res.json(result);
}
