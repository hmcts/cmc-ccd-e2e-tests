import { AllMethodsStep } from '../../decorators/test-steps';
import RequestsFactory from '../../requests/requests-factory';
import TestData from '../../models/test-data';
import { judge } from '../../config/users';
import BaseApiSteps from '../../base/base-api-steps';

@AllMethodsStep()
export default class ApiCaseDataSteps extends BaseApiSteps {
  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(requestsFactory, testData);
  }

  async delay(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async FetchClaimStoreCaseData() {
    console.log('Claim store case data fetched successfully');
  }

  async FetchClaimStoreCaseDataWithLetterId() {
    const { ccdRequests } = this.requestsFactory;
    this.claimStoreCaseData.letterHolderId = await ccdRequests.fetchLetterHolderId(
      this.claimStoreCaseData.id,
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
