import { test as base } from '@playwright/test';
import TestData from '../types/test-data';

type TestDataFixture = {
  isSetupTest: boolean,
  testData: TestData
}

export const test = base.extend<TestDataFixture>({
  isSetupTest: async ({}, use: (arg0: boolean) => any, testInfo) => {
    await use(testInfo.tags.includes('@setup'));
  },
  testData: async ({}, use: (arg0: TestData) => any) => {
    await use({caseData: {}});
  },
});