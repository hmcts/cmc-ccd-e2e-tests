import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../mixins/citizen-events/citizen-events';
import { heading, inputs, paragraphs, radioButtons } from './confirm-your-number-content';

@AllMethodsStep
export default class ConfirmYourNumberPage extends CitizenEvent(BasePage) {

  async verifyContent() {
    await Promise.all([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
    ]);
  }

  async yesPhoneNumber() {
    await super.clickBySelector(radioButtons.yesPhoneNumber.selector);
  }

  async noPhoneNumber() {
    await super.clickBySelector(radioButtons.noPhoneNumber.selector);
    await super.expectLabel(inputs.phoneNumber.label),
    await super.fill('0788788788', inputs.phoneNumber.selector);
    await super.clickSaveAndContinue();
  }

}