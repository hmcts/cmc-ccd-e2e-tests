import CCDCaseData from './case-data/ccd-case-data';
import ClaimStoreCaseData from './case-data/claim-store-case-data';

type TestData = {
  workerIndex: number;
  claimStoreCaseData: ClaimStoreCaseData;
  ccdCaseData: CCDCaseData;
};

export default TestData;