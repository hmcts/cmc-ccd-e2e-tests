import BaseRequest from '../base/base-requests';
import urls from '../config/urls';
import { Step } from '../decorators/test-steps';
import RequestOptions from '../types/request-options';

export default class ClaimStoreRequests extends BaseRequest {
  private getRequestHeaders(accessToken: string) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    };
  }

  @Step
  async getCaseDataByReference(claimRef?: string, accessToken?: string) {
    if(!claimRef || !accessToken) {
      throw new Error('Claim reference and access token must be non-empty strings');
    }
    const requestOptions: RequestOptions = {
      url: `${urls.claimStore}/claims/${claimRef}`,
      headers: this.getRequestHeaders(accessToken),
      method: 'GET',
    };
    const response = await super.retriedRequest(requestOptions);
    return await response.json();
  }
}