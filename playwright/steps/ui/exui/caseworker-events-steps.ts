import BaseSteps from '../../../base/base-steps';
import TestData from '../../../types/test-data';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CaseworkerEventsFactory from '../../../pages/exui/caseworker-events/caseworker-events-factory';
import ExuiDashboardFactory from '../../../pages/exui/exui-dashboard/exui-dashboard-factory';
import CaseworkerEvents from '../../../enums/events/caseworker-events';

@AllMethodsStep()
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
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.CLAIM_NOTES);
    
    const {claimNotesPage} = this.caseworkerEventsFactory;
    await claimNotesPage.verifyContent(this.ccdCaseData);
    await claimNotesPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.CLAIM_NOTES);
  }

  async ChangeClaimantDetails() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.CHANGE_CONTACT_DETAILS);

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
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.CHANGE_CONTACT_DETAILS);

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
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.MANAGE_DOCUMENTS);

    const {manageDocumentsPage} = this.caseworkerEventsFactory;
    await manageDocumentsPage.verifyContent(this.ccdCaseData);

    await manageDocumentsPage.enterDocumentDetais();
    await manageDocumentsPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.MANAGE_DOCUMENTS);
    await caseDetailsPage.verifyUploadedDocuments();
  }

  async InvalidHwfNumber(){
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.INVALID_HWF_REF);

    const {invalidHwfNumberPage} = this.caseworkerEventsFactory;
    await invalidHwfNumberPage.verifyContent(this.ccdCaseData);
    await invalidHwfNumberPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.INVALID_HWF_REF);
  }

  async UpdateHwfNumber(){
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.UPDATED_HWF_NUM);

    const {updatedHwfNumberPage} = this.caseworkerEventsFactory;
    await updatedHwfNumberPage.verifyContent(this.ccdCaseData);
    await updatedHwfNumberPage.enterHwfNumber();
    await updatedHwfNumberPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.UPDATED_HWF_NUM);
  }

  async ResendRpa() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.RESEND_RPA);

    const {resendRpaPage} = this.caseworkerEventsFactory;
    await resendRpaPage.verifyContent(this.ccdCaseData);
    await resendRpaPage.chooseClaimRpa();
    await resendRpaPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.RESEND_RPA);
  }

  async ResetPin() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.RESET_PIN);
    
    const {resetPinPage} = this.caseworkerEventsFactory;
    await resetPinPage.verifyContent(this.ccdCaseData);
    await resetPinPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.RESET_PIN);
  }

  async WaitingToBeTransferred() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.WAITING_TO_BE_TRANSFERRED);
    
    const {waitingToBeTransferredPage} = this.caseworkerEventsFactory;
    await waitingToBeTransferredPage.verifyContent(this.ccdCaseData);
    await waitingToBeTransferredPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.WAITING_TO_BE_TRANSFERRED);
  }

  async LinkLetterHolder() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.LINK_LETTER_HOLDER_ID);
    
    const {linkLetterHolderPage} = this.caseworkerEventsFactory;
    await linkLetterHolderPage.verifyContent(this.ccdCaseData);
    await linkLetterHolderPage.submitEvent();

    // await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.LINK_LETTER_HOLDER_ID);
  }

  async AttachViaBulkScan() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.ATTACH_VIA_BULK_SCAN);
    
    const {attachViaBulkScanPage} = this.caseworkerEventsFactory;
    await attachViaBulkScanPage.verifyContent(this.ccdCaseData);
    await attachViaBulkScanPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.ATTACH_VIA_BULK_SCAN);
  }

  async SupportUpdate() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.SUPPORT_UPDATE);
    
    const {supportUpdatePage} = this.caseworkerEventsFactory;
    await supportUpdatePage.verifyContent(this.ccdCaseData);
    await supportUpdatePage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.SUPPORT_UPDATE);
  }

  async TransferCase() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.TRANSFER_CASE);
    
    const {transferCasePage} = this.caseworkerEventsFactory;
    await transferCasePage.verifyContent(this.ccdCaseData);
    await transferCasePage.fillCourtDetails();
    await transferCasePage.chooseTransferOption();
    await transferCasePage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.TRANSFER_CASE);
  }

  async IssuePaperDefenceForms() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.ISSUE_PAPER_DEFENCE_FORMS);

    const {issuePaperDefenceFormsPage: issuePaperDefenceForms} = this.caseworkerEventsFactory;
    await issuePaperDefenceForms.verifyContent(this.ccdCaseData);
    await issuePaperDefenceForms.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.ISSUE_PAPER_DEFENCE_FORMS);
  }

  async PaperResponseReviewed() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.PAPER_RESP_REVIEWED);

    const {paperResponseReviewedPage} = this.caseworkerEventsFactory;
    await paperResponseReviewedPage.verifyContent(this.ccdCaseData);
    await paperResponseReviewedPage.chooseBulkScanOrEmail();
    await paperResponseReviewedPage.enterOcon9xDocDetails();
    await paperResponseReviewedPage.noScannedDocReviewed();
    await paperResponseReviewedPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.PAPER_RESP_REVIEWED);
  }

  async ReviewOcon9xPaperResponse() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.REVIEW_OCON9X_RESP);

    const {reveiwOcon9xPaperResponsePage} = this.caseworkerEventsFactory;
    await reveiwOcon9xPaperResponsePage.verifyContent(this.ccdCaseData);
    await reveiwOcon9xPaperResponsePage.chooseOcon9xDoc();
    await reveiwOcon9xPaperResponsePage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.REVIEW_OCON9X_RESP);
  }

  async PaperResponseAdmission() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.PAPER_RESP_ADMISSIOON);

    const {paperResponseAdmissionPage} = this.caseworkerEventsFactory;
    await paperResponseAdmissionPage.verifyContent(this.ccdCaseData);
    await paperResponseAdmissionPage.chooseFullAdmit();
    await paperResponseAdmissionPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.PAPER_RESP_ADMISSIOON);
  }

  async PaperResponseDefence() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.PAPER_RESP_DEFENCE);

    const {paperResponseDefencePage} = this.caseworkerEventsFactory;
    await paperResponseDefencePage.verifyContent(this.ccdCaseData);
    await paperResponseDefencePage.chooseDispute();
    await paperResponseDefencePage.chooseNoMediation();
    await paperResponseDefencePage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.PAPER_RESP_DEFENCE);
  }

  async MediationPending() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.REFERRED_MEDIATION);
    
    const {mediationPendingPage} = this.caseworkerEventsFactory;
    await mediationPendingPage.verifyContent(this.ccdCaseData);
    await mediationPendingPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.REFERRED_MEDIATION);
  }

  async MediationSuccessful() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.MEDIATION_SUCCESSFUL);
    
    const {mediationSuccessful1Page} = this.caseworkerEventsFactory;
    await mediationSuccessful1Page.verifyContent(this.ccdCaseData);
    await mediationSuccessful1Page.enterMediationDate();

    const {mediationSuccessful2Page} = this.caseworkerEventsFactory;
    await mediationSuccessful2Page.verifyContent(this.ccdCaseData);
    await mediationSuccessful2Page.enterDocumentDetails();
    await mediationSuccessful2Page.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.MEDIATION_SUCCESSFUL);
  }

  async MediationUnsuccessful() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.MEDIATION_FAILED);
    
    const {mediationUnsuccessfulPage} = this.caseworkerEventsFactory;
    await mediationUnsuccessfulPage.verifyContent(this.ccdCaseData);
    await mediationUnsuccessfulPage.chooseMediationFailedReason();
    await mediationUnsuccessfulPage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.MEDIATION_FAILED);
  }

  async VerifyBreathingSpace() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.ENTER_BREATHING_SPACE);
  }

  async EnterBreathingSpace() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.ENTER_BREATHING_SPACE);
    
    const {enterBreathingSpacePage} = this.caseworkerEventsFactory;
    await enterBreathingSpacePage.verifyContent(this.ccdCaseData);
    await enterBreathingSpacePage.enterBreathingSpaceDetails();
    await enterBreathingSpacePage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.ENTER_BREATHING_SPACE);
  }

  async LiftBreathingSpace() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.LIFT_BREATHING_SPACE);
    
    const {liftBreathingSpacePage} = this.caseworkerEventsFactory;
    await liftBreathingSpacePage.verifyContent(this.ccdCaseData);
    await liftBreathingSpacePage.enterBreathingSpaceDetails();
    await liftBreathingSpacePage.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.LIFT_BREATHING_SPACE);
  }

  async CaseHandedToCCBC() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.CASE_HANDED_TO_CCBC);
    
    const {caseHandedToCCBC} = this.caseworkerEventsFactory;
    await caseHandedToCCBC.verifyContent(this.ccdCaseData);
    await caseHandedToCCBC.submitEvent();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.CASE_HANDED_TO_CCBC);
  }

  async EnterBreathingSpaceError() {
    const {caseDetailsPage} = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(CaseworkerEvents.ENTER_BREATHING_SPACE);
    await caseDetailsPage.verifyBreathingSpaceError();
  }
}
