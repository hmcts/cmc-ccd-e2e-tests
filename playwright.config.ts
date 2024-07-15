import { defineConfig, devices } from '@playwright/test';                  
import config from './playwright/config/config';

export default defineConfig({
  testDir: './playwright/tests',
  globalTeardown: './playwright/global/teardown',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: config.playwright.workers,
  // reporter: 'allure-playwright',
  reporter: process.env.CI ? 'html' : 'list',
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
      name: '#1-citizen-users-setup',
      testMatch: '**playwright/tests/bootstrap/users/citizen-users.setup.ts',
      teardown: '#5-citizen-users-teardown',
    },
    {
      name: '#2-user-data-setup',
      testMatch: '**playwright/tests/bootstrap/users/user-data.setup.ts',
      dependencies: ['#1-citizen-users-setup'],
    },
    {
      name: '#3-user-auth-setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/bootstrap/auth/**.setup.ts',
      dependencies: ['#2-user-data-setup'],
      teardown: '#4-user-auth-teardown',
    },
    {
      name: '#4-user-auth-teardown',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/bootstrap/auth/**.teardown.ts',
    },
    {
      name: '#5-citizen-users-teardown',
      testMatch: '**playwright/tests/bootstrap/users/citizen-users.teardown.ts',
    },
    {
      name: 'full-functional',
      use: {...devices['Desktop Chrome']  },
      dependencies: ['#3-user-auth-setup'],
    },
    {
      name: 'cross-browser-firefox',
      use: {...devices['Desktop Firefox']  },
      dependencies: ['#3-user-auth-setup'],
    },
    {
      name: 'cross-browser-edge',
      use: {...devices['Desktop Edge']},
      dependencies: ['#3-user-auth-setup'],
    },
    {
      name: 'cross-browser-safari',
      use: {...devices['Desktop Safari']},
      dependencies: ['#3-user-auth-setup'],
    },
  ],
});
