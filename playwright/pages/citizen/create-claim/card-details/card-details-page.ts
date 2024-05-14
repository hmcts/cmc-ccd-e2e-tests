import users from '../../../../config/users';
import DateHelper from '../../../../helpers/date-helper';
import BasePage from '../../../../base/base-page';
import {heading, subHeadings,inputs, dropdowns} from './card-details-content';
import { AllMethodsStep } from '../../../../decorators/test-steps';

@AllMethodsStep
export default class CardDetailsPage extends BasePage{
  async verifyContent() {
    await Promise.all([
      super.expectHeadingToBeVisible(heading),
      this.verifyPaymentSummaryContent(),
      this.verifyBillingAddressContent(),
      this.verifyContactDetails(),
    ]);
  }

  private async verifyPaymentSummaryContent() {
    await Promise.all([
      // super.expectSubHeadingToBeVisible(subHeadings.paymentSummary),
      super.expectLabelToBeVisible(inputs.cardNumber.label),
      super.expectLabelToBeVisible(inputs.expiryMonth.label),
      super.expectLabelToBeVisible(inputs.expiryYear.label),
      super.expectLabelToBeVisible(inputs.nameOnCard.label),
      super.expectLabelToBeVisible(inputs.securityCode.label),
    ]);
  }

  async verifyBillingAddressContent() {
    await Promise.all([
      super.expectSubHeadingToBeVisible(subHeadings.billingAddress),
      super.expectLabelToBeVisible(inputs.addressLine1.label),
      super.expectLabelToBeVisible(inputs.addressLine2.label),
      super.expectLabelToBeVisible(inputs.city.label),
      super.expectLabelToBeVisible(dropdowns.country.label),
      super.expectLabelToBeVisible(inputs.postcode.label),
    ]);
  }

  async verifyContactDetails() {
    await super.expectSubHeadingToBeVisible(subHeadings.contactDetails);
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
    await super.clickContinue();
  }
}