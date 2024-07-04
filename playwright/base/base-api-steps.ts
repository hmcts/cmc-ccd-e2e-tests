import User from '../types/user';
import BaseSteps from './base-steps';
import RequestsFactory from '../requests/requests-factory';
import TestData from '../types/test-data';
import config from '../config/config';
import UserRole from '../enums/user-role';

export default abstract class BaseApiSteps extends BaseSteps {
  private _requestsFactory: RequestsFactory;

  constructor(requestsFactory: RequestsFactory, isSetupTest: boolean, testData: TestData) {
    super(testData);
    this._requestsFactory = requestsFactory;
  }

  get requestsFactory() {
    return this._requestsFactory;
  }

}