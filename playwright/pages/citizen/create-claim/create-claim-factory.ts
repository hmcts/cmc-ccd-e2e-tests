import BaseFactory from '../../../base/base-factory';
import CardDetailsPage from './card-details/card-details-page';
import CheckYourAnswersPage from './check-your-answers/check-your-answers-page';
import ConfirmYourPaymentPage from './confirm-your-payment/confirm-your-payment-page';
import ConfirmationPage from './confirmation/confirmation-page';
import CreateClaimDraftPage from './create-draft-claim/create-claim-draft-page';
import TestingSupportPage from './testing-support/testing-support-page';

export default class CreateClaimFactory extends BaseFactory {
  
  get testingSupportPage() {
    return new TestingSupportPage(this.page);
  }

  get createDraftClaimPage() {
    return new CreateClaimDraftPage(this.page);
  }

  get checkYourAnswersPage() {
    return new CheckYourAnswersPage(this.page);
  }

  get cardDetailsPage() {
    return new CardDetailsPage(this.page);
  }

  get confirmYourPaymentPage() {
    return new ConfirmYourPaymentPage(this.page);
  }

  get confirmationPage() {
    return new ConfirmationPage(this.page);
  }
}