export function setSessionToken(token: string) {
  document.cookie = `session_token=${token}; path=/; max-age=${60 * 60 * 12}; samesite=lax`;
}

export function clearSessionToken() {
  document.cookie = "session_token=; path=/; max-age=0";
}

export function getSessionToken() {
  if (typeof document === "undefined") {
    return null;
  }

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("session_token="))
    ?.split("=")[1];

  return token ?? null;
}
