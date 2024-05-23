import CaseData from '../types/case-data';
import TestData from '../types/test-data';

export default abstract class BaseSteps {
  private _testData: TestData;

  constructor(testData: TestData) {
    this._testData = testData;
  }

  get caseData() {
    return this._testData.caseData;
  }

  set setCaseData(caseData: CaseData) {
    this._testData.caseData = caseData;
  }
}