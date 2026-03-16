import { AllMethodsStep } from '../../decorators/test-steps';
import RequestsFactory from '../../requests/requests-factory';
import TestData from '../../models/test-data';
import { judge } from '../../config/users';
import BaseApiSteps from '../../base/base-api-steps';

@AllMethodsStep()
export default class ApiCaseDataSteps extends BaseApiSteps {
  private static readonly CLAIM_STORE_INITIAL_WAIT_MS = 5000;

  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(requestsFactory, testData);
  }

  private async delay(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async FetchClaimStoreCaseData() {
    await this.delay(ApiCaseDataSteps.CLAIM_STORE_INITIAL_WAIT_MS);
    const { ccdRequests } = this.requestsFactory;
    this.setClaimStoreCaseData = await ccdRequests.searchCaseByReference(
      this.claimStoreCaseData.referenceNumber,
      judge,
    );
  }

  async FetchClaimStoreCaseDataWithLetterId() {
    await this.delay(ApiCaseDataSteps.CLAIM_STORE_INITIAL_WAIT_MS);
    const { ccdRequests } = this.requestsFactory;
    this.setClaimStoreCaseData = await ccdRequests.searchCaseByReferenceWithLetterId(
      this.claimStoreCaseData.referenceNumber,
      judge,
    );
  }

  async FetchClaimSecurityPin() {
    const { idamRequests } = this.requestsFactory;
    this.setClaimSecurityPin = await idamRequests.getSecurityPin(
      this.claimStoreCaseData.letterHolderId,
    );
  }

  async FetchCCDCaseData() {
    const { ccdRequests } = this.requestsFactory;
    this.setCcdCaseData = await ccdRequests.fetchCcdCaseData(this.claimStoreCaseData.id, judge);
  }
}
