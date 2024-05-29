import ClaimStoreCaseData from '../../../../types/case-data/claim-store-case-data';

export const getHeading = (caseData: ClaimStoreCaseData) => `${caseData.referenceNumber} ${caseData.claim.claimants[0].name} Vs ${caseData.claim.defendants[0].name}`;

export const tabs = {
  claimHistory: {
    title: 'Claim Event History',
  },
  claimDetails: {
    title: 'Claim Details',
  },
  claimantDetails: {
    title: 'Claimant Details',
  },
  defendantDetails: {
    title: 'Defendant Details',
  },
  claimDocs: {
    title: 'Claim Documents',
  },
};

export const dropdowns = {
  nextStep: {
    label: 'Next step',
    selector: '#next-step',
    options: {
      claimNotes: 'Claim notes',
    },
  },
};

export const buttons = {
  go: {
    title: 'go',
    selector: 'button[type=\'submit\']',
  },
};

export const containers = {
  eventHistory: {
    selector: '.EventLogTable',
  },
};