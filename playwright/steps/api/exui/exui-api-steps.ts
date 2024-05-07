import { APIRequestContext } from 'playwright-core';
import BaseSteps from '../../../base/base-steps';
import TestData from '../../../types/TestData';

export default class ExuiApiSteps extends BaseSteps{
  private request: APIRequestContext;

  constructor(request: APIRequestContext, testData: TestData) {
    super(testData);
    this.request = request;
  }
}