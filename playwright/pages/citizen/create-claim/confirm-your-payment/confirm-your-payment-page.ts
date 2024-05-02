import BasePage from "../../../base-page";
import { heading, subHeadings, tableHeadings } from "./confirm-your-payment-content";

export default class ConfirmYourPaymentPage extends BasePage{
  async verifyContent(): Promise<void> {
    await super.expectHeadingToBeVisible(heading);
    await this.verifyPaymentSummary();
  }

  private async verifyPaymentSummary() {
    await super.expectSubHeadingToBeVisible(subHeadings.paymentSummary);
    await super.expectTextToBeVisible(tableHeadings.cardNumber);
    await super.expectTextToBeVisible(tableHeadings.expiryDate);
    await super.expectTextToBeVisible(tableHeadings.nameOnCard);
  }
  
  async confirm() {
    await super.clickConfirm();
  }
}