import { test, expect } from '@playwright/test';
import { gotoReady } from './utils';

test('home page loads', async ({ page }) => {
  await gotoReady(page, '/');
  await expect(page).toHaveTitle(/Angular Atelier/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Atelier');
});
