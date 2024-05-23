
import BasePageFactory from '../../../base/base-page-factory';
import PageCookiesManager from '../../common/page-cookies-manager';
import DashboardPage from './dashboard/dashboard-page';
import CitizenNavBar from '../fragments/citizen-nav-bar/citizen-nav-bar';
import CitizenCookiesBanner from '../fragments/citizen-cookies-banner/citizen-cookies-banner';

export default class CitizenDashboardFactory extends BasePageFactory {
  
  get pageCookiesManager() {
    return new PageCookiesManager(this.page);
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