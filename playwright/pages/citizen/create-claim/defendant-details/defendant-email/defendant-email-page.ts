import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CitizenEvent from '../../../citizen-event/citizen-event';
import { heading, paragraphs, inputs } from './defendant-email-content';

@AllMethodsStep()
export default class DefendantEmailPage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
    ]);
  }

  async enterEmail(email: string) {
    await super.inputText(email, inputs.email.selector);
    await super.clickSaveAndContinue();
  }
}
