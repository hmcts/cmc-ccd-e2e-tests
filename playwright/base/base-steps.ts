import TestData from '../types/test-data';

export default abstract class BaseSteps {
  protected testData: TestData;

  constructor(testData: TestData) {
    this.testData = testData;
  }
}