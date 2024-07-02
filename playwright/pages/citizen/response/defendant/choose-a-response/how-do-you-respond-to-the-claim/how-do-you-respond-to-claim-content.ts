export const heading = 'How do you respond to the claim?';

export const radioButtons = {
  admitAll: {
    label: 'I admit all of the claim',
    selector: 'input[id=\'type[value]FULL_ADMISSION\']',
  },
  partAdmit: {
    label: 'I admit part of the claim',
    selector: 'input[id=\'type[value]PART_ADMISSION\']',
  },
  rejectAll: {
    label: 'I reject all of the claim',
    selector: 'input[id=\'type[value]DEFENCE\']',
  },
};