import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('');
  await expect(page).toHaveTitle(/Angular Atelier/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Atelier');
});
