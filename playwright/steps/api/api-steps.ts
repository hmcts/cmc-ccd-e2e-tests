import BaseSteps from '../../base/base-steps';
import RequestsFactory from '../../requests/requests-factory';
import config from '../../config/config';
import { claimants, judge } from '../../config/users';
import { AllMethodsStep } from '../../decorators/test-steps';
import TestData from '../../types/test-data';
import User from '../../types/user';

@AllMethodsStep
export default class ApiSteps extends BaseSteps{
  private requestsFactory: RequestsFactory;
  private isSetupTest: boolean;

  constructor(requestsFactory: RequestsFactory, testData: TestData, isSetupTest: boolean) {
    super(testData);
    this.requestsFactory = requestsFactory;
    this.isSetupTest = isSetupTest;
  }

  private async getAccessToken(user: User) {
    if(config.skipAuthSetup || this.isSetupTest) {
      const {idamRequests} = this.requestsFactory;
      return await idamRequests.getAccessToken(user);
    } else {
      const {requestsCookiesManager} = this.requestsFactory;
      return await requestsCookiesManager.getAccessToken(user);
    }
  }

  async CreateCitizenUsers(users: User[]) {
    const {idamRequests} = this.requestsFactory;
    await idamRequests.createCitizenUsers(users);
  }

  async DeleteCitizenUsers(users: User[]) {
    const {idamRequests} = this.requestsFactory;
    await idamRequests.deleteUsers(users);
  }

  async FetchClaimStoreCaseData() {
    const accessToken = await this.getAccessToken(claimants[this.workerIndex]);
    const {claimsStoreRequests} = this.requestsFactory;
    this.setClaimStoreCaseData = await claimsStoreRequests.fetchClaimStoreCaseData(this.claimStoreCaseData.referenceNumber, accessToken);
  }

  async FetchClaimStoreCaseDataWithLetterId() {
    const accessToken = await this.getAccessToken(claimants[this.workerIndex]);
    const {claimsStoreRequests} = this.requestsFactory;
    this.setClaimStoreCaseData = await claimsStoreRequests.fetchClaimStoreCaseDataWithLetterId(this.claimStoreCaseData.referenceNumber, accessToken);
  }

  async FetchClaimSecurityPin() {
    const {idamRequests} = this.requestsFactory
    this.setClaimSecurityPin = await idamRequests.getPin(this.claimStoreCaseData.letterHolderId);
  }

  async FetchCCDCaseData() {
    const accessToken = await this.getAccessToken(judge);
    const {ccdRequests} = this.requestsFactory;
    this.setCcdCaseData = await ccdRequests.fetchCcdCaseData(this.claimStoreCaseData.id, judge.userId, accessToken);
  }
}