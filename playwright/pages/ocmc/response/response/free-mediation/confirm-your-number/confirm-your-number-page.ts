import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import OcmcEvent from '../../../../ocmc-event/ocmc-event';
import { heading, inputs, paragraphs, radioButtons } from './confirm-your-number-content';

@AllMethodsStep()
export default class ConfirmYourNumberPage extends OcmcEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText),
    ]);
  }

  async yesPhoneNumber() {
    await super.clickBySelector(radioButtons.yesPhoneNumber.selector);
  }

  async noPhoneNumber() {
    await super.clickBySelector(radioButtons.noPhoneNumber.selector);
    await super.expectLabel(inputs.phoneNumber.label);
    await super.inputText('0788788788', inputs.phoneNumber.selector);
    await super.clickSaveAndContinue();
  }
}
