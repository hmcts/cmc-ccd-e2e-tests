import { AllMethodsStep } from '../../decorators/test-steps';
import RequestsFactory from '../../requests/requests-factory';
import TestData from '../../types/test-data';
import { claimants, judge } from "../../config/users";
import BaseApiSteps from '../../base/base-api-steps';

@AllMethodsStep()
export default class ApiCaseDataSteps extends BaseApiSteps {
  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(requestsFactory, testData);
  }

  async FetchClaimStoreCaseData() {
    const { claimsStoreRequests } = this.requestsFactory;
    this.setClaimStoreCaseData = await claimsStoreRequests.fetchClaimStoreCaseData(
      this.claimStoreCaseData.referenceNumber,
      claimants[this.workerIndex],
    );
  }

  async FetchClaimStoreCaseDataWithLetterId() {
    const { claimsStoreRequests } = super.requestsFactory;
    this.setClaimStoreCaseData = await claimsStoreRequests.fetchClaimStoreCaseDataWithLetterId(
      this.claimStoreCaseData.referenceNumber,
      claimants[this.workerIndex],
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
