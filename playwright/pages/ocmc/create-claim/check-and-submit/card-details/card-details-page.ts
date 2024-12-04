import DateHelper from '../../../../../helpers/date-helper';
import BasePage from '../../../../../base/base-page';
import { heading, subheadings, inputs, dropdowns, buttons } from './card-details-content';
import { Step } from '../../../../../decorators/test-steps';
import User from '../../../../../models/user';

const classKey = 'CardDetailsPage';

export default class CardDetailsPage extends BasePage {
  @Step(classKey)
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      this.verifyPaymentSummaryContent(),
      this.verifyBillingAddressContent(),
      this.verifyContactDetails(),
    ]);
  }

  private async verifyPaymentSummaryContent() {
    await Promise.all([
      // super.expectSubheadingToBeVisible(subheadings.paymentSummary),
      super.expectLabel(inputs.cardNumber.label),
      super.expectLabel(inputs.expiryMonth.label),
      super.expectLabel(inputs.expiryYear.label),
      super.expectLabel(inputs.nameOnCard.label),
      super.expectLabel(inputs.securityCode.label),
    ]);
  }

  private async verifyBillingAddressContent() {
    await Promise.all([
      super.expectSubheading(subheadings.billingAddress),
      super.expectLabel(inputs.addressLine1.label),
      super.expectLabel(inputs.addressLine2.label),
      super.expectLabel(inputs.city.label),
      super.expectLabel(dropdowns.country.label),
      super.expectLabel(inputs.postcode.label),
    ]);
  }

  private async verifyContactDetails() {
    await super.expectSubheading(subheadings.contactDetails);
  }

  @Step(classKey)
  async fillCardDetails() {
    const date = DateHelper.addToToday({ years: 1 });
    await super.inputText('4444333322221111', inputs.cardNumber.selector);
    await super.inputText(DateHelper.getTwoDigitMonth(date), inputs.expiryMonth.selector);
    await super.inputText(DateHelper.getTwoDigitYear(date), inputs.expiryYear.selector);
    await super.inputText('Test', inputs.nameOnCard.selector);
    await super.inputText('456', inputs.securityCode.selector);
  }

  @Step(classKey)
  async fillBillingAddressDetails() {
    await super.inputText('123 Street', inputs.addressLine1.selector);
    await super.inputText('London', inputs.city.selector);
    await super.inputText('E4 6ry', inputs.postcode.selector);
  }

  @Step(classKey)
  async fillContactDetails({ email }: User) {
    await super.inputText(email, inputs.confirmationEmail.selector);
  }

  @Step(classKey)
  async continue() {
    await super.clickBySelector(buttons.continue.selector);
  }
}
