import { Page } from '@playwright/test';
import CreateClaimFactory from "../../../pages/citizen/create-claim/create-claim-factory";

export default class CreateClaimSteps {
  private createClaimFactory: CreateClaimFactory;

  constructor(page: Page) {
    this.createClaimFactory = new CreateClaimFactory(page)
  }

  private async createDraftClaim() {
    const {testingSupportPage} = this.createClaimFactory;
    await testingSupportPage.open();
    await testingSupportPage.verifyContent()
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
    await confirmYourPaymentPage.pause();
  }

  async CreateClaimDefAsIndividual() {
    await this.createDraftClaim();
    await this.checkAndMakePayment();
  }
}