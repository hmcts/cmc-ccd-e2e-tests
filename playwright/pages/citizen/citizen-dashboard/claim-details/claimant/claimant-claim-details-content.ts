import ClaimStoreCaseData from '../../../../../types/case-data/claim-store-case-data';

export const getSubHeading = (caseData: ClaimStoreCaseData) =>
  `${caseData.claim.claimants[0].name} v ${caseData.claim.defendants[0].name}`;

export const tabs = {
  latestUpdate: 'Latest update',
  documents: 'Documents',
};

export const links = {
  respond: {
    title: 'View and respond',
    selector: '.button.button-primary',
  },
  breathingSpace: {
    title: 'Notify us about the debt respite scheme',
    selector: '',
  },
  claimSettled: {
    title: 'Tell us you’ve settled',
    selector: '',
  },
};
