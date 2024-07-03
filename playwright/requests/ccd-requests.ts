import { TOTP } from 'totp-generator';
import BaseRequest from '../base/base-requests';
import config from '../config/config';
import urls from '../config/urls';
import { Step } from '../decorators/test-steps';
import RequestOptions from '../types/request-options';
import { TruthyParams } from '../decorators/truthy-params';
import CaseEvents from '../enums/events/case-events';
import CCDCaseData from '../types/case-data/ccd-case-data';
import User from '../types/user';

export default class CcdRequests extends BaseRequest {

  private static s2sToken: string;

  private getCcdDataStoreBaseUrl({userId, role}: User) {
    return `${urls.ccdDataStore}/${role}s/${userId}/jurisdictions/${config.definition.jurisdiction}/case-types/${config.definition.caseType}`;
  }

  private async getRequestHeaders({accessToken}: User) {
    const s2sToken = await this.fetchS2sToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'ServiceAuthorization': s2sToken,
    };
  }

  @Step
  private async fetchS2sToken() {
    if(!CcdRequests.s2sToken) {
      console.log('Fetching s2s token...');
      const requestOptions: RequestOptions = {
        url: `${urls.authProviderApi}/lease`,
        method: 'POST',
        body: {
          microservice: config.s2s.microservice,
          oneTimePassword: TOTP.generate(config.s2s.secret).otp,
        },
      };
      const response = await super.retriedRequest(requestOptions);
      console.log('s2s token fetched successfully');
      CcdRequests.s2sToken = await response.text();
    }
    return CcdRequests.s2sToken;
  }

  @Step
  @TruthyParams()
  async fetchCcdCaseData(caseId: number, user: User) {
    console.log('Fetching CCD case data...');
    const requestOptions: RequestOptions = {
      url: `${this.getCcdDataStoreBaseUrl(user)}/cases/${caseId}`,
      headers: await this.getRequestHeaders(user),
    };
    const caseData = (await (await super.retriedRequest(requestOptions)).json()).case_data;
    console.log('CCD case data fetched successfully');
    return caseData;
  }

  @Step
  private async startEvent(
    event: CaseEvents, 
    user: User,  
    caseId?: number,
  ) {
    console.log(`Starting event: ${event}` + (caseId !== undefined ? ` caseId: ${caseId}` : ''));
    let url = this.getCcdDataStoreBaseUrl(user);
    if (caseId) {
      url += `/cases/${caseId}`;
    }
    url += `/event-triggers/${event}/token`;
    
    const requestOptions: RequestOptions = {
      url,
      headers: await this.getRequestHeaders(user),
    };
    const response =  await (await super.retriedRequest(requestOptions)).json();
    console.log(`Event: ${event} started successfully`);
    return response.token;
  }

  @Step
  private async submitEvent(
    event: CaseEvents, 
    caseData: CCDCaseData, 
    user: User, 
    ccdEventToken: string,
  ) {
    console.log(`Submitting event: ${event} caseId: ${caseData.id}`);
    let url = `${this.getCcdDataStoreBaseUrl(user)}/cases`;
    if (caseData.id) {
      url += `/${caseData.id}/events`;
    }

    const requestOptions: RequestOptions = {
      url,
      headers: await this.getRequestHeaders(user),
      body: {
        data: caseData,
        event: {id: event},
        event_data: caseData,
        event_token: ccdEventToken,
      },
      method: 'POST',
    };
    const responseJson = await (await super.retriedRequest(requestOptions, 201)).json();
    console.log(`Event: ${event} submitted successfully`);
    return responseJson;
  }

  @Step
  async updateCaseEvent(
    event: CaseEvents,
    caseData: CCDCaseData,  
    user: User,
  ) {
    const ccdEvent = await this.startEvent(event, user, caseData.id);
    return await this.submitEvent(event, caseData, user, ccdEvent);
  }
}