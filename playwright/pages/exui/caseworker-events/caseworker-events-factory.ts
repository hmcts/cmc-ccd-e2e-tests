import BasePageFactory from '../../../base/base-page-factory';
import AttachViaBulkScanPage from './attach-via-bulk-scan/attach-via-bulk-scan-page';
import ChangeContactDetailsPage from './change-contact-details/change-contact-details-page';
import ClaimNotesPage from './claim-notes/claim-notes-page';
import LinkLetterHolderPage from './link-letter-holder/link-letter-holder-page';
import ResendRpaPage from './resend-rpa/resend-rpa-page';
import ResetPinPage from './reset-pin/reset-pin-page';
import SupportUpdatePage from './support-update/support-update-page';
import TransferCasePage from './transfer-case/transfer-case-page';
import WaitingToBeTransferredPage from './waiting-to-be-transferred/waiting-to-be-transferred-page';

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
}