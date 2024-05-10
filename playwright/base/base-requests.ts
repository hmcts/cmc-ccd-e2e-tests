import { APIRequestContext, APIResponse } from "playwright-core";
import RequestOptions from "../types/RequestOptions";

export default abstract class BaseRequests {
  private requestContext: APIRequestContext; 
  private MAX_RETRY_TIMEOUT = 30000;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  protected async request({url,
    headers = { 'Content-Type': 'application/json' },
    body,
    method = 'POST',
    params,
  }: RequestOptions): Promise<APIResponse> {
    return await this.requestContext.fetch(url, {
    method: method,
    data: body ? JSON.stringify(body) : undefined,
    headers: headers,
    params: params
  })};

  protected async retriedRequest({url, headers, body, method = 'POST', params}: RequestOptions, expectedStatus = 200): Promise<APIResponse> {
    return await this.retry(async () => {
        const response = await this.request({ url, headers, body, method, params });
      if (response.status() !== expectedStatus) {
        throw new Error(`Expected status: ${expectedStatus}, actual status: ${response.status}, ` +
          `message: ${response.statusText}, url: ${response.url}`);
      }
      return response;
    });
};

  private async retry(fn: () => Promise<APIResponse>, remainingRetries = 3, retryTimeout = 5000, err = null) {
    if (!remainingRetries) {
        return Promise.reject(err);
    }
    if (retryTimeout > this.MAX_RETRY_TIMEOUT) {
        retryTimeout = this.MAX_RETRY_TIMEOUT;
    }
    try {
      const response = await fn();
      return response;
    } catch (err) {
      console.log(`${err.message}, retrying in ${retryTimeout / 1000} seconds (Retries left: ${remainingRetries})`);
      await this.sleep(retryTimeout);
      return this.retry(fn, remainingRetries - 1, retryTimeout, err);
    }
  };

  private sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
}