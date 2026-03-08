import { test, expect } from "@playwright/test";

test("home page should render premium content and CTA", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Barbearia Premium")).toBeVisible();
  await expect(page.getByRole("link", { name: "Agendar Agora" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Imperium Barber" })).toBeVisible();
});
