import { APIRequestContext, APIResponse } from 'playwright-core';
import RequestOptions from '../types/request-options';
import { expect } from '../playwright-fixtures';

export default abstract class BaseRequest {
  private requestContext: APIRequestContext; 
  private MAX_RETRY_TIMEOUT = 30000;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private expectResponseBodyToContainField(expectedBodyPath: string, body: any, url: string) {
    const keys = expectedBodyPath.split('.');
    const nestedKeyValue = keys.reduce((nestedBody, key) => nestedBody && nestedBody[key], body);
    expect(nestedKeyValue, `Expected response body to contain path: ${keys.join(' => ')}, url: ${url}`).toBeDefined();
  }

  protected async request({url,
    headers = { 'Content-Type': 'application/json' },
    body,
    method = 'GET',
    params,
  }: RequestOptions, 
  expectedStatus = 200, 
  expectedBodyPaths: string[] = [],
  ): Promise<APIResponse> {
    const response = await this.requestContext.fetch(url, {
      method,
      data: body ? JSON.stringify(body) : undefined,
      headers,
      params,
    });
    expect(response.status(), `Expected status: ${expectedStatus}, actual status: ${response.status()}, ` +
          `message: ${response.statusText()}, url: ${response.url()}`).toBe(expectedStatus);
    for(const expectedBodyPath of expectedBodyPaths) {
      const body = await response.json();
      this.expectResponseBodyToContainField(expectedBodyPath, body, response.url());
    }
    return response;
  }

  protected async retriedRequest(requestOptions: RequestOptions, 
    expectedStatus = 200, 
    remainingRetries = 3,
    expectedBodyPaths: string[] = [],
    retryTimeInterval = 5000,
  ): Promise<APIResponse> {
    if (retryTimeInterval > this.MAX_RETRY_TIMEOUT) {
      retryTimeInterval = this.MAX_RETRY_TIMEOUT;
    }
    while (remainingRetries > 0) {
      remainingRetries--;
      try {
        const response = await this.request(requestOptions, expectedStatus, expectedBodyPaths);
        return response;
      } catch (error: any) {
        console.log(`${error.message.split('\n')[0]}, retrying in ${retryTimeInterval / 1000} seconds (Retries left: ${remainingRetries})`);
        if(!remainingRetries) throw error;
        await this.sleep(retryTimeInterval);
      }
    }
  }
}

