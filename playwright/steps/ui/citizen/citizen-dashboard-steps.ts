import { Page } from '@playwright/test';
import CitizenDashboardFactory from '../../../pages/citizen/citizen-dashboard/citizen-dashboard-factory';

export default class CitizenDashboardSteps {
  private citizenDashboardFactory: CitizenDashboardFactory;
  private isSetupTest: boolean;

  constructor(page: Page, isSetupTest: boolean) {
    this.isSetupTest = isSetupTest;
    this.citizenDashboardFactory = new CitizenDashboardFactory(page);
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