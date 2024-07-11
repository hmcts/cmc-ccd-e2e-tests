import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import LegalAdvisorEvents from '../../../enums/events/legal-advisor-events';
import ExuiDashboardFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-factory';
import LegalAdvisorEventsFactory from '../../../pages/exui/legal-advisor-events/legal-advisor-events-factory';
import TestData from '../../../types/test-data';

@AllMethodsStep
export default class LegalAdvisorEventsSteps extends BaseSteps {
  private legalAdvisorEventsFactory: LegalAdvisorEventsFactory;
  private exuiDashboardFactory: ExuiDashboardFactory;

  constructor(legalAdvisorEventsFactory: LegalAdvisorEventsFactory, exuiDashboardFactory: ExuiDashboardFactory, testData: TestData) {
    super(testData);
    this.legalAdvisorEventsFactory = legalAdvisorEventsFactory;
    this.exuiDashboardFactory = exuiDashboardFactory;
  }

  async GenerateOrder() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(LegalAdvisorEvents.GENERATE_ORDER);

    const {generateOrder1Page} = this.legalAdvisorEventsFactory;
    await generateOrder1Page.verifyContent(this.ccdCaseData);
    await generateOrder1Page.enterSdoDetails();

    const {generateOrder2Page} = this.legalAdvisorEventsFactory;
    await generateOrder2Page.verifyContent(this.ccdCaseData);
    await generateOrder2Page.chooseJudgeReviewFirst();
    await generateOrder2Page.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, LegalAdvisorEvents.GENERATE_ORDER);
  }

  async ActionReviewComments() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(LegalAdvisorEvents.ACTION_REVIEW_COMMENTS);

    const {actionReviewComments1Page} = this.legalAdvisorEventsFactory;
    await actionReviewComments1Page.verifyContent(this.ccdCaseData);
    await actionReviewComments1Page.confirmSdoDetails();

    const {actionReviewComments2Page} = this.legalAdvisorEventsFactory;
    await actionReviewComments2Page.verifyContent(this.ccdCaseData);
    await actionReviewComments2Page.assign();
    await actionReviewComments2Page.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, LegalAdvisorEvents.ACTION_REVIEW_COMMENTS);
  }

  async DrawDirectionsOrder() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(LegalAdvisorEvents.DRAW_DIRECTIONS_ORDER);

    const {drawDirectionsOrderPage} = this.legalAdvisorEventsFactory;
    await drawDirectionsOrderPage.verifyContent(this.ccdCaseData);
    await drawDirectionsOrderPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, LegalAdvisorEvents.DRAW_DIRECTIONS_ORDER);
  }
}