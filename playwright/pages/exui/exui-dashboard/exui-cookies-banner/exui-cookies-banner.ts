import BasePage from '../../../base-page'

const selectors = {
  accept: 'button[value=\'accept\']',
  reject: 'button[value=\'reject\']'
}

export default class ExuiCookiesBanner extends BasePage {
  
  verifyContent(): void {
  }
  async acceptCookies() {
    await super.clickBySelector(selectors.accept);
  }

  async rejectCookies() {
    await super.clickBySelector(selectors.reject);
  }
}