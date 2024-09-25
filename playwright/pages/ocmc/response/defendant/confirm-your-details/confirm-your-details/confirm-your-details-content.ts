export const heading = 'Confirm your details';

export const subHeadings = {
  title: 'Title',
  firstName: 'First Name',
  lastName: 'Last Name',
  address: 'Your address',
  correspondenceAddress: 'Correspondence address',
};

export const inputs = {
  addressLine1: {
    label: 'Building and street',
    selector: "input[id='address[line1]']",
  },
  addressLine2: {
    label: 'Building and street line 2 of 3',
    selector: "input[id='address[line2]']",
  },
  addressLine3: {
    label: 'Building and street line 3 of 3',
    selector: "input[id='address[line3]']",
  },
  city: {
    label: 'Town or city',
    selector: "input[id='address[city]']",
  },
  postcode: {
    label: 'Postcode',
    selector: "input[id='address[postcode]']",
  },
};

export const radioButtons = {
  correspondenceAddressNo: {
    label: 'No',
    selector: '#hasCorrespondenceAddressfalse',
  },
  correspondenceAddressYes: {
    label: 'Yes, add a correspondence address',
    selector: '#hasCorrespondenceAddresstrue',
  },
};
