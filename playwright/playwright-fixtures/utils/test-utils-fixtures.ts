import { test as base } from '@playwright/test';
import TestData from '../../types/test-data';
import AxeBuilder from '@axe-core/playwright';
import config from '../../config/config';

type TestDataFixture = {
  _axeBuilder?: AxeBuilder;
  _isSetupTest: boolean,
  _isTeardown: boolean,
  _verifyCookiesBanner: boolean,
  _testData: TestData
}

export const test = base.extend<TestDataFixture>({
  _axeBuilder: async ({page}, use: (arg0: AxeBuilder) => any) => {
    let axeBuilder: AxeBuilder | undefined;
    if(config.runAccessibilityTests) {
      axeBuilder = new AxeBuilder({page})
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']);
    }
    await use(axeBuilder);
  },
  _isSetupTest: async ({}, use: (arg0: boolean) => any, testInfo) => {
    await use(testInfo.tags.includes('@setup'));
  },
  _isTeardown: async ({}, use: (arg0: boolean) => any, testInfo) => {
    await use(testInfo.tags.includes('@teardown'));
  },
  _verifyCookiesBanner: async ({}, use: (arg0: boolean) => any, testInfo) => {
    await use(testInfo.tags.includes('@verify-cookies-banner'));
  },
  _testData: async ({}, use: (arg0: TestData) => any, testInfo) => {
    await use({workerIndex: testInfo.parallelIndex, claimStoreCaseData: {}, ccdCaseData: {}});
  },
});