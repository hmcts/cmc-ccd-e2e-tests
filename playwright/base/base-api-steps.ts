import BaseSteps from './base-steps';
import RequestsFactory from '../requests/requests-factory';
import TestData from '../models/test-data';

export default abstract class BaseApiSteps extends BaseSteps {
  private _requestsFactory: RequestsFactory;

  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(testData);
    this._requestsFactory = requestsFactory;
  }

  get requestsFactory() {
    return this._requestsFactory;
  }
}
