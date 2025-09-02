// ⚠️ Exemple Playwright — à adapter à votre app (URL de base, sélecteurs, hash).
import { test, expect } from "playwright/test";

test.describe("Menu — parcours hash", () => {
    test("ouvre /services#avec-permis et atteint la section", async ({ page }) => {
        await page.goto("/services#avec-permis");
        // Attendre que la section soit rendue (ajustez le sélecteur)
        const section = page.locator("#avec-permis");
        await expect(section).toBeVisible();
        // Optionnel: vérifier position approx. via JS (si offset connu)
    });
});

test.describe("Menu — mode réduit", () => {
    test("tooltips visibles quand labels masqués", async ({ page }) => {
        await page.setViewportSize({ width: 900, height: 800 }); // <1024 → mobile (ex.)
        await page.goto("/");
        const nav = page.locator("nav");
        await expect(nav).toHaveAttribute(/data-reduced/, /mobile|tablet/);
        const tooltip = nav.locator("[title]");
        await expect(tooltip.first()).toBeVisible();
    });
});
