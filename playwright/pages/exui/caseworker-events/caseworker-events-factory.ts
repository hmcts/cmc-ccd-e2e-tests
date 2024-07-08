import BasePageFactory from '../../../base/base-page-factory';
import AttachViaBulkScanPage from './attach-via-bulk-scan/attach-via-bulk-scan-page';
import ChangeContactDetailsPage from './change-contact-details/change-contact-details-page';
import ClaimNotesPage from './claim-notes/claim-notes-page';
import IssuePaperDefenceFormsPage from './issue-paper-defence-forms/issue-paper-defence-forms-page';
import LinkLetterHolderPage from './link-letter-holder/link-letter-holder-page';
import ManageDocumentsPage from './manage-documents/manage-documents-page';
import MediationPendingPage from './mediation-pending/mediation-pending-page';
import MediationSuccessful1Page from './mediation-successful/mediation-successful-1/mediation-successful-1-page';
import MediationSuccessful2Page from './mediation-successful/mediation-successful-2/mediation-successful-2-page';
import MediationUnsuccessfulPage from './mediation-unsuccessful/mediation-unsuccessful-page';
import PaperResponseAdmissionPage from './paper-response-admission/paper-response-admission-page';
import PaperResponseDefencePage from './paper-response-defence/paper-response-defence-page';
import PaperResponseReviewedPage from './paper-response-reviewed/paper-response-reviewed-page';
import ResendRpaPage from './resend-rpa/resend-rpa-page';
import ResetPinPage from './reset-pin/reset-pin-page';
import ReviewOcon9xPaperResponsePage from './review-ocon9x-paper-response/review-ocon9x-paper-response-page';
import SupportUpdatePage from './support-update/support-update-page';
import TransferCasePage from './transfer-case/transfer-case-page';
import WaitingToBeTransferredPage from './waiting-to-be-transferred/waiting-to-be-transferred-page';
import InvalidHwfNumberPage from './hwf-number-invalid/hwf-number-invalid-page';
import UpdatedHwfNumberPage from './hwf-number-updated/hwf-number-updated-page';

export default class CaseworkerEventsFactory extends BasePageFactory{

  get transferCasePage() {
    return new TransferCasePage(this.page, this.axeBuilder);
  }

  get supportUpdatePage() {
    return new SupportUpdatePage(this.page, this.axeBuilder);
  }

  get attachViaBulkScanPage() {
    return new AttachViaBulkScanPage(this.page, this.axeBuilder);
  }

  get linkLetterHolderPage() {
    return new LinkLetterHolderPage(this.page, this.axeBuilder);
  }

  get waitingToBeTransferredPage() {
    return new WaitingToBeTransferredPage(this.page, this.axeBuilder);
  }

  get resetPinPage() {
    return new ResetPinPage(this.page, this.axeBuilder);
  }

  get resendRpaPage() {
    return new ResendRpaPage(this.page, this.axeBuilder);
  }
  
  get claimNotesPage() {
    return new ClaimNotesPage(this.page, this.axeBuilder);
  }

  get changeContactDetailsPage() {
    return new ChangeContactDetailsPage(this.page, this.axeBuilder);
  }

  get manageDocumentsPage() {
    return new ManageDocumentsPage(this.page, this.axeBuilder);
  }

  get issuePaperDefenceFormsPage() {
    return new IssuePaperDefenceFormsPage(this.page, this.axeBuilder);
  }

  get paperResponseReviewedPage() {
    return new PaperResponseReviewedPage(this.page, this.axeBuilder);
  }

  get reveiwOcon9xPaperResponsePage() {
    return new ReviewOcon9xPaperResponsePage(this.page, this.axeBuilder);
  }

  get paperResponseAdmissionPage() {
    return new PaperResponseAdmissionPage(this.page, this.axeBuilder);
  }

  get paperResponseDefencePage() {
    return new PaperResponseDefencePage(this.page, this.axeBuilder);
  }

  get mediationPendingPage() {
    return new MediationPendingPage(this.page, this.axeBuilder);
  }

  get mediationSuccessful1Page() {
    return new MediationSuccessful1Page(this.page, this.axeBuilder);
  }

  get mediationSuccessful2Page() {
    return new MediationSuccessful2Page(this.page, this.axeBuilder);
  }

  get mediationUnsuccessfulPage() {
    return new MediationUnsuccessfulPage(this.page, this.axeBuilder);
  }

  get invalidHwfNumberPage() {
    return new InvalidHwfNumberPage(this.page, this.axeBuilder);
  }

  get updatedHwfNumberPage() {
    return new UpdatedHwfNumberPage(this.page, this.axeBuilder);
  }
}
