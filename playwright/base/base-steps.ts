import TestData from '../types/TestData';

export default abstract class BaseSteps {
  protected testData: TestData;

  constructor(testData: TestData) {
    this.testData = testData;
  }
}