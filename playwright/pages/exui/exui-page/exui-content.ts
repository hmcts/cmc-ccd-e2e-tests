export const buttons = {
  submit: {
    title: 'Submit',
    selector: 'button[type=submit]',
  },
};

export const eventInputs = {
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

export const components = {
  loading: {
    name: 'Loading',
    selector: '.spinner-container',
  },
  error: {
    selector: 'div.error-summary.ng-star-inserted',
  },
  fieldError: {
    selector: "div[data-module='govuk-error-summary']",
  },
  uploadDocError: {
    selector: 'span.error-message',
  },
};

export const links = {
  cancel: {
    name: 'Cancel',
    selector: "a[href='javascript:void(0)']",
  },
};
