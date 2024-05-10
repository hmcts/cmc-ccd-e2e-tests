import { Page } from 'playwright-core';
import ExuiDashboardFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-factory';
import User from '../../../types/User';
import { config } from '../../../config/config';
import BaseSteps from '../../../base/base-steps';
import TestData from '../../../types/TestData';

export default class ExuiDashboardSteps extends BaseSteps{
  private exuiDashboardFactory: ExuiDashboardFactory;

  constructor(page: Page, testData: TestData) {
    super(testData);
    this.exuiDashboardFactory = new ExuiDashboardFactory(page);
  }

  async Login(user: User) {
    const { pageCookiesManager } = this.exuiDashboardFactory;
    if(config.skipAuthSetup || this.testData.isSetupTest) {
      const { loginPage, cookiesBanner } = this.exuiDashboardFactory;
      await pageCookiesManager.cookiesSignOut();
      await loginPage.openManageCase();
      await loginPage.verifyContent();
      await loginPage.caseworkerLogin(user);
      await cookiesBanner.acceptCookies();
    } else {
      await pageCookiesManager.cookiesLogin(user);
      await this.GoToCaseList();
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

  async SaveCookies(filePath: string) {
    const { pageCookiesManager } = this.exuiDashboardFactory;
    await pageCookiesManager.saveCookies(filePath);
  }

  DeleteCookies(filePath: string) {
    const { pageCookiesManager } = this.exuiDashboardFactory;
    pageCookiesManager.deleteCookies(filePath);
  }
}