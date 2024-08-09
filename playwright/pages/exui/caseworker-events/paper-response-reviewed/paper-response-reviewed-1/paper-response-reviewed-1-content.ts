export const heading = 'Paper response reviewed';

export const subHeadings = {
  bulkScanOrEmail: 'Bulk scanned or emailed documents',
};

export const dropdowns = {
  responseType: {
    label: 'Received Paper Response type',
    selector: '#paperResponseType',
    options: ['Received via Bulk scan or Email', 'Received not via service'],
  },
  doc1DocType: {
    label: 'Document Type',
    selector: '#scannedDocuments_0_type',
    options: ['Form'],
  },
  doc1DocSubType: {
    label: 'Document Subtype',
    selector: '#scannedDocuments_0_formSubtype',
    options: ['OCON9x (Paper response (All))'],
  },
};

export const buttons = {
  addNewBulkOrEmailDoc: {
    title: 'Add new',
    selector: "div[id='scannedDocuments'] button[type='button']",
  },
};

export const inputs = {
  doc1Link: {
    label: 'Document Link',
    selector: '#scannedDocuments_0_url',
  },
  doc1SubType: {
    label: 'Document Subtype',
    selector: '#scannedDocuments_0_subtype',
  },
};
