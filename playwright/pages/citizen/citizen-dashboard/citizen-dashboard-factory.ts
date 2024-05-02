
import BaseFactory from '../../base-factory';
import IdamFactory from '../../idam/idam-factory';
import CitizenCookiesBanner from './citizen-cookies-banner/citizen-cookies-banner';
import CitizenNavBar from './citizen-nav-bar/citizen-nav-bar';
import DashboardPage from './dashboard/dashboard-page';

export default class CitizenDashboardFactory extends IdamFactory{
  
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