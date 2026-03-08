import jwt, { SignOptions } from "jsonwebtoken";
import { UserRole } from "@prisma/client";
import { env } from "../config/env";

type TokenPayload = {
  sub: string;
  role: UserRole;
};

export function generateAccessToken(payload: TokenPayload) {
  const options: SignOptions = { expiresIn: env.ACCESS_TOKEN_TTL };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
}

export function generateRefreshToken(payload: TokenPayload) {
  const options: SignOptions = { expiresIn: env.REFRESH_TOKEN_TTL };
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
}
