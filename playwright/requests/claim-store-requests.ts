import { APIResponse } from 'playwright-core';
import BaseRequest from '../base/base-request';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import { TruthyParams } from '../decorators/truthy-params';
import RequestOptions from '../models/api/request-options';
import User from '../models/user';
import { Serializable } from 'playwright-core/types/structs';

const classKey = 'ClaimStoreRequests';
@AllMethodsStep({ methodNamesToIgnore: ['getRequestHeaders'] })
export default class ClaimStoreRequests extends BaseRequest {
  private getRequestHeaders(accessToken: string) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
  }

  @TruthyParams(classKey, 'claimRef')
  async fetchClaimStoreCaseData(claimRef: string, { accessToken }: User) {
    console.log('Fetching claim store case data...');
    const url = `${urls.claimStore}/claims/${claimRef}`;
    const requestOptions: RequestOptions = {
      headers: this.getRequestHeaders(accessToken),
      method: 'GET',
    };
    const caseData = await super.retryRequestJson(url, requestOptions);
    console.log('Claim store case data fetched successfully');
    return caseData;
  }

  @TruthyParams(classKey, 'claimRef')
  async fetchClaimStoreCaseDataWithLetterId(claimRef: string, { accessToken }: User) {
    console.log('Fetching claim store case data with letter id...');
    const url = `${urls.claimStore}/claims/${claimRef}`;
    const requestOptions: RequestOptions = {
      headers: this.getRequestHeaders(accessToken),
      method: 'GET',
    };
    const caseData = await super.retryRequestJson(url, requestOptions, {
      verifyResponse: async (responseJson) => {
        await super.expectResponseJsonToHaveProperty('letterHolderId', responseJson);
      },
    });
    console.log('Claim store case data with letter id fetched successfully');
    return caseData;
  }
}
