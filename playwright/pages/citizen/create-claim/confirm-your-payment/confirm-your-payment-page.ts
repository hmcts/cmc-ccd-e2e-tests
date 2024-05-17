import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { heading, subHeadings, tableHeadings } from './confirm-your-payment-content';

@AllMethodsStep
export default class ConfirmYourPaymentPage extends BasePage{
  async verifyContent(): Promise<void> {
    await Promise.all([
      super.expectHeadingToBeVisible(heading),
      this.verifyPaymentSummary(),
    ]);
  }

  private async verifyPaymentSummary() {
    await Promise.all([
      super.expectSubHeadingToBeVisible(subHeadings.paymentSummary),
      super.expectTextToBeVisible(tableHeadings.cardNumber),
      super.expectTextToBeVisible(tableHeadings.expiryDate),
      super.expectTextToBeVisible(tableHeadings.nameOnCard),
    ]);
  }
  
  async confirm() {
    await super.clickConfirm();
  }
}