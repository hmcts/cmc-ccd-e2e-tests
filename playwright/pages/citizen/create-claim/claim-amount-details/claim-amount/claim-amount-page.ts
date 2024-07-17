import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CitizenEvent from '../../../citizen-event/citizen-event';
import { heading, inputs } from './claim-amount-content';

@AllMethodsStep
export default class ClaimAmountPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
    ]);
  }

  async enterAdditionalAmount() {
    await super.fill(inputs.reason.text, inputs.reason.selector);
    await super.fill(inputs.amount.text, inputs.amount.selector);
    await super.clickSaveAndContinue();
  }
}