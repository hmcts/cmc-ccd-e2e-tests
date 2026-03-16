import BaseRequest from '../base/base-request';
import config from '../config/config';
import urls from '../config/urls';
import { Step } from '../decorators/test-steps';
import RequestOptions from '../models/api/request-options';
import { TruthyParams } from '../decorators/truthy-params';
import CaseEvents from '../enums/events/case-events';
import CCDCaseData from '../models/case-data/ccd-case-data';
import ClaimStoreCaseData from '../models/case-data/claim-store-case-data';
import User from '../models/user';
import ServiceAuthProviderRequests from './service-auth-provider-requests';
import { expect } from '../playwright-fixtures';

const classKey = 'CcdRequests';
const CCD_SEARCH_RETRY_ATTEMPTS = 24;
const CCD_SEARCH_RETRY_INTERVAL_MS = 5000;

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

  @Step(classKey)
  @TruthyParams(classKey, 'claimRef')
  async searchCaseByReference(claimRef: string, user: User): Promise<ClaimStoreCaseData> {
    console.log(`Searching CCD for case by reference: ${claimRef}...`);
    const url = `${urls.ccdDataStore}/searchCases?ctid=${config.definition.caseType}`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
      method: 'POST',
      body: {
        query: {
          match: { 'data.previousServiceCaseReference': claimRef },
        },
      },
    };
    const startedAt = Date.now();
    try {
      const response = await super.retryRequestJson(url, requestOptions, {
        remainingRetries: CCD_SEARCH_RETRY_ATTEMPTS,
        retryTimeInterval: CCD_SEARCH_RETRY_INTERVAL_MS,
        verifyResponse: async (responseJson) => {
          expect(
            responseJson.cases?.length,
            `Expected CCD search to return results for claimRef '${claimRef}'`,
          ).toBeGreaterThan(0);
        },
      });
      const ccdCase = response.cases[0];
      const letterHolderId = ccdCase.case_data?.respondents?.[0]?.value?.letterHolderId;
      console.log(`CCD case found with id: ${ccdCase.id}`);
      return { id: ccdCase.id, referenceNumber: claimRef, letterHolderId };
    } catch (error: any) {
      const elapsedSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);
      const reason = error?.message?.split('\n')[0] ?? String(error);
      throw new Error(
        `CCD search failed for claimRef '${claimRef}' after ${elapsedSeconds}s ` +
          `(${CCD_SEARCH_RETRY_ATTEMPTS} attempts): ${reason}`,
      );
    }
  }

  @Step(classKey)
  @TruthyParams(classKey, 'claimRef')
  async searchCaseByReferenceWithLetterId(
    claimRef: string,
    user: User,
  ): Promise<ClaimStoreCaseData> {
    console.log(`Searching CCD for case with letterHolderId by reference: ${claimRef}...`);
    const url = `${urls.ccdDataStore}/searchCases?ctid=${config.definition.caseType}`;
    const requestOptions: RequestOptions = {
      headers: await this.getRequestHeaders(user),
      method: 'POST',
      body: {
        query: {
          match: { 'data.previousServiceCaseReference': claimRef },
        },
      },
    };
    const startedAt = Date.now();
    try {
      const response = await super.retryRequestJson(url, requestOptions, {
        remainingRetries: CCD_SEARCH_RETRY_ATTEMPTS,
        retryTimeInterval: CCD_SEARCH_RETRY_INTERVAL_MS,
        verifyResponse: async (responseJson) => {
          expect(
            responseJson.cases?.length,
            `Expected CCD search to return results for claimRef '${claimRef}'`,
          ).toBeGreaterThan(0);
          const letterHolderId =
            responseJson.cases[0].case_data?.respondents?.[0]?.value?.letterHolderId;
          expect(
            letterHolderId,
            `Expected letterHolderId to be present for claimRef '${claimRef}'`,
          ).toBeTruthy();
        },
      });
      const ccdCase = response.cases[0];
      const letterHolderId = ccdCase.case_data.respondents[0].value.letterHolderId;
      console.log(`CCD case found with id: ${ccdCase.id}, letterHolderId: ${letterHolderId}`);
      return { id: ccdCase.id, referenceNumber: claimRef, letterHolderId };
    } catch (error: any) {
      const elapsedSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);
      const reason = error?.message?.split('\n')[0] ?? String(error);
      throw new Error(
        `CCD search (with letterHolderId) failed for claimRef '${claimRef}' after ${elapsedSeconds}s ` +
          `(${CCD_SEARCH_RETRY_ATTEMPTS} attempts): ${reason}`,
      );
    }
  }

  async updateCaseEvent(event: CaseEvents, caseData: CCDCaseData, user: User) {
    const ccdEventToken = await this.startEvent(event, user, caseData.id);
    return await this.submit(event, caseData, user, ccdEventToken);
  }
}
