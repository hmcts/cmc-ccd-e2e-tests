import { TOTP } from 'totp-generator';
import BaseRequest from '../base/base-request';
import config from '../config/config';
import urls from '../config/urls';
import { Step } from '../decorators/test-steps';
import RequestOptions from '../models/api/request-options';
import { TruthyParams } from '../decorators/truthy-params';
import CaseEvents from '../enums/events/case-events';
import CCDCaseData from '../models/case-data/ccd-case-data';
import User from '../models/user';
import ServiceAuthProviderRequests from './service-auth-provider-requests';

const classKey = 'CcdRequests';
export default class CcdRequests extends ServiceAuthProviderRequests(BaseRequest) {
  private getCcdDataStoreBaseUrl({ userId, role }: User) {
    return `${urls.ccdDataStore}/${role}s/${userId}/jurisdictions/${config.definition.jurisdiction}/case-types/${config.definition.caseType}`;
  }

  private async getRequestHeaders({ accessToken }: User) {
    const s2sToken = await this.fetchS2sToken();
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ServiceAuthorization: s2sToken,
    };
  }

  @Step(classKey)
  @TruthyParams(classKey, 'caseId')
  async fetchCcdCaseData(caseId: number, user: User) {
    console.log('Fetching CCD case data...');
    const url = `${this.getCcdDataStoreBaseUrl(user)}/cases/${caseId}`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
    };
    const caseData = (await super.retryRequestJson(url, requestOptions)).case_data;
    console.log('CCD case data fetched successfully');
    return caseData;
  }

  @Step(classKey)
  private async startEvent(event: CaseEvents, user: User, caseId?: number) {
    console.log(
      `Starting event: ${event}` + (typeof caseId !== 'undefined' ? ` caseId: ${caseId}` : ''),
    );
    let url = this.getCcdDataStoreBaseUrl(user);
    if (caseId) {
      url += `/cases/${caseId}`;
    }
    url += `/event-triggers/${event}/token`;

    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
    };
    const responseJson = await super.retryRequestJson(url, requestOptions);
    console.log(`Event: ${event} started successfully`);
    return responseJson.token;
  }

  @Step(classKey)
  private async submit(
    event: CaseEvents,
    caseData: CCDCaseData,
    user: User,
    ccdEventToken: string,
  ) {
    console.log(
      `Submitting event: ${event}` +
        (typeof caseData.id !== 'undefined' ? ` caseId: ${caseData.id}` : ''),
    );
    let url = `${this.getCcdDataStoreBaseUrl(user)}/cases`;
    if (caseData.id) {
      url += `/${caseData.id}/events`;
    }

    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
      body: {
        data: caseData,
        event: { id: event },
        event_data: caseData,
        event_token: ccdEventToken,
      },
      method: 'POST',
    };
    const responseJson = await (
      await super.retryRequest(url, requestOptions, { expectedStatus: 201 })
    ).json();
    console.log(`Event: ${event} submitted successfully`);
    return responseJson;
  }

  async updateCaseEvent(event: CaseEvents, caseData: CCDCaseData, user: User) {
    const ccdEventToken = await this.startEvent(event, user, caseData.id);
    return await this.submit(event, caseData, user, ccdEventToken);
  }
}
