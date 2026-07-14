import { expect, type Page } from '@playwright/test';

// The GitHub Pages CDN can serve a stale "not found" response from a given
// edge for a while after a fresh deploy, even once other edges (or a plain
// curl from elsewhere) already see the new content. Retrying the navigation
// itself — rather than gating once before the suite starts — survives that
// per-request flakiness. Locally this just succeeds on the first try.
export async function gotoReady(page: Page, path: string): Promise<void> {
  await expect(async () => {
    const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
    expect(response?.ok()).toBeTruthy();
  }).toPass({ timeout: 120_000, intervals: [1_000, 2_000, 5_000] });
}

// For routes that are *expected* to 404 (our own custom 404 page), the
// GitHub Pages placeholder "not found" response is indistinguishable from our
// real 404 page by status code alone (both are HTTP 404) — so retry on
// content instead of response.ok().
export async function goto404Ready(page: Page, path: string): Promise<void> {
  await expect(async () => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Seite nicht gefunden' })).toBeVisible({
      timeout: 2_000,
    });
  }).toPass({ timeout: 120_000, intervals: [1_000, 2_000, 5_000] });
}
