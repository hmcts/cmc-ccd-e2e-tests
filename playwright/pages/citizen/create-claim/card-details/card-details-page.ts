import users from "../../../../config/users";
import BasePage from "../../../base-page";
import {heading, subHeadings,inputs, dropdowns} from "./card-details-content";


export default class CardDetailsPage extends BasePage{
  async verifyContent() {
    await super.expectHeadingToBeVisible(heading);
  }

  async verifyPaymentSummaryContent() {
    await super.expectSubHeadingToBeVisible(subHeadings.paymentSummary);
    await super.expectLabelToBeVisible(inputs.cardNumber.label);
    await super.expectLabelToBeVisible(inputs.expiryMonth.label);
    await super.expectLabelToBeVisible(inputs.expiryYear.label);
    await super.expectLabelToBeVisible(inputs.nameOnCard.label);
    await super.expectLabelToBeVisible(inputs.securityCode.label);
  }

  async fillCardDetails() {
    await super.fill(inputs.cardNumber.selector, '4444333322221111');
    await super.fill(inputs.expiryMonth.selector, '10');
    await super.fill(inputs.expiryYear.selector, '10');
    await super.fill(inputs.nameOnCard.selector, 'Test');
    await super.fill(inputs.securityCode.selector, '456');
  }

  async verifyBillingAddressContent() {
    await super.expectSubHeadingToBeVisible(subHeadings.billingAddress);
    await super.expectLabelToBeVisible(inputs.addressLine1.label);
    await super.expectLabelToBeVisible(inputs.addressLine2.label);
    await super.expectLabelToBeVisible(inputs.city.label);
    await super.expectLabelToBeVisible(dropdowns.country.label);
    await super.expectLabelToBeVisible(inputs.postcode.label);
  }

  async fillBillingAddressDetails() {
    await super.fill(inputs.addressLine1.selector, '123 Street');
    await super.fill(inputs.city.selector, 'London');
    await super.fill(inputs.postcode.selector, 'E4 6ry');
  }

  async verifyContactDetails() {
    await super.expectSubHeadingToBeVisible(subHeadings.contactDetails);
  }

  async fillContactDetails() {
    await super.fill(inputs.confirmationEmail.selector, users.claimant.email);
  }

  async continue() {
    await super.clickContinue();
  }
}