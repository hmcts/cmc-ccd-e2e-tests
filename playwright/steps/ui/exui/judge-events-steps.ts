import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import JudgeEvents from '../../../enums/events/judge-events';
import ExuiDashboardFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-factory';
import JudgeEventsFactory from '../../../pages/exui/judge-events/judge-events-factory';
import TestData from '../../../types/test-data';

@AllMethodsStep()
export default class JudgeEventsSteps extends BaseSteps {
  private judgeEventsFactory: JudgeEventsFactory;
  private exuiDashboardFactory: ExuiDashboardFactory;

  constructor(
    judgeEventsFactory: JudgeEventsFactory,
    exuiDashboardFactory: ExuiDashboardFactory,
    testData: TestData,
  ) {
    super(testData);
    this.judgeEventsFactory = judgeEventsFactory;
    this.exuiDashboardFactory = exuiDashboardFactory;
  }

  async DrawDirectionsOrder() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(JudgeEvents.JUDGE_DRAW_DIRECTIONS_ORDER);

    const { judgeDrawDirectionsOrder1Page: drawDirectionsOrder1Page } = this.judgeEventsFactory;
    await drawDirectionsOrder1Page.verifyContent(this.ccdCaseData);
    await drawDirectionsOrder1Page.chooseSdo();
    await drawDirectionsOrder1Page.submit();

    const { judgeDrawDirectionsOrder2Page: drawDirectionsOrder2Page } = this.judgeEventsFactory;
    await drawDirectionsOrder2Page.verifyContent(this.ccdCaseData);
    await drawDirectionsOrder2Page.enterSdoDetails();
    await drawDirectionsOrder2Page.submit();

    const { judgeDrawDirectionsOrder3Page: drawDirectionsOrder3Page } = this.judgeEventsFactory;
    await drawDirectionsOrder3Page.verifyContent(this.ccdCaseData);
    await drawDirectionsOrder3Page.submit();

    const { judgeDrawDirectionsOrderSubmitPage: drawDirectionsOrderSubmitPage } =
      this.judgeEventsFactory;
    await drawDirectionsOrderSubmitPage.verifyContent(this.ccdCaseData);
    await drawDirectionsOrderSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(
      this.ccdCaseData.id,
      JudgeEvents.JUDGE_DRAW_DIRECTIONS_ORDER,
    );
  }

  async ProvideDirections() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(JudgeEvents.PROVIDE_DIRECTIONS);

    const { provideDirectionsSubmitPage } = this.judgeEventsFactory;
    await provideDirectionsSubmitPage.verifyContent(this.ccdCaseData);
    await provideDirectionsSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, JudgeEvents.PROVIDE_DIRECTIONS);
  }

  async ReviewOrder() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(JudgeEvents.REVIEW_ORDER);

    const { reviewOrderPage } = this.judgeEventsFactory;
    await reviewOrderPage.verifyContent(this.ccdCaseData);
    await reviewOrderPage.reviewOrder();
    await reviewOrderPage.submit();

    const { reviewOrderSubmitPage } = this.judgeEventsFactory;
    await reviewOrderSubmitPage.verifyContent(this.ccdCaseData);
    await reviewOrderSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, JudgeEvents.REVIEW_ORDER);
  }

  async ApproveDirectionsOrder() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(JudgeEvents.APPROVE_DIRECTIONS_ORDER);

    const { approveDirectionsOrderPage } = this.judgeEventsFactory;
    await approveDirectionsOrderPage.verifyContent(this.ccdCaseData);
    await approveDirectionsOrderPage.submit();

    const { approveDirectionsOrdeSubmitPage } = this.judgeEventsFactory;
    await approveDirectionsOrdeSubmitPage.verifyContent(this.ccdCaseData);
    await approveDirectionsOrdeSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(
      this.ccdCaseData.id,
      JudgeEvents.APPROVE_DIRECTIONS_ORDER,
    );
  }
}
