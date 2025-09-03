import { test, expect } from '@playwright/test';

test('parcours de base', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /accueil/i })).toBeVisible();

  await page.click('a[href="/blog"]');
  await expect(page).toHaveURL('/blog');
});
