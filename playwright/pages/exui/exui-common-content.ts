import ExuiEvents from '../../types/exui-events';
import CCDCaseData from '../../types/case-data/ccd-case-data';

export const getCaseTitle = (caseData: CCDCaseData) => 
  `${caseData.previousServiceCaseReference} ${caseData.applicants[0].value.partyName} Vs ${caseData.respondents[0].value.claimantProvidedPartyName}`;

export const getFormattedClaimNumber = (caseNumber: number) => {
  const groups = caseNumber.toString().match(/.{1,4}/g);
  const formattedString = '#' + groups.join('-');
  return formattedString;
};

export const getSuccessBannerText = (caseId: number, event: ExuiEvents) => 
  `Case ${getFormattedClaimNumber(caseId)} has been updated with event: ${event}`;

export const cButtons = {
  submit: {
    title: 'Submit',
    selector: 'button[type=submit]',
  },
};

export const cInputs = {
  eventSummary: {
    label: 'Event summary (optional)',
    helperText: 'A few words describing the purpose of the event.',
    selector: '#field-trigger-summary',
  },
  eventDescription: {
    label: 'Event description (optional)',
    selector: '#field-trigger-description',
  },
};