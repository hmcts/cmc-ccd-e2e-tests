import CaseListPage from './case-list/case-list-page';
import CaseDetailsPage from './case-details/case-details-page';
import PageCookiesManager from '../../common/page-cookies-manager';
import BasePageFactory from '../../../base/base-page-factory';
import ExuiCookiesBanner from '../fragments/exui-cookies-banner/exui-cookies-banner';
import ExuiNavBar from '../fragments/exui-nav-bar/exui-nav-bar';

export default class ExuiDashboardFactory extends BasePageFactory {
  
  get pageCookiesManager() {
    return new PageCookiesManager(this.page);
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
