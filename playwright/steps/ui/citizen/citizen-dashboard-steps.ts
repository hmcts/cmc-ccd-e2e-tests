import { Page } from '@playwright/test';
import CitizenDashboardFactory from '../../../pages/citizen/citizen-dashboard/citizen-dashboard-factory';
import User from '../../../types/user';
import { config } from '../../../config/config';
import BaseSteps from '../../../base/base-steps';
import TestData from '../../../types/test-data';
import { AllMethodsStep } from '../../../decorators/test-steps';

@AllMethodsStep
export default class CitizenDashboardSteps extends BaseSteps {
  private citizenDashboardFactory: CitizenDashboardFactory;

  constructor(page: Page, testData: TestData) {
    super(testData);
    this.citizenDashboardFactory = new CitizenDashboardFactory(page);
  }

  async Login(user: User) {
    const { pageCookiesManager } = this.citizenDashboardFactory;
    if(config.skipAuthSetup || this.testData.isSetupTest) {
      const { loginPage } = this.citizenDashboardFactory;
      await pageCookiesManager.cookiesSignOut();
      await pageCookiesManager.addIdamCookies();
      await pageCookiesManager.addCitizenCookies();
      await loginPage.openCitizenFrontEnd();
      await loginPage.verifyContent();
      await loginPage.citizenLogin(user);
    } else {
      await pageCookiesManager.cookiesLogin(user);
    }
  }

  async SaveCookies(filePath: string) {
    const { pageCookiesManager } = this.citizenDashboardFactory;
    await pageCookiesManager.saveCookies(filePath);
  }

  async DeleteCookies(filePath: string) {
    const { pageCookiesManager } = this.citizenDashboardFactory;
    await pageCookiesManager.deleteCookies(filePath);
  }

  async GoToDashboard() {
    const { dashboardPage } =
      this.citizenDashboardFactory;
    await dashboardPage.open();
  }

  async SignOut() {
    const {navBar} = this.citizenDashboardFactory;
    await navBar.clickSignOut();
  }
}