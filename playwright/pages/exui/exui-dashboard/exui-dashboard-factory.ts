import CaseListPage from './case-list/case-list-page';
import CaseDetailsPage from './case-details/case-details-page';
import BaseFactory from '../../base-factory';
import ExuiNavBar from './exui-nav-bar/exui-nav-bar';
import ExuiCookiesBanner from './exui-cookies-banner/exui-cookies-banner';

export default class ExuiDashboardFactory extends BaseFactory{

  get exuiCookiesBanner() {
    return new ExuiCookiesBanner(this.page);
  }
  
  get exuiNavBar() {
    return new ExuiNavBar(this.page);
  }
  
  get caseListPage() {
    return new CaseListPage(this.page);
  }

  get caseDetailsPage() {
    return new CaseDetailsPage(this.page);
  }
}
