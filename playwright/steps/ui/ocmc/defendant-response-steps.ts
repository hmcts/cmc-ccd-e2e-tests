import { defendants } from '../../../config/users';
import { AllMethodsStep } from '../../../decorators/test-steps';
import CuiLinkClaimFactory from '../../../pages/cui/link-claim/cui-link-claim-factory';
import IdamFactory from '../../../pages/idam/idam-factory';
import OcmcDashboardFactory from '../../../pages/ocmc/dashboard/ocmc-dashboard-factory';
import OcmcLinkClaimFactory from '../../../pages/ocmc/link-claim/ocmc-link-claim-factory';
import DefendantResponseFactory from '../../../pages/ocmc/response/defendant/defendant-response-factory';
import ResponseFactory from '../../../pages/ocmc/response/response/response-factory';
import TestData from '../../../types/test-data';
import ResponseSteps from './response-steps';

@AllMethodsStep()
export default class DefendantResponseSteps extends ResponseSteps {
  private ocmcLinkClaimFactory: OcmcLinkClaimFactory;
  private cuiLinkClaimFactory: CuiLinkClaimFactory;
  private idamFactory: IdamFactory;
  private ocmcDashboardFactory: OcmcDashboardFactory;
  private defendantResponseFactory: DefendantResponseFactory;

  constructor(
    ocmcLinkClaimFactory: OcmcLinkClaimFactory,
    cuiLinkClaimFactory: CuiLinkClaimFactory,
    idamFactory: IdamFactory,
    ocmcDashboardFactory: OcmcDashboardFactory,
    responseFactory: ResponseFactory,
    defendantResponseFactory: DefendantResponseFactory,
    testData: TestData,
  ) {
    super(responseFactory, testData);
    this.ocmcLinkClaimFactory = ocmcLinkClaimFactory;
    this.cuiLinkClaimFactory = cuiLinkClaimFactory;
    this.idamFactory = idamFactory;
    this.ocmcDashboardFactory = ocmcDashboardFactory;
    this.defendantResponseFactory = defendantResponseFactory;
  }

  async OcmcLinkClaim() {
    const { ocmcRespondToClaimPage } = this.ocmcLinkClaimFactory;
    await ocmcRespondToClaimPage.goToFirstContact();
    await ocmcRespondToClaimPage.verifyContent();
    await ocmcRespondToClaimPage.start();

    const { ocmcEnterClaimNumberPage } = this.ocmcLinkClaimFactory;
    await ocmcEnterClaimNumberPage.verifyContent();
    await ocmcEnterClaimNumberPage.fillClaimNumber(this.claimStoreCaseData.referenceNumber);

    const { ocmcEnterSecurityCodePage } = this.ocmcLinkClaimFactory;
    await ocmcEnterSecurityCodePage.verifyContent();
    await ocmcEnterSecurityCodePage.fillSecurityCode(this.claimSecurityPin);

    const { ocmcClaimDetailsPage } = this.ocmcLinkClaimFactory;
    await ocmcClaimDetailsPage.verifyContent(this.claimStoreCaseData.referenceNumber);
    await ocmcClaimDetailsPage.clickRespondToClaim();

    const { createAccountPage } = this.idamFactory;
    await createAccountPage.verifyContent();
    await createAccountPage.clickSignIn();

    const { loginPage } = this.idamFactory;
    await loginPage.verifyContent();
    await loginPage.ocmcLogin(defendants[this.workerIndex]);
  }

  async CuiLinkClaim() {
    const { cuiRespondToClaimPage } = this.cuiLinkClaimFactory;
    await cuiRespondToClaimPage.goToFirstContact();
    await cuiRespondToClaimPage.verifyContent();
    await cuiRespondToClaimPage.start();

    const { cuiEnterClaimNumberPage } = this.cuiLinkClaimFactory;
    await cuiEnterClaimNumberPage.verifyContent();
    await cuiEnterClaimNumberPage.fillClaimNumber(this.claimStoreCaseData.referenceNumber);

    const { cuiEnterSecurityCodePage } = this.cuiLinkClaimFactory;
    await cuiEnterSecurityCodePage.verifyContent();
    await cuiEnterSecurityCodePage.fillSecurityCode(this.claimSecurityPin);

    const { cuiClaimDetailsPage } = this.cuiLinkClaimFactory;
    await cuiClaimDetailsPage.verifyContent(this.claimStoreCaseData.referenceNumber);
    await cuiClaimDetailsPage.clickRespondToClaim();

    const { createAccountPage } = this.idamFactory;
    await createAccountPage.verifyContent();
    await createAccountPage.clickSignIn();

    const { loginPage } = this.idamFactory;
    await loginPage.verifyContent();
    await loginPage.cuiLogin(defendants[this.workerIndex]);
  }

  async GoToResponseDashboard() {
    const { ocmcDefendantClaimDetailsPage } = this.ocmcDashboardFactory;
    await ocmcDefendantClaimDetailsPage.verifyContent(this.claimStoreCaseData);
    await ocmcDefendantClaimDetailsPage.respondToClaim();

    const { defendantResponseDashboardPage } = this.defendantResponseFactory;
    await defendantResponseDashboardPage.verifyContent(this.claimStoreCaseData);
  }

  async ConfirmYourDetails() {
    const { defendantResponseDashboardPage } = this.defendantResponseFactory;
    await defendantResponseDashboardPage.confirmYourDetails();

    const { confirmYourDetailsPage } = this.defendantResponseFactory;
    await confirmYourDetailsPage.verifyContent(this.claimStoreCaseData);
    await confirmYourDetailsPage.saveAndContinue();

    const { dateOfBirthPage } = this.defendantResponseFactory;
    await dateOfBirthPage.verifyContent();
    await dateOfBirthPage.fillDateOfBirth();

    const { phoneNumberPage } = this.defendantResponseFactory;
    await phoneNumberPage.verifyContent();
    await phoneNumberPage.fillPhoneNumber();
  }

  async DecideIfYouNeedMoreTime() {
    const { defendantResponseDashboardPage } = this.defendantResponseFactory;
    await defendantResponseDashboardPage.needMoreTime();

    const { moreTimePage } = this.defendantResponseFactory;
    await moreTimePage.verifyContent();
    await moreTimePage.chooseNo();
  }

  async ChooseResponse() {
    const { defendantResponseDashboardPage } = this.defendantResponseFactory;
    await defendantResponseDashboardPage.chooseResponse();

    const { howDoYouWantToRespondToClaimPage } = this.defendantResponseFactory;
    await howDoYouWantToRespondToClaimPage.verifyContent();
    await howDoYouWantToRespondToClaimPage.rejectAll();

    const { whyYouDontOweMoneyPage } = this.defendantResponseFactory;
    await whyYouDontOweMoneyPage.verifyContent(this.claimStoreCaseData);
    await whyYouDontOweMoneyPage.disputeAll();

    await defendantResponseDashboardPage.verifyContentAfterDisputeAll();
  }

  async WhyYouDisagree() {
    const { defendantResponseDashboardPage } = this.defendantResponseFactory;
    await defendantResponseDashboardPage.whyYouDisagree();

    const { yourDefencePage } = this.defendantResponseFactory;
    await yourDefencePage.verifyContent();
    await yourDefencePage.fillDisagreeReason();

    const { timelinePage } = this.defendantResponseFactory;
    await timelinePage.verifyContent();
    await timelinePage.fillTimelineDetails();

    const { evidencePage } = this.defendantResponseFactory;
    await evidencePage.addEvidence1();
    await evidencePage.addEvidence2();
    await evidencePage.addTheirEvidenceComment();
  }

  async CheckAndSubmit() {
    const { defendantResponseDashboardPage } = this.defendantResponseFactory;
    await defendantResponseDashboardPage.checkAndSubmit();

    const { eligibilityAndDiversityPage } = this.defendantResponseFactory;
    await eligibilityAndDiversityPage.verifyContent();
    await eligibilityAndDiversityPage.chooseNoEligibiltyQuestions();

    const { defendantResponseCheckYourAnswersPage } = this.defendantResponseFactory;
    await defendantResponseCheckYourAnswersPage.verifyContent();
    await defendantResponseCheckYourAnswersPage.submit();

    const { defendantResponseConfirmationPage } = this.defendantResponseFactory;
    await defendantResponseConfirmationPage.verifyContent();
  }
}
