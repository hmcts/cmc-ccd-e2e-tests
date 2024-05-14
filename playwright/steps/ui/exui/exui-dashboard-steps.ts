import { Page } from 'playwright-core';
import ExuiDashboardFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-factory';
import User from '../../../types/user';
import { config } from '../../../config/config';
import BaseSteps from '../../../base/base-steps';
import TestData from '../../../types/test-data';
import { AllMethodsStep } from '../../../decorators/test-steps';

@AllMethodsStep
export default class ExuiDashboardSteps extends BaseSteps{
  private exuiDashboardFactory: ExuiDashboardFactory;

  constructor(page: Page, testData: TestData) {
    super(testData);
    this.exuiDashboardFactory = new ExuiDashboardFactory(page);
  }

  async Login(user: User) {
    const { pageCookiesManager } = this.exuiDashboardFactory;
    if(config.skipAuthSetup || this.testData.isSetupTest) {
      const { loginPage } = this.exuiDashboardFactory;
      await pageCookiesManager.cookiesSignOut();
      await pageCookiesManager.addIdamCookies();
      await pageCookiesManager.addExuiCookies(user);
      await loginPage.openManageCase();
      await loginPage.verifyContent();
      await loginPage.caseworkerLogin(user);
    } else {
      await pageCookiesManager.cookiesLogin(user);
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

  async DeleteCookies(filePath: string) {
    const { pageCookiesManager } = this.exuiDashboardFactory;
    await pageCookiesManager.deleteCookies(filePath);
  }
}