import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../types/test-data';
import User from '../../../types/user';
import FileSystemHelper from '../../../helpers/file-system-helper';
import PageUtilsFactory from '../../../pages/utils/page-utils-factory';
import CookiesHelper from '../../../helpers/cookies-helper';
import OcmcDashboardFactory from '../../../pages/ocmc/dashboard/ocmc-dashboard-factory';

@AllMethodsStep()
export default class OcmcDashboardSteps extends BaseSteps {
  private pageUtilsFactory: PageUtilsFactory;
  private ocmcDashboardFactory: OcmcDashboardFactory;

  constructor(
    pageUtilsFactory: PageUtilsFactory,
    ocmcDashboardFactory: OcmcDashboardFactory,
    testData: TestData,
  ) {
    super(testData);
    this.pageUtilsFactory = pageUtilsFactory;
    this.ocmcDashboardFactory = ocmcDashboardFactory;
  }

  async AcceptCookies() {
    const { ocmcCookiesBanner } = this.ocmcDashboardFactory;
    await ocmcCookiesBanner.verifyContent();
    await ocmcCookiesBanner.acceptCookies();
  }

  async SaveCookies(users: User[], workerIndex?: number) {
    const user: User = isNaN(workerIndex) ? users[this.workerIndex] : users[workerIndex];
    const { pageCookiesManager } = this.pageUtilsFactory;
    const cookies = await pageCookiesManager.getCookies();
    await CookiesHelper.writeCookies(cookies, user.cookiesPath);
  }

  async DeleteCookies(users: User[], workerIndex?: number) {
    const user: User = isNaN(workerIndex) ? users[this.workerIndex] : users[workerIndex];
    FileSystemHelper.delete(user.cookiesPath);
  }

  async GoToDashboard() {
    const { ocmcDashboardPage } = this.ocmcDashboardFactory;
    await ocmcDashboardPage.open();
  }

  async GoToClaimantClaimDetails() {
    const { ocmcDashboardPage } = this.ocmcDashboardFactory;
    await ocmcDashboardPage.open();
    await ocmcDashboardPage.verifyContentWithClaimNumber(this.claimStoreCaseData.referenceNumber);
    await ocmcDashboardPage.goToClaimDetails(this.claimStoreCaseData.referenceNumber);

    const { ocmcClaimantClaimDetailsPage } = this.ocmcDashboardFactory;
    await ocmcClaimantClaimDetailsPage.verifyContent(this.claimStoreCaseData);
  }

  async GoToDefendantClaimDetails() {
    const { ocmcDashboardPage } = this.ocmcDashboardFactory;
    await ocmcDashboardPage.open();
    await ocmcDashboardPage.verifyContentWithClaimNumber(this.claimStoreCaseData.referenceNumber);
    await ocmcDashboardPage.goToClaimDetails(this.claimStoreCaseData.referenceNumber);

    const { ocmcDefendantClaimDetailsPage } = this.ocmcDashboardFactory;
    await ocmcDefendantClaimDetailsPage.verifyContent(this.claimStoreCaseData);
  }

  async SignOut() {
    const { ocmcNavBar } = this.ocmcDashboardFactory;
    await ocmcNavBar.clickSignOut();
  }
}
