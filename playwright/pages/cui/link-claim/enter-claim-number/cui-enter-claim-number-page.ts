import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CuiEvent from '../../cui-event/cui-event';
import { heading, inputs, paragraphs } from './cui-enter-claim-number-content';

@AllMethodsStep()
export default class CuiEnterClaimNumberPage extends CuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
      super.expectLabel(inputs.claimNumber.label),
    ]);
  }

  async fillClaimNumber(claimNumber: string) {
    await super.inputText(claimNumber, inputs.claimNumber.selector);
    await super.clickSubmit();
  }
}
