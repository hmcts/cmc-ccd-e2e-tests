import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import OcmcEvent from '../../ocmc-event/ocmc-event';
import { heading, inputs } from './reference-number-content';

@AllMethodsStep()
export default class ReferenceNumberPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectLabel(inputs.refNum.label),
    ]);
  }

  async enterReferenceNumber() {
    await super.inputText('Ref-1234', inputs.refNum.selector);
    await super.clickContinue();
  }
}
