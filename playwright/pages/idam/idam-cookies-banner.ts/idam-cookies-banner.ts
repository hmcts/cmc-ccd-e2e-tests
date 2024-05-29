import BasePage from '../../../base/base-page';
import { AllMethodsStep } from '../../../decorators/test-steps';
import { buttons, heading, paragraphs } from './idam-cookies-banner-content';

@AllMethodsStep
export default class IdamCookiesBanner extends BasePage{
  async verifyContent(): Promise<void> {
    await Promise.all([
      super.expectSubHeadingToBeVisible(heading),
      super.expectTextToBeVisible(paragraphs.cookiesDescription1),
      super.expectTextToBeVisible(paragraphs.cookiesDescription2),
    ]);
  }

  async acceptCookies() {
    await super.clickBySelector(buttons.accept.selector);
    await super.expectTextToBeVisible(paragraphs.acceptedCookiesMessage);
    await super.clickBySelector(buttons.hideMessage.selector);
  }

  async rejectCookies() {
    await super.clickBySelector(buttons.reject.selector);
    await super.expectTextToBeVisible(paragraphs.rejectedCookiesMessage);
    await super.clickBySelector(buttons.hideMessage.selector);
  }
}