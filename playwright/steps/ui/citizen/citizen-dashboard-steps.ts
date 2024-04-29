import { Page } from "@playwright/test";
import CitizenDashboardFactory from "../../../pages/citizen/citizen-dashboard/citizen-dashboard-factory";

export default class CitizenDashboardSteps {
  private citizenDashboardFactory: CitizenDashboardFactory;

  constructor(page: Page) {
    this.citizenDashboardFactory = new CitizenDashboardFactory(page);
  }

  async GoToDashboard() {
    const { dashboardPage } =
      this.citizenDashboardFactory;
    await dashboardPage.openDashboard();
  }

  async AcceptCookies() {
    const { citizenCookiesBanner } = this.citizenDashboardFactory;
    await citizenCookiesBanner.acceptCookies();
  }

  async SignOut() {
    const {citizenNavBar} = this.citizenDashboardFactory;
    await citizenNavBar.clickSignOut();
  }
}