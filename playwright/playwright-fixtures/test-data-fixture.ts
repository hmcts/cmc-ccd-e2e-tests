import { test as base } from '@playwright/test';
import TestData from '../types/TestData';

export const test = base.extend<{testData: TestData}>({
  testData: async ({}, use: (arg0: TestData) => any, testInfo) => {
    const isSetupTest = testInfo.tags.includes('@setup');
    await use({isSetupTest});
  },
});