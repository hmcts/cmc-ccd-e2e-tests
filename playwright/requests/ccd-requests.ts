import { TOTP } from 'totp-generator';
import BaseRequest from '../base/base-requests';
import { config } from '../config/config';
import urls from '../config/urls';
import { Step } from '../decorators/test-steps';
import RequestOptions from '../types/request-options';
import { TruthyParams } from '../decorators/truthy-params';

export default class CcdRequests extends BaseRequest {
  private getCcdDataStoreBaseUrl(userId: string) {
    return `${urls.ccdDataStore}/caseworkers/${userId}/jurisdictions/${config.definition.jurisdiction}/case-types/${config.definition.caseType}`;
  }

  private getRequestHeaders(accessToken: string, s2sToken: string) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'ServiceAuthorization': s2sToken,
    };
  }

  @Step
  private async getS2sToken() {
    const requestOptions: RequestOptions = {
      url: `${urls.authProviderApi}/lease`,
      method: 'POST',
      body: {
        microservice: config.s2s.microservice,
        oneTimePassword: TOTP.generate(config.s2s.secret).otp,
      },
    };
    return (await super.retriedRequest(requestOptions)).text();
  }

  @Step
  @TruthyParams()
  async fetchCcdCaseData(caseId: number, userId: string, accessToken: string) {
    const s2sToken = await this.getS2sToken();
    const requestOptions: RequestOptions = {
      url: `${this.getCcdDataStoreBaseUrl(userId)}/cases/${caseId}`,
      headers: this.getRequestHeaders(accessToken, s2sToken),
    };
    return (await (await super.retriedRequest(requestOptions)).json()).case_data;
  }
}