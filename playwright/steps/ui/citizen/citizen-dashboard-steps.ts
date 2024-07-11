import CitizenDashboardFactory from '../../../pages/citizen/citizen-dashboard/citizen-dashboard-factory';
import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../types/test-data';
import User from '../../../types/user';

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

  async SaveCookies(users: User[], workerIndex?: number) {
    const user: User = isNaN(workerIndex) ? users[this.workerIndex] : users[workerIndex];
    const { pageCookiesManager } = this.citizenDashboardFactory;
    await pageCookiesManager.saveCookies(user.cookiesPath);
  }

  async GoToDashboard() {
    const { dashboardPage } =
      this.citizenDashboardFactory;
    await dashboardPage.open();
  }

  async GoToClaimantClaimDetails() {
    const {dashboardPage} = this.citizenDashboardFactory;
    await dashboardPage.open();
    await dashboardPage.gotoClaimDetails(this.claimStoreCaseData.referenceNumber);

    const {claimantClaimDetailsPage} = this.citizenDashboardFactory;
    await claimantClaimDetailsPage.verifyContent(this.claimStoreCaseData);
  }

  async GoToDefendantClaimDetails() {
    const {dashboardPage} = this.citizenDashboardFactory;
    await dashboardPage.open();
    await dashboardPage.gotoClaimDetails(this.claimStoreCaseData.referenceNumber);

    const {defendantClaimDetailsPage} = this.citizenDashboardFactory;
    await defendantClaimDetailsPage.verifyContent(this.claimStoreCaseData);
  }

  async SignOut() {
    const {navBar} = this.citizenDashboardFactory;
    await navBar.clickSignOut();
  }
}