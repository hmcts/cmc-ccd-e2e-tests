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
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.CLAIM_NOTES);

    const { claimNotesSubmitPage } = this.caseworkerEventsFactory;
    await claimNotesSubmitPage.verifyContent(this.ccdCaseData);
    await claimNotesSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.CLAIM_NOTES);
  }

  async ChangeClaimantDetails() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.CHANGE_CONTACT_DETAILS);

    const { changeContactDetails1Page } = this.caseworkerEventsFactory;
    await changeContactDetails1Page.verifyContent(this.ccdCaseData);
    await changeContactDetails1Page.clickClaimant();
    await changeContactDetails1Page.verifyClaimantContent(this.ccdCaseData.applicants[0].value);
    await changeContactDetails1Page.changeClaimantDetails();
    await changeContactDetails1Page.submit();

    const { changeContactDetails2Page } = this.caseworkerEventsFactory;
    await changeContactDetails2Page.verifyContent(this.ccdCaseData);
    await changeContactDetails2Page.submit();

    const { changeContactDetailsSubmitPage } = this.caseworkerEventsFactory;
    await changeContactDetailsSubmitPage.verifyContent(this.ccdCaseData);
    await changeContactDetailsSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.CHANGE_CONTACT_DETAILS);
    await caseDetailsPage.verifyNewClaimantDetails();
  }

  async ChangeDefendantDetails() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.CHANGE_CONTACT_DETAILS);

    const { changeContactDetails1Page } = this.caseworkerEventsFactory;
    await changeContactDetails1Page.verifyContent(this.ccdCaseData);
    await changeContactDetails1Page.clickDefendant();
    await changeContactDetails1Page.enterDefendantDetails();
    await changeContactDetails1Page.submit();

    const { changeContactDetails2Page } = this.caseworkerEventsFactory;
    await changeContactDetails2Page.verifyContent(this.ccdCaseData);
    await changeContactDetails2Page.submit();

    const { changeContactDetailsSubmitPage } = this.caseworkerEventsFactory;
    await changeContactDetailsSubmitPage.verifyContent(this.ccdCaseData);
    await changeContactDetailsSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.CHANGE_CONTACT_DETAILS);
    await caseDetailsPage.verifyNewDefendantDetails();
  }

  async ManageDocuments() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.MANAGE_DOCUMENTS);

    const { manageDocumentsPage } = this.caseworkerEventsFactory;
    await manageDocumentsPage.verifyContent(this.ccdCaseData);
    await manageDocumentsPage.enterDocumentDetais();
    await manageDocumentsPage.submit();

    const { manageDocumentsSubmitPage } = this.caseworkerEventsFactory;
    await manageDocumentsSubmitPage.verifyContent(this.ccdCaseData);
    await manageDocumentsSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.MANAGE_DOCUMENTS);
    await caseDetailsPage.verifyUploadedDocuments();
  }

  async InvalidHwfNumber() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.INVALID_HWF_REF);

    const { invalidHwfNumberPage } = this.caseworkerEventsFactory;
    await invalidHwfNumberPage.verifyContent(this.ccdCaseData);
    await invalidHwfNumberPage.submit();

    const { invalidHwfNumberSubmitPage } = this.caseworkerEventsFactory;
    await invalidHwfNumberSubmitPage.verifyContent(this.ccdCaseData);
    await invalidHwfNumberSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.INVALID_HWF_REF);
  }

  async UpdatedHwfNumber() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.UPDATED_HWF_NUM);

    const { updatedHwfNumberPage } = this.caseworkerEventsFactory;
    await updatedHwfNumberPage.verifyContent(this.ccdCaseData);
    await updatedHwfNumberPage.enterHwfNumber();
    await updatedHwfNumberPage.submit();

    const { updatedHwfNumberSubmitPage } = this.caseworkerEventsFactory;
    await updatedHwfNumberSubmitPage.verifyContent(this.ccdCaseData);
    await updatedHwfNumberSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.UPDATED_HWF_NUM);
  }

  async ResendRpa() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.RESEND_RPA);

    const { resendRpaPage } = this.caseworkerEventsFactory;
    await resendRpaPage.verifyContent(this.ccdCaseData);
    await resendRpaPage.chooseClaimRpa();
    await resendRpaPage.submit();

    const { resendRpaSubmitPage } = this.caseworkerEventsFactory;
    await resendRpaSubmitPage.verifyContent(this.ccdCaseData);
    await resendRpaSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.RESEND_RPA);
  }

  async ResetPin() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.RESET_PIN);

    const { resetPinSubmitPage } = this.caseworkerEventsFactory;
    await resetPinSubmitPage.verifyContent(this.ccdCaseData);
    await resetPinSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.RESET_PIN);
  }

  async WaitingToBeTransferred() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.WAITING_TO_BE_TRANSFERRED);

    const { waitingToBeTransferredSubmitPage } = this.caseworkerEventsFactory;
    await waitingToBeTransferredSubmitPage.verifyContent(this.ccdCaseData);
    await waitingToBeTransferredSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.WAITING_TO_BE_TRANSFERRED);
  }

  async LinkLetterHolder() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.LINK_LETTER_HOLDER_ID);

    const { linkLetterHolderSubmitPage } = this.caseworkerEventsFactory;
    await linkLetterHolderSubmitPage.verifyContent(this.ccdCaseData);
    await linkLetterHolderSubmitPage.submit();

    // await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.LINK_LETTER_HOLDER_ID);
  }

  async AttachViaBulkScan() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.ATTACH_VIA_BULK_SCAN);

    const { attachViaBulkScanSubmitPage } = this.caseworkerEventsFactory;
    await attachViaBulkScanSubmitPage.verifyContent(this.ccdCaseData);
    await attachViaBulkScanSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.ATTACH_VIA_BULK_SCAN);
  }

  async SupportUpdate() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.SUPPORT_UPDATE);

    const { supportUpdateSubmitPage } = this.caseworkerEventsFactory;
    await supportUpdateSubmitPage.verifyContent(this.ccdCaseData);
    await supportUpdateSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.SUPPORT_UPDATE);
  }

  async TransferCase() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.TRANSFER_CASE);

    const { transferCasePage } = this.caseworkerEventsFactory;
    await transferCasePage.verifyContent(this.ccdCaseData);
    await transferCasePage.fillCourtDetails();
    await transferCasePage.chooseTransferOption();
    await transferCasePage.submit();

    const { transferCaseSubmitPage } = this.caseworkerEventsFactory;
    await transferCaseSubmitPage.verifyContent(this.ccdCaseData);
    await transferCaseSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.TRANSFER_CASE);
  }

  async IssuePaperDefenceForms() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.ISSUE_PAPER_DEFENCE_FORMS);

    const { issuePaperDefenceFormsSubmitPage } = this.caseworkerEventsFactory;
    await issuePaperDefenceFormsSubmitPage.verifyContent(this.ccdCaseData);
    await issuePaperDefenceFormsSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.ISSUE_PAPER_DEFENCE_FORMS);
  }

  async PaperResponseReviewed() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.PAPER_RESP_REVIEWED);

    const { paperResponseReviewed1Page } = this.caseworkerEventsFactory;
    await paperResponseReviewed1Page.verifyContent(this.ccdCaseData);
    await paperResponseReviewed1Page.chooseBulkScanOrEmail();
    await paperResponseReviewed1Page.enterOcon9xDocDetails();
    await paperResponseReviewed1Page.submit();

    const { paperResponseReviewed2Page } = this.caseworkerEventsFactory;
    await paperResponseReviewed2Page.verifyContent(this.ccdCaseData);
    await paperResponseReviewed2Page.noScannedDocReviewed();
    await paperResponseReviewed2Page.submit();

    const { paperResponseReviewedSubmitPage } = this.caseworkerEventsFactory;
    await paperResponseReviewedSubmitPage.verifyContent(this.ccdCaseData);
    await paperResponseReviewedSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.PAPER_RESP_REVIEWED);
  }

  async ReviewOcon9xPaperResponse() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.REVIEW_OCON9X_RESP);

    const { reveiwOcon9xPaperResponsePage } = this.caseworkerEventsFactory;
    await reveiwOcon9xPaperResponsePage.verifyContent(this.ccdCaseData);
    await reveiwOcon9xPaperResponsePage.chooseOcon9xDoc();
    await reveiwOcon9xPaperResponsePage.submit();

    const { reveiwOcon9xPaperResponseSubmitPage } = this.caseworkerEventsFactory;
    await reveiwOcon9xPaperResponseSubmitPage.verifyContent(this.ccdCaseData);
    await reveiwOcon9xPaperResponseSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.REVIEW_OCON9X_RESP);
  }

  async PaperResponseAdmission() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.PAPER_RESP_ADMISSIOON);

    const { paperResponseAdmissionPage } = this.caseworkerEventsFactory;
    await paperResponseAdmissionPage.verifyContent(this.ccdCaseData);
    await paperResponseAdmissionPage.chooseFullAdmit();
    await paperResponseAdmissionPage.submit();

    const { paperResponseAdmissionSubmitPage } = this.caseworkerEventsFactory;
    await paperResponseAdmissionSubmitPage.verifyContent(this.ccdCaseData);
    await paperResponseAdmissionSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.PAPER_RESP_ADMISSIOON);
  }

  async PaperResponseDefence() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.PAPER_RESP_DEFENCE);

    const { paperResponseDefencePage } = this.caseworkerEventsFactory;
    await paperResponseDefencePage.verifyContent(this.ccdCaseData);
    await paperResponseDefencePage.chooseDispute();
    await paperResponseDefencePage.chooseNoMediation();
    await paperResponseDefencePage.submit();

    const { paperResponseDefenceSubmitPage } = this.caseworkerEventsFactory;
    await paperResponseDefenceSubmitPage.verifyContent(this.ccdCaseData);
    await paperResponseDefenceSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.PAPER_RESP_DEFENCE);
  }

  async MediationPending() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.REFERRED_MEDIATION);

    const { mediationPendingSubmitPage } = this.caseworkerEventsFactory;
    await mediationPendingSubmitPage.verifyContent(this.ccdCaseData);
    await mediationPendingSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.REFERRED_MEDIATION);
  }

  async MediationSuccessful() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.MEDIATION_SUCCESSFUL);

    const { mediationSuccessful1Page } = this.caseworkerEventsFactory;
    await mediationSuccessful1Page.verifyContent(this.ccdCaseData);
    await mediationSuccessful1Page.enterMediationDate();
    await mediationSuccessful1Page.submit();

    const { mediationSuccessful2Page } = this.caseworkerEventsFactory;
    await mediationSuccessful2Page.verifyContent(this.ccdCaseData);
    await mediationSuccessful2Page.enterDocumentDetails();
    await mediationSuccessful2Page.submit();

    const { mediationPendingSubmitPage } = this.caseworkerEventsFactory;
    await mediationPendingSubmitPage.verifyContent(this.ccdCaseData);
    await mediationPendingSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.MEDIATION_SUCCESSFUL);
  }

  async MediationUnsuccessful() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.MEDIATION_FAILED);

    const { mediationUnsuccessfulPage } = this.caseworkerEventsFactory;
    await mediationUnsuccessfulPage.verifyContent(this.ccdCaseData);
    await mediationUnsuccessfulPage.chooseMediationFailedReason();
    await mediationUnsuccessfulPage.submit();

    const { mediationUnsuccessfulSubmitPage } = this.caseworkerEventsFactory;
    await mediationUnsuccessfulSubmitPage.verifyContent(this.ccdCaseData);
    await mediationUnsuccessfulSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.MEDIATION_FAILED);
  }

  async VerifyBreathingSpace() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.ENTER_BREATHING_SPACE);
  }

  async EnterBreathingSpace() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.ENTER_BREATHING_SPACE);

    const { enterBreathingSpace1Page } = this.caseworkerEventsFactory;
    await enterBreathingSpace1Page.verifyContent(this.ccdCaseData);
    await enterBreathingSpace1Page.submit();

    const { enterBreathingSpace2Page } = this.caseworkerEventsFactory;
    await enterBreathingSpace2Page.verifyContent(this.ccdCaseData);
    await enterBreathingSpace2Page.enterBreathingSpaceDetails();
    await enterBreathingSpace2Page.submit();

    const { enterBreathingSpaceSubmitPage } = this.caseworkerEventsFactory;
    await enterBreathingSpaceSubmitPage.verifyContent(this.ccdCaseData);
    await enterBreathingSpaceSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.ENTER_BREATHING_SPACE);
  }

  async LiftBreathingSpace() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.LIFT_BREATHING_SPACE);

    const { liftBreathingSpacePage } = this.caseworkerEventsFactory;
    await liftBreathingSpacePage.verifyContent(this.ccdCaseData);
    await liftBreathingSpacePage.enterBreathingSpaceDetails();
    await liftBreathingSpacePage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.LIFT_BREATHING_SPACE);
  }

  async CaseHandedToCCBC() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.retryChooseNextStep(CaseworkerEvents.CASE_HANDED_TO_CCBC);

    const { caseHandedToCCBCSubmitPage } = this.caseworkerEventsFactory;
    await caseHandedToCCBCSubmitPage.verifyContent(this.ccdCaseData);
    await caseHandedToCCBCSubmitPage.submit();

    await caseDetailsPage.verifySuccessEvent(this.ccdCaseData.id, CaseworkerEvents.CASE_HANDED_TO_CCBC);
  }

  async EnterBreathingSpaceError() {
    const { caseDetailsPage } = this.exuiDashboardFactory;
    await caseDetailsPage.chooseNextStep(CaseworkerEvents.ENTER_BREATHING_SPACE);
    await caseDetailsPage.verifyBreathingSpaceError();
  }
}
