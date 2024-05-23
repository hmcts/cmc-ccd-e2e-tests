import { APIRequestContext } from 'playwright-core';
import BaseSteps from '../../base/base-steps';
import CaseData from '../../types/case-data';
import RequestsFactory from '../../requests/requests-factory';
import { config } from '../../config/config';
import { claimant } from '../../config/users';
import { AllMethodsStep } from '../../decorators/test-steps';
import TestData from '../../types/test-data';

@AllMethodsStep
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
      accessToken = await idamRequests.getAccessToken(claimant);
    } else {
      const {requestsCookiesManager} = this.requestsFactory;
      accessToken = await requestsCookiesManager.getAccessToken(claimant);
    }
    const {claimsStoreRequests} = this.requestsFactory;
    this.setCaseData = await claimsStoreRequests.getCaseDataByReference(this.caseData.referenceNumber, accessToken);
  }
}