import { defineConfig, devices } from '@playwright/test';
import config from './playwright/config/config';

export default defineConfig({
  testDir: './playwright/tests',
  globalTeardown: process.env.CI ? undefined : './playwright/global/teardown',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: process.env.CI ? 0 : 0,
  workers: config.playwright.workers,
  reporter: process.env.CI
    ? [
      [
        'allure-playwright',
        {
          outputFolder: process.env.FUNCTIONAL === 'true' ? 'allure-functional-results' : 'allure-bootstrap-results',
        },
      ],
    ]
    : 'list',
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
    launchOptions: {
      slowMo: process.env.CI ? 200 : 500,
    },
  },
  projects: [
    {
      name: 'users-setup',
      testMatch: '**playwright/tests/bootstrap/users/**.setup.ts',
      teardown: 'users-teardown',
      retries: 0,
    },
    {
      name: 'users-auth-setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/bootstrap/auth/**.setup.ts',
      dependencies: ['users-setup'],
      teardown: 'users-auth-teardown',
    },
    {
      name: 'users-auth-teardown',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/bootstrap/auth/**.teardown.ts',
    },
    {
      name: 'users-teardown',
      testMatch: '**playwright/tests/bootstrap/users/**.teardown.ts',
      retries: 0,
    },
    {
      name: 'chrome-full-functional',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['users-auth-setup'],
    },
    {
      name: 'firefox-full-functional',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['users-auth-setup'],
    },
    {
      name: 'edge-full-functional',
      use: { ...devices['Desktop Edge'] },
      dependencies: ['users-auth-setup'],
    },
    {
      name: 'safari-full-functional',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['users-auth-setup'],
    },
  ],
});
