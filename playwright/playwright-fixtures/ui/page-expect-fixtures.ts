import { expect as baseExpect } from '@playwright/test';
import config from '../../config/config';
import { test } from '../index';

export const expect = baseExpect
  .extend({
    async toHaveAxeViolations(violations: any[], expected = 0, pageName: string) {
      const assertionName = 'toHaveAxeViolations';
      const accessibilityViolationsJson = `${pageName}-Accessibility-Violations.json`;
      let pass: boolean;
      let matcherResult: any;

      try {
        baseExpect(violations).toHaveLength(expected);
        pass = true;
      } catch (e: any) {
        matcherResult = e.matcherResult;
        pass = false;
      }

      if (violations.length) {
        await test.info().attach(accessibilityViolationsJson, {
          body: JSON.stringify(violations, null, 2),
          contentType: 'application/json',
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
            `Received: an array with ${violations.length} violation(s), please check attached file: ${accessibilityViolationsJson}, for more details`;

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
