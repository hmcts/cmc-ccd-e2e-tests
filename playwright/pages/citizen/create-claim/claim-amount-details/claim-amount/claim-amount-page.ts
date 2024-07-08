import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CitizenEvent from '../../../mixins/citizen-events/citizen-events';
import { heading, inputs } from './claim-amount-content';

@AllMethodsStep
export default class ClaimAmountPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
    ]);
  }

  async enterAdditionalAmount() {
    await super.fill(inputs.reason.text, inputs.reason.selector);
    await super.fill(inputs.amount.text, inputs.amount.selector);
    await super.clickSaveAndContinue();
  }
}