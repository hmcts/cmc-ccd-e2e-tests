import BaseRequest from '../base/base-requests';
import urls from '../config/urls';
import { Step } from '../decorators/test-steps';
import { TruthyParams } from '../decorators/truthy-params';
import RequestOptions from '../types/request-options';

export default class ClaimStoreRequests extends BaseRequest {
  private getRequestHeaders(accessToken: string) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    };
  }

  @Step
  @TruthyParams()
  async fetchClaimStoreCaseData(claimRef?: string, accessToken?: string) {
    console.log('Fetching claim store case data');
    const requestOptions: RequestOptions = {
      url: `${urls.claimStore}/claims/${claimRef}`,
      headers: this.getRequestHeaders(accessToken),
      method: 'GET',
    };
    const response = await super.retriedRequest(requestOptions);
    const caseData = await response.json();
    console.log('Claim store case data fetched successfully');
    return caseData;
  }

  @Step
  async fetchClaimStoreCaseDataWithLetterId(claimRef?: string, accessToken?: string) {
    console.log('Fetching claim store case data with letter id');
    const requestOptions: RequestOptions = {
      url: `${urls.claimStore}/claims/${claimRef}`,
      headers: this.getRequestHeaders(accessToken),
      method: 'GET',
    };
    const response = await super.retriedRequest(requestOptions, 200, 5, ['letterHolderId'] );
    const caseData = await response.json();
    console.log('Claim store case data with letter id fetched successfully');
    return caseData;
  }
}