import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../types/test-data';
import User from '../../../types/user';
import FileSystemHelper from '../../../helpers/file-system-helper';
import PageUtilsFactory from '../../../pages/utils/page-utils-factory';
import CookiesHelper from '../../../helpers/cookies-helper';
import CuiDashboardFactory from '../../../pages/cui/dashboard/cui-dashboard-factory';
import OcmcDashboardFactory from '../../../pages/ocmc/dashboard/ocmc-dashboard-factory';

@AllMethodsStep()
export default class CuiDashboardSteps extends BaseSteps {
  private pageUtilsFactory: PageUtilsFactory;
  private cuiDashboardFactory: CuiDashboardFactory;
  private ocmcDashboardFactory: OcmcDashboardFactory;

  constructor(
    pageUtilsFactory: PageUtilsFactory,
    cuiDashboardFactory: CuiDashboardFactory,
    ocmcDashboardFactory: OcmcDashboardFactory,
    testData: TestData,
  ) {
    super(testData);
    this.pageUtilsFactory = pageUtilsFactory;
    this.cuiDashboardFactory = cuiDashboardFactory;
    this.ocmcDashboardFactory = ocmcDashboardFactory;
  }

  async AcceptCookies() {
    const { cuiCookiesBanner } = this.cuiDashboardFactory;
    await cuiCookiesBanner.verifyContent();
    await cuiCookiesBanner.acceptCookies();
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
    const { cuiDashboardPage } = this.cuiDashboardFactory;
    await cuiDashboardPage.open();
  }

  async GoToClaimantClaimDetails() {
    const { cuiDashboardPage } = this.cuiDashboardFactory;
    await cuiDashboardPage.open();
    await cuiDashboardPage.verifyContentWithClaimNumber(this.claimStoreCaseData.referenceNumber);
    await cuiDashboardPage.goToClaimDetails(this.claimStoreCaseData.referenceNumber);

    const { ocmcClaimantClaimDetailsPage } = this.ocmcDashboardFactory;
    await ocmcClaimantClaimDetailsPage.verifyContent(this.claimStoreCaseData);
  }

  async GoToDefendantClaimDetails() {
    const { cuiDashboardPage } = this.cuiDashboardFactory;
    await cuiDashboardPage.open();
    await cuiDashboardPage.verifyContentWithClaimNumber(this.claimStoreCaseData.referenceNumber);
    await cuiDashboardPage.goToClaimDetails(this.claimStoreCaseData.referenceNumber);

    const { ocmcDefendantClaimDetailsPage } = this.ocmcDashboardFactory;
    await ocmcDefendantClaimDetailsPage.verifyContent(this.claimStoreCaseData);
  }

  async SignOut() {
    const { cuiNavBar } = this.cuiDashboardFactory;
    await cuiNavBar.clickSignOut();
  }
}
