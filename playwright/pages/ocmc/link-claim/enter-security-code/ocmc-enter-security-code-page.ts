import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import OcmcEvent from '../../ocmc-event/ocmc-event';
import { heading, inputs, paragraphs } from './ocmc-enter-security-code-content';

@AllMethodsStep()
export default class OcmcEnterSecurityCodePage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
      super.expectLabel(inputs.securityCode.label),
    ]);
  }

  async fillSecurityCode(securityCode: string) {
    await super.inputText(securityCode, inputs.securityCode.selector);
    await super.clickContinue();
  }
}
