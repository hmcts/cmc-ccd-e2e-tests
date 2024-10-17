type Address = {
  PostCode: string;
  PostTown: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
};

type TelephoneNumber = {
  telephoneNumber: string;
};

type PartyDetail = {
  type: string;
  idamId: string;
  dateOfBirth: string;
  emailAddress: string;
  primaryAddress: Address;
  telephoneNumber: TelephoneNumber;
};

export type ApplicantValue = {
  partyName: string;
  partyDetail: PartyDetail;
  leadApplicantIndicator: string;
};

type Applicant = {
  id: string;
  value: ApplicantValue;
};

type DocumentLink = {
  document_url: string;
  document_filename: string;
  document_binary_url: string;
};

type DocumentValue = {
  size: number;
  createdBy: string;
  documentLink: DocumentLink;
  documentName: string;
  documentType: string;
  createdDatetime: string;
};

type DocumentItem = {
  id: string;
  value: DocumentValue;
};

type TTL = {
  Suspended: string;
  SystemTTL: string;
  OverrideTTL: string | null;
};

type ClaimSubmissionOperationIndicators = {
  rpa: string;
  bulkPrint: string;
  sealedClaimUpload: string;
  staffNotification: string;
  claimantNotification: string;
  defendantNotification: string;
  claimIssueReceiptUpload: string;
};

type AmountBreakDownValue = {
  amount: string;
  reason: string;
};

type AmountBreakDown = {
  id: string;
  value: AmountBreakDownValue;
};

type BulkPrintDetailValue = {
  printRequestId: string;
  printRequestType: string;
  printRequestedAt: string;
};

type BulkPrintDetail = {
  id: string;
  value: BulkPrintDetailValue;
};

type RespondentDetail = {
  type: string;
  title: string;
  lastName: string;
  firstName: string;
  emailAddress: string;
  primaryAddress: Address;
};

export type RespondentValue = {
  servedDate: string;
  letterHolderId: string;
  responseDeadline: string;
  claimantProvidedDetail: RespondentDetail;
  claimantProvidedPartyName: string;
  responseMoreTimeNeededOption: string;
};

type Respondent = {
  id: string;
  value: RespondentValue;
};

type TimelineValue = {
  date: string;
  description: string;
};

type Timeline = {
  id: string;
  value: TimelineValue;
};

type CCDCaseData = {
  reason?: string;
  applicants?: Applicant[];
  channel?: string;
  interestType?: string;
  caseDocuments?: Document[];
  feeAmountInPennies?: string;
  TTL?: TTL;
  paymentAmount?: string;
  issuedOn?: string;
  features?: string;
  paymentReturnUrl?: string;
  submitterId?: string;
  caseName?: string;
  claimSubmissionOperationIndicators?: ClaimSubmissionOperationIndicators;
  previousServiceCaseReference?: string;
  id?: number;
  paymentStatus?: string;
  currentInterestAmount?: string;
  amountType?: string;
  amountBreakDown?: AmountBreakDown[];
  paymentFeeId?: string;
  paymentReference?: string;
  submittedOn?: string;
  bulkPrintDetails?: BulkPrintDetail[];
  externalId?: string;
  paymentNextUrl?: string;
  respondents?: Respondent[];
  totalAmount?: string;
  migratedFromClaimStore?: string;
  timeline?: Timeline[];
  paymentDateCreated?: string;
  paymentTransactionId?: string;
  submitterEmail?: string;
};

export default CCDCaseData;
