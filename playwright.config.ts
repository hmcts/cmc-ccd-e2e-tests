import { defineConfig, devices } from '@playwright/test';                  
import config from './playwright/config/config';

export default defineConfig({
  testDir: './playwright/tests',
  globalSetup: './playwright/bootstrap/citizen-users.setup',
  globalTeardown: './playwright/bootstrap/citizen-users.teardown',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 5 : 5,
  reporter: process.env.CI ? 'html' : 'list',
  timeout: 8 * 30 * 1000,
  expect: {
    timeout: 20_000,
    toPass: {
      timeout: config.playwright.toPassTimeout,
    },
  },
  use: {
    headless: !config.showBrowserWindow,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: !process.env.CI ? 500 : undefined,
    },
  },
  projects: [
    {
      name: 'caseworker-auth-setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/auth/caseworker-auth.setup.ts',
      teardown: 'caseworker-auth-teardown',
    },
    {
      name: 'caseworker-auth-teardown',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/auth/caseworker-auth.teardown.ts',
    },
    {
      name: 'citizen-auth-setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/auth/citizen-auth.setup.ts',
      teardown: 'citizen-auth-teardown',
    },
    {
      name: 'citizen-auth-teardown',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/auth/citizen-auth.teardown.ts',
    },
    {
      name: 'full-functional',
      use: {...devices['Desktop Chrome']  },
      dependencies: ['citizen-auth-setup', 'caseworker-auth-setup'],
    },
  ],
});
