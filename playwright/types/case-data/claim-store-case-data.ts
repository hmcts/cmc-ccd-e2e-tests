type Address = {
  line1: string;
  line2?: string;
  line3?: string;
  city: string;
  postcode: string;
};

type Document = {
  id: string;
  documentName: string;
  documentType: string;
  createdDatetime: string;
  createdBy?: string;
  size: number;
};

type ScannedDocument = {
  id: string;
  fileName: string;
  documentType: string;
  subtype?: string;
  formSubtype?: string;
  deliveryDate: string;
  documentManagementUrl?: string;
  documentManagementBinaryUrl?: string;
};

type ClaimDocumentCollection = {
  claimDocuments: Document[];
  scannedDocuments?: ScannedDocument[];
};

type Payment = {
  amount: number;
  reference: string;
  date_created: string;
  status: string;
  next_url?: string;
  return_url?: string;
  transaction_id: string;
  fee_id?: string;
};

type ClaimAmountBreakdownRow = {
  id: string;
  reason: string;
  amount: number;
};

type ClaimAmount = {
  type: string;
  rows?: ClaimAmountBreakdownRow[];
};

type TimelineRow = {
  id: string;
  date: string;
  description: string;
};

type Timeline = {
  rows: TimelineRow[];
};

type Claim = {
  externalId: string;
  claimants: Array<{
      type: string;
      id: string;
      name: string;
      address: Address;
      phone?: string;
      dateOfBirth?: string;
  }>;
  defendants: Array<{
      type: string;
      id: string;
      name: string;
      address: Address;
      email?: string;
      claimantProvidedAddress?: Address;
      title?: string;
      firstName?: string;
      lastName?: string;
  }>;
  payment: Payment;
  amount: ClaimAmount;
  feeAmountInPennies: number;
  interest?: {
      type: string;
  };
  timeline: Timeline;
  reason: string;
};

type BulkPrintDetail = {
  id: string;
  printRequestId: string;
  printRequestType: string;
  printRequestedAt: string;
};

type ClaimSubmissionOperationIndicators = {
  claimantNotification: string;
  defendantNotification: string;
  bulkPrint: string;
  rpa: string;
  staffNotification: string;
  sealedClaimUpload: string;
  claimIssueReceiptUpload: string;
};

type ClaimStoreCaseData = {
  id?: number;
  submitterId?: string;
  letterHolderId?: string;
  externalId?: string;
  referenceNumber?: string;
  createdAt?: string;
  issuedOn?: string;
  serviceDate?: string;
  responseDeadline?: string;
  moreTimeRequested?: boolean;
  submitterEmail?: string;
  respondedAt?: string;
  features?: string[];
  claimDocumentCollection?: ClaimDocumentCollection;
  state?: string;
  claimSubmissionOperationIndicators?: ClaimSubmissionOperationIndicators;
  ccdCaseId?: number;
  channel?: string;
  intentionToProceedDeadline?: string;
  paperResponse?: string;
  evidenceHandled?: string;
  bulkPrintDetails?: BulkPrintDetail[];
  lastModified?: string;
  paperFormServedDate?: string;
  paperFormIssueDate?: string;
  totalClaimAmount?: number;
  totalInterest?: number;
  totalAmountTillToday?: number;
  totalAmountTillDateOfIssue?: number;
  totalInterestTillDateOfIssue?: number;
  amountWithInterestUntilIssueDate?: number;
  amountWithInterest?: number;
  claim?: Claim;
};

export default ClaimStoreCaseData;