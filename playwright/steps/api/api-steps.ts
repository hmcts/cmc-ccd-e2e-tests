import BaseSteps from '../../base/base-steps';
import RequestsFactory from '../../requests/requests-factory';
import config from '../../config/config';
import { caseworker, claimant, judge } from '../../config/users';
import { AllMethodsStep } from '../../decorators/test-steps';
import TestData from '../../types/test-data';
import User from '../../types/user';

@AllMethodsStep
export default class ApiSteps extends BaseSteps{
  private requestsFactory: RequestsFactory;

  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(testData);
    this.requestsFactory = requestsFactory;
  }

  private async getAccessToken(user: User) {
    if(config.skipAuthSetup) {
      const {idamRequests} = this.requestsFactory;
      return await idamRequests.getAccessToken(user);
    } else {
      const {requestsCookiesManager} = this.requestsFactory;
      return await requestsCookiesManager.getAccessToken(user);
    }
  }

  async FetchClaimStoreCaseData() {
    const accessToken = await this.getAccessToken(claimant);
    const {claimsStoreRequests} = this.requestsFactory;
    this.setClaimStoreCaseData = await claimsStoreRequests.fetchClaimStoreCaseData(this.claimStoreCaseData.referenceNumber, accessToken);
  }

  async FetchCCDCaseData() {
    const accessToken = await this.getAccessToken(judge);
    const {ccdRequests} = this.requestsFactory;
    this.setCcdCaseData = await ccdRequests.fetchCcdCaseData(this.claimStoreCaseData.id, judge.userId, accessToken);
  }
}