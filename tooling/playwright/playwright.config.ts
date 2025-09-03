import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../../apps/web/tests/e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: 2,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm --filter web dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
