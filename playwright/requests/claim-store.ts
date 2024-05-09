import BaseRequest from "../base/base-requests";
import urls from "../config/urls";
import RequestOptions from "../types/RequestOptions";

export default class ClaimStoreRequests extends BaseRequest {
  private getRequestHeaders(accessToken: string) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  }

  async getCaseDataByReference(claimRef: string, accessToken: string) {
    const requestOptions: RequestOptions = {
      url: `${urls.claimStore}/claims/${claimRef}`,
      headers: this.getRequestHeaders(accessToken),
      method: 'GET',
    };
    const response = await super.retriedRequest(requestOptions);
    return await response.json();
  }
}