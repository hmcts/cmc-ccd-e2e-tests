import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { buttons, heading, paragraphs } from './citizen-cookies-banner-content';

@AllMethodsStep
export default class CitizenCookiesBanner extends BasePage {
  async verifyContent(): Promise<void> {
    await super.myExpect([
      super.expectSubHeading(heading),
      super.expectText(paragraphs.cookiesDescription1),
      super.expectText(paragraphs.cookiesDescription2),
    ]);
  }

  async acceptCookies() {
    if(await super.selectorExists(buttons.accept.selector)) {
      await super.clickBySelector(buttons.accept.selector);
      await super.expectText(paragraphs.acceptedCookiesMessage);
      await super.clickButtonByName(buttons.hideMessage.title);
    }
  }

  async rejectCookies() {
    if(await super.selectorExists(buttons.reject.selector))
      await super.clickBySelector(buttons.reject.selector);
    await super.expectText(paragraphs.rejectedCookiesMessage);
    await super.clickButtonByName(buttons.hideMessage.title);
  }
}