import BasePage from '../../../base-page';
import { buttons } from './citizen-cookies-banner-content';

export default class CitizenCookiesBanner extends BasePage {
  verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async acceptCookies() {
    await super.clickBySelector(buttons.accept.selector);
  }

  async rejectCookies() {
    await super.clickBySelector(buttons.reject.selector);
  }
}