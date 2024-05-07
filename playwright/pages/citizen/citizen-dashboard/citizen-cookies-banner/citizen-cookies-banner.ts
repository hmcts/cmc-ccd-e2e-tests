import BasePage from '../../../../base/base-page';
import { buttons } from './citizen-cookies-banner-content';

export default class CitizenCookiesBanner extends BasePage {
  verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async acceptCookies() {
    if(super.selectorExists(buttons.accept.selector)) {
      await super.clickButtonByName(buttons.accept.title);
      await super.clickButtonByName(buttons.hideMessage.title);
    }
  }

  async rejectCookies() {
    if(super.selectorExists(buttons.reject.selector))
      await super.clickButtonByName(buttons.reject.title);
  }
}