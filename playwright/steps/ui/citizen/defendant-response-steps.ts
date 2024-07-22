import { defendants } from '../../../config/users';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CitizenDashboardFactory from '../../../pages/citizen/citizen-dashboard/citizen-dashboard-factory';
import LinkClaimFactory from '../../../pages/citizen/link-claim/link-claim-factory';
import DefendantResponseFactory from '../../../pages/citizen/response/defendant/defendant-response-factory';
import IdamFactory from '../../../pages/idam/idam-factory';
import TestData from '../../../types/test-data';
import ResponseSteps from './response-steps';
import ResponseFactory from '../../../pages/citizen/response/response/response-factory';

@AllMethodsStep()
export default class DefendantResponseSteps extends ResponseSteps {
  private linkClaimFactory: LinkClaimFactory;
  private idamFactory: IdamFactory;
  private citizenDashboardFactory: CitizenDashboardFactory;
  private defendantResponseFactory: DefendantResponseFactory;

  constructor(
    linkClaimFactory: LinkClaimFactory, 
    idamFactory: IdamFactory, 
    citizenDashboardFactory: CitizenDashboardFactory, 
    responseFactory: ResponseFactory,
    defendantResponseFactory: DefendantResponseFactory, 
    testData: TestData) {

    super(responseFactory, testData);
    this.linkClaimFactory = linkClaimFactory;
    this.idamFactory = idamFactory;
    this.citizenDashboardFactory = citizenDashboardFactory;
    this.defendantResponseFactory = defendantResponseFactory;

  }

  async LinkClaim() {
    const {respondToClaimPage} = this.linkClaimFactory;
    await respondToClaimPage.goToFirstContact();
    await respondToClaimPage.verifyContent();
    await respondToClaimPage.start();

    const {enterClaimNumberPage} = this.linkClaimFactory;
    await enterClaimNumberPage.verifyContent();
    await enterClaimNumberPage.fillClaimNumber(this.claimStoreCaseData.referenceNumber);

    const {enterSecurityCodePage} = this.linkClaimFactory;
    await enterSecurityCodePage.verifyContent();
    await enterSecurityCodePage.fillSecurityCode(this.claimSecurityPin);

    const {claimDetailsPage} = this.linkClaimFactory;
    await claimDetailsPage.verifyContent(this.claimStoreCaseData.referenceNumber);
    await claimDetailsPage.clickRespondToClaim();

    const {createAccountPage} = this.idamFactory;
    await createAccountPage.verifyContent();
    await createAccountPage.clickSignIn();

    const {loginPage} = this.idamFactory;
    await loginPage.verifyContent();
    await loginPage.citizenLogin(defendants[this.workerIndex]);
  }

  async GoToResponseDashboard() {
    const {defendantClaimDetailsPage} = this.citizenDashboardFactory;
    await defendantClaimDetailsPage.respondToClaim();

    const {defendantResponseDashboardPage} = this.defendantResponseFactory;
    await defendantResponseDashboardPage.verifyContent(this.claimStoreCaseData);
  }

  async ConfirmYourDetails() {
    const {defendantResponseDashboardPage} = this.defendantResponseFactory;
    await defendantResponseDashboardPage.confirmYourDetails();

    const {confirmYourDetailsPage} = this.defendantResponseFactory;
    await confirmYourDetailsPage.verifyContent(this.claimStoreCaseData);
    await confirmYourDetailsPage.saveAndContinue();

    const {dateOfBirthPage} = this.defendantResponseFactory;
    await dateOfBirthPage.verifyContent();
    await dateOfBirthPage.fillDateOfBirth();

    const {phoneNumberPage} = this.defendantResponseFactory;
    await phoneNumberPage.verifyContent();
    await phoneNumberPage.fillPhoneNumber();
  }

  async DecideIfYouNeedMoreTime() {
    const {defendantResponseDashboardPage} = this.defendantResponseFactory;
    await defendantResponseDashboardPage.needMoreTime();

    const {moreTimePage} = this.defendantResponseFactory;
    await moreTimePage.verifyContent();
    await moreTimePage.chooseNo();
  }

  async ChooseResponse() {
    const {defendantResponseDashboardPage} = this.defendantResponseFactory;
    await defendantResponseDashboardPage.chooseResponse();

    const {howDoYouWantToRespondToClaimPage} = this.defendantResponseFactory;
    await howDoYouWantToRespondToClaimPage.verifyContent();
    await howDoYouWantToRespondToClaimPage.rejectAll();

    const {whyYouDontOweMoneyPage} = this.defendantResponseFactory;
    await whyYouDontOweMoneyPage.verifyContent(this.claimStoreCaseData);
    await whyYouDontOweMoneyPage.disputeAll();

    await defendantResponseDashboardPage.verifyContentAfterDisputeAll();
  }

  async WhyYouDisagree() {
    const {defendantResponseDashboardPage} = this.defendantResponseFactory;
    await defendantResponseDashboardPage.whyYouDisagree();

    const {yourDefencePage} = this.defendantResponseFactory;
    await yourDefencePage.verifyContent();
    await yourDefencePage.fillDisagreeReason();

    const {timelinePage} = this.defendantResponseFactory;
    await timelinePage.verifyContent();
    await timelinePage.fillTimelineDetails();

    const {evidencePage} = this.defendantResponseFactory;
    await evidencePage.addEvidence1();
    await evidencePage.addEvidence2();
    await evidencePage.addTheirEvidenceComment();
  }

  async CheckAndSubmit() {
    const {defendantResponseDashboardPage} = this.defendantResponseFactory;
    await defendantResponseDashboardPage.checkAndSubmit();

    const {eligibilityAndDiversityPage} = this.defendantResponseFactory;
    await eligibilityAndDiversityPage.verifyContent();
    await eligibilityAndDiversityPage.chooseNoEligibiltyQuestions();

    const {checkYourAnswersPage} = this.defendantResponseFactory;
    await checkYourAnswersPage.verifyContent();
    await checkYourAnswersPage.submit();

    const {confirmationPage} = this.defendantResponseFactory;
    await confirmationPage.verifyContent();
    await confirmationPage.goToAccount();
  }
}