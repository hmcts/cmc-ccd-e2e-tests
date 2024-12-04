export const heading = 'Enter card details';

export const subheadings = {
  paymentSummary: 'Payment summary',
  billingAddress: 'Billing address',
  contactDetails: 'Contact details',
};

export const dropdowns = {
  country: {
    label: 'Country or territory',
    selector: '',
    options: ['United Kingdom'],
  },
};

export const inputs = {
  cardNumber: {
    label: 'Card number',
    selector: '#card-no',
  },
  expiryDate: {
    label: 'Expiry date',
    selector: '',
  },
  expiryMonth: {
    label: 'Month',
    selector: '#expiry-month',
  },
  expiryYear: {
    label: 'Year',
    selector: '#expiry-year',
  },
  nameOnCard: {
    label: 'Name on card',
    selector: '#cardholder-name',
  },
  securityCode: {
    label: 'Card security code',
    selector: '#cvc',
  },
  addressLine1: {
    label: 'Address line 1',
    selector: '#address-line-1',
  },
  addressLine2: {
    label: 'Address line 2',
    selector: '#address-line-2',
  },
  city: {
    label: 'Town or city',
    selector: '#address-city',
  },
  postcode: {
    label: 'Postcode',
    selector: '#address-postcode',
  },
  confirmationEmail: {
    label: 'Email',
    selector: '#email',
  },
};

export const buttons = {
  continue: {
    title: 'Continue',
    selector: '#submit-card-details',
  },
};
