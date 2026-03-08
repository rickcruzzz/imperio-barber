import { test, expect } from "@playwright/test";

test("login and register pages should load", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Entrar" })).toBeVisible();

  await page.goto("/register");
  await expect(page.getByRole("heading", { name: "Criar Conta" })).toBeVisible();
});
