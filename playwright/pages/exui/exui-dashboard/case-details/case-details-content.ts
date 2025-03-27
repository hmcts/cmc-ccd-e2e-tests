import ClaimStoreCaseData from '../../../../models/case-data/claim-store-case-data';
import ExuiEvents from '../../../../models/exui-events';

export const getHeading = (caseData: ClaimStoreCaseData) =>
  `${caseData.referenceNumber} ${caseData.claim.claimants[0].name} Vs ${caseData.claim.defendants[0].name}`;

export const tabs = {
  claimHistory: {
    title: 'Claim Event History',
    selector: "div[role='tab'] >> 'Claim Event History'",
  },
  claimDetails: {
    title: 'Claim Details',
    selector: "div[role='tab'] >> 'Claim Details'",
  },
  claimantDetails: {
    title: 'Claimant Details',
    selector: "div[role='tab'] >> 'Claimant Details'",
  },
  defendantDetails: {
    title: 'Defendant Details',
    selector: "div[role='tab'] >> 'Defendant Details'",
  },
  claimDocs: {
    title: 'Claim Documents',
    selector: "div[role='tab'] >> 'Claim Documents'",
  },
};

export const dropdowns = {
  nextStep: {
    label: 'Next step',
    selector: '#next-step',
    options: ['Claim notes'],
  },
};

export const buttons = {
  go: {
    title: 'go',
    selector: "button[type='submit']",
  },
};

export const containers = {
  eventHistory: {
    selector: '.EventLogTable',
  },
  errors: {
    selector: '#errors',
  },
};

export const getFormattedClaimNumber = (caseNumber: number) => {
  const groups = caseNumber.toString().match(/.{1,4}/g);
  const formattedString = '#' + groups.join('-');
  return formattedString;
};

export const getSuccessBannerText = (caseId: number, event: ExuiEvents) =>
  `Case ${getFormattedClaimNumber(caseId)} has been updated with event: ${event}`;

export const errorMessages = {
  breathingSpace:
    'This Event cannot be triggered since the claim is no longer part of the online civil money claims journey',
};
