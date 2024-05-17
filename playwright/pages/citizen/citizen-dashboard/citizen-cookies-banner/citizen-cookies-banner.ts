import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { buttons } from './citizen-cookies-banner-content';

@AllMethodsStep
export default class CitizenCookiesBanner extends BasePage {
  async verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async acceptCookies() {
    if(await super.selectorExists(buttons.accept.selector)) {
      await super.clickBySelector(buttons.accept.selector);
      await super.clickButtonByName(buttons.hideMessage.title);
    }
  }

  async rejectCookies() {
    if(await super.selectorExists(buttons.reject.selector))
      await super.clickBySelector(buttons.reject.selector);
  }
}