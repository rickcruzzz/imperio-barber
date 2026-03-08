import { PasswordReset, UserRole } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { v4 as uuid } from "uuid";
import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export async function registerClient(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new ApiError(StatusCodes.CONFLICT, "Email already in use");
  }

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      role: UserRole.CLIENT,
      passwordHash: await hashPassword(input.password),
      client: { create: { phone: input.phone } },
    },
    include: { client: true },
  });

  return user;
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  const validPassword = await comparePassword(password, user.passwordHash);
  if (!validPassword) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  const payload = { sub: user.id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshTokenHash: await hashPassword(refreshToken) },
  });

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken,
  };
}

export async function refresh(refreshToken: string) {
  if (!refreshToken) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Missing refresh token");
  }

  const payload = verifyRefreshToken(refreshToken);
  const user = await prisma.user.findUnique({ where: { id: payload.sub } });

  if (!user || !user.refreshTokenHash) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
  }

  const tokenMatches = await comparePassword(refreshToken, user.refreshTokenHash);
  if (!tokenMatches) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
  }

  const newPayload = { sub: user.id, role: user.role };
  const newAccessToken = generateAccessToken(newPayload);
  const newRefreshToken = generateRefreshToken(newPayload);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshTokenHash: await hashPassword(newRefreshToken) },
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { message: "If the email exists, a reset link will be sent." };
  }

  const rawToken = uuid();
  await prisma.passwordReset.create({
    data: {
      userId: user.id,
      tokenHash: await hashPassword(rawToken),
      expiresAt: new Date(Date.now() + 1000 * 60 * 30),
    },
  });

  return {
    message: "Password reset requested successfully.",
    developmentToken: rawToken,
  };
}

export async function resetPassword(token: string, password: string) {
  const activeTokens = await prisma.passwordReset.findMany({
    where: { usedAt: null, expiresAt: { gt: new Date() } },
  });

  const matching = await Promise.all(
    activeTokens.map(async (item: PasswordReset) => ({
      item,
      valid: await comparePassword(token, item.tokenHash),
    }))
  );

  const found = matching.find((candidate: { item: PasswordReset; valid: boolean }) => candidate.valid);
  if (!found) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid or expired reset token");
  }

  await prisma.user.update({
    where: { id: found.item.userId },
    data: { passwordHash: await hashPassword(password) },
  });

  await prisma.passwordReset.update({
    where: { id: found.item.id },
    data: { usedAt: new Date() },
  });

  return { message: "Password changed successfully" };
}
