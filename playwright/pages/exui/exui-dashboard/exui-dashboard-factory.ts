import CaseListPage from './case-list/case-list-page';
import CaseDetailsPage from './case-details/case-details-page';
import ExuiNavBar from './exui-nav-bar/exui-nav-bar';
import ExuiCookiesBanner from './exui-cookies-banner/exui-cookies-banner';
import PageCookiesManager from '../../common/page-cookies-manager';
import LoginPage from '../../common/idam/login/login-page';
import BasePageFactory from '../../../base/base-page-factory';
import IdamCookiesBanner from '../../common/idam/idam-cookies-banner.ts/idam-cookies-banner';

export default class ExuiDashboardFactory extends BasePageFactory {
  
  get pageCookiesManager() {
    return new PageCookiesManager(this.page);
  }
 
  get loginPage() {
    return new LoginPage(this.page);
  }

  get idamsCookiesBanner() {
    return new IdamCookiesBanner(this.page);
  }

  get exuiCookiesBanner() {
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
