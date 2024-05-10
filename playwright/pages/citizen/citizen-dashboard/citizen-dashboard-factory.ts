
import BasePageFactory from '../../../base/base-page-factory';
import PageCookiesManager from '../../common/cookies-manager/cookies-manager';
import LoginPage from '../../common/login/login-page';
import CitizenCookiesBanner from './citizen-cookies-banner/citizen-cookies-banner';
import CitizenNavBar from './citizen-nav-bar/citizen-nav-bar';
import DashboardPage from './dashboard/dashboard-page';

export default class CitizenDashboardFactory extends BasePageFactory {
  
  get pageCookiesManager() {
    return new PageCookiesManager(this.page);
  }
 
  get loginPage() {
    return new LoginPage(this.page);
  }

  get cookiesBanner() {
    return new CitizenCookiesBanner(this.page);
  }
  
  get navBar() {
    return new CitizenNavBar(this.page);
  }
  
  get dashboardPage() {
    return new DashboardPage(this.page);
  }
}