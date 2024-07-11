import { AllMethodsStep } from '../../../decorators/test-steps';
import BreathingSpaceFactory from '../../../pages/citizen/breathing-space/breathing-space-factory';
import CitizenDashboardFactory from '../../../pages/citizen/citizen-dashboard/citizen-dashboard-factory';
import ResponseFactory from '../../../pages/citizen/response/response/response-factory';
import TestData from '../../../types/test-data';
import ResponseSteps from './response-steps';

@AllMethodsStep
export default class ClaimantResponseSteps extends ResponseSteps {
  private citizenDashboardFactory: CitizenDashboardFactory;
  private breathingSpaceFactory: BreathingSpaceFactory;

  constructor(
    breathingSpaceFactory: BreathingSpaceFactory, 
    citizenDashboardFactory: CitizenDashboardFactory, 
    responseFactory: ResponseFactory, 
    testData: TestData,
  ) {
    super(responseFactory, testData);
    this.breathingSpaceFactory = breathingSpaceFactory;
    this.citizenDashboardFactory = citizenDashboardFactory
  }

  async EnterBreathingSpace() {
    const {claimantClaimDetailsPage} = this.citizenDashboardFactory;
    await claimantClaimDetailsPage.breathingSpace();

    const {referenceNumberPage} = this.breathingSpaceFactory;
    await referenceNumberPage.verifyContent();
    await referenceNumberPage.enterReferenceNumber();

    const {respiteStartPage} = this.breathingSpaceFactory;
    await respiteStartPage.verifyContent();
    await respiteStartPage.enterRespiteStartDate();

    const {respiteTypePage} = this.breathingSpaceFactory;
    await respiteTypePage.verifyContent();
    await respiteTypePage.selectStandardBreathingSpace();

    const {respiteEndPage} = this.breathingSpaceFactory;
    await respiteEndPage.verifyContent();
    await respiteEndPage.enterRespiteEndDate();

    const {checkAnswersPage} = this.breathingSpaceFactory;
    await checkAnswersPage.verifyContent();
    await checkAnswersPage.submit();
  }

}