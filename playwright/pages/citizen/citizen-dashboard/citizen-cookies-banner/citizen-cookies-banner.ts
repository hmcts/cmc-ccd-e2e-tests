import BasePage from '../../../base-page';
import { buttons } from './citizen-cookies-banner-content';

export default class CitizenCookiesBanner extends BasePage {
  verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async acceptCookies() {
    if(super.selectorExists(buttons.accept.selector))
      await super.clickBySelector(buttons.accept.selector);
  }

  async rejectCookies() {
    if(super.selectorExists(buttons.reject.selector))
      await super.clickBySelector(buttons.reject.selector);
  }
}