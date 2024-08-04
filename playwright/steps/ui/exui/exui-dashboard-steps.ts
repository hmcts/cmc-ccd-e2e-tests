import ExuiDashboardFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-factory';
import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../types/test-data';
import FileSystemHelper from '../../../helpers/file-system-helper';
import User from '../../../types/user';

@AllMethodsStep()
export default class ExuiDashboardSteps extends BaseSteps {
  private exuiDashboardFactory: ExuiDashboardFactory;

  constructor(exuiDashboardFactory: ExuiDashboardFactory, testData: TestData) {
    super(testData);
    this.exuiDashboardFactory = exuiDashboardFactory;
  }

  async AcceptCookies() {
    const { exuiCookiesBanner } = this.exuiDashboardFactory;
    await exuiCookiesBanner.verifyContent();
    await exuiCookiesBanner.acceptCookies();
  }

  async SaveCookies({ cookiesPath }: User) {
    const { pageCookiesManager } = this.exuiDashboardFactory;
    await pageCookiesManager.saveCookies(cookiesPath);
  }

  async DeleteCookies({ cookiesPath }: User) {
    FileSystemHelper.delete(cookiesPath);
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

  async VerifyDefendantFullReject() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.verifyFullReject();
  }

  async SignOut() {
    const { navBar } = this.exuiDashboardFactory;
    await navBar.clickSignOut();
  }
}
