import BaseRequest from '../base/base-requests';
import urls from '../config/urls';
import { AllMethodsStep, Step } from '../decorators/test-steps';
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
    const requestOptions: RequestOptions = {
      url: `${urls.claimStore}/claims/${claimRef}`,
      headers: this.getRequestHeaders(accessToken),
      method: 'GET',
    };
    const response = await super.retriedRequest(requestOptions);
    return await response.json();
  }
}