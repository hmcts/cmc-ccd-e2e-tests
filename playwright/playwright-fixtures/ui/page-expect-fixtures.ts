import test, { expect as baseExpect, Page } from '@playwright/test';
import config from '../../config/config';
import AxeCacheHelper from '../../helpers/axe-cache-helper';
import { PageResult } from '../../models/axe-results';
import AxeBuilder from '@axe-core/playwright';

export const expect = baseExpect
  .extend({
    async toHaveNoAxeViolationsCache(pageName: string, axeBuilder: AxeBuilder, page: Page) {
      const assertionName = 'toHaveNoAxeViolationsCache';
      const testInfo = test.info();
      let matcherResult: any;
      let pageResults: PageResult;

      pageResults = await AxeCacheHelper.getAxePageResult(testInfo.project.name, pageName);

      if (!pageResults) {
        let pass = true;
        let screenshot: Buffer;
        const results = await axeBuilder.analyze();
        const violations = violationFingerprints(results);

        if (violations.length > 0) {
          pass = false;
          screenshot = await page.screenshot({ fullPage: true });
        }

        pageResults = await AxeCacheHelper.writeAxePageResult(testInfo.project.name, pageName, testInfo.title, pass, violations, screenshot);
      }

      if (!pageResults.pass) {
        if (pageResults.violationsInfo) {
          const violationsAttachmentExist = testInfo.attachments.some((attachment) => attachment.name === pageResults.violationsInfo.fileName);
          if (!violationsAttachmentExist)
            await testInfo.attach(pageResults.violationsInfo.fileName, {
              path: pageResults.violationsInfo.filePath
            });
        }
        if (pageResults.screenshotInfo) {
          const screenshotAttachmentExists = testInfo.attachments.some((attachment) => attachment.name === pageResults.screenshotInfo.fileName);
          if (!screenshotAttachmentExists)
            await testInfo.attach(pageResults.screenshotInfo.fileName, {
              path: pageResults.screenshotInfo.filePath
            });
        }
      }

      try {
        baseExpect(pageResults.pass ? 0 : pageResults.violationsInfo.length).toBe(0);
      } catch (e: any) {
        matcherResult = e.matcherResult;
      }

      const message = pageResults.pass
        ? () =>
            this.utils.matcherHint(assertionName, undefined, undefined, {
              isNot: this.isNot
            }) +
            '\n\n' +
            `Expected: ${this.isNot ? 'not ' : ''}${pageName} to have 0 violation(s)\n` +
            `Received: ${pageName} with 0 violation(s)`
        : () =>
            this.utils.matcherHint(assertionName, undefined, undefined, {
              isNot: this.isNot
            }) +
            '\n\n' +
            `Expected: ${pageName} to have 0 violation(s)\n` +
            `Received: ${pageName} with ${pageResults.violationsInfo.length} violation(s), please check attached file: ${pageResults.violationsInfo.fileName}, for more details.`;

      return {
        message,
        pass: pageResults.pass,
        name: assertionName,
        expected: 0,
        actual: matcherResult?.actual
      };
    },

    async toHaveNoAxeViolations(pageName: string, axeBuilder: AxeBuilder, page: Page) {
      const assertionName = 'toHaveNoAxeViolations';
      let violationsFileName: string;
      let pass = true;
      let matcherResult: any;

      const results = await axeBuilder.analyze();
      const violations = violationFingerprints(results);

      if (violations.length > 0) {
        pass = false;
        violationsFileName = `${pageName}-accessibility-violations`;
        let screenshotFileName = `${pageName}-accessibility-failure`;
        const violationsFilesLen = test.info().attachments.filter((attachment) => attachment.name.startsWith(violationsFileName)).length;
        const violationsScreenshotLen = test.info().attachments.filter((attachment) => attachment.name.startsWith(screenshotFileName)).length;

        if (violationsFilesLen > 0 || violationsScreenshotLen > 0) {
          const maxViolationNum = Math.max(violationsFilesLen, violationsScreenshotLen);
          violationsFileName += `-(${maxViolationNum})`;
          screenshotFileName += `-(${maxViolationNum})`;
        }

        violationsFileName += '.json';
        screenshotFileName += '.png';

        await test.info().attach(violationsFileName, {
          body: JSON.stringify(violations, null, 2),
          contentType: 'application/json'
        });
        const screenshot = await page.screenshot({ fullPage: true });
        await test.info().attach(screenshotFileName, {
          body: screenshot,
          contentType: 'image/png'
        });
      }

      try {
        baseExpect(pass ? 0 : violations.length).toBe(0);
      } catch (e: any) {
        matcherResult = e.matcherResult;
      }

      const message = pass
        ? () =>
            this.utils.matcherHint(assertionName, undefined, undefined, {
              isNot: this.isNot
            }) +
            '\n\n' +
            `Expected: ${this.isNot ? 'not ' : ''}${pageName} to have 0 violation(s)\n` +
            `Received: ${pageName} with 0 violation(s)`
        : () =>
            this.utils.matcherHint(assertionName, undefined, undefined, {
              isNot: this.isNot
            }) +
            '\n\n' +
            `Expected: ${pageName} to have 0 violation(s)\n` +
            `Received: ${pageName} with ${violations.length} violation(s), please check attached file: ${violationsFileName}, for more details.`;

      return {
        message,
        pass,
        name: assertionName,
        expected: 0,
        actual: matcherResult?.actual
      };
    }
  })
  .configure({ soft: config.playwright.softExpect });

function violationFingerprints(accessibilityScanResults: any) {
  const violationFingerprints = accessibilityScanResults.violations.map((violation: any) => ({
    rule: violation.id,
    // These are CSS selectors which uniquely identify each element with
    // a violation of the rule in question.
    targets: violation.nodes.map((node: any) => node.target)
  }));
  return violationFingerprints;
}
