export const heading = 'Enter organisation details';

export const subHeadings = {
  address: 'Organisation address',
};

export const paragraphs = {
  descriptionText: 'You’ll have to pay an extra fee if you later want to change the name of an organisation involved with the claim.',
};

export const inputs = {
  name: {
    label: 'Organisation name',
    selector: '#name',
  },
  contactName: {
    label: 'Name of contact person (optional)',
    selector: '#contactPerson',
  },
  addressLine1: {
    label: 'Building and street',
    selector: 'input[id=\'address[line1]\']',
  },
  addressLine2: {
    label: 'Building and street',
    selector: 'input[id=\'address[line2]\']',
  },
  addressLine3: {
    label: 'Building and street',
    selector: 'input[id=\'address[line3]\']',
  },
  city: {
    label: 'Town or city',
    selector: 'input[id=\'address[city]\']',
  },
  postcode: {
    label: 'Postcode',
    selector: 'input[id=\'address[postcode]\']',
  }
};

export const buttons = {
  findAddress: {
    title: 'Find address',
    selector: 'a[id=\'address[find-button]\']',
  },
};

export const links = {
  addressManual: {
    title: 'Enter address manually',
    selector: 'a[id=\'address[enterManually]\']',
  },
};