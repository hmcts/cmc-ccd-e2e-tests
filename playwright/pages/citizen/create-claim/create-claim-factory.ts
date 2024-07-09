import BasePageFactory from '../../../base/base-page-factory';
import CardDetailsPage from './check-and-submit/card-details/card-details-page';
import CheckYourAnswersPage from './check-and-submit/check-your-answers/check-your-answers-page';
import ConfirmYourPaymentPage from './check-and-submit/confirm-your-payment/confirm-your-payment-page';
import ConfirmationPage from './check-and-submit/confirmation/confirmation-page';
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

export default class CreateClaimFactory extends BasePageFactory {
  
  get testingSupportPage() {
    return new TestingSupportPage(this.page, this.axeBuilder);
  }

  get createDraftClaimPage() {
    return new CreateClaimDraftPage(this.page, this.axeBuilder);
  }

  get checkYourAnswersPage() {
    return new CheckYourAnswersPage(this.page, this.axeBuilder);
  }

  get cardDetailsPage() {
    return new CardDetailsPage(this.page, this.axeBuilder);
  }

  get confirmYourPaymentPage() {
    return new ConfirmYourPaymentPage(this.page, this.axeBuilder);
  }

  get confirmationPage() {
    return new ConfirmationPage(this.page, this.axeBuilder);
  }

  get createClaimDashboardPage() {
    return new CreateClaimDashboardPage(this.page, this.axeBuilder);
  }

  get partyTypePage() {
    return new PartyTypePage(this.page, this.axeBuilder);
  }

  get organisationDetailPage() {
    return new OrganisationDetailsPage(this.page, this.axeBuilder);
  }

  get claimAmountPage() {
    return new ClaimAmountPage(this.page, this.axeBuilder);
  }

  get claimInterestPage() {
    return new ClaimInterestPage(this.page, this.axeBuilder);
  }

  get defendantEmailPage() {
    return new DefendantEmailPage(this.page, this.axeBuilder);
  }

  get defendantPhoneNumber() {
    return new DefendantPhoneNumberPage(this.page, this.axeBuilder);
  }

  get helpWithFeesRefPage() {
    return new HelpWithFeesRefPage(this.page, this.axeBuilder);
  }

  get totalAmountPage() {
    return new TotalAmountPage(this.page, this.axeBuilder);
  }
}