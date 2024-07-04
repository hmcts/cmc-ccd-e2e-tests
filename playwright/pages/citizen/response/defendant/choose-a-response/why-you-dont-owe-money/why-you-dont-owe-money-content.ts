import ClaimStoreCaseData from '../../../../../../types/case-data/claim-store-case-data';

export const getHeading = (caseData: ClaimStoreCaseData) => `Why do you believe you don’t owe ${caseData.claim.claimants[0].name} any money`;

export const radioButtons = {
  paid: {
    label: 'I’ve paid what I believe I owe',
    selector: '#optionalreadyPaid',
  },
  dispute: {
    label: 'I dispute all of the claim',
    selector: '#optiondispute',
  },
  disputeAndCounter: {
    label: 'I dispute the claim and want to make a counterclaim',
    selector: '#optioncounterClaim',
  },
};