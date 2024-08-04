import ClaimStoreCaseData from '../../../../../types/case-data/claim-store-case-data';

export const getHeading = (caseData: ClaimStoreCaseData) => `${caseData.claim.claimants[0].name} v ${caseData.claim.defendants[0].name}`;

export const tabs = {
  latestUpdate: 'Latest update',
  documents: 'Documents',
};

export const links = {
  respond: {
    title: 'Respond to claim',
    selector: '',
  },
};
