import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../citizen-event/citizen-event';
import { heading, inputs } from './mediation-phone-number-content';

@AllMethodsStep()
export default class MediationPhoneNumberPage extends CitizenEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectLabel(inputs.phoneNumber.label),
    ]);
  }

  async fillPhoneNumber() {
    await super.inputText('0788788788', inputs.phoneNumber.selector);
    await super.clickSaveAndContinue();
  }
}
