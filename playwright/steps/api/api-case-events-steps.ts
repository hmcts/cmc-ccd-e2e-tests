import { AllMethodsStep } from '../../decorators/test-steps';
import RequestsFactory from '../../requests/requests-factory';
import TestData from '../../types/test-data';
import CaseDataFactory from '../../fixtures/case-data/case-data-factory';
import CaseEvents from '../../enums/events/case-events';
import { uuid } from 'uuidv4';
import { claimants } from '../../config/users';
import BaseApiSteps from '../../base/base-api-steps';
import CaseDataHelper from '../../helpers/case-data-helper';
import CCDCaseData from '../../types/case-data/ccd-case-data';

@AllMethodsStep()
export default class ApiCaseEventSteps extends BaseApiSteps {
  private caseDataFactory: CaseDataFactory;

  constructor(requestsFactory: RequestsFactory, caseDataFactory: CaseDataFactory, isSetupTest: boolean, testData: TestData) {
    super(requestsFactory, isSetupTest, testData);
    this.caseDataFactory = caseDataFactory;
  }

  private async createOpenCase(testCaseData: CCDCaseData) {
    const claimant = claimants[this.workerIndex];

    const {initiateClaimPaymentCitizen} = this.caseDataFactory;
    initiateClaimPaymentCitizen.externalId = uuid();

    const {ccdRequests} = this.requestsFactory;
    const caseData = await ccdRequests.updateCaseEvent(CaseEvents.INITIATE_PAYMENT_CASE, initiateClaimPaymentCitizen, claimant);

    testCaseData.id = caseData.id;

    testCaseData.previousServiceCaseReference = CaseDataHelper.getNextClaimNumber();

    await ccdRequests.updateCaseEvent(CaseEvents.STAY_CLAIM, testCaseData, claimant);
    
    await ccdRequests.updateCaseEvent(CaseEvents.LIFT_STAY, testCaseData, claimant);
    this.setCcdCaseData = testCaseData;
  }

  async CreateDisputeAllBothRejectMediationClaim() {
    const {jddoDisputeAllBothRejectMediation} = this.caseDataFactory;
    await this.createOpenCase(jddoDisputeAllBothRejectMediation);
  }

  async CreateReferMediationFullDefenceDisputeAllClaim() {
    const {referMediationFullDefenceDisputeAll} = this.caseDataFactory;
    await this.createOpenCase(referMediationFullDefenceDisputeAll);
  }

  async CreateGenerateOrderDisputeAllRejectMediationClaim() {
    const {generateOrderDisputeAllBothRejectMediation} = this.caseDataFactory;
    await this.createOpenCase(generateOrderDisputeAllBothRejectMediation);
  }

  async ClaimantRejects() {
    const {ccdRequests} = this.requestsFactory;
    await ccdRequests.updateCaseEvent(CaseEvents.CLAIMANT_REJECTS, this.ccdCaseData, claimants[this.workerIndex]);
  }

  async AssignForJudgeDirections() {
    const {ccdRequests} = this.requestsFactory;
    await ccdRequests.updateCaseEvent(CaseEvents.ASSIGN_FOR_JUDGE_DIRECTIONS, this.ccdCaseData, claimants[this.workerIndex]);
  }

  async AssignForDirections() {
    const {ccdRequests} = this.requestsFactory;
    await ccdRequests.updateCaseEvent(CaseEvents.ASSIGN_FOR_DIRECTIONS, this.ccdCaseData, claimants[this.workerIndex]);
  }

}