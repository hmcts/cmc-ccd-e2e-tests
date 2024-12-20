import ExuiDashboardFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-factory';
import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';
import User from '../../../models/user';
import PageUtilsFactory from '../../../pages/utils/page-utils-factory';
import CookiesHelper from '../../../helpers/cookies-helper';

@AllMethodsStep()
export default class ExuiDashboardSteps extends BaseSteps {
  private pageUtilsFactory: PageUtilsFactory;
  private exuiDashboardFactory: ExuiDashboardFactory;

  constructor(
    pageUtilsFactory: PageUtilsFactory,
    exuiDashboardFactory: ExuiDashboardFactory,
    testData: TestData,
  ) {
    super(testData);
    this.pageUtilsFactory = pageUtilsFactory;
    this.exuiDashboardFactory = exuiDashboardFactory;
  }

  async AcceptCookies() {
    const { exuiCookiesBanner } = this.exuiDashboardFactory;
    await exuiCookiesBanner.verifyContent();
    await exuiCookiesBanner.acceptCookies();
  }

  async SaveCookies({ cookiesPath }: User) {
    const { pageCookiesManager } = this.pageUtilsFactory;
    const cookies = await pageCookiesManager.getCookies();
    await CookiesHelper.writeCookies(cookies, cookiesPath);
  }

  async GoToCaseList() {
    const { caseListPage } = this.exuiDashboardFactory;
    await caseListPage.openCaseList();
  }

  async GoToCaseDetails() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.goToCaseDetails(this.ccdCaseData.id);
    await caseDetailsPage.verifyContent(this.ccdCaseData);
  }

  async GoToCaseDetailsAndWait() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.goToCaseDetails(this.ccdCaseData.id);
    await caseDetailsPage.verifyContent(this.ccdCaseData);
    await caseDetailsPage.wait(5000);
  }

  async VerifyDefendantFullReject() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.verifyFullReject();
  }

  async SignOut() {
    const { navBar } = this.exuiDashboardFactory;
    await navBar.clickSignOut();
  }
}
