import BasePageFactory from '../../../base/base-page-factory';
import CuiCookiesBanner from './cookies-banner/cui-cookies-banner';
import CuiDashboardPage from './dashboard/cui-dashboard-page';
import CuiNavBar from './nav-bar/cui-nav-bar';

export default class CuiDashboardFactory extends BasePageFactory {
  get cuiCookiesBanner() {
    return new CuiCookiesBanner(this.page, this.axeBuilder);
  }

  get cuiNavBar() {
    return new CuiNavBar(this.page, this.axeBuilder);
  }

  get cuiDashboardPage() {
    return new CuiDashboardPage(this.page, this.axeBuilder);
  }
}
