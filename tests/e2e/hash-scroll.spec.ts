import { test, expect } from "playwright/test";

test.describe("Hash scroll", () => {
    test("scroll avec offset vers l'ancre", async ({ page }) => {
        await page.goto("/services#avec-permis");

        const { scrollY, targetY } = await page.evaluate(() => {
            const target = document.getElementById("avec-permis");
            return {
                scrollY: window.scrollY,
                targetY: target?.offsetTop ?? null,
            };
        });

        expect(targetY).not.toBeNull();
        const offset = 102;
        expect(Math.abs(scrollY - (targetY - offset))).toBeLessThan(5);
    });
});
