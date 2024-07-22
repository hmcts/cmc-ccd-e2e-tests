import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CitizenEvent from '../../../citizen-event/citizen-event';
import { heading, inputs } from './defendant-phone-number-content';

@AllMethodsStep()
export default class DefendantPhoneNumberPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
    ]);
  }

  async enterPhoneNumber() {
    await super.inputText('07976116532', inputs.phoneNumber.selector);
    await super.clickSaveAndContinue();
  }

}