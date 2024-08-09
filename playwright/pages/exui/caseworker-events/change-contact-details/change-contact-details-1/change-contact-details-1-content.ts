import UserType from '../../../../../enums/user-type';

export const heading = 'Change contact details';

export const radioButtons = {
  claimant: {
    label: 'Claimant',
    selector: '#contactChangeParty-CLAIMANT',
  },
  defendant: {
    label: 'Defendant',
    selector: '#contactChangeParty-DEFENDANT',
  },
};

export const subHeadings = {
  claimants: 'Claimants',
  claimantDetails: 'Claimant details',
  defendants: 'Defendants',
  defendantDetails: 'Defendants details',
  address: 'Address',
  contactDetails: 'Contact details',
  correspondenceAddress: 'Correspondence address',
};

const getInputs = (userType: UserType) => {
  return {
    email: {
      label: 'Email address (Optional)',
      selector: `#${userType}s_0_partyDetail_emailAddress`,
      value: `new${userType}email@gmail.com`,
    },
    postcodeLookup: {
      label: 'Enter a UK postcode',
      selector: `#${userType}s_0_partyDetail_primaryAddress_primaryAddress_postcodeInput`,
    },
    addressLine1: {
      label: 'Building and Street',
      selector: `#${userType}s_0_partyDetail_primaryAddress__detailAddressLine1`,
      value: `new ${userType} street 1`,
    },
    addressLine2: {
      label: 'Address line 2 (Optional)',
      selector: `#${userType}s_0_partyDetail_primaryAddress__detailAddressLine2`,
      value: `new ${userType} street 2`,
    },
    addressLine3: {
      label: 'Address line 3 (Optional)',
      selector: `#${userType}s_0_partyDetail_primaryAddress__detailAddressLine3`,
      value: `new ${userType} street 3`,
    },
    city: {
      label: 'Town or City (Optional)',
      selector: `#${userType}s_0_partyDetail_primaryAddress__detailPostTown`,
      value: `new ${userType} city`,
    },
    county: {
      label: 'County (Optional)',
      selector: `#${userType}s_0_partyDetail_primaryAddress__detailCounty`,
      value: `new ${userType} county`,
    },
    country: {
      label: 'Country (Optional)',
      selector: `#${userType}s_0_partyDetail_primaryAddress__detailCountry`,
      value: `new ${userType} country`,
    },
    postcode: {
      label: 'Postcode',
      selector: `#${userType}s_0_partyDetail_primaryAddress__detailPostCode`,
      value: `${userType[0]}1 2BC`,
    },
    phoneNumber: {
      label: 'Phone number (optional)',
      selector: `#${userType}s_0_partyDetail_telephoneNumber_telephoneNumber`,
    },
    correspondencePostcodeLookup: {
      label: 'Enter a UK postcode',
      selector: `#${userType}s_0_partyDetail_correspondenceAddress_correspondenceAddress_postcodeInput`,
    },
  };
};

export const claimantInputs = getInputs(UserType.APPLICANT);

export const defendantInputs = getInputs(UserType.RESPONDENT);

const getContainers = (userType: UserType) => {
  return {
    address: {
      selector: `#${userType}s_0_partyDetail_primaryAddress_primaryAddress`,
    },
    correspondenceAddress: {
      selector: `#${userType}s_0_partyDetail_correspondenceAddress_correspondenceAddress`,
    },
  };
};

export const claimantContainers = getContainers(UserType.APPLICANT);

export const defendantContainers = getContainers(UserType.RESPONDENT);

export const links = {
  manualAddress: {
    title: "I can't enter a UK postcode",
    selector: '',
    index: 0,
  },
  correspondenceManualAddress: {
    title: "I can't enter a UK postcode",
    selector: '',
    index: 1,
  },
};
