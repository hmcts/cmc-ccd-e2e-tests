import { APIRequestContext, APIResponse } from 'playwright-core';
import RequestOptions from '../types/request-options';
import { expect } from '../playwright-fixtures';

export default abstract class BaseRequest {
  private requestContext: APIRequestContext; 
  private MAX_RETRY_TIMEOUT = 30000;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  protected async request({url,
    headers = { 'Content-Type': 'application/json' },
    body,
    method = 'GET',
    params,
  }: RequestOptions, expectedStatus = 200): Promise<APIResponse> {
    const response = await this.requestContext.fetch(url, {
      method,
      data: body ? JSON.stringify(body) : undefined,
      headers,
      params,
    });
    expect(response.status(), `Expected status: ${expectedStatus}, actual status: ${response.status()}, ` +
          `message: ${response.statusText()}, url: ${response.url()}`).toBe(expectedStatus);
    return response;
  }

  protected async retriedRequest(requestOptions: RequestOptions, 
    expectedStatus = 200, 
    remainingRetries = 3, 
    retryTimeout = 5000, 
    err = null): Promise<APIResponse> {
    if (!remainingRetries) {
      throw err;
    }
    if (retryTimeout > this.MAX_RETRY_TIMEOUT) {
      retryTimeout = this.MAX_RETRY_TIMEOUT;
    }
    try {
      const response = await this.request(requestOptions, expectedStatus);
      return response;
    } catch (err: any) {
      console.log(`${err.message.split('\n')[0]}, retrying in ${retryTimeout / 1000} seconds (Retries left: ${remainingRetries})`);
      await this.sleep(retryTimeout);
      return await this.retriedRequest(requestOptions, remainingRetries - 1, retryTimeout, err);
    }
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}