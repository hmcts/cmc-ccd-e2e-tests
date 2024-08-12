import { test as base } from '@playwright/test';
import TestData from '../../types/test-data';
import AxeBuilder from '@axe-core/playwright';
import config from '../../config/config';
import CaseDataFactory from '../../fixtures/case-data/case-data-factory';
import FileSystemHelper from '../../helpers/file-system-helper';

type TestDataFixture = {
  _axeBuilder?: AxeBuilder;
  _isSetupTest: boolean;
  _isTeardown: boolean;
  _verifyCookiesBanner: boolean;
  _caseDataFactory: CaseDataFactory;
  _testData: TestData;
};

export const test = base.extend<TestDataFixture>({
  page: async ({ page, request }, use, testInfo) => {
    await use(page);
    const screenshotAttachment = testInfo.attachments.find(
      (attachment) => attachment.name === 'screenshot',
    );
    const allErrorsAxe =
      testInfo.errors.length > 0
        ? testInfo.errors.every((error) => error.value === 'accessibility')
        : false;
    if (allErrorsAxe) {
      FileSystemHelper.delete(screenshotAttachment.path, { force: true });
      FileSystemHelper.delete(await page.video().path(), { force: true });
      test.fail();
    } else {
      await testInfo.attach('failed.png', { path: screenshotAttachment.path });
      FileSystemHelper.delete(screenshotAttachment.path, { force: true });
    }
    testInfo.errors.reverse();
  },
  _axeBuilder: async ({ page }, use) => {
    let axeBuilder: AxeBuilder | undefined;
    if (config.runAxeTests) {
      axeBuilder = new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
        .setLegacyMode(true);
    }
    await use(axeBuilder);
  },
  _isSetupTest: async ({}, use, testInfo) => {
    await use(testInfo.project.name.endsWith('setup'));
  },
  _isTeardown: async ({}, use, testInfo) => {
    await use(testInfo.project.name.endsWith('teardown'));
  },
  _verifyCookiesBanner: async ({}, use, testInfo) => {
    await use(testInfo.tags.includes('@verify-cookies-banner'));
  },
  _caseDataFactory: async ({}, use) => {
    await use(new CaseDataFactory());
  },
  _testData: async ({}, use, testInfo) => {
    await use({
      workerIndex: testInfo.parallelIndex,
      claimStoreCaseData: {},
      ccdCaseData: {},
    });
  },
});
