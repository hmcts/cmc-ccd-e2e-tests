import BasePage from '../../../base-page'

const selectors = {
  accept: '.govuk-button.cookie-banner-accept-button',
  reject: '.govuk-button.cookie-banner-reject-button'
}

export default class CitizenCookiesBanner extends BasePage {

  async acceptCookies() {
    await super.clickBySelector(selectors.accept);
  }

  async rejectCookies() {
    await super.clickBySelector(selectors.reject);
  }
}