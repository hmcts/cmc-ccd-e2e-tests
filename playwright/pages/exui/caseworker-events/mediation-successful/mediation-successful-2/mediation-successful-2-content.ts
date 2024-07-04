export const heading = 'Upload mediation agreement';

export const subHeadings = {
  documents: 'Staff uploaded documents',
};

const getDocInputs = (docIndex : number) => ({
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
});

export const doc1Inputs = getDocInputs(0);
export const doc2Inputs = getDocInputs(1);

const getDropdowns = (docIndex : number) => ({
  docType: {
    label: 'Type',
    selector: `#staffUploadedDocuments_${docIndex}_documentType`,
    options: ['Correspondence', 'Other'],
  },
});

export const doc1Dropdowns = getDropdowns(0);
export const doc2Dropdowns = getDropdowns(1);

export const buttons = {
  addNewDocTop: {
    title: 'Add new',
    selector: 'button[class=\'button write-collection-add-item__top\']',
  },
  addNewDocBottom: {
    title: 'Add new',
    selector: 'button[class=\'button write-collection-add-item__bottom ng-star-inserted\']',
  },
};