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
    if(config.skipAuthSetup || this.testData.isSetupTest) {
      const { loginPage, cookiesBanner } = this.exuiDashboardFactory;
      await loginPage.openManageCase();
      await loginPage.verifyContent();
      await cookiesBanner.acceptCookies();
      await loginPage.caseworkerLogin(user);
    } else {
      const { cookiesManager } = this.exuiDashboardFactory;
      await cookiesManager.cookiesLogin(user);
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
    const { cookiesManager } = this.exuiDashboardFactory;
    await cookiesManager.saveCookies(filePath);
  }

  DeleteCookies(filePath: string) {
    const { cookiesManager } = this.exuiDashboardFactory;
    cookiesManager.deleteCookies(filePath);
  }
}