import BasePage from '../../../base-page';

const selectors = {
  accept: 'button[value=\'accept\']',
  reject: 'button[value=\'reject\']',
};

export default class ExuiCookiesBanner extends BasePage {
  
  async verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async acceptCookies() {
    await super.clickBySelector(selectors.accept);
  }

  async rejectCookies() {
    await super.clickBySelector(selectors.reject);
  }
}