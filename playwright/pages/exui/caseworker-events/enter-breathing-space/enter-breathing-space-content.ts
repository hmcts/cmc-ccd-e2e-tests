export const heading = 'Enter Breathing Space';

export const inputs = {
  refNum: {
    label: 'Reference Number (Optional)',
    selector: '#breathingSpace_bsReferenceNumber',
  },
  respiteStart: {
    label: 'When did it start? (Optional)',
    day: {
      label: 'Day',
      selector: '#bsEnteredDateByInsolvencyTeam-day',
    },
    month: {
      label: 'Month',
      selector: '#bsEnteredDateByInsolvencyTeam-month',
    },
    year: {
      label: 'Year',
      selector: '#bsEnteredDateByInsolvencyTeam-year',
    },
  },
  respiteEnd: {
    label: 'Expected end date (Optional)',
    day: {
      label: 'Day',
      selector: '#bsExpectedEndDate-day',
    },
    month: {
      label: 'Month',
      selector: '#bsExpectedEndDate-month',
    },
    year: {
      label: 'Year',
      selector: '#bsExpectedEndDate-year',
    },
  },
};

export const radioButtons = {
  standardBreathingSpace: {
    label: 'Standard Breathing Space',
    selector: '#breathingSpace_bsType-STANDARD_BS_ENTERED',
  },
  mentalHealth: {
    label: 'Mental Health Crises Moratorium',
    selector: '#breathingSpace_bsType-MENTAL_BS_ENTERED',
  },
};