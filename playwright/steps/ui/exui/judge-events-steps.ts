import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import JudgeEvents from '../../../enums/events/judge-events';
import ExuiDashboardFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-factory';
import JudgeEventsFactory from '../../../pages/exui/judge-events/judge-events-factory';
import TestData from '../../../types/test-data';

@AllMethodsStep
export default class JudgeEventsSteps extends BaseSteps {
  private judgeEventsFactory: JudgeEventsFactory;
  private exuiDashboardFactory: ExuiDashboardFactory;

  constructor(judgeEventsFactory: JudgeEventsFactory, exuiDashboardFactory: ExuiDashboardFactory, testData: TestData) {
    super(testData);
    this.judgeEventsFactory = judgeEventsFactory;
    this.exuiDashboardFactory = exuiDashboardFactory;
  }

  async DrawDirectionsOrder() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(JudgeEvents.JUDGE_DRAW_DIRECTIONS_ORDER);

    const {drawDirectionsOrder1Page} = this.judgeEventsFactory;
    await drawDirectionsOrder1Page.verifyContent(this.ccdCaseData);
    await drawDirectionsOrder1Page.chooseSdo();

    const {drawDirectionsOrder2Page} = this.judgeEventsFactory;
    await drawDirectionsOrder2Page.verifyContent(this.ccdCaseData);
    await drawDirectionsOrder2Page.enterSdoDetails();

    const {drawDirectionsOrder3Page} = this.judgeEventsFactory;
    await drawDirectionsOrder3Page.verifyContent(this.ccdCaseData);
    await drawDirectionsOrder3Page.submitEvent();
    
    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, JudgeEvents.JUDGE_DRAW_DIRECTIONS_ORDER);
  }

  async ProvideDirections() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(JudgeEvents.PROVIDE_DIRECTIONS);

    const {provideDirectionsPage} = this.judgeEventsFactory;
    await provideDirectionsPage.verifyContent(this.ccdCaseData);
    await provideDirectionsPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, JudgeEvents.PROVIDE_DIRECTIONS);
  }

  async ReviewOrder() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(JudgeEvents.REVIEW_ORDER);
    
    const {reviewOrderPage} = this.judgeEventsFactory;
    await reviewOrderPage.verifyContent(this.ccdCaseData);
    await reviewOrderPage.reviewOrder();
    await reviewOrderPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, JudgeEvents.REVIEW_ORDER);
  }

  async ApproveDirectionsOrder() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(JudgeEvents.APPROVE_DIRECTIONS_ORDER);
    
    const {approveDirectionsOrderPage} = this.judgeEventsFactory;
    await approveDirectionsOrderPage.verifyContent(this.ccdCaseData);
    await approveDirectionsOrderPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, JudgeEvents.APPROVE_DIRECTIONS_ORDER);
  }

}