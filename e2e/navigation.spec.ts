import { test, expect } from '@playwright/test';

test('footer links navigate to the main routes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Alle Blogs' }).click();
  await expect(page).toHaveURL(/\/blog$/);

  await page.goto('/');
  await page.getByRole('link', { name: 'Gesamtes Angebot' }).click();
  await expect(page).toHaveURL(/\/services$/);

  await page.goto('/');
  await page.getByRole('link', { name: 'Datenschutzerklärung' }).click();
  await expect(page).toHaveURL(/\/datenschutz$/);
});

test('unknown route renders the 404 page', async ({ page }) => {
  await page.goto('/this-route-does-not-exist');
  await expect(page.getByRole('heading', { name: 'Seite nicht gefunden' })).toBeVisible();
});
