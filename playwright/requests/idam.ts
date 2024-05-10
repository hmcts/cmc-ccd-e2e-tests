import BaseRequests from "../base/base-requests";
import urls from "../config/urls";
import RequestOptions from "../types/RequestOptions";
import User from "../types/User";

export default class IdamRequests extends BaseRequests {
  async accessToken({email, password}: User): Promise<string> {
    const requestOptions: RequestOptions = {
      url: `${urls.idamApi}/loginUser`,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      params: {username: email, password: password}
    };
    const response = await super.retriedRequest(requestOptions);
    const json = await response.json();
    return json.access_token;
  }

  async userId(authToken: string): Promise<string> {
    const requestOptions: RequestOptions = {
      url: `${urls.idamApi}/o/userinfo`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${authToken}`,
      },
    }
    const response = await super.retriedRequest(requestOptions);
    const json = await response.json();
    return json.uid;
  }

  async getPin(letterHoldId: string) {
    const requestOptions: RequestOptions = {
      url: `${urls.idamApi}/testing-support/accounts/pin/${letterHoldId}`,
      method: 'GET'
    }
    const response = await super.retriedRequest(requestOptions);
    return await response.text();
  }
}