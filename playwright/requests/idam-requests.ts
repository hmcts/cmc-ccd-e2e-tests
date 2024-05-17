import BaseRequest from '../base/base-requests';
import urls from '../config/urls';
import { AllMethodsStep } from '../decorators/test-steps';
import RequestOptions from '../types/request-options';
import User from '../types/user';

@AllMethodsStep
export default class IdamRequests extends BaseRequest {
  async getAccessToken({email, password}: User): Promise<string> {
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