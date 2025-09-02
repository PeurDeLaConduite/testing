import { test, expect } from "@playwright/test";

test("page d'accueil accessible", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/.+/);
});
