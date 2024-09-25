import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CuiEvent from '../../cui-event/cui-event';
import { heading, inputs, paragraphs } from './cui-enter-security-code-content';

@AllMethodsStep()
export default class CuiEnterSecurityCodePage extends CuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
      super.expectLabel(inputs.securityCode.label),
    ]);
  }

  async fillSecurityCode(securityCode: string) {
    await super.inputText(securityCode, inputs.securityCode.selector);
    await super.clickSubmit();
  }
}
