import { AllMethodsStep, Step } from '../../decorators/test-steps';
import User from '../../types/user';
import BaseApiSteps from '../../base/base-api-steps';
import RequestsFactory from '../../requests/requests-factory';
import TestData from '../../types/test-data';
import UserStateHelper from '../../helpers/users-state-helper';
import FileError from '../../errors/file-error';

AllMethodsStep()
export default class ApiUsersSteps extends BaseApiSteps {
  private isSetupTest: boolean;

  constructor(requestsFactory: RequestsFactory, isSetupTest: boolean, testData: TestData) {
    super(requestsFactory, isSetupTest, testData);
    this.isSetupTest = isSetupTest;
  }

  async CreateCitizenUsers(users: User[]) {
    const {idamRequests} = super.requestsFactory;
    const userType = users[0].type;
    if(UserStateHelper.userStateExists(userType)) {
      throw new FileError(`Citizen users: ${userType.toUpperCase()} already exists`);
    }
    if(!users.every(user => user.type === users[0].type)) {
      throw new TypeError(`Users in ${users} must all have the same user type`);
    }
    users = await Promise.all(users.map(async (user) => {
      const idamUser = await idamRequests.createCitizenUser(user);
      const accessToken = await idamRequests.getAccessToken(user);
      return { userId: idamUser.id, accessToken: accessToken, ...user };
    }));
    UserStateHelper.addUsersToState(users);
  }

  async DeleteCitizenUsers(users: User[]) {
    const {idamRequests} = super.requestsFactory;
    await Promise.all(users.map(user => idamRequests.deleteUser(user)));
    UserStateHelper.deleteUsersState(users[0].type);
  }

  private async setupUser(user: User) {
    const {idamRequests} = super.requestsFactory;
    const accessToken = await idamRequests.getAccessToken(user);
    user.accessToken = accessToken;
    const userId = await idamRequests.getUserId(user);
    user.userId = userId;
  }

  async SetupUsersData(users: User[]) {
    for(const user of users) {
      await this.setupUser(user);
    }
    UserStateHelper.addUsersToState(users);
  }

  async SetupUserData(user: User) {
    await this.setupUser(user);
    UserStateHelper.addUserToState(user);
  }
    
}