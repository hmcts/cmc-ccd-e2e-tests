import { APIRequestContext, Page } from 'playwright-core';
import BaseSteps from '../../../base/base-steps';
import TestData from '../../../types/TestData';
import urls from '../../../config/urls';

export default class CitizenApiSteps extends BaseSteps{
  private request: APIRequestContext;

  constructor(request: APIRequestContext, testData: TestData) {
    super(testData);
    this.request = request;
  }

  async RetrieveByReferenceNumber() {
    const cookies = (await this.request.storageState()).cookies;
    const accessToken = cookies.find(cookie => cookie.name === 'SESSION_ID').value;
    const response = await this.request.get(`${urls.claimStore}/claims/${this.testData.claimRef}`, {headers: {
      'Content-Type':'application/json',
      'Authorization':`Bearer ${accessToken}`,
    }});
    this.testData.caseData = await response.json()
    console.log(this.testData.caseData);
  }
}