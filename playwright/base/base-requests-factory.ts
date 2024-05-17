import { APIRequestContext } from '@playwright/test';

export default abstract class BaseRequestsFactory {
  protected requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }
}