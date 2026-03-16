import { AllMethodsStep } from '../../decorators/test-steps';
import RequestsFactory from '../../requests/requests-factory';
import TestData from '../../models/test-data';
import { judge } from '../../config/users';
import BaseApiSteps from '../../base/base-api-steps';
import CCDCaseData from '../../models/case-data/ccd-case-data';

@AllMethodsStep()
export default class ApiCaseDataSteps extends BaseApiSteps {
  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(requestsFactory, testData);
  }

  async delay(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  private populateClaimFromCcdData(ccdCaseData: CCDCaseData) {
    const applicant = ccdCaseData.applicants?.[0]?.value;
    const respondent = ccdCaseData.respondents?.[0]?.value;
    const respondentDetail = respondent?.claimantProvidedDetail;
    this.claimStoreCaseData.claim = {
      externalId: ccdCaseData.externalId,
      claimants: [
        {
          type: applicant?.partyDetail?.type,
          id: applicant?.partyDetail?.idamId,
          name: applicant?.partyName,
          address: {
            line1: applicant?.partyDetail?.primaryAddress?.AddressLine1,
            line2: applicant?.partyDetail?.primaryAddress?.AddressLine2,
            line3: applicant?.partyDetail?.primaryAddress?.AddressLine3,
            city: applicant?.partyDetail?.primaryAddress?.PostTown,
            postcode: applicant?.partyDetail?.primaryAddress?.PostCode,
          },
        },
      ],
      defendants: [
        {
          type: respondentDetail?.type,
          id: respondent?.letterHolderId,
          name: respondent?.claimantProvidedPartyName,
          address: {
            line1: respondentDetail?.primaryAddress?.AddressLine1,
            line2: respondentDetail?.primaryAddress?.AddressLine2,
            line3: respondentDetail?.primaryAddress?.AddressLine3,
            city: respondentDetail?.primaryAddress?.PostTown,
            postcode: respondentDetail?.primaryAddress?.PostCode,
          },
          title: respondentDetail?.title,
          firstName: respondentDetail?.firstName,
          lastName: respondentDetail?.lastName,
          email: respondentDetail?.emailAddress,
        },
      ],
      payment: undefined,
      amount: undefined,
      feeAmountInPennies: parseInt(ccdCaseData.feeAmountInPennies) || 0,
      timeline: undefined,
      reason: ccdCaseData.reason,
    };
  }

  async FetchClaimStoreCaseData() {
    const { ccdRequests } = this.requestsFactory;
    const ccdCaseData = await ccdRequests.fetchCcdCaseData(this.claimStoreCaseData.id, judge);
    this.populateClaimFromCcdData(ccdCaseData);
    this.setCcdCaseData = ccdCaseData;
    console.log('Claim store case data fetched successfully');
  }

  async FetchClaimStoreCaseDataWithLetterId() {
    const { ccdRequests } = this.requestsFactory;
    this.claimStoreCaseData.letterHolderId = await ccdRequests.fetchLetterHolderId(
      this.claimStoreCaseData.id,
      judge,
    );
    const ccdCaseData = await ccdRequests.fetchCcdCaseData(this.claimStoreCaseData.id, judge);
    this.populateClaimFromCcdData(ccdCaseData);
    this.setCcdCaseData = ccdCaseData;
    console.log('Claim store case data with letter id fetched successfully');
  }

  async FetchClaimSecurityPin() {
    const { idamRequests } = this.requestsFactory;
    this.setClaimSecurityPin = await idamRequests.getSecurityPin(
      this.claimStoreCaseData.letterHolderId,
    );
  }

  async FetchCCDCaseData() {
    const { ccdRequests } = this.requestsFactory;
    this.setCcdCaseData = await ccdRequests.fetchCcdCaseData(this.claimStoreCaseData.id, judge);
  }
}
