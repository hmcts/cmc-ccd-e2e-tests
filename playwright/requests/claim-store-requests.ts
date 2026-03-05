import BaseRequest from '../base/base-request';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import { TruthyParams } from '../decorators/truthy-params';
import RequestOptions from '../models/api/request-options';
import User from '../models/user';

const classKey = 'ClaimStoreRequests';
const CLAIM_STORE_RETRY_ATTEMPTS = 24;
const CLAIM_STORE_RETRY_INTERVAL_MS = 5000;
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
    const startedAt = Date.now();
    try {
      const caseData = await super.retryRequestJson(url, requestOptions, {
        remainingRetries: CLAIM_STORE_RETRY_ATTEMPTS,
        retryTimeInterval: CLAIM_STORE_RETRY_INTERVAL_MS,
      });
      console.log('Claim store case data fetched successfully');
      return caseData;
    } catch (error: any) {
      const elapsedSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);
      const reason = error?.message?.split('\n')[0] ?? String(error);
      throw new Error(
        `Claim Store lookup failed for claimRef '${claimRef}' after ${elapsedSeconds}s ` +
          `(${CLAIM_STORE_RETRY_ATTEMPTS} attempts): ${reason}`,
      );
    }
  }

  @TruthyParams(classKey, 'claimRef')
  async fetchClaimStoreCaseDataWithLetterId(claimRef: string, { accessToken }: User) {
    console.log('Fetching claim store case data with letter id...');
    const url = `${urls.claimStore}/claims/${claimRef}`;
    const requestOptions: RequestOptions = {
      headers: this.getRequestHeaders(accessToken),
      method: 'GET',
    };
    const startedAt = Date.now();
    try {
      const caseData = await super.retryRequestJson(url, requestOptions, {
        remainingRetries: CLAIM_STORE_RETRY_ATTEMPTS,
        retryTimeInterval: CLAIM_STORE_RETRY_INTERVAL_MS,
        verifyResponse: async (responseJson) => {
          await super.expectResponseJsonToHaveProperty('letterHolderId', responseJson);
        },
      });
      console.log('Claim store case data with letter id fetched successfully');
      return caseData;
    } catch (error: any) {
      const elapsedSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);
      const reason = error?.message?.split('\n')[0] ?? String(error);
      throw new Error(
        `Claim Store lookup (letterId) failed for claimRef '${claimRef}' after ${elapsedSeconds}s ` +
          `(${CLAIM_STORE_RETRY_ATTEMPTS} attempts): ${reason}`,
      );
    }
  }
}
