
import BasePageFactory from '../../base/base-page-factory';
import PageCookiesManager from '../common/page-cookies-manager';
import IdamCookiesBanner from './idam-cookies-banner.ts/idam-cookies-banner';
import LoginPage from './login/login-page';

export default class IdamFactory extends BasePageFactory {
  get pageCookiesManager() {
    return new PageCookiesManager(this.page);
  }
 
  get loginPage() {
    return new LoginPage(this.page, this.axeBuilder);
  }

  get idamsCookiesBanner() {
    return new IdamCookiesBanner(this.page, this.axeBuilder);
  }

}