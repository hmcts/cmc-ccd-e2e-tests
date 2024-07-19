import { defineConfig, devices } from '@playwright/test';                  
import config from './playwright/config/config';

export default defineConfig({
  testDir: './playwright/tests',
  globalTeardown: process.env.CI ? undefined : './playwright/global/teardown',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: config.playwright.workers,
  reporter: process.env.CI ? [
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: process.env.FUNCTIONAL === 'true' ? 'allure-functional-results' : 'allure-bootstrap-results',
      },
    ],
  ] : 'list',
  timeout: 8 * 30 * 1000,
  expect: {
    timeout: 30_000,
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
      slowMo: !process.env.CI ? 500 : 200,
    },
  },
  projects: [
    {
      name: 'citizen-users-setup',
      testMatch: '**playwright/tests/bootstrap/users/citizen-users.setup.ts',
      teardown: 'citizen-users-teardown',
      retries: 0,
    },
    {
      name: 'user-data-setup',
      testMatch: '**playwright/tests/bootstrap/users/user-data.setup.ts',
      dependencies: ['citizen-users-setup'],
      retries: 0,
    },
    {
      name: 'user-auth-setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/bootstrap/auth/**.setup.ts',
      dependencies: ['user-data-setup'],
      teardown: 'user-auth-teardown',
      retries: 0,
    },
    {
      name: 'user-auth-teardown',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/bootstrap/auth/**.teardown.ts',
    },
    {
      name: 'citizen-users-teardown',
      testMatch: '**playwright/tests/bootstrap/users/citizen-users.teardown.ts',
    },
    {
      name: 'full-functional',
      use: {...devices['Desktop Chrome']},
      dependencies: ['user-auth-setup'],
    },
    {
      name: 'cross-browser-firefox',
      use: {...devices['Desktop Firefox']  },
      dependencies: ['user-auth-setup'],
    },
    {
      name: 'cross-browser-edge',
      use: {...devices['Desktop Edge']},
      dependencies: ['user-auth-setup'],

    },
    {
      name: 'cross-browser-safari',
      use: {...devices['Desktop Safari']},
      dependencies: ['user-auth-setup'],
    },
  ],
});
