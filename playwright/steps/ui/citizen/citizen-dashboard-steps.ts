import CitizenDashboardFactory from '../../../pages/citizen/citizen-dashboard/citizen-dashboard-factory';
import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../types/test-data';

@AllMethodsStep
export default class CitizenDashboardSteps extends BaseSteps {
  private citizenDashboardFactory: CitizenDashboardFactory;

  constructor(citizenDashboardFactory: CitizenDashboardFactory, testData: TestData) {
    super(testData);
    this.citizenDashboardFactory = citizenDashboardFactory;
  }

  async AcceptCookies() {
    const { citizensCookiesBanner } = this.citizenDashboardFactory;
    await citizensCookiesBanner.verifyContent();
    await citizensCookiesBanner.acceptCookies();
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