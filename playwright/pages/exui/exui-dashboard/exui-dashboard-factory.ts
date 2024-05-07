import CaseListPage from './case-list/case-list-page';
import CaseDetailsPage from './case-details/case-details-page';
import ExuiNavBar from './exui-nav-bar/exui-nav-bar';
import ExuiCookiesBanner from './exui-cookies-banner/exui-cookies-banner';
import CookiesManager from '../../common/cookies-manager/cookies-manager';
import LoginPage from '../../common/login/login-page';
import BaseFactory from '../../../base/base-factory';

export default class ExuiDashboardFactory extends BaseFactory {
  
  get cookiesManager() {
    return new CookiesManager(this.page);
  }
 
  get loginPage() {
    return new LoginPage(this.page);
  }

  get cookiesBanner() {
    return new ExuiCookiesBanner(this.page);
  }

  get navBar() {
    return new ExuiNavBar(this.page);
  }
  
  get caseListPage() {
    return new CaseListPage(this.page);
  }

  get caseDetailsPage() {
    return new CaseDetailsPage(this.page);
  }
}
