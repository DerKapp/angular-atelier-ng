import { defineConfig, devices } from '@playwright/test';

const LOCAL_URL = 'http://localhost:4200/';

// If PLAYWRIGHT_BASE_URL is set (CI, pointing at the deployed GitHub Pages
// site) we test against it directly. Otherwise we default to local ng serve.
// A trailing slash is required: Playwright resolves relative goto() paths
// against baseURL per the URL spec, where a path starting with "/" is
// absolute-from-origin and would otherwise discard the Pages subpath
// (e.g. "/angular-atelier-ng/"), landing on the bare github.io root instead.
const rawBaseURL = process.env.PLAYWRIGHT_BASE_URL ?? LOCAL_URL;
const baseURL = rawBaseURL.endsWith('/') ? rawBaseURL : `${rawBaseURL}/`;
const isLocalTarget = baseURL.startsWith(LOCAL_URL);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Only manage a local dev server when we're actually testing localhost.
  webServer: isLocalTarget
    ? {
        command: 'npm start',
        url: LOCAL_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      }
    : undefined,
});
