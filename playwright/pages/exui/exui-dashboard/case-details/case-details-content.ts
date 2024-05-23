import CaseData from "../../../../types/case-data";

export const getHeading = (caseData: CaseData) => `${caseData.referenceNumber} ${caseData.claim.claimants[0].name} Vs ${caseData.claim.defendants[0].name}`;

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
  }
}

export const dropdowns = {
  nextStep: {
    label: 'Next step',
    selector: '#next-step',
    options: {
      claimNotes: 'Claim notes'
    }
  }
}

export const buttons = {
  go: {
    title: 'go',
    selector: 'button[type=\'submit\']'
  }
}