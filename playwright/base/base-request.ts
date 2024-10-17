import { APIRequestContext, APIResponse } from 'playwright-core';
import RequestOptions from '../models/api/request-options';
import { expect } from '../playwright-fixtures';
import { BoxedDetailedStep } from '../decorators/test-steps';
import ResponseDataType from '../enums/api/response-data-type';
import * as responseOptions from '../models/api/response-options';

const classKey = 'BaseRequest';
export default abstract class BaseRequest {
  private requestContext: APIRequestContext;
  private MAX_RETRY_TIMEOUT = 30000;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async getResponseData(
    response: APIResponse,
    responseDataType: ResponseDataType,
  ): Promise<any | string | null> {
    switch (responseDataType) {
      case ResponseDataType.JSON:
        return await response.json();
      case ResponseDataType.TEXT:
        return await response.text();
      default:
        return null;
    }
  }

  @BoxedDetailedStep(classKey, 'url')
  private async _request(
    url: string,
    {
      headers = { 'Content-Type': 'application/json' },
      body,
      method = 'GET',
      params,
    }: RequestOptions,
    responseType = ResponseDataType.NONE,
    { expectedStatus = 200, verifyResponse }: responseOptions._ResponseOptions = {},
  ): Promise<APIResponse | any | string> {
    const response = await this.requestContext.fetch(url, {
      method,
      data: body ? JSON.stringify(body) : undefined,
      headers,
      params,
    });
    this.expectStatus(expectedStatus, response.status(), response.url(), response.statusText());
    const responseData = await this.getResponseData(response, responseType);
    if (verifyResponse)
      await verifyResponse(responseData ?? response, {
        status: response.status(),
        headers: response.headers(),
      });
    return responseData ?? response;
  }

  private async _retryRequest(
    url: string,
    requestOptions: RequestOptions,
    responseDataType = ResponseDataType.NONE,
    {
      expectedStatus = 200,
      remainingRetries = 3,
      retryTimeInterval = 5000,
      verifyResponse,
    }: responseOptions._RetryResponseOptions = {},
  ): Promise<APIResponse | any | string> {
    if (retryTimeInterval > this.MAX_RETRY_TIMEOUT) {
      retryTimeInterval = this.MAX_RETRY_TIMEOUT;
    }
    while (remainingRetries > 0) {
      remainingRetries--;
      try {
        const response = await this._request(url, requestOptions, responseDataType, {
          expectedStatus,
          verifyResponse,
        });
        return response;
      } catch (error: any) {
        if (!remainingRetries) throw error;
        console.log(
          `${error.message.split('\n')[0]}, retrying in ${retryTimeInterval / 1000} seconds (Retries left: ${remainingRetries})`,
        );
        await this.sleep(retryTimeInterval);
      }
    }
  }

  @BoxedDetailedStep(classKey, 'url')
  async request(
    url: string,
    requestOptions: RequestOptions,
    responseOptions?: responseOptions.ResponseOptions,
  ) {
    return (await this._request(
      url,
      requestOptions,
      ResponseDataType.NONE,
      responseOptions,
    )) as APIResponse;
  }

  @BoxedDetailedStep(classKey, 'url')
  async retryRequest(
    url: string,
    requestOptions: RequestOptions,
    retryResponseOptions?: responseOptions.RetryResponseOptions,
  ) {
    return (await this._retryRequest(
      url,
      requestOptions,
      ResponseDataType.NONE,
      retryResponseOptions,
    )) as APIResponse;
  }

  @BoxedDetailedStep(classKey, 'url')
  async requestJson(
    url: string,
    requestOptions: RequestOptions,
    responseJsonOptions?: responseOptions.ResponseJsonOptions,
  ): Promise<any> {
    return (await this._request(
      url,
      requestOptions,
      ResponseDataType.JSON,
      responseJsonOptions,
    )) as any;
  }

  @BoxedDetailedStep(classKey, 'url')
  async retryRequestJson(
    url: string,
    requestOptions: RequestOptions,
    retryResponseJsonOptions?: responseOptions.RetryResponseJsonOptions,
  ): Promise<any> {
    return (await this._retryRequest(
      url,
      requestOptions,
      ResponseDataType.JSON,
      retryResponseJsonOptions,
    )) as any;
  }

  @BoxedDetailedStep(classKey, 'url')
  async requestText(
    url: string,
    requestOptions: RequestOptions,
    responseTextOptions?: responseOptions.ResponseTextOptions,
  ): Promise<string> {
    return (await this._request(
      url,
      requestOptions,
      ResponseDataType.TEXT,
      responseTextOptions,
    )) as string;
  }

  @BoxedDetailedStep(classKey, 'url')
  async retryRequestText(
    url: string,
    requestOptions: RequestOptions,
    retryResponseTextOptions?: responseOptions.RetryResponseTextOptions,
  ): Promise<string> {
    return (await this._retryRequest(
      url,
      requestOptions,
      ResponseDataType.TEXT,
      retryResponseTextOptions,
    )) as string;
  }

  @BoxedDetailedStep(classKey, 'actualStatus', 'expectedStatus')
  private async expectStatus(
    expectedStatus: number,
    actualStatus: number,
    url: string,
    statusText: string,
  ) {
    expect(
      actualStatus,
      `Expected status: ${expectedStatus}, actual status: ${actualStatus}, ` +
        `message: ${statusText}, url: ${url}`,
    ).toBe(expectedStatus);
  }

  @BoxedDetailedStep(classKey, 'keyPath')
  protected async expectResponseJsonToHaveProperty(
    keyPath: string,
    responseJson: Record<string, unknown>,
    options: { message?: string } = {},
  ) {
    expect(
      responseJson,
      options.message ??
        `Expected response json to have property '${keyPath.split('.').join(' => ')}'`,
    ).toHaveProperty(keyPath);
  }

  @BoxedDetailedStep(classKey)
  protected async expectResponseJsonToContain(
    partialObject: Record<string, unknown> | Array<unknown>,
    responseJson: Record<string, unknown>,
    options: { message?: string } = {},
  ) {
    expect(responseJson, options.message).toMatchObject(partialObject);
  }

  @BoxedDetailedStep(classKey)
  protected async expectJsonResponseToEqual(
    object: Record<string, unknown> | Array<unknown>,
    responseJson: Record<string, unknown>,
    options: { message?: string } = {},
  ) {
    expect(responseJson, options.message).toEqual(object);
  }

  @BoxedDetailedStep(classKey, 'text', 'responseText')
  protected async expectTextResponseToEqual(
    text: string,
    responseText: string,
    options: { message?: string } = {},
  ) {
    expect(text, options.message).toEqual(responseText);
  }
}
