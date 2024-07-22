import BaseRequest from '../base/base-requests';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import { TruthyParams } from '../decorators/truthy-params';
import RequestOptions from '../types/request-options';
import User from '../types/user';

const classKey = 'ClaimStoreRequests';
@AllMethodsStep({methodNamesToIgnore: ['getRequestHeaders']})
export default class ClaimStoreRequests extends BaseRequest {
  private getRequestHeaders(accessToken: string) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    };
  }

  @TruthyParams(classKey, 'claimRef')
  async fetchClaimStoreCaseData({accessToken}: User, claimRef?: string) {
    console.log('Fetching claim store case data...');
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

  async fetchClaimStoreCaseDataWithLetterId({accessToken}: User, claimRef?: string) {
    console.log('Fetching claim store case data with letter id...');
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