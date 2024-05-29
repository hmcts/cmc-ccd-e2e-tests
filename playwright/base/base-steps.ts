import CCDCaseData from '../types/case-data/ccd-case-data';
import ClaimStoreCaseData from '../types/case-data/claim-store-case-data';
import TestData from '../types/test-data';

export default abstract class BaseSteps {
  private _testData: TestData;

  constructor(testData: TestData) {
    this._testData = testData;
  }

  protected get claimStoreCaseData() {
    return this._testData.claimStoreCaseData;
  }

  protected set setClaimStoreCaseData(claimStoreCaseData: ClaimStoreCaseData) {
    this._testData.claimStoreCaseData = claimStoreCaseData;
  }

  protected get ccdCaseData() {
    return this._testData.ccdCaseData;
  }

  protected set setCcdCaseData(ccdCaseData: CCDCaseData) {
    this._testData.ccdCaseData = ccdCaseData;
  }
}