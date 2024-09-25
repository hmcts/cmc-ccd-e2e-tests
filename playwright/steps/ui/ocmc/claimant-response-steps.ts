import { AllMethodsStep } from '../../../decorators/test-steps';
import BreathingSpaceFactory from '../../../pages/ocmc/breathing-space/breathing-space-factory';
import OcmcDashboardFactory from '../../../pages/ocmc/dashboard/ocmc-dashboard-factory';
import ResponseFactory from '../../../pages/ocmc/response/response/response-factory';
import TestData from '../../../types/test-data';
import ResponseSteps from './response-steps';

@AllMethodsStep()
export default class ClaimantResponseSteps extends ResponseSteps {
  private ocmcDashboardFactory: OcmcDashboardFactory;
  private breathingSpaceFactory: BreathingSpaceFactory;

  constructor(
    breathingSpaceFactory: BreathingSpaceFactory,
    ocmcDashboardFactory: OcmcDashboardFactory,
    responseFactory: ResponseFactory,
    testData: TestData,
  ) {
    super(responseFactory, testData);
    this.breathingSpaceFactory = breathingSpaceFactory;
    this.ocmcDashboardFactory = ocmcDashboardFactory;
  }

  async EnterBreathingSpace() {
    const { ocmcClaimantClaimDetailsPage } = this.ocmcDashboardFactory;
    await ocmcClaimantClaimDetailsPage.breathingSpace();

    const { referenceNumberPage } = this.breathingSpaceFactory;
    await referenceNumberPage.verifyContent();
    await referenceNumberPage.enterReferenceNumber();

    const { respiteStartPage } = this.breathingSpaceFactory;
    await respiteStartPage.verifyContent();
    await respiteStartPage.enterRespiteStartDate();

    const { respiteTypePage } = this.breathingSpaceFactory;
    await respiteTypePage.verifyContent();
    await respiteTypePage.selectStandardBreathingSpace();

    const { respiteEndPage } = this.breathingSpaceFactory;
    await respiteEndPage.verifyContent();
    await respiteEndPage.enterRespiteEndDate();

    const { checkAnswersPage } = this.breathingSpaceFactory;
    await checkAnswersPage.verifyContent();
    await checkAnswersPage.submit();
  }
}
