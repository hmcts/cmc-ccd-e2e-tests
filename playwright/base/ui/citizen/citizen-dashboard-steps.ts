import { Page } from '@playwright/test';
import CitizenDashboardFactory from '../../../pages/citizen/citizen-dashboard/citizen-dashboard-factory';
import User from '../../../types/User';
import { config } from '../../../config/config';
import BaseSteps from '../../base-steps';
import TestData from '../../../types/TestData';

export default class CitizenDashboardSteps extends BaseSteps {
  private citizenDashboardFactory: CitizenDashboardFactory;

  constructor(page: Page, testData: TestData) {
    super(testData);
    this.citizenDashboardFactory = new CitizenDashboardFactory(page);
  }

  async Login(user: User) {
    if(config.skipAuthSetup || this.testData.isSetupTest) {
      const { loginPage, cookiesBanner } = this.citizenDashboardFactory;
      await loginPage.openCitizenFrontEnd();
      await this.SignOut();
      await loginPage.verifyContent();
      await loginPage.citizenLogin(user);
      await cookiesBanner.acceptCookies();
    } else {
      const { pageCookiesManager } = this.citizenDashboardFactory;
      await pageCookiesManager.cookiesLogin(user);
      await this.GoToDashboard();
    }
  }

  async SaveCookies(filePath: string) {
    const { pageCookiesManager } = this.citizenDashboardFactory;
    await pageCookiesManager.saveCookies(filePath);
  }

  DeleteCookies(filePath: string) {
    const { pageCookiesManager } = this.citizenDashboardFactory;
    pageCookiesManager.deleteCookies(filePath);
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