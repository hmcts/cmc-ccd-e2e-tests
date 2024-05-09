import users from '../../../../config/users';
import DateHelper from '../../../../helpers/date-helper';
import BasePage from '../../../../base/base-page';
import {heading, subHeadings,inputs, dropdowns} from './card-details-content';

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
    await super.fill(inputs.cardNumber.selector, '4444333322221111');
    await super.fill(inputs.expiryMonth.selector, DateHelper.getTwoDigitMonth(date));
    await super.fill(inputs.expiryYear.selector, DateHelper.getTwoDigitYear(date));
    await super.fill(inputs.nameOnCard.selector, 'Test');
    await super.fill(inputs.securityCode.selector, '456');
  }

  async fillBillingAddressDetails() {
    await super.fill(inputs.addressLine1.selector, '123 Street');
    await super.fill(inputs.city.selector, 'London');
    await super.fill(inputs.postcode.selector, 'E4 6ry');
  }

  async fillContactDetails() {
    await super.fill(inputs.confirmationEmail.selector, users.claimant.email);
  }

  async continue() {
    await super.clickContinue();
  }
}