
import BaseFactory from '../../base-factory';
import CitizenCookiesBanner from './citizen-cookies-banner/citizen-cookies-banner';
import CitizenNavBar from './citizen-nav-bar/citizen-nav-bar';
import DashboardPage from './dashboard/dashboard-page';

export default class CitizenDashboardFactory extends BaseFactory{

  get citizenCookiesBanner() {
    return new CitizenCookiesBanner(this.page);
  }

  get citizenNavBar() {
    return new CitizenNavBar(this.page);
  }
  
  get dashboardPage() {
    return new DashboardPage(this.page);
  }
}