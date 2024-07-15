import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CitizenEvent from '../../../../citizen-event/citizen-event';
import { heading, paragraphs, inputs } from './phone-number-content';

@AllMethodsStep
export default class PhoneNumberPage extends CitizenEvent(BasePage){

  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
    ]);
  }

  async fillPhoneNumber() {
    await super.fill('02089258767', inputs.phoneNumber.selector);
    await super.clickSaveAndContinue();
  }

}