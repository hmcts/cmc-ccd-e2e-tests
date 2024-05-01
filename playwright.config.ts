import { defineConfig, devices } from '@playwright/test';                  
import { config } from './playwright/config/config';

export default defineConfig({
  testDir: './playwright/tests',
  globalSetup: './playwright/bootstrap/citizen-users.setup',
  globalTeardown: './playwright/bootstrap/citizen-users.teardown',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: process.env.CI ? 'html' : 'list',
  timeout: 8 * 30 * 1000,
  expect: {
    timeout: 60 * 1000,
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
      testMatch: '**playwright/tests/idam/caseworker-auth.setup.ts',
      teardown: 'caseworker-auth-teardown',
    },
    {
      name: 'caseworker-auth-teardown',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/idam/caseworker-auth.teardown.ts',
    },
    {
      name: 'citizen-auth-setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/idam/citizen-auth.setup.ts',
      teardown: 'citizen-auth-teardown',
    },
    {
      name: 'citizen-auth-teardown',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/idam/citizen-auth.teardown.ts',
    },
    {
      name: 'full-functional',
      use: {...devices['Desktop Chrome']  },
      testDir: '.playwright/tests',
      dependencies: ['citizen-auth-setup', 'caseworker-auth-setup'],
    },
  ],
});
