
import BasePageFactory from '../../../base/base-page-factory';
import PageCookiesManager from '../../common/page-cookies-manager';
import LoginPage from '../../common/idam/login/login-page';
import CitizenCookiesBanner from './citizen-cookies-banner/citizen-cookies-banner';
import CitizenNavBar from './citizen-nav-bar/citizen-nav-bar';
import DashboardPage from './dashboard/dashboard-page';
import IdamCookiesBanner from '../../common/idam/idam-cookies-banner.ts/idam-cookies-banner';

export default class CitizenDashboardFactory extends BasePageFactory {
  
  get pageCookiesManager() {
    return new PageCookiesManager(this.page);
  }
 
  get loginPage() {
    return new LoginPage(this.page);
  }

  get idamsCookiesBanner() {
    return new IdamCookiesBanner(this.page);
  }

  get citizensCookiesBanner() {
    return new CitizenCookiesBanner(this.page);
  }
  
  get navBar() {
    return new CitizenNavBar(this.page);
  }
  
  get dashboardPage() {
    return new DashboardPage(this.page);
  }
}