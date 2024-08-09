export const heading = 'Transfer Case';

export const inputs = {
  countyCourt: {
    label: 'Full name of the county court the case is transferred to',
    selector: '#transferContent_transferCourtName',
  },
  postcodeLookup: {
    label: 'Enter a UK postcode',
    selector: '#transferContent_transferCourtAddress_transferCourtAddress_postcodeInput',
  },
  addressLine1: {
    label: 'Building and Street',
    selector: '#transferContent_transferCourtAddress__detailAddressLine1',
  },
  addressLine2: {
    label: 'Address line 2 (Optional)',
    selector: '#transferContent_transferCourtAddress__detailAddressLine2',
  },
  addressLine3: {
    label: 'Address line 3 (Optional)',
    selector: '#transferContent_transferCourtAddress__detailAddressLine3',
  },
  city: {
    label: 'Town or City',
    selector: '#transferContent_transferCourtAddress__detailPostTown',
  },
  county: {
    label: 'County (Optional)',
    selector: '#transferContent_transferCourtAddress__detailCounty',
  },
  postcode: {
    label: 'Postcode (Optional)',
    selector: '#transferContent_transferCourtAddress__detailPostCode',
  },
  country: {
    label: 'Country (Optional)',
    selector: '#transferContent_transferCourtAddress__detailCountry',
  },
  otherReason: {
    label: 'Reason',
    selector: '#transferContent_transferReasonOther',
  },
};

export const radioButtons = {
  generalApplication: {
    label: 'General Application',
    selector: '#transferContent_transferReason-APPLICATION_GENERAL',
  },
  applicationJudgement: {
    label: 'Application to set aside judgment',
    selector: '#transferContent_transferReason-APPLICATION_SET_ASIDE',
  },
  enforcement: {
    label: 'Enforcement',
    selector: '#transferContent_transferReason-ENFORCEMENT',
  },
  other: {
    label: 'Other',
    selector: '#transferContent_transferReason-OTHER',
  },
  //more options to be added.
};

export const links = {
  manualAddress: {
    title: "I can't enter a UK postcode",
    selector: '',
  },
};
