import { APIRequestContext } from 'playwright-core';
import BaseSteps from '../../base/base-steps';
import TestData from '../../types/TestData';
import RequestsFactory from '../../requests/requests-factory';
import { config } from '../../config/config';
import { claimant } from '../../config/users';

export default class ApiSteps extends BaseSteps{
  private requestsFactory: RequestsFactory;

  constructor(request: APIRequestContext, testData: TestData) {
    super(testData);
    this.requestsFactory = new RequestsFactory(request);
  }

  async SaveCaseDataByClaimRef() {
    let accessToken: string;
    if(config.skipAuthSetup) {
      const {idamRequests} = this.requestsFactory;
      accessToken = await idamRequests.accessToken(claimant);
    } else {
      const {requestsCookiesManager} = this.requestsFactory;
      accessToken = requestsCookiesManager.getCitizenAccessToken(claimant);
    }
    const {claimsStoreRequests} = this.requestsFactory;
    this.testData.caseData = claimsStoreRequests.getCaseDataByReference(this.testData.claimRef, accessToken);
  }
}