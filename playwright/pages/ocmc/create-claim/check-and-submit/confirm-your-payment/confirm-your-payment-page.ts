import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { buttons, heading, subheadings, tableHeadings } from './confirm-your-payment-content';

@AllMethodsStep()
export default class ConfirmYourPaymentPage extends BasePage {
  async verifyContent(): Promise<void> {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubheading(subheadings.paymentSummary),
      super.expectText(tableHeadings.cardNumber),
      super.expectText(tableHeadings.expiryDate),
      super.expectText(tableHeadings.nameOnCard),
    ]);
  }

  async confirm() {
    await super.clickBySelector(buttons.confirm.selector);
  }
}
