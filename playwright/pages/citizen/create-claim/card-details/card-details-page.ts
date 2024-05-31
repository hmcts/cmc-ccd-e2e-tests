import users from '../../../../config/users';
import DateHelper from '../../../../helpers/date-helper';
import BasePage from '../../../../base/base-page';
import {heading, subHeadings,inputs, dropdowns, buttons} from './card-details-content';
import { AllMethodsStep } from '../../../../decorators/test-steps';

@AllMethodsStep
export default class CardDetailsPage extends BasePage{
  async verifyContent() {
    await super.myExpect([
      super.expectHeading(heading),
      this.verifyPaymentSummaryContent(),
      this.verifyBillingAddressContent(),
      this.verifyContactDetails(),
    ]);
  }

  private async verifyPaymentSummaryContent() {
    await super.myExpect([
      // super.expectSubHeadingToBeVisible(subHeadings.paymentSummary),
      super.expectLabel(inputs.cardNumber.label),
      super.expectLabel(inputs.expiryMonth.label),
      super.expectLabel(inputs.expiryYear.label),
      super.expectLabel(inputs.nameOnCard.label),
      super.expectLabel(inputs.securityCode.label),
    ]);
  }

  async verifyBillingAddressContent() {
    await super.myExpect([
      super.expectSubHeading(subHeadings.billingAddress),
      super.expectLabel(inputs.addressLine1.label),
      super.expectLabel(inputs.addressLine2.label),
      super.expectLabel(inputs.city.label),
      super.expectLabel(dropdowns.country.label),
      super.expectLabel(inputs.postcode.label),
    ]);
  }

  async verifyContactDetails() {
    await super.expectSubHeading(subHeadings.contactDetails);
  }

  async fillCardDetails() {
    const date = DateHelper.addToToday({years: 1});
    await super.fill('4444333322221111', inputs.cardNumber.selector);
    await super.fill(DateHelper.getTwoDigitMonth(date), inputs.expiryMonth.selector);
    await super.fill(DateHelper.getTwoDigitYear(date), inputs.expiryYear.selector);
    await super.fill('Test', inputs.nameOnCard.selector);
    await super.fill('456', inputs.securityCode.selector);
  }

  async fillBillingAddressDetails() {
    await super.fill('123 Street', inputs.addressLine1.selector);
    await super.fill('London', inputs.city.selector);
    await super.fill('E4 6ry', inputs.postcode.selector);
  }

  async fillContactDetails() {
    await super.fill(users.claimant.email, inputs.confirmationEmail.selector);
  }

  async continue() {
    await super.clickBySelector(buttons.continue.selector);
  }
}