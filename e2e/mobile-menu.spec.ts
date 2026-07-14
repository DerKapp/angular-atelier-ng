import { test, expect } from '@playwright/test';
import { gotoReady } from './utils';

test.use({ viewport: { width: 375, height: 812 } });

test('mobile menu opens and closes', async ({ page }) => {
  await gotoReady(page, '/');

  const menu = page.locator('#mobile-menu');
  await expect(menu).toBeHidden();

  await page.getByRole('button', { name: /Menü öffnen/ }).click();
  await expect(menu).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
});
