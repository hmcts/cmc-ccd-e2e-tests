import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import OcmcEvent from '../../ocmc-event/ocmc-event';
import { heading, inputs, paragraphs } from './ocmc-enter-claim-number-content';

@AllMethodsStep()
export default class OcmcEnterClaimNumberPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
      super.expectLabel(inputs.claimNumber.label),
    ]);
  }

  async fillClaimNumber(claimNumber: string) {
    await super.inputText(claimNumber, inputs.claimNumber.selector);
    await super.clickContinue();
  }
}
