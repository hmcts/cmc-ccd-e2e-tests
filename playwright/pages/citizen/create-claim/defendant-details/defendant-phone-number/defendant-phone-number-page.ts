import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CitizenEvent from '../../../mixins/citizen-events/citizen-events';
import { heading, inputs } from './defendant-phone-number-content';

@AllMethodsStep
export default class DefendantPhoneNumberPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
    ]);
  }

  async enterPhoneNumber() {
    await super.fill('07976116532', inputs.phoneNumber.selector);
    await super.clickSaveAndContinue();
  }

}