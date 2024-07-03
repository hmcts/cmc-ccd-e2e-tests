import { AllMethodsStep } from '../../decorators/test-steps';
import User from '../../types/user';
import BaseApiSteps from '../../base/base-api-steps';
import config from '../../config/config';
import RequestsFactory from '../../requests/requests-factory';
import TestData from '../../types/test-data';
import UserRole from '../../enums/user-role';

@AllMethodsStep
export default class ApiUsersSteps extends BaseApiSteps {
  private isSetupTest: boolean;

  constructor(requestsFactory: RequestsFactory, isSetupTest: boolean, testData: TestData) {
    super(requestsFactory, isSetupTest, testData);
    this.isSetupTest = isSetupTest;
  }

  async CreateCitizenUsers(users: User[]) {
    const {idamRequests} = super.requestsFactory;
    await idamRequests.createCitizenUsers(users);
  }

  async DeleteCitizenUsers(users: User[]) {
    const {idamRequests} = super.requestsFactory;
    await idamRequests.deleteUsers(users);
  }
    
  async SetupAccessTokens(users: User[]) {
    for(const user of users) {
      console.log(`Setting up access token: ${user.email}`);
      if(!user.accessToken) {
        let accessToken: string;
        if(config.skipAuthSetup || this.isSetupTest) {
          const {idamRequests} = super.requestsFactory;
          accessToken = await idamRequests.getAccessToken(user);
        } else {
          const {requestsCookiesManager} = super.requestsFactory;
          accessToken = await requestsCookiesManager.getAccessToken(user);
        }
        user.accessToken = accessToken;
      }
    }
  }

  async SetupUserIds(users: User[]) {
    for(const user of users) {
      if(!user.userId) {
        let userId: string;
        if(config.skipAuthSetup || this.isSetupTest || user.role !== UserRole.CASEWORKER) {
          const {idamRequests} = super.requestsFactory;
          userId = await idamRequests.getUserId(user.accessToken);
        } else {
          const {requestsCookiesManager} = super.requestsFactory;
          userId = await requestsCookiesManager.getUserId(user);
        }
        user.userId = userId;
      }
      return user.userId;
    }
  }
    
}