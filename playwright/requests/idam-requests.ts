import BaseRequest from '../base/base-requests';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import IdamUser from '../types/idam-user';
import RequestOptions from '../types/request-options';
import User from '../types/user';
import CitizenUsersHelper from '../helpers/citizen-users-helper';

@AllMethodsStep
export default class IdamRequests extends BaseRequest {
  
  async createCitizenUsers(users: User[]) {
    const userType = users[0].type;
    if(!users.every(user => user.type === users[0].type)) {
      throw new TypeError(`Users in ${users} must all have the same user type`);
    }
    users = await Promise.all(users.map(async (user) => {
      const idamUser = await this.createCitizenUser(user);
      return { userId: idamUser.id, ...user };
    }));
    CitizenUsersHelper.addUsersToState(users, userType);
  }
  
  private async createCitizenUser({
    email,
    password,
    role,
  }: User): Promise<IdamUser> {
    console.log(`Creating user with email: ${email}`);
    const requestOptions: RequestOptions = {
      method: 'POST',
      url: `${urls.idamApi}/testing-support/accounts`,
      body: {
        email: email,
        password: password,
        forename: 'John',
        surname: 'Smith',
        roles: [{ code: role.toString() }],
      },
    };
    const response = await this.request(requestOptions, 201);
    console.log(`User with email: ${email} successfully created`);
    return await response.json();
  }

  async deleteUsers(users: User[]) {
    await Promise.all(users.map(user => this.deleteUser(user)));
    CitizenUsersHelper.deleteUsersState(users[0].type);
  }

  private async deleteUser({email}: User): Promise<void> {
    console.log(`Delete user: ${email}`);
    const requestOptions: RequestOptions = {
      method: 'DELETE',
      url: `${urls.idamApi}/testing-support/accounts/${email}`,
    };
    try {
      await this.request(requestOptions, 204);
      console.log(`User: ${email} successfully deleted`);
    } catch(error) {
      console.log(`error deleting user: ${email}` + error);
    }
  }
  
  async getAccessToken({email, password}: User): Promise<string> {
    console.log(`Get access token using idam: ${email} `);
    const requestOptions: RequestOptions = {
      url: `${urls.idamApi}/loginUser`,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      params: {username: email, password: password},
      method: 'POST',
    };
    const response = await super.retriedRequest(requestOptions);
    const json = await response.json();
    return json.access_token;
  }

  async getUserId(authToken: string): Promise<string> {
    const requestOptions: RequestOptions = {
      url: `${urls.idamApi}/o/userinfo`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${authToken}`,
      },
      method: 'GET',
    };
    const response = await super.retriedRequest(requestOptions);
    const json = await response.json();
    return json.uid;
  }

  async getPin(letterHoldId: string) {
    const requestOptions: RequestOptions = {
      url: `${urls.idamApi}/testing-support/accounts/pin/${letterHoldId}`,
      method: 'GET',
    };
    const response = await super.retriedRequest(requestOptions);
    return await response.text();
  }
}