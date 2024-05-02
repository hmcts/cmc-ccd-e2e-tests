import { Page } from 'playwright-core';
import ExuiDashboardFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-factory';
import User from '../../../types/User';
import { config } from '../../../config/config';

export default class ExuiDashboardSteps {
  private exuiDashboardFactory: ExuiDashboardFactory;
  private isSetupTest: boolean;

  constructor(page: Page, isSetupTest: boolean) {
    this.isSetupTest = isSetupTest;
    this.exuiDashboardFactory = new ExuiDashboardFactory(page);
  }

  async Login(user: User) {
    if(config.skipAuthSetup || this.isSetupTest) {
      const { loginPage, cookiesBanner } = this.exuiDashboardFactory;

      await loginPage.openManageCase();
      await cookiesBanner.acceptCookies();
      await loginPage.caseworkerLogin(user);
    } else {
      const {cookiesManager} = this.exuiDashboardFactory;
      cookiesManager.replaceCookies(user);
    }
  }

  async GoToCaseList() {
    const { caseListPage } = this.exuiDashboardFactory;
    await caseListPage.openCaseList();
  }
  
  async SignOut() {
    const {navBar} = this.exuiDashboardFactory;
    await navBar.clickSignOut();
  }
}