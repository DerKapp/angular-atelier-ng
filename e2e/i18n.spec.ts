import { test, expect } from '@playwright/test';

// `ng serve` (used locally when PLAYWRIGHT_BASE_URL is unset) runs the
// development build config, which doesn't enable `localize` — only the
// production build (and therefore the deployed site) has an /en/ tree.
test.skip(!process.env.PLAYWRIGHT_BASE_URL, 'i18n locales only exist in the production build');

test('English homepage renders translated content', async ({ page }) => {
  await page.goto('en/');

  await expect(page).toHaveTitle(/Angular Development from Bern/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Atelier');
  await expect(page.getByRole('link', { name: 'Get in touch' }).first()).toBeVisible();
});

test('language switcher toggles between English and German', async ({ page }) => {
  await page.goto('en/services');
  await expect(page).toHaveURL(/\/en\/services\/?$/);

  await page.getByRole('link', { name: 'Zur deutschen Version wechseln' }).click();
  await expect(page).toHaveURL(/\/services\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');

  await page.getByRole('link', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL(/\/en\/services\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});
