import BasePageFactory from '../../../base/base-page-factory';
import StaffDocumentsFragment from '../fragments/staff-documents/staff-documents-fragment';
import AttachViaBulkScanSubmitPage from './attach-via-bulk-scan/attach-via-bulk-scan-submit/attach-via-bulk-scan-submit-page';
import ClaimNotesSubmitPage from './claim-notes/claim-notes-submit/claim-notes-submit-page';
import ChangeContactDetails1Page from './change-contact-details/change-contact-details-1/change-contact-details-1-page';
import ChangeContactDetails2Page from './change-contact-details/change-contact-details-2/change-contact-details-2-page';
import IssuePaperDefenceFormsSubmitPage from './issue-paper-defence-forms/issue-paper-defence-forms-submit/issue-paper-defence-forms-submit-page';
import LinkLetterHolderSubmitPage from './link-letter-holder/link-letter-holder-submit/link-letter-holder-submit-page';
import ManageDocumentsPage from './manage-documents/manage-documents/manage-documents-page';
import MediationPendingSubmitPage from './mediation-pending/mediation-pending-submit/mediation-pending-submit-page';
import MediationSuccessful1Page from './mediation-successful/mediation-successful-1/mediation-successful-1-page';
import MediationSuccessful2Page from './mediation-successful/mediation-successful-2/mediation-successful-2-page';
import MediationUnsuccessfulPage from './mediation-unsuccessful/mediation-unsuccessful/mediation-unsuccessful-page';
import PaperResponseAdmissionPage from './paper-response-admission/paper-response-admission/paper-response-admission-page';
import ResendRpaPage from './resend-rpa/resend-rpa/resend-rpa-page';
import ResendRpaSubmitPage from './resend-rpa/resend-rpa-submit/resend-rpa-submit-page';
import ResetPinSubmitPage from './reset-pin/reset-pin-submit-page/reset-pin-submit-page';
import SupportUpdateSubmitPage from './support-update/support-update-submit/support-update-submit-page';
import TransferCasePage from './transfer-case/transfer-case/transfer-case-page';
import TransferCaseSubmitPage from './transfer-case/transfer-case-submit/transfer-case-submit-page';
import WaitingToBeTransferredSubmitPage from './waiting-to-be-transferred/waiting-to-be-transferred-submit/waiting-to-be-transferred-submit-page';
import LiftBreathingSpacePage from './lift-breathing-space/lift-breathing-space-page';
import CaseHandedToCCBCSubmitPage from './case-handed-to-ccbc/case-handed-to-ccbc-submit/case-handed-to-ccbc-submit-page';
import ChangeContactDetailsSubmitPage from './change-contact-details/change-contact-details-submit/change-contact-details-submit-page';
import EnterBreathingSpace1Page from './enter-breathing-space/enter-breathing-space-1/enter-breathing-space-1-page';
import EnterBreathingSpace2Page from './enter-breathing-space/enter-breathing-space-2/enter-breathing-space-2-page';
import EnterBreathingSpaceSubmitPage from './enter-breathing-space/enter-breathing-space-submit/enter-breathing-space-submit-page';
import UpdatedHwfNumberPage from './updated-hwf-number/updated-hwf-number/hwf-number-updated-page';
import UpdatedHwfNumberSubmitPage from './updated-hwf-number/updated-hwf-number-submit/hwf-number-updated-submit-page';
import InvalidHwfNumberPage from './invalid-hwf-reference/invalid-hwf-reference/invalid-hwf-reference-page';
import InvalidHwfNumberSubmitPage from './invalid-hwf-reference/invalid-hwf-reference-submit/invalid-hwf-reference-submit-page';
import ManageDocumentsSubmitPage from './manage-documents/manage-documents-submit/manage-documents-submit-page';
import MediationSuccessfulSubmitPage from './mediation-successful/mediation-successful-submit/mediation-successful-submit-page';
import MediationUnsuccessfulSubmitPage from './mediation-unsuccessful/mediation-unsuccessful-submit/mediation-unsuccessful-submit-page';
import PaperResponseReviewed1Page from './paper-response-reviewed/paper-response-reviewed-1/paper-response-reviewed-1-page';
import PaperResponseReviewed2Page from './paper-response-reviewed/paper-response-reviewed-2/paper-response-reviewed-2-page';
import PaperResponseReviewedSubmitPage from './paper-response-reviewed/paper-response-reviewed-submit/paper-response-reviewed-submit-page';
import ReviewOcon9xPaperResponsePage from './review-ocon9x-paper-response/review-ocon9x-paper-response/review-ocon9x-paper-response-page';
import ReviewOcon9xPaperResponseSubmitPage from './review-ocon9x-paper-response/review-ocon9x-paper-response-submit/review-ocon9x-paper-response-submit-page';
import PaperResponseAdmissionSubmitPage from './paper-response-admission/paper-response-admission-submit/paper-response-admission-submit-page';
import PaperResponseDefencePage from './paper-response-defence/paper-response-defence/paper-response-defence-page';
import PaperResponseDefenceSubmitPage from './paper-response-defence/paper-response-defence-submit/paper-response-defence-submit-page';

export default class CaseworkerEventsFactory extends BasePageFactory {
  get transferCasePage() {
    return new TransferCasePage(this.page);
  }

  get transferCaseSubmitPage() {
    return new TransferCaseSubmitPage(this.page);
  }

  get supportUpdateSubmitPage() {
    return new SupportUpdateSubmitPage(this.page);
  }

  get attachViaBulkScanSubmitPage() {
    return new AttachViaBulkScanSubmitPage(this.page);
  }

  get linkLetterHolderSubmitPage() {
    return new LinkLetterHolderSubmitPage(this.page);
  }

  get waitingToBeTransferredSubmitPage() {
    return new WaitingToBeTransferredSubmitPage(this.page);
  }

  get resetPinSubmitPage() {
    return new ResetPinSubmitPage(this.page);
  }

  get resendRpaPage() {
    return new ResendRpaPage(this.page);
  }

  get resendRpaSubmitPage() {
    return new ResendRpaSubmitPage(this.page);
  }

  get claimNotesSubmitPage() {
    return new ClaimNotesSubmitPage(this.page);
  }

  get changeContactDetails1Page() {
    return new ChangeContactDetails1Page(this.page);
  }

  get changeContactDetails2Page() {
    return new ChangeContactDetails2Page(this.page);
  }

  get changeContactDetailsSubmitPage() {
    return new ChangeContactDetailsSubmitPage(this.page);
  }

  get manageDocumentsPage() {
    const staffDocumentsFragment = new StaffDocumentsFragment(this.page);
    return new ManageDocumentsPage(staffDocumentsFragment, this.page);
  }

  get manageDocumentsSubmitPage() {
    return new ManageDocumentsSubmitPage(this.page);
  }

  get issuePaperDefenceFormsSubmitPage() {
    return new IssuePaperDefenceFormsSubmitPage(this.page);
  }

  get paperResponseReviewed1Page() {
    return new PaperResponseReviewed1Page(this.page);
  }

  get paperResponseReviewed2Page() {
    return new PaperResponseReviewed2Page(this.page);
  }

  get paperResponseReviewedSubmitPage() {
    return new PaperResponseReviewedSubmitPage(this.page);
  }

  get reveiwOcon9xPaperResponsePage() {
    return new ReviewOcon9xPaperResponsePage(this.page);
  }

  get reveiwOcon9xPaperResponseSubmitPage() {
    return new ReviewOcon9xPaperResponseSubmitPage(this.page);
  }

  get paperResponseAdmissionPage() {
    return new PaperResponseAdmissionPage(this.page);
  }

  get paperResponseAdmissionSubmitPage() {
    return new PaperResponseAdmissionSubmitPage(this.page);
  }

  get paperResponseDefencePage() {
    return new PaperResponseDefencePage(this.page);
  }

  get paperResponseDefenceSubmitPage() {
    return new PaperResponseDefenceSubmitPage(this.page);
  }

  get mediationPendingSubmitPage() {
    return new MediationPendingSubmitPage(this.page);
  }

  get mediationSuccessful1Page() {
    return new MediationSuccessful1Page(this.page);
  }

  get mediationSuccessful2Page() {
    const staffDocumentsFragment = new StaffDocumentsFragment(this.page);
    return new MediationSuccessful2Page(staffDocumentsFragment, this.page);
  }

  get mediationSuccessfulSubmitPage() {
    return new MediationSuccessfulSubmitPage(this.page);
  }

  get mediationUnsuccessfulPage() {
    return new MediationUnsuccessfulPage(this.page);
  }

  get mediationUnsuccessfulSubmitPage() {
    return new MediationUnsuccessfulSubmitPage(this.page);
  }

  get invalidHwfNumberPage() {
    return new InvalidHwfNumberPage(this.page);
  }

  get invalidHwfNumberSubmitPage() {
    return new InvalidHwfNumberSubmitPage(this.page);
  }

  get updatedHwfNumberPage() {
    return new UpdatedHwfNumberPage(this.page);
  }

  get updatedHwfNumberSubmitPage() {
    return new UpdatedHwfNumberSubmitPage(this.page);
  }

  get enterBreathingSpace1Page() {
    return new EnterBreathingSpace1Page(this.page);
  }

  get enterBreathingSpace2Page() {
    return new EnterBreathingSpace2Page(this.page);
  }

  get enterBreathingSpaceSubmitPage() {
    return new EnterBreathingSpaceSubmitPage(this.page);
  }

  get liftBreathingSpacePage() {
    return new LiftBreathingSpacePage(this.page);
  }

  get caseHandedToCCBCSubmitPage() {
    return new CaseHandedToCCBCSubmitPage(this.page);
  }
}
