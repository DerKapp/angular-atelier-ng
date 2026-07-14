import { test, expect } from '@playwright/test';
import { gotoReady, goto404Ready } from './utils';

test('footer links navigate to the main routes', async ({ page }) => {
  await gotoReady(page, '/');
  await page.getByRole('link', { name: 'Alle Blogs' }).click();
  await expect(page).toHaveURL(/\/blog$/);

  await gotoReady(page, '/');
  await page.getByRole('link', { name: 'Gesamtes Angebot' }).click();
  await expect(page).toHaveURL(/\/services$/);

  await gotoReady(page, '/');
  await page.getByRole('link', { name: 'Datenschutzerklärung' }).click();
  await expect(page).toHaveURL(/\/datenschutz$/);
});

test('unknown route renders the 404 page', async ({ page }) => {
  await goto404Ready(page, '/this-route-does-not-exist');
});
