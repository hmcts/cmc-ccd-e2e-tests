import CaseListPage from './case-list/case-list-page';
import CaseDetailsPage from './case-details/case-details-page';
import ExuiNavBar from './exui-nav-bar/exui-nav-bar';
import IdamFactory from '../../idam/idam-factory';
import ExuiCookiesBanner from './exui-cookies-banner/exui-cookies-banner';

export default class ExuiDashboardFactory extends IdamFactory{
  
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
