export const subHeadings = {
  staffUploadedDocs: 'Staff uploaded documents',
};

export const buttons = {
  addNewTop: {
    title: 'Add new',
    selector: "button[class='button write-collection-add-item__top']",
  },
  addNewBottom: {
    title: 'Add new',
    selector: '.button write-collection-add-item__bottom',
  },
};

const getInputs = (docIndex: number) => ({
  docName: {
    label: 'Name',
    value: `Test Document ${docIndex + 1}`,
    selector: `#staffUploadedDocuments_${docIndex}_documentName`,
  },
  docDay: {
    label: 'Day',
    selector: '#receivedDatetime-day',
  },
  docMonth: {
    label: 'Month',
    selector: '#receivedDatetime-month',
  },
  docYear: {
    label: 'Year',
    selector: '#receivedDatetime-year',
  },
  docHour: {
    label: 'Hour',
    selector: '#receivedDatetime-hour',
  },
  docMinute: {
    label: 'Minute',
    selector: '#receivedDatetime-minute',
  },
  docSecond: {
    label: 'Second',
    selector: '#receivedDatetime-second',
  },
  fileUpload: {
    label: 'Upload essential documents',
    selector: `#staffUploadedDocuments_${docIndex}_documentLink`,
  },
  otherDocType: {
    label: 'What type of document is it? (Optional)',
    selector: `#staffUploadedDocuments_${docIndex}_documentTypeOther`,
    value: `Document Type ${docIndex + 1}`,
  },
});

export const doc1Inputs = getInputs(0);
export const doc2Inputs = getInputs(1);

const getDropdowns = (docIndex: number) => ({
  docType: {
    label: 'Type',
    selector: `#staffUploadedDocuments_${docIndex}_documentType`,
    options: ['Correspondence', 'Mediation agreement', 'Other'],
  },
});

export const doc1Dropdowns = getDropdowns(0);
export const doc2Dropdowns = getDropdowns(1);
