import { APIRequestContext } from '@playwright/test';

export default abstract class BaseRequestsFactory {
  private _requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this._requestContext = requestContext;
  }

  get requestContext() {
    return this._requestContext;
  }
}