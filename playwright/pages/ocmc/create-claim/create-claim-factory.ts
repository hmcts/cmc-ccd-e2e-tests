import BasePageFactory from '../../../base/base-page-factory';
import CardDetailsPage from './check-and-submit/card-details/card-details-page';
import ConfirmYourPaymentPage from './check-and-submit/confirm-your-payment/confirm-your-payment-page';
import CreateClaimDashboardPage from './create-claim-dashboard/create-claim-dashboard-page';
import ClaimAmountPage from './claim-amount-details/claim-amount/claim-amount-page';
import ClaimInterestPage from './claim-amount-details/claim-interest/claim-interest-page';
import DefendantEmailPage from './defendant-details/defendant-email/defendant-email-page';
import DefendantPhoneNumberPage from './defendant-details/defendant-phone-number/defendant-phone-number-page';
import HelpWithFeesRefPage from './claim-amount-details/help-with-fees-ref/help-with-fees-ref-page';
import OrganisationDetailsPage from './defendant-details/organisation-details/organisation-details-page';
import PartyTypePage from './defendant-details/party-type/party-type-page';
import CreateClaimDraftPage from './testing-support/create-draft-claim/create-claim-draft-page';
import TestingSupportPage from './testing-support/testing-support/testing-support-page';
import TotalAmountPage from './claim-amount-details/total-amount/total-amount-page';
import CreateClaimConfirmationPage from './check-and-submit/create-claim-confirmation/create-claim-confirmation-page';
import CreateClaimCheckYourAnswersPage from './check-and-submit/create-claim-check-your-answers/create-claim-check-your-answers-page';

export default class CreateClaimFactory extends BasePageFactory {
  get testingSupportPage() {
    return new TestingSupportPage(this.page);
  }

  get createDraftClaimPage() {
    return new CreateClaimDraftPage(this.page);
  }

  get checkYourAnswersPage() {
    return new CreateClaimCheckYourAnswersPage(this.page);
  }

  get cardDetailsPage() {
    return new CardDetailsPage(this.page);
  }

  get confirmYourPaymentPage() {
    return new ConfirmYourPaymentPage(this.page);
  }

  get createClaimConfirmationPage() {
    return new CreateClaimConfirmationPage(this.page);
  }

  get createClaimDashboardPage() {
    return new CreateClaimDashboardPage(this.page);
  }

  get partyTypePage() {
    return new PartyTypePage(this.page);
  }

  get organisationDetailPage() {
    return new OrganisationDetailsPage(this.page);
  }

  get claimAmountPage() {
    return new ClaimAmountPage(this.page);
  }

  get claimInterestPage() {
    return new ClaimInterestPage(this.page);
  }

  get defendantEmailPage() {
    return new DefendantEmailPage(this.page);
  }

  get defendantPhoneNumber() {
    return new DefendantPhoneNumberPage(this.page);
  }

  get helpWithFeesRefPage() {
    return new HelpWithFeesRefPage(this.page);
  }

  get totalAmountPage() {
    return new TotalAmountPage(this.page);
  }
}
