import CreateClaimFactory from '../../../pages/citizen/create-claim/create-claim-factory';
import BaseSteps from '../../../base/base-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../types/test-data';

@AllMethodsStep
export default class CreateClaimSteps extends BaseSteps{
  private createClaimFactory: CreateClaimFactory;

  constructor(createClaimFactory: CreateClaimFactory, testData: TestData) {
    super(testData);
    this.createClaimFactory = createClaimFactory;
  }

  private async createDraftClaim() {
    const {testingSupportPage} = this.createClaimFactory;
    await testingSupportPage.open();
    await testingSupportPage.verifyContent();
    await testingSupportPage.clickCreateClaimDraft();

    const {createDraftClaimPage} = this.createClaimFactory;
    await createDraftClaimPage.verifyContent();
    await createDraftClaimPage.clickCreateClaimDraft();
  }

  private async checkAndMakePayment() {
    const {checkYourAnswersPage} = this.createClaimFactory;
    await checkYourAnswersPage.verifyContent();
    await checkYourAnswersPage.checkAndSubmit();

    const {cardDetailsPage} = this.createClaimFactory;
    await cardDetailsPage.verifyContent();
    await cardDetailsPage.fillCardDetails();
    await cardDetailsPage.fillBillingAddressDetails();
    await cardDetailsPage.fillContactDetails();
    await cardDetailsPage.continue();

    const {confirmYourPaymentPage} = this.createClaimFactory;
    await confirmYourPaymentPage.verifyContent();
    await confirmYourPaymentPage.confirm();
  }

  private async getClaimRefFromConfirmation()  {
    const {confirmationPage} = this.createClaimFactory;
    await confirmationPage.verifyContent();
    this.claimStoreCaseData.referenceNumber = await confirmationPage.getClaimRefNumber();
  }
  
  async CreateClaimDefAsIndividual() {
    await this.createDraftClaim();
    await this.checkAndMakePayment();
    await this.getClaimRefFromConfirmation();
  }
}