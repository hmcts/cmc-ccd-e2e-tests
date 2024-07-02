export const heading = 'Paper Response - Defence';

export const subHeadings = {
  defendantDetails: 'Defendant details - Latest',
  address: 'Primary address (Optional)',
  correspondenceAddress: 'Correspondence address (Optional)',
  contactDetails: 'Contact details',
};

export const radioButtons = {
  dispute: {
    label: 'Dispute',
    selector: '#defenceType-DISPUTE',
  },
  alreadyPaid: {
    label: 'Already Paid',
    selector: '#defenceType-ALREADY_PAID',
  },
  yesMediation: {
    label: 'Yes',
    selector: '#respondents_0_responseFreeMediationOption_Yes'
  },
  noMedition: {
    label: 'No',
    selector: '#respondents_0_responseFreeMediationOption_No',
  },
};

export const inputs = {
  contactPerson: {
    label: 'Contact Person (Optional)',
    selector: '#respondents_0_partyDetail_contactPerson',
  },
  postcodeLookup: {
    label: 'Enter a UK postcode',
    selector: '#respondents_0_partyDetail_primaryAddress_primaryAddress_postcodeInput',
  },
  addressLine1: {
    label: 'Building and Street (Optional)',
    selector: '#respondents_0_partyDetail_primaryAddress__detailAddressLine1',
  },
  addressLine2: {
    label: 'Second address line (Optional)',
    selector: '#respondents_0_partyDetail_primaryAddress__detailAddressLine2',
  },
  addressLine3: {
    label: 'Third address line (Optional)',
    selector: '#respondents_0_partyDetail_primaryAddress__detailAddressLine3',
  },
  city: {
    label: 'Town or city (Optional)',
    selector: '#respondents_0_partyDetail_primaryAddress__detailPostTown',
  },
  county: {
    label: 'County (Optional)',
    selector: '#respondents_0_partyDetail_primaryAddress__detailCounty',
  },
  country: {
    label: 'Country (Optional)',
    selector: '#respondents_0_partyDetail_primaryAddress__detailCountry',
  },
  postcode: {
    label: 'Postcode (Optional)',
    selector: '#respondents_0_partyDetail_primaryAddress__detailPostCode',
  },
  correspondencePostcodeLookup: {
    label: 'Enter a UK postcode',
    selector: '#respondents_0_partyDetail_correspondenceAddress_correspondenceAddress_postcodeInput',
  },
  email: {
    label: 'Email address (Optional)',
    selector: '#respondents_0_partyDetail_emailAddress',
  },
  phoneNumber: {
    label: 'Phone number (Optional)',
    selector: '',
  },
  preferredCourt: {
    label: 'Preferred court (Optional)',
    selector: '#preferredDQCourt',
  },
};

export const links = {
  manualCorrespondenceAddress: {
    title: ' I can\'t enter a UK postcode',
    selector: '.manual-link.bottom-30.ng-star-inserted',
  },
};
