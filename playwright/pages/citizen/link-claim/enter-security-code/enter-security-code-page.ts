import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CitizenEvent from '../../citizen-event/citizen-event';
import { heading, inputs, paragraphs } from './enter-security-code-content';

@AllMethodsStep
export default class EnterSecurityCodePage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
      super.expectLabel(inputs.securityCode.label),
    ]);
  }

  async fillSecurityCode(securityCode: string) {
    await super.fill(securityCode, inputs.securityCode.selector);
    await super.clickContinue();
  }
}