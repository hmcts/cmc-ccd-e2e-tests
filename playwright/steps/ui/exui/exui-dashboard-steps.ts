import ExuiDashboardFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-factory';
import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../types/test-data';

@AllMethodsStep
export default class ExuiDashboardSteps extends BaseSteps{
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

  async SaveCookies(filePath: string) {
    const { pageCookiesManager } = this.exuiDashboardFactory;
    await pageCookiesManager.saveCookies(filePath);
  }

  async GoToCaseList() {
    const { caseListPage } = this.exuiDashboardFactory;
    await caseListPage.openCaseList();
  }

  async GoToCaseDetails() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.goToCaseDetails(this.claimStoreCaseData.id);
    await caseDetailsPage.verifyContent(this.ccdCaseData);
  }
  
  async SignOut() {
    const {navBar} = this.exuiDashboardFactory;
    await navBar.clickSignOut();
  }
}