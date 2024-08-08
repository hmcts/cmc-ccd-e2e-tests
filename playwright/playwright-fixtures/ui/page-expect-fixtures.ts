import test, { expect as baseExpect, Page } from '@playwright/test';
import config from '../../config/config';

export const expect = baseExpect
  .extend({
    async toHaveAxeViolations(violations: any[], expected = 0, pageName: string, page: Page) {
      const assertionName = 'toHaveAxeViolations';
      const accessibilityViolationsName = `${pageName}-Accessibility-Violations.json`;
      let pass: boolean;
      let matcherResult: any;

      try {
        baseExpect(violations).toHaveLength(expected);
        pass = true;
      } catch (e: any) {
        matcherResult = e.matcherResult;
        pass = false;
      }

      if (violations.length !== expected) {
        await test.info().attach(accessibilityViolationsName, {
          body: JSON.stringify(violations, null, 2),
          contentType: 'application/json',
        });
        const screenshot = await page.screenshot({ fullPage: true });
        await test
          .info()
          .attach(`${pageName}-Accessibility-Failure.png`, {
            body: screenshot,
            contentType: 'image/png',
          });
      }

      const message = pass
        ? () =>
            this.utils.matcherHint(assertionName, undefined, undefined, {
              isNot: this.isNot,
            }) +
            '\n\n' +
            `Expected: ${this.isNot ? 'not ' : ''}an array with ${expected} violation(s)\n` +
            `Received: an array with ${expected} violation(s)`
        : () =>
            this.utils.matcherHint(assertionName, undefined, undefined, {
              isNot: this.isNot,
            }) +
            '\n\n' +
            `Expected: an array with ${expected} violation(s)\n` +
            `Received: an array with ${violations.length} violation(s), please check attached file: ${accessibilityViolationsName}, for more details`;

      return {
        message,
        pass,
        name: assertionName,
        expected,
        actual: matcherResult?.actual,
      };
    },
  })
  .configure({ soft: config.playwright.softExpect });
