export const subHeadings = {
  addExtraDoc: 'Add an instruction for sending documents (Optional)',
  sendDocsInstructions: 'Add an instruction for sending documents (Optional)',
};

export const legends = {
  directions: 'Directions (Optional)',
  docsDeadline: 'Send documents before 4PM (Optional)',
  docUploadParty: "Apply 'Send documents' direction to: (Optional)",
  witnessesDeadline: 'Send witness statements before 4 PM (Optional)',
  experts: 'Grant permission for expert?',
};

export const radioButtons = {
  docsClaimant: {
    label: 'Claimant',
    selector: '#docUploadForParty-CLAIMANT',
  },
  docsDefendant: {
    label: 'Defendant',
    selector: '#docUploadForParty-DEFENDANT',
  },
  docsBothParties: {
    label: 'Both parties',
    selector: '#docUploadForParty-BOTH',
  },
  witnessesClaimant: {
    label: 'Claimant',
    selector: '#eyewitnessUploadForParty-CLAIMANT',
  },
  witnessesDefendant: {
    label: 'Defendant',
    selector: '#eyewitnessUploadForParty-DEFENDANT',
  },
  witnessesBothParties: {
    label: 'Both parties',
    selector: '#eyewitnessUploadForParty-BOTH',
  },
  yesExpert: {
    label: 'Yes',
    selector: '#grantExpertReportPermission_Yes',
  },
  noExpert: {
    label: 'No',
    selector: '#grantExpertReportPermission_No',
  },
};

export const checkboxes = {
  sendDocs: {
    label: 'Send documents',
    selector: '#directionList-DOCUMENTS',
  },
  sendWitness: {
    label: 'Send witness statements',
    selector: '#directionList-EYEWITNESS',
  },
};

export const buttons = {
  addNewExtraDocInstruction: {
    title: 'Add new',
    selector: "div[id='extraDocUploadList'] button[type='button']",
  },
  addDirection: {
    title: 'Add new',
    selector: "div[id='otherDirections'] button[type='button']",
  },
  addNewOtherDirectionsExtraDocInstruction: {
    title: 'Add new',
    selector: "div[id='otherDirections_0_extraDocUploadList'] button[type='button']",
  },
};

export const inputs = {
  dayDocUploadDeadline: {
    label: 'Day',
    selector: '#docUploadDeadline-day',
  },
  monthDocUploadDeadline: {
    label: 'Month',
    selector: '#docUploadDeadline-month',
  },
  yearDocUploadDeadline: {
    label: 'Year',
    selector: '#docUploadDeadline-year',
  },
  dayWitnessUploadDeadline: {
    label: 'Day',
    selector: '#eyewitnessUploadDeadline-day',
  },
  monthWitnessUploadDeadline: {
    label: 'Month',
    selector: '#eyewitnessUploadDeadline-month',
  },
  yearWitnessUploadDeadline: {
    label: 'Year',
    selector: '#eyewitnessUploadDeadline-year',
  },
  daySendBy: {
    label: 'Day',
    selector: '#sendBy-day',
  },
  monthSendBy: {
    label: 'Month',
    selector: '#sendBy-month',
  },
  yearSendBy: {
    label: 'Year',
    selector: '#sendBy-year',
  },
  extraDocUpload: {
    label: '',
    selector: '#extraDocUploadList_value',
    value: 'Test',
  },
  otherDirectionsExtraDocUpload: {
    label: '',
    selector: '#otherDirections_0_extraDocUploadList_value',
    value: 'Test',
  },
  expertReport: {
    label: 'Direction regarding expert',
    selector: '#expertReportInstruction',
    value: 'Test',
  },
};

export const dropdowns = {
  hearingCourt: {
    label: 'Hearing Court',
    selector: '#hearingCourt',
    options: ['Central London County Court'],
  },
  hearingDuration: {
    label: 'Hearing Duration (Optional)',
    selector: '#estimatedHearingDuration',
    options: ['One day'],
  },
  extraDirection: {
    label: 'Select direction category',
    selector: '#otherDirections_0_extraOrderDirection',
    options: ['Send documents', 'Send Witness Statements', 'Other directions'],
  },
  directionParty: {
    label: 'Who is the direction for?',
    selector: '#otherDirections_0_forParty',
    options: ['Claimant', 'Defendant', 'Both parties'],
  },
};
