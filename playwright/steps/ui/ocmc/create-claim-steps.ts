import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';
import { claimants, defendants } from '../../../config/users';
import CreateClaimFactory from '../../../pages/ocmc/create-claim/create-claim-factory';
import OcmcDashboardFactory from '../../../pages/ocmc/dashboard/ocmc-dashboard-factory';

@AllMethodsStep()
export default class CreateClaimSteps extends BaseSteps {
  private createClaimFactory: CreateClaimFactory;
  private ocmcDashboardFactory: OcmcDashboardFactory;

  constructor(
    createClaimFactory: CreateClaimFactory,
    ocmcDashboardFactory: OcmcDashboardFactory,
    testData: TestData,
  ) {
    super(testData);
    this.createClaimFactory = createClaimFactory;
    this.ocmcDashboardFactory = ocmcDashboardFactory;
  }

  async CreateDraftClaim() {
    const { testingSupportPage } = this.createClaimFactory;
    await testingSupportPage.open();
    await testingSupportPage.verifyContent();
    await testingSupportPage.clickCreateClaimDraft();

    const { createDraftClaimPage } = this.createClaimFactory;
    await createDraftClaimPage.verifyContent();
    await createDraftClaimPage.clickCreateClaimDraft();
  }

  async ChangeDraftClaimDefAsOrg() {
    const { ocmcDashboardPage } = this.ocmcDashboardFactory;
    await ocmcDashboardPage.open();
    await ocmcDashboardPage.continueClaim();

    const { createClaimDashboardPage } = this.createClaimFactory;
    await createClaimDashboardPage.verifyContent();
    await createClaimDashboardPage.theirDetails();

    const { partyTypePage } = this.createClaimFactory;
    await partyTypePage.verifyContent();
    await partyTypePage.chooseOrganisation();

    const { organisationDetailPage } = this.createClaimFactory;
    await organisationDetailPage.verifyContent();
    await organisationDetailPage.enterOrganisationDetails();
    await organisationDetailPage.enterAddressDetails();

    const { defendantEmailPage } = this.createClaimFactory;
    await defendantEmailPage.verifyContent();
    await defendantEmailPage.enterEmail(defendants[this.workerIndex].email);

    const { defendantPhoneNumber } = this.createClaimFactory;
    await defendantPhoneNumber.verifyContent();
    await defendantPhoneNumber.enterPhoneNumber();

    await createClaimDashboardPage.checkAndSubmit();
  }

  async ChangeDraftClaimToHwf() {
    const { ocmcDashboardPage: dashboardPage } = this.ocmcDashboardFactory;
    await dashboardPage.open();
    await dashboardPage.continueClaim();

    const { createClaimDashboardPage } = this.createClaimFactory;
    await createClaimDashboardPage.verifyContent();
    await createClaimDashboardPage.claimAmount();

    const { claimAmountPage } = this.createClaimFactory;
    await claimAmountPage.verifyContent();
    await claimAmountPage.enterAdditionalAmount();

    const { claimInterestPage } = this.createClaimFactory;
    await claimInterestPage.verifyContent();
    await claimInterestPage.selectNoInterest();

    const { helpWithFeesRefPage } = this.createClaimFactory;
    await helpWithFeesRefPage.verifyContent();
    await helpWithFeesRefPage.selectYesToHwf();

    const { totalAmountPage } = this.createClaimFactory;
    await totalAmountPage.verifyContent();
    await totalAmountPage.saveAndContinue();

    await createClaimDashboardPage.checkAndSubmit();
  }

  async CheckAndSubmit() {
    const { checkYourAnswersPage } = this.createClaimFactory;
    await checkYourAnswersPage.verifyContent();
    await checkYourAnswersPage.checkAndSubmit();

    const { cardDetailsPage } = this.createClaimFactory;
    await cardDetailsPage.verifyContent();
    await cardDetailsPage.fillCardDetails();
    await cardDetailsPage.fillBillingAddressDetails();
    await cardDetailsPage.fillContactDetails(claimants[this.workerIndex]);
    await cardDetailsPage.continue();

    const { confirmYourPaymentPage } = this.createClaimFactory;
    await confirmYourPaymentPage.verifyContent();
    await confirmYourPaymentPage.confirm();
  }

  async CheckAndSubmitHwf() {
    const { checkYourAnswersPage } = this.createClaimFactory;
    await checkYourAnswersPage.verifyContent();
    await checkYourAnswersPage.checkAndSubmit();
  }

  async GetClaimReference() {
    const { createClaimConfirmationPage } = this.createClaimFactory;
    await createClaimConfirmationPage.verifyContent();
    this.claimStoreCaseData.referenceNumber = await createClaimConfirmationPage.getClaimRefNumber();
  }

  async GetClaimReferenceHwf() {
    const { createClaimConfirmationPage } = this.createClaimFactory;
    await createClaimConfirmationPage.verifyContent();
    this.claimStoreCaseData.id = await createClaimConfirmationPage.getHwfClaimRefNumber();
  }
}
