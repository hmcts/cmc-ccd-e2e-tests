import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import OcmcEvent from '../../../ocmc-event/ocmc-event';
import { heading, inputs } from './claim-amount-content';

@AllMethodsStep()
export default class ClaimAmountPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectHeading(heading)]);
  }

  async enterAdditionalAmount() {
    await super.inputText(inputs.reason.text, inputs.reason.selector);
    await super.inputText(inputs.amount.text, inputs.amount.selector);
    await super.clickSaveAndContinue();
  }
}
