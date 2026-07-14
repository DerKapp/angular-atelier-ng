import { test, expect } from '@playwright/test';
import { gotoReady } from './utils';

test('submitting the empty contact form shows validation errors', async ({ page }) => {
  await gotoReady(page, '/#contact');

  await page.getByRole('button', { name: 'Kontakt aufnehmen', exact: true }).click();

  await expect(page.locator('#name-error')).toBeVisible();
  await expect(page.locator('#email-error')).toBeVisible();
  await expect(page.locator('#message-error')).toBeVisible();
});

test('invalid email format shows an error', async ({ page }) => {
  await gotoReady(page, '/#contact');

  const emailInput = page.locator('#contact-email');
  await emailInput.fill('not-an-email');
  await emailInput.blur();

  await expect(page.locator('#email-error')).toBeVisible();
});
