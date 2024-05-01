import { Page } from 'playwright-core';
import ExuiDashboardFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-factory';

export default class ExuiDashboardSteps {
  private exuiDashboardFactory: ExuiDashboardFactory;

  constructor(page: Page) {
    this.exuiDashboardFactory = new ExuiDashboardFactory(page);
  }

  async AcceptCookies() {
    const { exuiCookiesBanner } = this.exuiDashboardFactory;
    await exuiCookiesBanner.acceptCookies();
  }

  async GoToCaseList() {
    const { caseListPage } = this.exuiDashboardFactory;
    await caseListPage.openCaseList();
  }
  
  async SignOut() {
    const {exuiNavBar} = this.exuiDashboardFactory;
    await exuiNavBar.clickSignOut();
  }
}