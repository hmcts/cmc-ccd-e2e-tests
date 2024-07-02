import BaseSteps from '../../../base/base-steps';
import TestData from '../../../types/test-data';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CaseworkerEventsFactory from '../../../pages/exui/caseworker-events/caseworker-events-factory';
import ExuiDashboardFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-factory';
import CaseworkerEvents from '../../../enums/events/caseworker-events';

@AllMethodsStep
export default class CaseworkerEventsSteps extends BaseSteps {
  private caseworkerEventsFactory: CaseworkerEventsFactory;
  private exuiDashboardFactory: ExuiDashboardFactory;

  constructor(caseworkerEventsFactory: CaseworkerEventsFactory, exuiDashboardFactory: ExuiDashboardFactory, testData: TestData) {
    super(testData);
    this.caseworkerEventsFactory = caseworkerEventsFactory;
    this.exuiDashboardFactory = exuiDashboardFactory;
  }

  async ClaimNotes() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(CaseworkerEvents.CLAIM_NOTES);
    
    const {claimNotesPage} = this.caseworkerEventsFactory;
    await claimNotesPage.verifyContent(this.ccdCaseData);
    await claimNotesPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.CLAIM_NOTES);
  }

  async ChangeClaimantDetails() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(CaseworkerEvents.CHANGE_CONTACT_DETAILS);

    const {changeContactDetailsPage} = this.caseworkerEventsFactory;
    await changeContactDetailsPage.verifyContent(this.ccdCaseData);
    await changeContactDetailsPage.clickClaimant();
    await changeContactDetailsPage.verifyClaimantContent(this.ccdCaseData.applicants[0].value);
    await changeContactDetailsPage.changeClaimantDetails();
    await changeContactDetailsPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.CHANGE_CONTACT_DETAILS);
    await caseDetailsPage.verifyNewClaimantDetails();
  }

  async ChangeDefendantDetails() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(CaseworkerEvents.CHANGE_CONTACT_DETAILS);

    const {changeContactDetailsPage} = this.caseworkerEventsFactory;
    await changeContactDetailsPage.verifyContent(this.ccdCaseData);
    await changeContactDetailsPage.clickDefendant();
    await changeContactDetailsPage.enterDefendantDetails();
    await changeContactDetailsPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.CHANGE_CONTACT_DETAILS);
    await caseDetailsPage.verifyNewDefendantDetails();
  }

  async ManageDocuments(){
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(CaseworkerEvents.MANAGE_DOCUMENTS);

    const {manageDocumentsPage} = this.caseworkerEventsFactory;
    await manageDocumentsPage.verifyContent(this.ccdCaseData);

    await manageDocumentsPage.addDocument();
    await manageDocumentsPage.fillDocument1Details();

    await manageDocumentsPage.addDocument();
    await manageDocumentsPage.fillDocument2Details();

    await manageDocumentsPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.MANAGE_DOCUMENTS);
    await caseDetailsPage.verifyUploadedDocuments();
  }

  async ResendRpa() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(CaseworkerEvents.RESEND_RPA);

    const {resendRpaPage} = this.caseworkerEventsFactory;
    await resendRpaPage.verifyContent(this.ccdCaseData);
    await resendRpaPage.chooseClaimRpa();
    await resendRpaPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.RESEND_RPA);
  }

  async ResetPin() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(CaseworkerEvents.RESET_PIN);
    
    const {resetPinPage} = this.caseworkerEventsFactory;
    await resetPinPage.verifyContent(this.ccdCaseData);
    await resetPinPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.RESET_PIN);
  }

  async WaitingToBeTransferred() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(CaseworkerEvents.WAITING_TO_BE_TRANSFERRED);
    
    const {waitingToBeTransferredPage} = this.caseworkerEventsFactory;
    await waitingToBeTransferredPage.verifyContent(this.ccdCaseData);
    await waitingToBeTransferredPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.WAITING_TO_BE_TRANSFERRED);
  }

  async LinkLetterHolder() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(CaseworkerEvents.LINK_LETTER_HOLDER_ID);
    
    const {linkLetterHolderPage} = this.caseworkerEventsFactory;
    await linkLetterHolderPage.verifyContent(this.ccdCaseData);
    await linkLetterHolderPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.LINK_LETTER_HOLDER_ID);
  }

  async AttachViaBulkScan() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(CaseworkerEvents.ATTACH_VIA_BULK_SCAN);
    
    const {attachViaBulkScanPage} = this.caseworkerEventsFactory;
    await attachViaBulkScanPage.verifyContent(this.ccdCaseData);
    await attachViaBulkScanPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.ATTACH_VIA_BULK_SCAN);
  }

  async SupportUpdate() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(CaseworkerEvents.SUPPORT_UPDATE);
    
    const {supportUpdatePage} = this.caseworkerEventsFactory;
    await supportUpdatePage.verifyContent(this.ccdCaseData);
    await supportUpdatePage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.SUPPORT_UPDATE);
  }

  async TransferCase() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(CaseworkerEvents.TRANSFER_CASE);
    
    const {transferCasePage} = this.caseworkerEventsFactory;
    await transferCasePage.verifyContent(this.ccdCaseData);
    await transferCasePage.fillCourtDetails();
    await transferCasePage.chooseTransferOption();
    await transferCasePage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.TRANSFER_CASE);
  }
}
