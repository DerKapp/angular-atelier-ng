import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } });

test('mobile menu opens and closes', async ({ page }) => {
  await page.goto('/');

  const menu = page.locator('#mobile-menu');
  await expect(menu).toBeHidden();

  await page.getByRole('button', { name: /Menü öffnen/ }).click();
  await expect(menu).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
});
